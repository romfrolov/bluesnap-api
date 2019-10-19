/**
 * Vendors API.
 *
 * @module api/vendors
 */

'use strict';

module.exports = Vendors;

function Vendors(parent) {
    if (!new.target) {
        return new Vendors(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Vendors.prototype.create = function create(vendor) {
    const path = '/services/2/vendors';

    return this.http.post(path, vendor);
};

Vendors.prototype.update = function update(vendorId, vendor) {
    const path = `/services/2/vendors/${vendorId}`;

    return this.http.put(path, vendor);
};

Vendors.prototype.get = function get(vendorId) {
    const path = `/services/2/vendors/${vendorId}`;

    return this.http.get(path);
};

Vendors.prototype.list = function list(params) {
    const path = '/services/2/vendors';

    return this.http.get(path, params);
};
