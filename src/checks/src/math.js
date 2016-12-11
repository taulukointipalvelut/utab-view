"use strict";
var seedrandom = require('seedrandom')

function sum(list) {//TESTED//
    return list.reduce((a, b) => a + b, 0)
}

function average(list) {//TESTED//
    return list.length === 0 ? 0 : sum(list)/list.length
}

function sd(list) {//TESTED//
    var avr = average(list)
    return Math.sqrt(average(list.map(x => Math.pow(x - avr, 2))))
}

function count(list, e) {//TESTED//
    return list.filter(l => e === l).length
}

function count_common(list1, list2) {//TESTED//
    return sum(list1.map(e1 => count(list2, e1)))
}

function adjusted_sum(list) {//TESTED//
    return sum(list.filter(x => x !== null))
}

function adjusted_average(list) {//TESTED//
    return average(list.filter(x => x !== null))
}

function adjusted_sd(list) {//TESTED//
    return sd(list.filter(x => x !== null))
}

function isin(e, list) {
    for (var l of list) {
        if (l === e) {
            return true
        }
    }
    return false
}

function subset(list0, list1) {
    for (var e of list0) {
        if (!isin(e, list1)) {
            return false
        }
    }
    return true
}

function rand(seed) {
    var rng = seedrandom(seed)
    return rng()
}

function shuffle (list, seed) {
    var array = [].concat(list)
    var n = array.length
    var t
    var i

    while (n) {
        i = Math.floor(rand(seed) * n--)
        t = array[n]
        array[n] = array[i]
        array[i] = t
    }
    return array
}

function permutator(inputArr) {//TESTED//
    var results = [];

    function permute(arr, memo) {
        var cur, memo = memo || []

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1)
            if (arr.length === 0) {
                results.push(memo.concat(cur))
            }
            permute(arr.slice(), memo.concat(cur))
            arr.splice(i, 0, cur[0])
        }

        return results
    }

    return permute(inputArr)
}

function set_minus(list1, list2) {
    var new_list = []
    for (var e of list1) {
        if (!isin(e, list2)) {
            new_list.push(e)
        }
    }
    return new_list
}

function combinations(list, r) {//TESTED//
    var n = list.length
    r = r ? r : n
    var new_list
    var head
    var temp

	if (r > n || r <= 0) {
		return []
	} else if (r == n) {
		return [list]
	} else if (r == 1) {
		new_list = []
		for (var i = 0; i < n; i++) {
			new_list.push([list[i]])
		}
		return new_list
	}

	new_list = []
	for (var i = 0; i < n - r + 1; i++) {
		head = list.slice(i, i + 1)
		temp = combinations(list.slice(i + 1), r - 1)
		for (var j = 0; j < temp.length; j++) {
			new_list.push(head.concat(temp[j]))
		}
	}
	return new_list
}

//console.log(combinations([1, 2, 3], 4))
//console.log(set_minus([1, 2, 3], [2, 3, 4]))
//console.log(permutator(['a', 'b']))

exports.sum = sum
exports.average = average
exports.sd = sd
exports.count = count
exports.count_common = count_common
exports.adjusted_sum = adjusted_sum
exports.adjusted_average = adjusted_average
exports.adjusted_sd = adjusted_sd
exports.subset = subset
exports.isin = isin
exports.shuffle = shuffle
exports.permutator = permutator
exports.set_minus = set_minus
exports.combinations = combinations
