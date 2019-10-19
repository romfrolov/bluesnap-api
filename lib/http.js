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

    const authorization = `Basic ${Buffer.from(`${parent.username}:${parent.password}`).toString('base64')}`;

    Object.defineProperties(this, {
        baseUrl:       {value: PATHS[parent.env]},
        authorization: {value: authorization}
    });
}

Http.prototype.post = function post(path, body) {
    const opts = {
        method:  'POST',
        uri:     `${this.baseUrl}${path}`,
        headers: {
            'Authorization': this.authorization,
            'Accept':        'application/json',
            'Content-Type':  'application/json'
        },
        body,
        json: true
    };

    return rp(opts);
};

Http.prototype.put = function put(path, body) {
    const opts = {
        method:  'PUT',
        uri:     `${this.baseUrl}${path}`,
        headers: {
            'Authorization': this.authorization,
            'Accept':        'application/json',
            'Content-Type':  'application/json'
        },
        body,
        json: true
    };

    return rp(opts);
};

Http.prototype.get = function get(path, qs) {
    const opts = {
        method:  'GET',
        uri:     `${this.baseUrl}${path}`,
        headers: {
            'Authorization': this.authorization,
            'Accept':        'application/json'
        },
        qs,
        json: true
    };

    return rp(opts);
};
