/**
 * Wallets API.
 *
 * @module api/wallets
 */

'use strict';

const Error = require('lib/error');

module.exports = Wallets;

function Wallets(parent) {
    if (!new.target) {
        return new Wallets(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Wallets.prototype.create = function create(wallet) {
    if (!wallet) { throw Error('wallet is missing'); }

    const path = '/services/2/wallets';

    return this.http.post(path, wallet);
};

Wallets.prototype.get = function get(walletId) {
    if (!walletId) { throw Error('walletId is missing'); }

    const path = `/services/2/wallets/${walletId}`;

    return this.http.get(path);
};

Wallets.prototype.visaCheckoutApiKey = function visaCheckoutApiKey() {
    const path = '/services/2/wallets/visa/apikey';

    return this.http.post(path, null, {retrieveIdFromHeaders: true});
};

Wallets.prototype.onboardApplePay = function onboardApplePay(wallet) {
    if (!wallet) { throw Error('wallet is missing'); }

    const path = '/services/2/wallets/onboarding';

    return this.http.post(path, wallet, {retrieveIdFromHeaders: true});
};

Wallets.prototype.getApplePayOnboardingInfo = function getApplePayOnboardingInfo(onboardingId) {
    if (!onboardingId) { throw Error('onboardingId is missing'); }

    const path = `/services/2/wallets/onboarding/${onboardingId}`;

    return this.http.get(path);
};
