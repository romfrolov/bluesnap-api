/**
 * Generic integration test.
 *
 * @module test/integration
 */

'use strict';

require('dotenv').config({path: './test/.env'});

const BlueSnap = require('../../lib/bluesnap-api');

if (!process.env.USERNAME) { console.error('Please provide USERNAME') || process.exit(1); }
if (!process.env.PASSWORD) { console.error('Please provide PASSWORD') || process.exit(1); }

/**
 * BlueSnap configuration file.
 *
 * @type {Object}
 */
const config = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
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
            vendorId = await bsg.vendors.create({email: 'vendor@example.com', country: 'RU'});

            log('Created vendor ID:', vendorId);
        });

        it('update vendor', async () => {
            await bsg.vendors.update(vendorId, {email: 'vendor@example.com', country: 'RU'});
        });

        it('retrieve vendor', async () => {
            const response = await bsg.vendors.get(vendorId);

            log('Retrieved vendor:', response);
        });

        it('list vendors', async () => {
            const response = await bsg.vendors.list();

            log('Listed vendors:', response);
        });
    });

    describe('Vaulted Shoppers API', () => {
        it('create vaulted shopper', async () => {
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
        });

        it('update vaulted shopper', async () => {
            const vaultedShopper = {
                firstName: 'First name',
                lastName:  'New last name'
            };

            const response = await bsg.vaultedShoppers.update(vaultedShopperId, vaultedShopper);

            vaultedShopperId = response.vaultedShopperId;

            log('Updated vaulted shopper:', JSON.stringify(response, null, 4));
        });

        it('retrieve vaulted shopper', async () => {
            const response = await bsg.vaultedShoppers.get(vaultedShopperId);

            log('Retrieved vaulted shopper:', JSON.stringify(response, null, 4));
        });
    });

    describe('Transactions API', () => {
        it('auth transaction', async () => {
            const cardTransaction = {
                vaultedShopperId,
                amount:              1,
                currency:            'RUB',
                cardTransactionType: 'AUTH_ONLY',
                vendorsInfo: {
                    vendorInfo: [
                        {
                            vendorId
                        }
                    ]
                }
            };

            const response = await bsg.transactions.authOnly(cardTransaction);

            transactionId = response.transactionId;

            log('Authorized transaction ID:', transactionId);
        });

        it('retrieve transaction', async () => {
            const response = await bsg.transactions.get(transactionId);

            log('Retrieved transaction:', response);
        });

        it('capture transaction', async () => {
            const cardTransaction = {
                transactionId,
                cardTransactionType: 'CAPTURE'
            };

            const transaction = await bsg.transactions.capture(cardTransaction);

            log('Captured transaction:', transaction);
        });
    });

    describe('Plans API', () => {
        it('create plan', async () => {
            const plan = {
                chargeFrequency:       'MONTHLY',
                name:                  'Pro Plan',
                currency:              'RUB',
                recurringChargeAmount: 100
            };

            const response = await bsg.plans.create(plan);

            planId = response.planId;

            log('Create plan response:', response);
        });

        it('update plan', async () => {
            const plan = {
                chargeFrequency:       'MONTHLY',
                name:                  'Super Pro Plan',
                currency:              'RUB',
                recurringChargeAmount: 100
            };

            const response = await bsg.plans.update(planId, plan);

            planId = response.planId;

            log('Update plan response:', response);
        });

        it('retrieve plan', async () => {
            const response = await bsg.plans.get(planId);

            log('Retrieved plan:', response);
        });

        it('list plans', async () => {
            const response = await bsg.plans.list();

            log('Listed plans:', response);
        });
    });

    describe('Subscriptions API', () => {
        it('create subscription', async () => {
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
        });

        it('update subscription', async () => {
            const response = await bsg.subscriptions.update(subscriptionId, {planId});

            subscriptionId = response.subscriptionId;

            log('Update subscription response:', response);
        });

        it('retrieve subscription', async () => {
            const response = await bsg.subscriptions.get(subscriptionId);

            log('Retrieved subscription:', response);
        });

        it('list subscriptions', async () => {
            const response = await bsg.subscriptions.list();

            log('Listed subscriptions:', response);
        });
    });

    describe('Wallets API', () => {
        it('create wallet (Apple Pay)', async () => {
            const wallet = {
                walletType:    'APPLE_PAY',
                validationUrl: 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession',
                domainName:    'merchant.com'
            };

            const response = await bsg.wallets.create(wallet);

            log('Created Apple Pay wallet:', response);
        });

        it('create wallet (Masterpass)', async () => {
            const wallet = {
                walletType: 'MASTERPASS',
                originUrl:  'http://www.originURL.com',
                returnUrl:  'http://www.returnURL.com'
            };

            const response = await bsg.wallets.create(wallet);

            log('Created Masterpass wallet:', response);
        });

        // NOTE On 31.10.2019 this functionality doesn't work.
        // StatusCodeError: 400
        // "errorName":"WALLET_PROCESSING_FAILURE"
        // "code":"23003"
        // "description":"Wallet processor is currently unavailable, please try again later"
        xit('create wallet (Visa Checkout)', async () => {
            const wallet = {
                callId:     5549711876630985101,
                walletType: 'VISA_CHECKOUT'
            };

            const response = await bsg.wallets.create(wallet);

            walletId = response.walletId;

            log('Wallet ID:', walletId);
        });

        xit('retrieve wallet', async () => {
            const response = await bsg.wallets.get(walletId);

            log('Retrieved wallet:', response);
        });

        it('Visa Checkout API key', async () => {
            const response = await bsg.wallets.visaCheckoutApiKey();

            log('Visa checkout API key response:', response);
        });

        it('onboard Apple Pay', async () => {
            const wallet = {
                walletType: 'APPLE_PAY',
                applePay: {
                    domains: ['bluesnap.com']
                }
            };

            onboardingId = await bsg.wallets.onboardApplePay(wallet);

            log('Onboard ID:', onboardingId);
        });

        it('retrieve Apple Pay Onboarding info', async () => {
            const response = await bsg.wallets.getApplePayOnboardingInfo(onboardingId);

            log('Apple Pay onboarding info:', response);
        });
    });

    describe('Reports API', () => {
        it('get report with vendor details', async () => {
            const response = await bsg.reports.get('VendorDetails');

            log('Vendor details:', response);
        });
    });
});
