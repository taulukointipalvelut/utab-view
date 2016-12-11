"use strict";

class ErrorUnavailable {
    constructor(id) {
        this.code = 601
        this.id = id
        this.message = 'Unavailable team '+this.id.toString()+ ' appears'
        this.name = 'Unavailable'
    }
}

class WarnSided {
    constructor(id, past_sides, sided='government/opposition') {
        this.code = 602
        this.id = id
        this.past_sides = past_sides
        this.sided = sided
        this.message = 'Team '+this.id.toString()+' one sided on '+this.sided+' : sides('+this.past_sides.toString()+')'
        this.name = 'OneSided'
    }
}

class WarnPastOpponent {
    constructor(id, past_opponents) {
        this.code = 603
        this.id = id
        this.past_opponents = past_opponents
        this.message = 'Team ' + this.id.toString() + ' matches against the same opponent(s) in the past'+this.past_opponents.toString()
        this.name = 'PastOpponent'
    }
}

class WarnStrength {
    constructor(wins) {
        this.code = 604
        this.wins = wins
        this.message = 'Square with different strength : win(win-points) ('+this.wins.toString()+')'
        this.name = 'DifferentStrength'
    }
}

class WarnInstitution {
    constructor(id1, id2, institutions1, institutions2) {
        this.code = 605
        this.id1 = id1
        this.id2 = id2
        this.institutions1 = institutions1
        this.institutions2 = institutions2
        this.message = 'Institution(s) is the same : team '+this.id1.toString()+' institutions('+this.institutions1.toString()+') vs team '+this.id2.toString()+' institutions('+this.institutions2.toString()+')'
        this.name = 'SameInstitution'
    }
}

exports.ErrorUnavailable = ErrorUnavailable
exports.WarnSided = WarnSided
exports.WarnPastOpponent = WarnPastOpponent
exports.WarnStrength = WarnStrength
exports.WarnInstitution = WarnInstitution
