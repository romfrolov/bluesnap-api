/**
 * Vaulted Shoppers API.
 *
 * @module api/vaulted-shoppers
 */

'use strict';

const Error = require('lib/error');

module.exports = VaultedShoppers;

function VaultedShoppers(parent) {
    if (!new.target) {
        return new VaultedShoppers(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

VaultedShoppers.prototype.create = function create(vaultedShopper) {
    if (!vaultedShopper) { throw Error('vaultedShopper is missing'); }

    const path = '/services/2/vaulted-shoppers';

    return this.http.post(path, vaultedShopper);
};

VaultedShoppers.prototype.update = function update(vaultedShopperId, vaultedShopper) {
    if (!vaultedShopperId) { throw Error('vaultedShopperId is missing'); }
    if (!vaultedShopper)   { throw Error('vaultedShopper is missing');   }

    const path = `/services/2/vaulted-shoppers/${vaultedShopperId}`;

    return this.http.put(path, vaultedShopper);
};

VaultedShoppers.prototype.get = function get(vaultedShopperId) {
    if (!vaultedShopperId) { throw Error('vaultedShopperId is missing'); }

    const path = `/services/2/vaulted-shoppers/${vaultedShopperId}`;

    return this.http.get(path);
};
