// Simple/Faster version of utab in javascript with new matching algorithm
// Designed to help utab-view
// The usage is at the bottom of this sourcecode

// Expected round num is 1 ~ 6

var Team = function (team_id, institution_ids) {
    this.team_id = team_id
    this.institution_ids = institution_ids
    this.past_sides = []
    this.wins = []
    this.scores = []
    this.margins = []
    this.past_opponent_ids = []
}

Team.prototype.set_result = function (side, win, score, margin, opponent_id) {
    this.past_sides.push(side)
    this.wins.push(win)
    this.scores.push(score)
    this.margins.push(margin)
    this.past_opponent_ids.push(opponent_id)
}

Team.prototype.one_sided = function () {
    return this.past_sides.filter(side => side === "gov").length - this.past_sides.filter(side => side === "opp").length
}

function basic_functions() {
    Array.prototype.sum = function () {
        if (this.length === 0) {
            return 0
        } else {
            return this.reduce((a, b) => a + b)
        }
    }

    Array.prototype.adjusted_average = function () {
        var sum = this.sum()
        if (this.length == 0) {
            return 0
        } else {
            return sum/this.length
        }
    }
}

function get_team_by_id(teams, team_id) {
    for (team of teams) {
        if (team.team_id === team_id) return team
    };
    throw new Error("could no find team_id:" + team_id)
}

function compare_by_x(a, b, f, tf=true) {
    var point_a = f(a)
    var point_b = f(b)
    if (point_a > point_b) {
        return tf ? -1 : 1
    } else if (point_a < point_b) {
        return tf ? 1 : -1
    } else {
        return 0
    }
}

function compare_by_score(a, b) {
    var v_compare_by_win = compare_by_x(a, b, x => x.wins.sum())
    if (v_compare_by_win === 0) {
        var v_compare_by_score = compare_by_x(a, b, x => x.scores.adjusted_average())
        if (v_compare_by_score === 0) {
            var v_compare_by_margin = compare_by_x(a, b, x => x.margins.adjusted_average())
            return v_compare_by_margin >= 0 ? -1 : 1
        } else {
            return v_compare_by_score
        }
    } else {
        return v_compare_by_win
    }
};

function sort_teams(teams) {
    return teams.sort(compare_by_score)
}

function process_result(teams, results) {
    for (result of results) {
        var team1 = get_team_by_id(teams, result.team1.team_id)
        var team2 = get_team_by_id(teams, result.team2.team_id)
        var margin = result.team1.score - result.team2.score
        team1.set_result(result.team1.side, result.team1.win, result.team1.score, margin, result.team2.team_id)
        team2.set_result(result.team2.side, result.team2.win, result.team2.score, -margin, result.team1.team_id)
    }
}

function filter_by_side(team, a, b) {
    var a_fit = (a.one_sided() * team.one_sided() < 0)
    var b_fit = (b.one_sided() * team.one_sided() < 0)

    if (a_fit & !b_fit) {
        return -1
    } else if (b_fit & !a_fit) {
        return 1
    } else {
        return 0
    }
}

function filter_by_strength(team, a, b) {
    var a_win_diff = Math.abs(team.wins.sum() - a.wins.sum())
    var b_win_diff = Math.abs(team.wins.sum() - b.wins.sum())
    if (a_win_diff > b_win_diff) {
        return 1
    } else if (a_win_diff < b_win_diff) {
        return -1
    } else {
        var a_score_diff = Math.abs(team.scores.adjusted_average() - a.scores.adjusted_average)
        var b_score_diff = Math.abs(team.scores.adjusted_average() - b.scores.adjusted_average)
        if (a_score_diff > b_score_diff) {
            return 1
        } else if (a_score_diff < b_score_diff) {
            return -1
        } else {
            return 0
        }
    }
}

function filter_by_institution(team, a, b) {
    var a_insti = team.institution_ids.filter(i => i === a.team_id).length
    var b_insti = team.institution_ids.filter(i => i === b.team_id).length
    if (a_insti < b_insti) {
        return -1
    } else if (a_insti > b_insti) {
        return 1
    } else {
        return 0
    }
}

function filter_by_past_opponent(team, a, b) {
    a_past = team.past_opponent_ids.filter(opp_id => opp_id === a.team_id).length
    b_past = team.past_opponent_ids.filter(opp_id => opp_id === b.team_id).length
    if (a_past > b_past) {
        return 1
    } else if (a_past < b_past) {
        return -1
    } else {
        return 0
    }
}

function get_ranks(teams, filter_functions) {
    /* priority
    1. side
    2. strength
    3. institution
    4. past_opponent
    */
    var ranks = {}
    function sort_teams(team) {
        function _(a, b) {
            for (func of filter_functions) {
                var c = func(team, a, b)
                if (c !== 0) {
                    return c
                }
            }
            return a.team_id > b.team_id ? -1 : 1
        }
        return _
    }

    for (team of teams) {
        others = teams.filter(other => team.team_id != other.team_id)
        others.sort(sort_teams(team))
        ranks[team.team_id] = others.map(x => x.team_id)
    }
    return ranks
}

function match(teams, ranks) { // modified gale shapley algorithm
    var matching = {}
    var rank_pointers = {}
    for (team of teams) {
        matching[team.team_id] = null
        rank_pointers[team.team_id] = 0
    }
    var remaining = [].concat(teams.map(team => team.team_id))
    while (remaining.length > 1) {
        ap_id = remaining[0]
        for (op_id of ranks[ap_id]) {
            if (matching[op_id] === null | ranks[op_id].indexOf(matching[op_id]) > ranks[op_id].indexOf(ap_id)) {
                if (matching[op_id] !== null) {
                    rank_pointers[matching[op_id]] += 1
                    matching[matching[op_id]] = null
                }
                matching[ap_id] = op_id
                matching[op_id] = ap_id
                break
            } else {
                rank_pointers[ap_id] += 1
            }
        }
        remaining = teams.filter(x => matching[x.team_id] === null).map(x => x.team_id)
    }
    return matching
}

function get_matchup(teams, filter_functions = [filter_by_strength, filter_by_side, filter_by_institution, filter_by_past_opponent]) {
    sorted_teams = sort_teams(teams)
    var ranks = get_ranks(teams, filter_functions)
    matching = match(teams, ranks)
    var matchup = []
    var remaining = [].concat(sorted_teams)
    for (key in matching) {
        team_a = get_team_by_id(teams, parseInt(key))
        team_b = get_team_by_id(teams, matching[key])
        if (remaining.filter(x => x === team_a).length === 0) {
            continue
        }
        if (team_a.one_sided() > 0) {
            if (team_b.one_sided() < team_a.one_sided()) {
                matchup.push({team1: team_b.team_id, team2: team_a.team_id})
            } else {
                matchup.push({team1: team_a.team_id, team2: team_b.team_id})
            }
        } else if (team_a.one_sided() < 0) {
            if (team_b.one_sided() > team_a.one_sided()) {
                matchup.push({team1: team_a.team_id, team2: team_b.team_id})
            } else {
                matchup.push({team1: team_b.team_id, team2: team_a.team_id})
            }
        } else {
            if (team_b.one_sided() > 0) {
                matchup.push({team1: team_a.team_id, team2: team_b.team_id})
            } else if (team_b.one_sided() < 0) {
                matchup.push({team1: team_b.team_id, team2: team_a.team_id})
            } else {
                var i = Math.floor(Math.random()*2)
                ids = [team_a.team_id, team_b.team_id]
                matchup.push({team1: ids[i], team2: ids[1 - i]})
            }
        }
        remaining = remaining.filter(x => x !== team_a & x !== team_b)
    }
    return matchup
}

function check_teams(teams) {
    if (teams.length % 2 === 1) {
        throw new Error("the number of teams should be odd")
    }

    console.log(teams.length)
    for (var i = 0; i < teams.length; i++) {
        for (var j = i + 1; j < teams.length; j++) {
            if (teams[i].team_id === teams[j].team_id) {
                throw new Error("same team exists")
            }
        }
    }
}
//check_teams([{team_id: 1}, {team_id: 2}, {team_id: 3}])
//check_teams([{team_id: 1}, {team_id: 1}])

basic_functions()


/*

Example

*/

function generate_results(matchup) {
    var results = []

    for (pair of matchup) {
        team1_score = Math.floor(210 + Math.floor(Math.random()*24))
        team2_score = Math.floor(210 + Math.floor(Math.random()*24))
        team1_win = team1_score > team2_score ? 1 : 0
        results.push({
            team1: {
                team_id: pair.team1,
                win: team1_win,
                score: team1_score,
                side: "gov"
            },
            team2: {
                team_id: pair.team2,
                win: 1 - team1_win,
                score: team2_score,
                side: "opp"
            }
        })
    }
    return results
}

function example(n, rounds=4) {
    var teams = []
    for (var i = 0; i < n; i++) {
        teams.push(new Team(i, [i%4]))
    }

    for (var r = 0; r < rounds; r++) {
        var matchup = get_matchup(teams, [filter_by_strength, filter_by_side, filter_by_institution, filter_by_past_opponent])
        console.log(matchup)

        var results = generate_results(matchup)

        process_result(teams, results)
        console.log(teams)
    }

}

example(50)
