/**
 * BlueSnap API wrapper.
 *
 * @module lib/bluesnap-api
 */

'use strict';

module.exports = BlueSnap;

function BlueSnap() {
    if (!new.target) {
        return new BlueSnap();
    }
}
