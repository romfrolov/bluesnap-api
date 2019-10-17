'use strict';

const BlueSnap = require('../../lib/bluesnap-api');

const config = {
    username: 'test',
    password: 'password'
};

describe('Marketplace API', () => {
    let bsg;

    it('initialize the gateway', () => {
        bsg = BlueSnap(config);

        console.log('BlueSnap Gateway properties:', Object.getOwnPropertyNames(bsg));
    });
});
