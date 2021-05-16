// Restorer - restores active orders from database
type Restorer struct {
	Accesser *MongoAccesser
}

// GetOrders - returns non-closed orders for buying/selling
func (r Restorer) GetOrders(isBuy bool) (openedOrders []models.Order, err error) {
	collection := r.Accesser.client.Database(r.Accesser.Database).Collection(r.Accesser.Table)

	filter := bson.M{"$and": bson.A{
		bson.M{"is_closed": bson.M{"$eq": false}},
		bson.M{"is_purchase": bson.M{"$eq": isBuy}},
	}}

	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}

	var dbOrders []models.DatabaseOrder
	if err = cursor.All(context.Background(), &dbOrders); err != nil {
		return nil, err
	}

	openedOrders = make([]models.Order, len(dbOrders))
	for i, o := range dbOrders {
		openedOrders[i] = *o.Convert()
	}

	return
}
