/**
 * HTTP methods.
 *
 * @module lib/http
 */

'use strict';

const fetch = require('node-fetch');
const qs    = require('qs');

/**
 * BlueSnap environment URLs.
 *
 * @type {Object}
 */
const URLS = {
    Sandbox:    'https://sandbox.bluesnap.com',
    Production: 'https://ws.bluesnap.com'
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
        baseUrl: {value: URLS[parent.env]},
        headers: {value: headers}
    });
}

Http.prototype.post = function post(path, body, customOpts) {
    const url = `${this.baseUrl}${path}`;

    const opts = {
        method:  'POST',
        headers: this.headers,
        body:    JSON.stringify(body)
    };

    return fetch(url, opts)
        .then(checkStatus)
        .then(res => {
            if (customOpts && customOpts.retrieveIdFromHeaders) {
                return res.headers.get('location').split('/').pop();
            } else {
                return (res.status === 204) || res.json();
            }
        });
};

Http.prototype.put = function put(path, body) {
    const url = `${this.baseUrl}${path}`;

    const opts = {
        method:  'PUT',
        headers: this.headers,
        body:    JSON.stringify(body)
    };

    return fetch(url, opts)
        .then(checkStatus)
        .then(res => (res.status === 204) || res.json());
};

Http.prototype.get = function get(path, query) {
    const queryString = qs.stringify(query);

    const url = `${this.baseUrl}${path}?${queryString}`;

    const opts = {
        method:  'GET',
        headers: this.headers
    };

    return fetch(url, opts)
        .then(checkStatus)
        .then(res => res.json());
};

/**
 * Check response status.
 *
 * @param  {Object}       res
 * @return {Object|Error}
 *
 * @throws error if status is outside the range [200..300).
 */
async function checkStatus(res) {
    if (res.ok) {
        return res;
    } else {
        const error  = await res.json();
        error.status = res.status;

        throw Error(JSON.stringify(error, null, 4));
    }
}
