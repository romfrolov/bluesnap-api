/**
 * BlueSnap API wrapper.
 *
 * @module lib/bluesnap-api
 */

'use strict';

const Http    = require('./http');
const Vendors = require('../api/vendors');

module.exports = BlueSnap;

function BlueSnap(config) {
    if (!new.target) {
        return new BlueSnap(config);
    }

    if (!config.username) {
        throw new Error('BlueSnap config: "username" is required.');
    }

    if (!config.password) {
        throw new Error('BlueSnap config: "password" is required.');
    }

    if (config.env && !['dev', 'prod'].includes(config.env)) {
        throw new Error(`BlueSnap config: Unknown "env": ${config.env}. Options: dev, prod.`);
    }

    Object.defineProperties(this, {
        username: {value: config.username},
        password: {value: config.password},
        env:      {value: config.env || 'dev'},
        version:  {value: config.version}
    });

    const http = Http(this);

    Object.defineProperty(this, 'http', {value: http});

    const vendors = Vendors(this);

    Object.defineProperty(this, 'vendors', {value: vendors});
}
