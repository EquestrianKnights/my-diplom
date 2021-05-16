type Tester struct {
	Mongo      *wrappers.MongoWrapper
	Clickhouse *wrappers.ClickhouseWrapper
	Redis      *wrappers.RedisWrapper
	Rabbit     *wrappers.RabbitWrapper

	Regex regexField

	TestName string
	TestFunc func(*Tester)

	failMutex sync.Mutex
	isFailed  bool

	finishMutex sync.Mutex
	isFinished  bool
}
