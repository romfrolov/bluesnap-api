/**
 * BlueSnap API wrapper.
 *
 * @module lib/bluesnap-api
 */

'use strict';

const Http            = require('./http');
const Vendors         = require('../api/vendors');
const Wallets         = require('../api/wallets');
const Transactions    = require('../api/transactions');
const VaultedShoppers = require('../api/vaulted-shoppers');
const Plans           = require('../api/plans');
const Subscriptions   = require('../api/subscriptions');

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

    const vendors         = Vendors(this);
    const wallets         = Wallets(this);
    const transactions    = Transactions(this);
    const vaultedShoppers = VaultedShoppers(this);
    const plans           = Plans(this);
    const subscriptions   = Subscriptions(this);

    Object.defineProperties(this, {
        vendors:         {value: vendors},
        wallets:         {value: wallets},
        transactions:    {value: transactions},
        vaultedShoppers: {value: vaultedShoppers},
        plans:           {value: plans},
        subscriptions:   {value: subscriptions}
    });
}
