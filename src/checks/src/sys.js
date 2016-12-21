"use strict";
var math = require('./math.js')

function one_sided (past_sides) {  //FOR  NA//
    return past_sides.filter(side => side === 'gov').length - past_sides.filter(side => side === 'opp').length
}

function allocation_deepcopy(allocation) {
    var new_allocation = []
    //console.log(allocation)
    for (var square of allocation) {
        var {teams: teams, chairs: chairs=[], panels: panels=[], trainees: trainees=[], venue: venue=null, id: id, warnings: warnings=[]} = square
        var new_square = {
            teams: teams,
            chairs:[].concat(chairs),
            panels: [].concat(panels),
            trainees: [].concat(trainees),
            venue: venue,
            warnings: warnings,
            id: id
        }
        new_allocation.push(new_square)
    }
    return new_allocation
}

function find_one(list, id) {
    return list.filter(e => e.id === id)[0]
}

function one_sided_bp(past_sides) {//the higher the worser
    if (past_sides.length === 0) {
        return [0, 0]
    } else {
        var opening = (math.count(past_sides, 'og') + math.count(past_sides, 'oo') - math.count(past_sides, 'cg') - math.count(past_sides, 'co'))/past_sides.length
        var gov = (math.count(past_sides, 'og') + math.count(past_sides, 'cg') - math.count(past_sides, 'oo') - math.count(past_sides, 'co'))/past_sides.length
        return [opening, gov]
    }
}

function square_one_sided_bp(past_sides_list) {//TESTED//
    var positions = ['og', 'oo', 'cg', 'co']
    var ind1 = 0
    var ind2 = 0
    for (var i = 0; i < positions.length; i++) {
        let [opening, gov] = one_sided_bp(past_sides_list[i].concat([positions[i]]))
        ind1 += Math.abs(opening)
        ind2 += Math.abs(gov)
    }
    return ind1 + ind2
}

function square_one_sided(past_sides_list) {//TESTED//
    var positions = ['gov', 'opp']
    var ind = 0
    for (var i = 0; i < positions.length; i++) {
        let g = one_sided(past_sides_list[i].concat([positions[i]]))
        ind += Math.abs(g)
    }
    return ind
}

function decide_positions(teams, compiled_team_results, config) {
    var past_sides_list = teams.map(id => find_one(compiled_team_results, id).past_sides)
    var decided_teams

    if (config.style.team_num === 2) {
        if (one_sided(past_sides_list[0]) > one_sided(past_sides_list[1])) {//if team 0 does gov more than team b
            decided_teams = [teams[1], teams[0]]//team 1 does gov in the next round
        } else if (one_sided(past_sides_list[1]) > one_sided(past_sides_list[0])) {
            decided_teams = [teams[0], teams[1]]
        } else {
            decided_teams = teams
        }
    } else if (config.style.team_num === 4) {//FOR BP
        var teams_list = math.permutator(teams)
        var vlist = teams_list.map(ids => square_one_sided_bp(ids.map(id => find_one(compiled_team_results, id).past_sides)))

        decided_teams = teams_list[vlist.indexOf(Math.min(...vlist))]
    }
    return decided_teams
}

function decide_positions_random(teams, compiled_team_results, config) {
    return math.shuffle(teams, config.name)
}


exports.one_sided = one_sided
exports.allocation_deepcopy = allocation_deepcopy
exports.find_one = find_one
exports.one_sided_bp = one_sided_bp
exports.square_one_sided_bp = square_one_sided_bp
exports.square_one_sided = square_one_sided
exports.decide_positions = decide_positions
exports.decide_positions_random = decide_positions_random
