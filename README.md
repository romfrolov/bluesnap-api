# BlueSnap API Wrapper (Node.js)

![](https://github.com/romfrolov/bluesnap-api-node/workflows/build/badge.svg) [![npm version](https://badge.fury.io/js/bluesnap-api.svg)](https://badge.fury.io/js/bluesnap-api) [![Coverage Status](https://coveralls.io/repos/github/romfrolov/bluesnap-api-node/badge.svg?branch=master)](https://coveralls.io/github/romfrolov/bluesnap-api-node?branch=master)

This wrapper library gives access to the API of the global payment gateway - BlueSnap.

## Quick start

```bash
npm install bluesnap-api
```

```js
const BlueSnap = require('bluesnap-api');

(async () => {

    // Initialize BlueSnap Gateway client.
    const bsg = BlueSnap({username: 'myusername', password: 'mypassword'});

    // Create vendor.
    const vendorId = await bsg.vendors.create({email: 'vendor@example.com', country: 'RU'});

    console.log('Vendor ID:', vendorId); // Vendor ID: 19575974

})();
```

## API

### Transactions (inc. Refunds)

#### transactions

TBD

### Vaulted Shoppers

#### vaultedShoppers

TBD

### Subscriptions

#### plans

TBD

#### subscriptions

TBD

### Marketplace

#### vendors

TBD

### Wallets

#### wallets

TBD

## Documentation

```bash
npm run docs      # generate docs
npm run http-docs # start HTTP server serving docs
```

## Testing

```bash
npm test
```

## License

[MIT](./LICENSE)
