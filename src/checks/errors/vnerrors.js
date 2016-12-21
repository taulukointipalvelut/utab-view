"use strict";

class ErrorUnavailable {
    constructor(id) {
        this.code = 901
        this.id = id
        this.message = 'Unavailable venue '+this.id.toString()+ ' appears'
        this.name = 'Unavailable'
    }
}

exports.ErrorUnavailable = ErrorUnavailable
