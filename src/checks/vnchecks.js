"use strict"
var sys = require('./src/sys.js')
var tools = require('./src/tools.js')
var math = require('./src/math.js')
var vnerrors = require('./errors/vnerrors.js')

function error_available(square, venues, r) {
    var errors = []
    if (!tools.find_and_access_detail(venues, square.venue, r).available) {
        errors.push(new vnerrors.ErrorUnavailable(square.venue))
    }
    return errors
}

function check (allocation, venues, r) {//FOR NA
    var new_allocation = sys.allocation_deepcopy(allocation)
    for (var square of new_allocation) {
        var functions = [error_available]
        for (var func of functions) {
            square.warnings = square.warnings.concat(func(square, venues, r))
        }
    }
    return new_allocation
}

exports.check = check

//console.log(checks([{venue: 1}], [{id: 1, available: false}]))
