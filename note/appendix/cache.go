// Cache - stores balances in RAM
type Cache struct {
	// maps user ID to balance
	balances map[int64]models.Balance

	actionsHistory map[int64][]NumberedAction

	idCounter map[int64]uint64
}

// Initialize - inits cache
func (cache *Cache) Initialize() {
	cache.balances = make(map[int64]models.Balance)
	cache.actionsHistory = make(map[int64][]NumberedAction)
	cache.idCounter = make(map[int64]uint64)
}
