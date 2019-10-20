/**
 * Transactions API.
 *
 * @module api/transactions
 */

'use strict';

module.exports = Transactions;

function Transactions(parent) {
    if (!new.target) {
        return new Transactions(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Transactions.prototype.authCapture = function authCapture(cardTransaction) {
    const path = '/services/2/transactions';

    return this.http.post(path, cardTransaction);
};

Transactions.prototype.authOnly = function authOnly(cardTransaction) {
    const path = '/services/2/transactions';

    return this.http.post(path, cardTransaction);
};

Transactions.prototype.capture = function capture(cardTransaction) {
    const path = '/services/2/transactions';

    return this.http.put(path, cardTransaction);
};

Transactions.prototype.authReversal = function authReversal(cardTransaction) {
    const path = '/services/2/transactions';

    return this.http.put(path, cardTransaction);
};

Transactions.prototype.get = function get(transactionId) {
    const path = `/services/2/transactions/${transactionId}`;

    return this.http.get(path);
};

Transactions.prototype.refund = function refund(transactionId) {
    const path = `/services/2/transactions/${transactionId}/refund`;

    return this.http.put(path);
};
