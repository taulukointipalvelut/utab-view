"use strict"
var sys = require('./src/sys.js')
var tools = require('./src/tools.js')
var math = require('./src/math.js')
var tmerrors = require('./errors/tmerrors.js')

function error_available(square, teams, compiled_team_results, team_num, r) {
    var errors = []
    for (var id of square.teams) {
        if (!tools.find_and_access_detail(teams, id, r).available) {
            errors.push(new tmerrors.ErrorUnavailable(id))
        }
    }
    return errors
}

function warn_side(square, teams, compiled_team_results, team_num, r) {
    var warnings = []

    var sides = team_num === 4 ? ['og', 'oo', 'cg', 'co'] : ['gov', 'opp']
    for (var i = 0; i < team_num; i++) {
        var team = square.teams[i]
        var side = sides[i]
        var team_past_sides = sys.find_one(compiled_team_results, team).past_sides
        if (team_num === 2) {
            var team_one_sided = sys.one_sided(team_past_sides.concat([side]))
            if (Math.abs(team_one_sided) > 1) {
                warnings.push(new tmerrors.WarnSided(team, team_past_sides, 'government/opposition'))
            }
        } else if (team_num === 4) {
            var [team_one_sided_opening, team_one_sided_gov] = sys.one_sided_bp(team_past_sides.concat([side]))
            if (Math.abs(team_one_sided_opening) > 1) {
                warnings.push(new tmerrors.WarnSided(team, team_past_sides, 'opening/closing'))
            }
            if (Math.abs(team_one_sided_gov) > 1) {
                warnings.push(new tmerrors.WarnSided(team, team_past_sides, 'government/opposition'))
            }
        }
    }

    return warnings
}

function warn_past_opponent(square, teams, compiled_team_results, team_num, r) {//TESTED//
    var warnings = []
    for (var team of square.teams) {
        var team_past_opponents = sys.find_one(compiled_team_results, team).past_opponents
        var other_teams = square.teams.filter(id => id !== team.id)
        var experienced = math.count_common(team_past_opponents, other_teams)
        if (experienced > 0) {
            warnings.push(new tmerrors.WarnPastOpponent(team, team_past_opponents))
        }
    }
    return warnings
}

function warn_strength(square, teams, compiled_team_results, team_num, r) {//TESTED//
    var warnings = []
    var wins = square.teams.map(id => sys.find_one(compiled_team_results, id).win)
    if (Array.from(new Set(wins)).length !== 1) {
        warnings.push(new tmerrors.WarnStrength(wins))
    }
    return warnings
}

function warn_institution(square, teams, compiled_team_results, team_num, r) {
    var warnings = []

    var cs = math.combinations(square.teams, 2)
    for (let combination of cs) {
        var team0 = combination[0]
        var team1 = combination[1]
        var team0_institutions = tools.find_and_access_detail(teams, team0, r).institutions
        var team1_institutions = tools.find_and_access_detail(teams, team1, r).institutions

        if (math.count_common(team0_institutions, team1_institutions) !== 0) {
            warnings.push(new tmerrors.WarnInstitution(team0, team1, team0_institutions, team1_institutions))
        }
    }
    return warnings
}

function check (allocation, teams, compiled_team_results, team_num, r) {
    var new_allocation = sys.allocation_deepcopy(allocation)
    for (var square of new_allocation) {
        var functions = [error_available, warn_side, warn_past_opponent, warn_strength, warn_institution]
        for (var func of functions) {
            square.warnings = square.warnings.concat(func(square, teams, compiled_team_results, team_num))
        }
    }
    return new_allocation
}

exports.check = check
/*
//insti, strength

var allocation = [{teams: [0, 1]}, {teams: [2, 3]}]
var compiled_team_results = {
    0: {
        win: 2,
        past_opponents: [1],
        past_sides: ['gov']
    },
    1: {
        win: 2,
        past_opponents: [0],
        past_sides: ['opp']
    },
    2: {
        win: 1,
        past_opponents: [1],
        past_sides: ['opp']
    },
    3: {
        win: 0,
        past_opponents: [1],
        past_sides: ['gov']
    },
}
var teams_to_institutions = {
    0: [2],
    1: [1],
    2: [1, 3],
    3: [2, 3]
}
console.log(checks(allocation, compiled_team_results, teams_to_institutions))
*/
