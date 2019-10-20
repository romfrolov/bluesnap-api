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

    const headers = {
        'Authorization': `Basic ${Buffer.from(`${parent.username}:${parent.password}`).toString('base64')}`,
        'Accept':        'application/json',
        'Content-Type':  'application/json'
    };

    if (this.version) {
        headers['bluesnap-version'] = parent.version;
    }

    Object.defineProperties(this, {
        baseUrl: {value: PATHS[parent.env]},
        headers: {value: headers}
    });
}

Http.prototype.post = function post(path, body, customOpts) {
    const opts = {
        method:  'POST',
        uri:     `${this.baseUrl}${path}`,
        headers: this.headers,
        body,
        json: true
    };

    Object.assign(opts, customOpts);

    return rp(opts);
};

Http.prototype.put = function put(path, body) {
    const opts = {
        method:  'PUT',
        uri:     `${this.baseUrl}${path}`,
        headers: this.headers,
        body,
        json: true
    };

    return rp(opts);
};

Http.prototype.get = function get(path, qs) {
    const opts = {
        method:  'GET',
        uri:     `${this.baseUrl}${path}`,
        headers: this.headers,
        qs,
        json: true
    };

    return rp(opts);
};
