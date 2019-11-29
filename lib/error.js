/**
 * Error class.
 *
 * @module lib/error
 */

'use strict';

module.exports = BlueSnapApiError;

/**
 * Default BlueSnap API error.
 * @class
 *
 * @param {String} message
 */
function BlueSnapApiError(message) {
    if (!new.target) {
        return new BlueSnapApiError(message);
    }

    this.name    = 'BlueSnapError';
    this.message = `BlueSnap API: ${message}`;
    this.stack   = (new Error()).stack;
}

BlueSnapApiError.prototype = new Error;
