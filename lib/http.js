/**
 * HTTP methods.
 *
 * @module lib/http
 */

'use strict';

const rp = require('request-promise');

const PATHS = {
    dev:  'https://sandbox.bluesnap.com',
    prod: 'https://ws.bluesnap.com'
};

module.exports = Http;

function Http(parent) {
    if (!new.target) {
        return new Http(parent);
    }

    Object.defineProperties(this, {
        path:     {value: PATHS[parent.env]},
        username: {value: parent.username},
        password: {value: parent.password}
    });
}

Http.prototype.post = function post(body) {
    const opts = {
        method:  'POST',
        uri:     '', // TODO
        headers: '', // TODO
        body,
        json: true
    };

    return rp(opts);
};

Http.prototype.put = function put(body) {
    const opts = {
        method:  'PUT',
        uri:     '', // TODO
        headers: '', // TODO
        body,
        json: true
    };

    return rp(opts);
};

Http.prototype.get = function get(qs) {
    const opts = {
        method:  'GET',
        uri:     '', // TODO
        headers: '', // TODO
        qs,
        json: true
    };

    return rp(opts);
};
