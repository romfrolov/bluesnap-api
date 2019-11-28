# BlueSnap API Wrapper (Node.js)

[![npm version](https://badge.fury.io/js/bluesnap-api.svg)](https://badge.fury.io/js/bluesnap-api) [![install size](https://packagephobia.now.sh/badge?p=bluesnap-api)](https://packagephobia.now.sh/result?p=bluesnap-api)

This wrapper library gives access to the API of the global payment gateway - BlueSnap.

## Quick start

```bash
npm install bluesnap-api
```

```js
const BlueSnap = require('bluesnap-api');

(async () => {

    // Initialize BlueSnap gateway.
    const bsg = BlueSnap({username: 'myusername', password: 'mypassword'});

    // Create vendor.
    const vendorId = await bsg.vendors.create({email: 'vendor@example.com', country: 'RU'});

    console.log('Vendor ID:', vendorId); // Vendor ID: 19575974

})();
```

Constructor accepts one parameter - configuration object with following properties:
- `username` {String} - username to use for authorization (from API Credentials).
- `password` {String} - password to use for authorization (from API Credentials).
- `isSandbox` {Boolean} (optional) - whether to use Sandbox or Production environment. Default: `true`.
- `version` {String} (optional) - BlueSnap API version to use.

## API

### Transactions (incl. Refunds)

#### transactions

- `authCapture` - authorize and capture transaction.
- `authOnly` - only authorize transaction.
- `capture` - capture authorized transaction.
- `authReversal` - reversed authorized uncaptured transaction.
- `get` - retrieve transaction.
- `refund` - partially/fully refund captured transaction.

### Vaulted Shoppers

#### vaultedShoppers

- `create` - create vaulted shopper.
- `update` - update vaulted shopper.
- `get` - retrieve vaulted shopper.

### Subscriptions

#### plans

- `create` - create subscription billing plan.
- `update` - update subscription billing plan.
- `get` - retrieve subscription billing plan.
- `list` - list all subscription billing plans.

#### subscriptions

- `create` - create subscription.
- `update` - update subscription.
- `createMerchantManaged` - create merchant-managed subscription.
- `createMerchantManagedCharge` - charge merchant-managed subscription.
- `get` - retrieve subscription.
- `list` - list subscriptions.
- `getCharge` - retrieve a specific charge.
- `listCharges` - list all charges.
- `getSwitchChargeAmount` - retrieve the amount that would be charged to a shopper if you changed the subscription to a different plan or to a different quantity or both.

### Marketplace

#### vendors

- `create` - create vendor.
- `update` - update vendor.
- `get` - retrieve vendor.
- `list` - list all vendors.

### Wallets

#### wallets

- `create` - create wallet.
- `get` - retrieve wallet.
- `visaCheckoutApiKey` - create/retrieve Visa Checkout API key.
- `onboardApplePay` - onboard Apple Pay.
- `getApplePayOnboardingInfo` - retrieve Apple Pay onboarding info.

### Reporting

#### reports

- `get` - retrieve report data.

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
