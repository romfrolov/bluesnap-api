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

describe('BlueSnap', () => {
    let bsg;
    let vendorId;
    let planId;
    let subscriptionId;
    let vaultedShopperId;
    let transactionId;
    let walletId;
    let onboardingId;

    it('initialize the gateway', () => {
        bsg = BlueSnap(config);
    });

    describe('Vendors API', () => {
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

        it('update vendor', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'put').callsFake(async () => ({}));
            }

            await bsg.vendors.update(vendorId, {email: 'vendor@example.com', country: 'RU'});

            if (mocked) {
                bsg.http.put.restore();
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
    });

    describe('Vaulted Shoppers API', () => {
        it('create vaulted shopper', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({vaultedShopperId: 1}));
            }

            const vaultedShopper = {
                firstName: 'First name',
                lastName:  'Last name',
                paymentSources: {
                    creditCardInfo: [
                        {
                            creditCard: {
                                expirationYear:  '2023',
                                securityCode:    '837',
                                expirationMonth: '02',
                                cardNumber:      '4263 9826 4026 9299'
                            }
                        }
                    ]
                }
            };

            const response = await bsg.vaultedShoppers.create(vaultedShopper);

            vaultedShopperId = response.vaultedShopperId;

            log('Created vaulted shopper:', JSON.stringify(response, null, 4));

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('update vaulted shopper', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'put').callsFake(async () => ({vaultedShopperId: 1}));
            }

            const vaultedShopper = {
                firstName: 'First name',
                lastName:  'Last name',
                paymentSources: {
                    creditCardInfo: [
                        {
                            creditCard: {
                                expirationYear:  '2023',
                                securityCode:    '837',
                                expirationMonth: '02',
                                cardNumber:      '4111 1111 1111 1111'
                            }
                        }
                    ]
                }
            };

            const response = await bsg.vaultedShoppers.update(vaultedShopperId, vaultedShopper);

            vaultedShopperId = response.vaultedShopperId;

            log('Updated vaulted shopper:', JSON.stringify(response, null, 4));

            if (mocked) {
                bsg.http.put.restore();
            }
        });

        it('retrieve vaulted shopper', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
            }

            const response = await bsg.vaultedShoppers.get(vaultedShopperId);

            log('Retrieved vaulted shopper:', JSON.stringify(response, null, 4));

            if (mocked) {
                bsg.http.get.restore();
            }
        });
    });

    describe('Transactions API', () => {
        it('auth transaction', async () => {
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
                cardTransactionType: 'AUTH_ONLY',
                vendorInfo: {vendorId}
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

        it('capture transaction', async () => {
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

    describe('Plans API', () => {
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

        it('update plan', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'put').callsFake(async () => ({planId: 1}));
            }

            const plan = {
                chargeFrequency:       'MONTHLY',
                name:                  'Super Pro Plan',
                currency:              'RUB',
                recurringChargeAmount: 100
            };

            const response = await bsg.plans.update(planId, plan);

            planId = response.planId;

            log('Update plan response:', response);

            if (mocked) {
                bsg.http.put.restore();
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
    });

    describe('Subscriptions API', () => {
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

        it('update subscription', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'put').callsFake(async () => ({subscriptionId: 1}));
            }

            const response = await bsg.subscriptions.update(subscriptionId, {planId});

            subscriptionId = response.subscriptionId;

            log('Update subscription response:', response);

            if (mocked) {
                bsg.http.put.restore();
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

    describe('Wallets API', () => {
        it('create wallet (Apple Pay)', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({}));
            }

            const wallet = {
                walletType:    'APPLE_PAY',
                validationUrl: 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession',
                domainName:    'merchant.com'
            };

            const response = await bsg.wallets.create(wallet);

            log('Created Apple Pay wallet:', response);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('create wallet (Masterpass)', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({}));
            }

            const wallet = {
                walletType: 'MASTERPASS',
                originUrl:  'http://www.originURL.com',
                returnUrl:  'http://www.returnURL.com'
            };

            const response = await bsg.wallets.create(wallet);

            log('Created Masterpass wallet:', response);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        // NOTE On 31.10.2019 this functionality doesn't work.
        // StatusCodeError: 400
        // "errorName":"WALLET_PROCESSING_FAILURE"
        // "code":"23003"
        // "description":"Wallet processor is currently unavailable, please try again later"
        xit('create wallet (Visa Checkout)', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({walletId: 1}));
            }

            const wallet = {
                callId:     5549711876630985101,
                walletType: 'VISA_CHECKOUT'
            };

            const response = await bsg.wallets.create(wallet);

            walletId = response.walletId;

            log('Wallet ID:', walletId);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        xit('retrieve wallet', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
            }

            const response = await bsg.wallets.get(walletId);

            log('Retrieved wallet:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });

        it('Visa Checkout API key', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({headers: {location: 'url/1'}}));
            }

            const response = await bsg.wallets.visaCheckoutApiKey();

            log('Visa checkout API key response:', response);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('onboard Apple Pay', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({headers: {location: 'url/1'}}));
            }

            const wallet = {
                walletType: 'APPLE_PAY',
                applePay: {
                    domains: ['bluesnap.com']
                }
            };

            onboardingId = await bsg.wallets.onboardApplePay(wallet);

            log('Onboard ID:', onboardingId);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('retrieve Apple Pay Onboarding info', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
            }

            const response = await bsg.wallets.getApplePayOnboardingInfo(onboardingId);

            log('Apple Pay onboarding info:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });
    });

    describe('Reports API', () => {
        it('get report with vendor details', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'get').callsFake(async () => ({}));
            }

            const response = await bsg.reports.get('VendorDetails');

            log('Vendor details:', response);

            if (mocked) {
                bsg.http.get.restore();
            }
        });
    });
});
