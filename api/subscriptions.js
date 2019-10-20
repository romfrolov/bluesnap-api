/**
 * Subscriptions API.
 *
 * @module api/subscriptions
 */

'use strict';

module.exports = Subscriptions;

function Subscriptions(parent) {
    if (!new.target) {
        return new Subscriptions(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Subscriptions.prototype.create = function create(subscription) {
    const path = '/services/2/recurring/subscriptions';

    return this.http.post(path, subscription);
};

Subscriptions.prototype.update = function update(subscriptionId, subscription) {
    const path = `/services/2/recurring/subscriptions/${subscriptionId}`;

    return this.http.put(path, subscription);
};

Subscriptions.prototype.createMerchantManaged = function createMerchantManaged(charge) {
    const path = '/services/2/recurring/ondemand';

    return this.http.post(path, charge);
};

Subscriptions.prototype.createMerchantManagedCharge = function createMerchantManagedCharge(subscriptionId, charge) {
    const path = `/services/2/recurring/ondemand/${subscriptionId}`;

    return this.http.post(path, charge);
};

Subscriptions.prototype.get = function get(subscriptionId) {
    const path = `/services/2/recurring/subscriptions/${subscriptionId}`;

    return this.http.get(path);
};

Subscriptions.prototype.list = function list(params) {
    const path = '/services/2/recurring/subscriptions';

    return this.http.get(path, params);
};

Subscriptions.prototype.getCharge = function getCharge(params) {
    const path = '/services/2/recurring/subscriptions/charges/resolve';

    return this.http.get(path, params);
};

Subscriptions.prototype.listCharges = function listCharges(subscriptionId, params) {
    const path = `/services/2/recurring/subscriptions/${subscriptionId}/charges`;

    return this.http.get(path, params);
};

Subscriptions.prototype.getSwitchChargeAmount = function getSwitchChargeAmount(subscriptionId, params) {
    const path = `/services/2/recurring/subscriptions/${subscriptionId}/switch-charge-amount`;

    return this.http.get(path, params);
};
