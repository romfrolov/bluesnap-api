/**
 * Subscriptions API.
 *
 * @module api/subscriptions
 */

'use strict';

const Error = require('../lib/error');

module.exports = Subscriptions;

function Subscriptions(parent) {
    if (!new.target) {
        return new Subscriptions(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Subscriptions.prototype.create = function create(subscription) {
    if (!subscription) { throw Error('subscription is missing'); }

    const path = '/services/2/recurring/subscriptions';

    return this.http.post(path, subscription);
};

Subscriptions.prototype.update = function update(subscriptionId, subscription) {
    if (!subscriptionId) { throw Error('subscriptionId is missing'); }
    if (!subscription)   { throw Error('subscription is missing');   }

    const path = `/services/2/recurring/subscriptions/${subscriptionId}`;

    return this.http.put(path, subscription);
};

Subscriptions.prototype.createMerchantManaged = function createMerchantManaged(charge) {
    if (!charge) { throw Error('charge is missing'); }

    const path = '/services/2/recurring/ondemand';

    return this.http.post(path, charge);
};

Subscriptions.prototype.createMerchantManagedCharge = function createMerchantManagedCharge(subscriptionId, charge) {
    if (!subscriptionId) { throw Error('subscriptionId is missing'); }
    if (!charge)         { throw Error('charge is missing');         }

    const path = `/services/2/recurring/ondemand/${subscriptionId}`;

    return this.http.post(path, charge);
};

Subscriptions.prototype.get = function get(subscriptionId) {
    if (!subscriptionId) { throw Error('subscriptionId is missing'); }

    const path = `/services/2/recurring/subscriptions/${subscriptionId}`;

    return this.http.get(path);
};

Subscriptions.prototype.list = function list(params) {
    const path = '/services/2/recurring/subscriptions';

    return this.http.get(path, params);
};

Subscriptions.prototype.getCharge = function getCharge(transactionid) {
    if (!transactionid) { throw Error('transactionid is missing'); }

    const path = `/services/2/recurring/subscriptions/charges/resolve?transactionid=${transactionid}`;

    return this.http.get(path);
};

Subscriptions.prototype.listCharges = function listCharges(subscriptionId, params) {
    if (!subscriptionId) { throw Error('subscriptionId is missing'); }

    const path = `/services/2/recurring/subscriptions/${subscriptionId}/charges`;

    return this.http.get(path, params);
};

Subscriptions.prototype.getSwitchChargeAmount = function getSwitchChargeAmount(subscriptionId, params) {
    if (!subscriptionId) { throw Error('subscriptionId is missing'); }

    const path = `/services/2/recurring/subscriptions/${subscriptionId}/switch-charge-amount`;

    return this.http.get(path, params);
};
