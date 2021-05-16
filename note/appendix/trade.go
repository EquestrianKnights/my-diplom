package models

import (
	"time"
)

// Trade - model that stores in database
type Trade struct {
	ID              int64     `db:"id"`
	OrderIDBuy      int64     `db:"orderid_buy"`
	OrderIDSell     int64     `db:"orderid_sell"`
	UserIDBuy       int64     `db:"userid_buy"`
	UserIDSell      int64     `db:"userid_sell"`
	Value           uint64    `db:"value"`
	Price           uint64    `db:"price"`
	AnotherPrice    uint64    `db:"anotherprice"`
	PurchaseBenefit bool      `db:"purchasebenefit"`
	Time            time.Time `db:"time"`
}

// GetID - implementation of ModelInterface
func (trade Trade) GetID() int64 {
	return trade.ID
}
