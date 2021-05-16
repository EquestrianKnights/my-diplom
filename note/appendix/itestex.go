var tests map[string]func(*Tester) = map[string]func(*Tester){

	"multiple[08]: many buy, then one sell, sum_value(buy) = value(sell), equal price": func(t *Tester) {
		buy := []*protobuf.Order{
			&protobuf.Order{UserID: 1, Value: 1000, Price: 40, IsPurchase: true},
			&protobuf.Order{UserID: 2, Value: 2000, Price: 40, IsPurchase: true},
			&protobuf.Order{UserID: 3, Value: 3000, Price: 40, IsPurchase: true},
			&protobuf.Order{UserID: 4, Value: 4000, Price: 40, IsPurchase: true},
			&protobuf.Order{UserID: 5, Value: 5000, Price: 40, IsPurchase: true},
		}
		afterBuy := []*models.Order{
			&models.Order{UserID: buy[0].UserID, Value: 0, InitialValue: buy[0].Value,
				Price: buy[0].Price, IsPurchase: true, IsClosed: true},
			&models.Order{UserID: buy[1].UserID, Value: 0, InitialValue: buy[1].Value,
				Price: buy[1].Price, IsPurchase: true, IsClosed: true},
			&models.Order{UserID: buy[2].UserID, Value: 0, InitialValue: buy[2].Value,
				Price: buy[2].Price, IsPurchase: true, IsClosed: true},
			&models.Order{UserID: buy[3].UserID, Value: 0, InitialValue: buy[3].Value,
				Price: buy[3].Price, IsPurchase: true, IsClosed: true},
			&models.Order{UserID: buy[4].UserID, Value: 0, InitialValue: buy[4].Value,
				Price: buy[4].Price, IsPurchase: true, IsClosed: true},
		}

		sell := &protobuf.Order{UserID: 6, Value: 15000, Price: 40, IsPurchase: false}
		afterSell := &models.Order{UserID: 6, Value: 0, InitialValue: 15000, Price: 40, IsPurchase: false, IsClosed: true}

		tradesExp := []*models.Trade{
			&models.Trade{UserIDBuy: afterBuy[0].UserID, UserIDSell: afterSell.UserID,
				OrderIDBuy: 1, OrderIDSell: 6,
				Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: 1000},
			&models.Trade{UserIDBuy: afterBuy[1].UserID, UserIDSell: afterSell.UserID,
				OrderIDBuy: 2, OrderIDSell: 6,
				Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: 2000},
			&models.Trade{UserIDBuy: afterBuy[2].UserID, UserIDSell: afterSell.UserID,
				OrderIDBuy: 3, OrderIDSell: 6,
				Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: 3000},
			&models.Trade{UserIDBuy: afterBuy[3].UserID, UserIDSell: afterSell.UserID,
				OrderIDBuy: 4, OrderIDSell: 6,
				Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: 4000},
			&models.Trade{UserIDBuy: afterBuy[4].UserID, UserIDSell: afterSell.UserID,
				OrderIDBuy: 5, OrderIDSell: 6,
				Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: 5000},
		}

		firstActs := []protobuf.BalanceAction{
			protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER,
		}

		secondActs := []protobuf.BalanceAction{
			protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER,
		}

		MultipleBuyToSellMatch(t, buy, sell, afterBuy, afterSell, tradesExp, firstActs, secondActs)
	}

	"multiple[14]: many sell, then one buy, sum_value(buy) > value(sell), equal price + closing last order": func(t *Tester) {
		// same as multiple[11] with continuation
		buy := []*protobuf.Order{
			&protobuf.Order{UserID: 1, Value: 1000, Price: 40, IsPurchase: true}, &protobuf.Order{UserID: 2, Value: 2000, Price: 40, IsPurchase: true},
			&protobuf.Order{UserID: 3, Value: 3000, Price: 40, IsPurchase: true}, &protobuf.Order{UserID: 4, Value: 4000, Price: 40, IsPurchase: true},
			&protobuf.Order{UserID: 5, Value: 5000, Price: 40, IsPurchase: true},
		}

		afterBuy := []*models.Order{
			&models.Order{UserID: buy[0].UserID, Value: 0, InitialValue: buy[0].Value, Price: buy[0].Price, IsPurchase: true, IsClosed: true},
			&models.Order{UserID: buy[1].UserID, Value: 0, InitialValue: buy[1].Value, Price: buy[1].Price, IsPurchase: true, IsClosed: true},
			&models.Order{UserID: buy[2].UserID, Value: 0, InitialValue: buy[2].Value, Price: buy[2].Price, IsPurchase: true, IsClosed: true},
			&models.Order{UserID: buy[3].UserID, Value: 0, InitialValue: buy[3].Value, Price: buy[3].Price, IsPurchase: true, IsClosed: true},
			&models.Order{UserID: buy[4].UserID, Value: 0, InitialValue: buy[4].Value, Price: buy[4].Price, IsPurchase: true, IsClosed: true},
		}
		
		sell := &protobuf.Order{UserID: 6, Value: 20000, Price: 40, IsPurchase: false}
		afterSell := &models.Order{UserID: sell.UserID, Value: 5000, InitialValue: sell.Value, Price: sell.Price, IsPurchase: false, IsClosed: false}
		tradesExp := []*models.Trade{
			&models.Trade{OrderIDBuy: 1, OrderIDSell: 6, UserIDBuy: afterBuy[0].UserID, UserIDSell: afterSell.UserID, Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: buy[0].Value},
			&models.Trade{OrderIDBuy: 2, OrderIDSell: 6, UserIDBuy: afterBuy[1].UserID, UserIDSell: afterSell.UserID, Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: buy[1].Value},
			&models.Trade{OrderIDBuy: 3, OrderIDSell: 6, UserIDBuy: afterBuy[2].UserID, UserIDSell: afterSell.UserID, Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: buy[2].Value},
			&models.Trade{OrderIDBuy: 4, OrderIDSell: 6, UserIDBuy: afterBuy[3].UserID, UserIDSell: afterSell.UserID, Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: buy[3].Value},
			&models.Trade{OrderIDBuy: 5, OrderIDSell: 6, UserIDBuy: afterBuy[4].UserID, UserIDSell: afterSell.UserID, Price: 40, AnotherPrice: 40, PurchaseBenefit: false, Value: buy[4].Value},
		}

		firstActs := []protobuf.BalanceAction{
			protobuf.BalanceAction_TRANSFER, protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER, protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER
		}

		secondActs := []protobuf.BalanceAction{
			protobuf.BalanceAction_TRANSFER, protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER, protobuf.BalanceAction_TRANSFER,
			protobuf.BalanceAction_TRANSFER
		}

		MultipleBuyToSellMatch(t, buy, sell, afterBuy, afterSell, tradesExp, firstActs, secondActs)

		// continuation
		id, err := t.GetLastOrderID()
		t.HandleError(err, "Can't get last order ID")
		t.AssertEqual(int64(len(buy)+1), id, "Incorrect id of last order")

		t.CloseOrder(id)
		t.CheckMongoEvent(MongoUpdateEvent)

		closedOrder, err := t.Mongo.Client.GetByID(id)
		t.HandleError(err, fmt.Sprintf("Can't get order with ID %d", id))
		closedModelOrder := closedOrder.(*models.Order)
		afterSell.IsClosed = true
		t.CheckOrder(afterSell, closedModelOrder)

		time.Sleep(3 * time.Second)
		removedOrders := t.Redis.GetMessages(events.RemovedOrder)
		t.AssertEqual(1, len(removedOrders), "Should be one removed order")
	},
}

