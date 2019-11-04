/**
 * Reports API.
 *
 * @module api/reports
 */

'use strict';

module.exports = Reports;

function Reports(parent) {
    if (!new.target) {
        return new Reports(parent);
    }

    Object.defineProperty(this, 'http', {value: parent.http});
}

Reports.prototype.get = function get(reportCode, params) {
    const path = `/services/2/report/${reportCode}`;

    return this.http.get(path, params);
};
