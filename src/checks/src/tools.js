"use strict";
var errors = require('./errors.js')

function find_one(list, id) {
    return list.filter(e => e.id === id)[0]
}

function access_detail(e, r) {
    if (e.details.length === 0) {
        throw new errors.DetailNotDefined(id, r)
    }
    return e.details.filter(d => d.r === r)[0]
}

function find_and_access_detail(list, id, r) {
    let e = find_one(list, id)
    return access_detail(e, r)
}

function filter_available(list, r) {
    return list.filter(e => access_detail(e, r).available)
}

function check_detail(xs, r) {
    for (let x of xs) {
        if (x.details.filter(detail => detail.r === r).length === 0) {
            throw new errors.DetailNotDefined(x.id, r)
        }
    }
}

exports.find_one = find_one
exports.access_detail = access_detail
exports.filter_available = filter_available
exports.find_and_access_detail = find_and_access_detail
exports.check_detail = check_detail
