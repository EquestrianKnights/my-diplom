// Order - representation of order
type Order struct {
	ID           int64  `bson:"_id"`           // order id
	UserID       int64  `bson:"user_id"`       // user id
	Value        uint64 `bson:"value"`         // to purchase if isPurchase is true, for sale if isPurchase is false
	Price        uint64 `bson:"price"`         // price for value
	IsPurchase   bool   `bson:"is_purchase"`   // if true, then Value is for purchasing
	InitialValue uint64 `bson:"initial_value"` // used to store initial value of order
	IsClosed     bool   `bson:"is_closed"`     // if true, then the order is closed
}

// DatabaseOrder - representation of order in database
type DatabaseOrder struct {
	ID           int64  `bson:"_id"`           // order id
	UserID       int64  `bson:"user_id"`       // user id
	Value        string `bson:"value"`         // to purchase if isPurchase is true, for sale if isPurchase is false
	Price        string `bson:"price"`         // price for value
	IsPurchase   bool   `bson:"is_purchase"`   // if true, then Value is for purchasing
	InitialValue string `bson:"initial_value"` // used to store initial value of order
	IsClosed     bool   `bson:"is_closed"`     // if true, then the order is closed
}
