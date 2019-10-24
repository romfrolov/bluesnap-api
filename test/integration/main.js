/**
 * Generic integration test.
 *
 * @module test/integration
 */

'use strict';

require('dotenv').config({path: './test/.env'});

const sinon    = require('sinon');
const BlueSnap = require('../../lib/bluesnap-api');

const mocked = (!process.env.USERNAME || !process.env.PASSWORD);

const config = {
    username: process.env.USERNAME || 'test',
    password: process.env.PASSWORD || 'test'
};

/**
 * Wrapper on top of @method console.log to print logs only if needed.
 *
 * @param {Object[]} args
 */
function log(...args) {
    process.env.VERBOSE && console.log(...args);
}

describe('BlueSnap API', () => {
    let bsg;
    let vendorId;

    it('initialize the gateway', () => {
        bsg = BlueSnap(config);
    });

    it('create vendor', async () => {
        if (mocked) {
            sinon.stub(bsg.http, 'post').callsFake(async () => ({headers: {location: 'url/1'}}));
        }

        vendorId = await bsg.vendors.create({email: 'vendor@example.com', country: 'RU'});

        log('Created vendor ID:', vendorId);

        if (mocked) {
            bsg.http.post.restore();
        }
    });

    it('retrieve vendor', async () => {
        if (mocked) {
            sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
        }

        const response = await bsg.vendors.get(vendorId);

        log('Retrieved vendor:', response);

        if (mocked) {
            bsg.http.get.restore();
        }
    });

    it('list vendors', async () => {
        if (mocked) {
            sinon.stub(bsg.http, 'get').callsFake(async () => ([]));
        }

        const response = await bsg.vendors.list();

        log('Listed vendors:', response);

        if (mocked) {
            bsg.http.get.restore();
        }
    });

    describe('C2B transaction', () => {
        let vaultedShopperId;
        let transactionId;

        it('create vaulted shopper', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({vaultedShopperId: 1}));
            }

            const vaultedShopper = {
                firstName: 'First name',
                lastName:  'Last name',
                paymentSource: {
                    creditCardInfo: {
                        creditCard: {
                            expirationYear:  2023,
                            securityCode:    837,
                            expirationMonth: '02',
                            cardNumber:      4263982640269299
                        }
                    }
                }
            };

            const response = await bsg.vaultedShoppers.create(vaultedShopper);

            vaultedShopperId = response.vaultedShopperId;

            log('Created vaulted shopper:', response);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('retrieve vaulted shopper', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
            }

            const response = await bsg.vaultedShoppers.get(vaultedShopperId);

            log('Retrieved vaulted shopper:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });

        it('auth', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({transactionId: 1}));
            }

            // TODO Use vaulted shopper.
            const cardTransaction = {
                amount: 1,
                currency: 'RUB',
                creditCard: {
                    expirationYear:  2023,
                    securityCode:    837,
                    expirationMonth: '02',
                    cardNumber:      4263982640269299
                },
                cardTransactionType: 'AUTH_ONLY'
            };

            const response = await bsg.transactions.authOnly(cardTransaction);

            transactionId = response.transactionId;

            log('Authorized transaction ID:', transactionId);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('retrieve transaction', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
            }

            const response = await bsg.transactions.get(transactionId);

            log('Retrieved transaction:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });

        it('capture', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'put').callsFake(async () => ({}));
            }

            const cardTransaction = {
                transactionId,
                cardTransactionType: 'CAPTURE'
            };

            const transaction = await bsg.transactions.capture(cardTransaction);

            log('Captured transaction:', transaction);

            if (mocked) {
                bsg.http.put.restore();
            }
        });
    });

    describe('Subscription', () => {
        let planId;
        let subscriptionId;

        it('create plan', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({planId: 1}));
            }

            const plan = {
                chargeFrequency:       'MONTHLY',
                name:                  'Pro Plan',
                currency:              'RUB',
                recurringChargeAmount: 100
            };

            const response = await bsg.plans.create(plan);

            planId = response.planId;

            log('Create plan response:', response);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('retrieve plan', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
            }

            const response = await bsg.plans.get(planId);

            log('Retrieved plan:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });

        it('list plans', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ([]));
            }

            const response = await bsg.plans.list();

            log('Listed plans:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });

        it('create subscription', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({subscriptionId: 1}));
            }

            const subscription = {
                payerInfo: {
                    firstName: 'First name',
                    lastName:  'Last name'
                },
                planId,
                paymentSource: {
                    creditCardInfo: {
                        creditCard: {
                            expirationYear:  2023,
                            securityCode:    837,
                            expirationMonth: '02',
                            cardNumber:      4263982640269299
                        }
                    }
                }
            };

            const response = await bsg.subscriptions.create(subscription);

            subscriptionId = response.subscriptionId;

            log('Create subscription response:', response);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('retrieve subscription', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
            }

            const response = await bsg.subscriptions.get(subscriptionId);

            log('Retrieved subscription:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });

        it('list subscriptions', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ([]));
            }

            const response = await bsg.subscriptions.list();

            log('Listed subscriptions:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });
    });
});
