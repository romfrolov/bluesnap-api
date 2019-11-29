/**
 * Transactions API.
 *
 * @module api/transactions
 */

'use strict';

const Error = require('../lib/error');

module.exports = Transactions;

function Transactions(parent) {
    if (!new.target) {
        return new Transactions(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Transactions.prototype.authCapture = function authCapture(cardTransaction) {
    if (!cardTransaction) { throw Error('cardTransaction is missing'); }

    const path = '/services/2/transactions';

    return this.http.post(path, cardTransaction);
};

Transactions.prototype.authOnly = function authOnly(cardTransaction) {
    if (!cardTransaction) { throw Error('cardTransaction is missing'); }

    const path = '/services/2/transactions';

    return this.http.post(path, cardTransaction);
};

Transactions.prototype.capture = function capture(cardTransaction) {
    if (!cardTransaction) { throw Error('cardTransaction is missing'); }

    const path = '/services/2/transactions';

    return this.http.put(path, cardTransaction);
};

Transactions.prototype.authReversal = function authReversal(cardTransaction) {
    if (!cardTransaction) { throw Error('cardTransaction is missing'); }

    const path = '/services/2/transactions';

    return this.http.put(path, cardTransaction);
};

Transactions.prototype.get = function get(transactionId) {
    if (!transactionId) { throw Error('transactionId is missing'); }

    const path = `/services/2/transactions/${transactionId}`;

    return this.http.get(path);
};

Transactions.prototype.refund = function refund(transactionId) {
    if (!transactionId) { throw Error('transactionId is missing'); }

    const path = `/services/2/transactions/${transactionId}/refund`;

    return this.http.put(path);
};
