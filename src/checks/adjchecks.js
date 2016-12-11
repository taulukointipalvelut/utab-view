"use strict"
var sys = require('./src/sys.js')
var tools = require('./src/tools.js')
var math = require('./src/math.js')
var adjerrors = require('./errors/adjerrors.js')

function error_available(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, role, position, r) {
    var errors = []
    for (var id of square[role]) {
        if (!tools.find_and_access_detail(adjudicators, id, r).available) {
            errors.push(new adjerrors.ErrorUnavailable(id))
        }
    }
    return errors
}

function warn_strength(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, role, position, r) {
    var warnings = []
    var average_team_ranking = math.average(square.teams.map(id => sys.find_one(compiled_team_results, id).ranking))
    for (var id of square[role]) {
        var adjudicator_ranking = sys.find_one(compiled_adjudicator_results, id).ranking
        if (Math.abs(average_team_ranking - adjudicator_ranking) > 2) {
            warnings.push(new adjerrors.WarnStrength(id, adjudicator_ranking, average_team_ranking))
        }
    }
    return warnings
}

function warn_institution(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, role, position, r) {
    var warnings = []
    var team_institutions = Array.prototype.concat.apply([], square.teams.map(id => tools.find_and_access_detail(teams, id, r).institutions))//flatten

    for (var id of square[role]) {
        var adjudicator_institutions = tools.find_and_access_detail(adjudicators, id, r).institutions
        if (math.count_common(team_institutions, adjudicator_institutions) !== 0) {
            warnings.push(new adjerrors.WarnInstitution(id, adjudicator_institutions, team_institutions))
        }
    }

    return warnings
}

function warn_conflict(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, role, position, r) {
    var warnings = []

    for (let id of square[role]) {
        var adjudicator_conflicts = tools.find_and_access_detail(adjudicators, id, r).conflicts//flatten

        if (math.count_common(square.teams, adjudicator_conflicts) !== 0) {
            warnings.push(new adjerrors.WarnConflict(id, adjudicator_conflicts, square.teams))
        }
    }

    return warnings
}

function warn_past(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, role, position, r) {
    var warnings = []

    for (var id of square[role]) {
        var judged_teams = sys.find_one(compiled_adjudicator_results, id).judged_teams
        if (math.count_common(square.teams, judged_teams) !== 0) {
            warnings.push(new adjerrors.AlreadyJudged(id, judged_teams, square.teams))
        }
    }
    return warnings
}

function warn_bubble(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, role, position, r) {
    var warnings = []

    undefined

    return warnings
}

function warn_num(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, role, position, r) {
    var warnings = []

    if (square[role].length === 0 && position === 'chair') {
        warnings.push(new adjerrors.NoChair)
    }
    if (square[role].length % 2 === 0 && square[role].length > 0) {
        warnings.push(new adjerrors.OddAdjudicators(position))
    }

    return warnings
}

function check (allocation, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, r) {//FOR NA
    var new_allocation = sys.allocation_deepcopy(allocation)
    for (var square of new_allocation) {
        var functions = [error_available, warn_past, warn_strength, warn_institution, warn_conflict, warn_bubble, warn_num]
        for (var func of functions) {
            square.warnings = square.warnings.concat(func(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, "chairs", 'chair', r))
            square.warnings = square.warnings.concat(func(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, "panels", 'panel', r))
            square.warnings = square.warnings.concat(func(square, adjudicators, teams, compiled_team_results, compiled_adjudicator_results, "trainees", 'trainee', r))
        }
    }
    return new_allocation
}

exports.check = check

/*
var allocation = [
    {
        teams: [0, 1],
        chairs: [1]
    },
    {
        teams: [2, 3],
        chairs: [2]
    }
]
var compiled_team_results = {
    0: {
        win: 2,
        past_opponents: [1],
        past_sides: ['gov'],
        ranking: 1,
    },
    1: {
        win: 2,
        past_opponents: [0],
        past_sides: ['opp'],
        ranking: 2,
    },
    2: {
        win: 1,
        past_opponents: [1],
        past_sides: ['opp'],
        ranking: 3,
    },
    3: {
        win: 0,
        past_opponents: [1],
        past_sides: ['gov'],
        ranking: 4,
    },
}
var compiled_adjudicator_results = {
    1: {
        judged_teams: [0],
        ranking: 1
    },
    2: {
        id: 2,
        judged_teams: [1],
        ranking: 9
    },
}
var adjudicators_to_institutions = {
    1: [1, 2],
    2: [4]
}
var adjudicators_to_conflicts = {
    1: [1, 2],
    2: []
}
var teams_to_institutions = {
    0: [2],
    1: [1],
    2: [1, 3],
    3: [2, 3]
}
console.log(checks(allocation, compiled_team_results, compiled_adjudicator_results, teams_to_institutions, adjudicators_to_institutions, adjudicators_to_conflicts))
*/
