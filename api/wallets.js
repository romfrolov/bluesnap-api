/**
 * Wallets API.
 *
 * @module api/wallets
 */

'use strict';

module.exports = Wallets;

function Wallets(parent) {
    if (!new.target) {
        return new Wallets(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Wallets.prototype.create = function create(wallet) {
    const path = '/services/2/wallets';

    return this.http.post(path, wallet);
};

Wallets.prototype.get = function get(walletId) {
    const path = `/services/2/wallets/${walletId}`;

    return this.http.get(path);
};

Wallets.prototype.visaCheckoutApiKey = function visaCheckoutApiKey() {
    const path = '/services/2/wallets/visa/apikey';

    return this.http.post(path, null, {resolveWithFullResponse: true})
        .then(res => res.headers['location'].split('/').pop());
};

Wallets.prototype.onboardApplePay = function onboardApplePay(wallet) {
    const path = '/services/2/wallets/onboarding';

    return this.http.post(path, wallet, {resolveWithFullResponse: true})
        .then(res => +res.headers['location'].split('/').pop());
};

Wallets.prototype.getApplePayOnboardingInfo = function getApplePayOnboardingInfo(onboardingId) {
    const path = `/services/2/wallets/onboarding/${onboardingId}`;

    return this.http.get(path);
};
