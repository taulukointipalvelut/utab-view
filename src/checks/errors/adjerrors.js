"use strict";

class ErrorUnavailable {
    constructor(id) {
        this.code = 701
        this.id = id
        this.message = 'Unavailable adjudicator '+this.id.toString()+ ' appears'
        this.name = 'Unavailable'
    }
}

class WarnStrength {
    constructor(id, adjudicator_ranking, average_team_ranking) {
        this.code = 702
        this.id = id
        this.adjudicator_ranking = adjudicator_ranking
        this.average_team_ranking = average_team_ranking
        this.message = 'Inappropriate adjudicator '+this.id.toString()+' will judge teams : adjudicator_ranking(' + this.adjudicator_ranking.toString() + ') vs average team ranking(' + this.average_team_ranking.toString()+')'
        this.name = 'StrengthDifferent'
    }
}

class WarnInstitution {
    constructor(id, adjudicator_institutions, team_institutions) {
        this.code = 703
        this.id = id
        this.adjudicator_institutions = adjudicator_institutions
        this.team_institutions = team_institutions
        this.message = 'Institution conflict at adjudicator '+this.id.toString()+' : teams institution('+this.team_institutions.toString()+') vs adjudicator institution('+this.adjudicator_institutions.toString()+')'
        this.name = 'InstitutionConflict'
    }
}

class WarnConflict {
    constructor(id, adjudicator_conflicts, teams) {
        this.code = 704
        this.id = id
        this.adjudicator_conflicts = adjudicator_conflicts
        this.teams = teams
        this.message = 'Personal conflict at adjudicator '+this.id.toString()+' : teams('+this.teams.toString()+') vs adjudicator conflict('+this.adjudicator_conflicts.toString()+')'
        this.name = 'PersonalConflict'
    }
}

class AlreadyJudged {
    constructor(id, judged_teams, teams) {
        this.code = 705
        this.id = id
        this.judged_teams = judged_teams
        this.teams = teams
        this.message = 'Adjudicator has already judged the teams in the past : judged teams('+this.judged_teams.toString()+') vs teams('+this.teams.toString()+')'
        this.name = 'AlreadyJudged'
    }
}

class NoChair {
    constructor() {
        this.code = 706
        this.message = 'Chair does not exist'
        this.name = 'NoChair'
    }
}

class OddAdjudicators {
    constructor(position) {
        this.code = 706
        this.message = 'Odd '+position+'s'
        this.name = 'OddAdjudicators'
    }
}

exports.ErrorUnavailable = ErrorUnavailable
exports.WarnStrength = WarnStrength
exports.WarnInstitution = WarnInstitution
exports.WarnConflict = WarnConflict
exports.AlreadyJudged = AlreadyJudged
exports.NoChair = NoChair
exports.OddAdjudicators = OddAdjudicators
