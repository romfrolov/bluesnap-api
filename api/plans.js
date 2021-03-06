/**
 * Plans API.
 *
 * @module api/plans
 */

'use strict';

const Error = require('../lib/error');

module.exports = Plans;

function Plans(parent) {
    if (!new.target) {
        return new Plans(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Plans.prototype.create = function create(plan) {
    if (!plan) { throw Error('plan is missing'); }

    const path = '/services/2/recurring/plans';

    return this.http.post(path, plan);
};

Plans.prototype.update = function update(planId, plan) {
    if (!planId) { throw Error('planId is missing'); }
    if (!plan)   { throw Error('plan is missing');   }

    const path = `/services/2/recurring/plans/${planId}`;

    return this.http.put(path, plan);
};

Plans.prototype.get = function get(planId) {
    if (!planId) { throw Error('planId is missing'); }

    const path = `/services/2/recurring/plans/${planId}`;

    return this.http.get(path);
};

Plans.prototype.list = function list(params) {
    const path = '/services/2/recurring/plans';

    return this.http.get(path, params);
};
