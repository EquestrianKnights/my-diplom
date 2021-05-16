package matching

// comparator for buy price treeset
func sellComparator(a, b interface{}) int {
	aPP := a.(uint64)
	bPP := b.(uint64)
	if aPP < bPP {
		return -1
	} else if aPP > bPP {
		return 1
	} else {
		return 0
	}
}

// comparator for sell price treeset
func buyComparator(a, b interface{}) int {
	aPP := a.(uint64)
	bPP := b.(uint64)
	if aPP < bPP {
		return 1
	} else if aPP > bPP {
		return -1
	} else {
		return 0
	}
}
