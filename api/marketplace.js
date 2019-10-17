/**
 * Marketplace API.
 *
 * @module api/marketplace
 */

'use strict';

module.exports = Marketplace;

function Marketplace(parent) {
    if (!new.target) {
        return new Marketplace(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}
