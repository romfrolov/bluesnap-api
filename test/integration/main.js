'use strict';

require('dotenv').config({path: './test/.env'});

const sinon    = require('sinon');
const BlueSnap = require('../../lib/bluesnap-api');

const mocked = (!process.env.USERNAME || !process.env.PASSWORD);

const config = {
    username: process.env.USERNAME || 'test',
    password: process.env.PASSWORD || 'test'
};

describe('C2B transaction', () => {
    let bsg;
    let vendorId;

    it('initialize the gateway', () => {
        bsg = BlueSnap(config);
    });

    it('create vendor', async () => {
        if (mocked) {
            sinon.stub(bsg.http, 'post').callsFake(async () => ({headers: {location: 'url/123'}}));
        }

        vendorId = await bsg.vendors.create({email: 'vendor@example.com', country: 'RU'});

        console.log('Vendor ID:', vendorId);

        if (mocked) {
            bsg.http.post.restore();
        }
    });

    describe('C2B transaction', () => {
        let transactionId;

        it('auth', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({transactionId: '123'}));
            }

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

            console.log('Transaction ID:', transactionId);

            if (mocked) {
                bsg.http.post.restore();
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

            console.log('Transaction:', transaction);

            if (mocked) {
                bsg.http.put.restore();
            }
        });
    });

    describe('Subscription', () => {
        let planId;

        it('create plan', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({planId: '123'}));
            }

            const plan = {
                chargeFrequency:       'MONTHLY',
                name:                  'Pro Plan',
                currency:              'RUB',
                recurringChargeAmount: 100
            };

            const response = await bsg.plans.create(plan);

            planId = response.planId;

            console.log('Create plan response:', response);

            if (mocked) {
                bsg.http.post.restore();
            }
        });

        it('create subscription', async () => {
            if (mocked) {
                sinon.stub(bsg.http, 'post').callsFake(async () => ({}));
            }

            const subscription = {
                payerInfo: {
                    firstName: 'First name',
                    lastName:  'Last name'
                },
                vendorInfo: {vendorId},
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

            console.log('Create subscription response:', response);

            if (mocked) {
                bsg.http.post.restore();
            }
        });
    });
});
