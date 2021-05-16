// OrderContainer - part of matching algorithm
type OrderContainer struct {
	// maps prices to list of orders
	prices map[uint64][]int64
	// maps order ID to order
	orders map[int64]models.Order
	// set to search similar orders
	priceSet *treeset.Set
}

// Initialize - init matching struct
func (container *OrderContainer) Initialize(comparator utils.Comparator) {
	container.prices = make(map[uint64][]int64)
	container.orders = make(map[int64]models.Order)
	container.priceSet = treeset.NewWith(comparator)
}
