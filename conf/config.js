export let vplc = {
	"host":"127.0.0.1", //S7服务地址
	"areas":[// 可以设置多个数据区
		{ //数据区 1 开始
			"type":"DB", // DB块
			"DBNO":8, // DB块号
			"length":50, // DB块长度
			"tags":[ //分别定义各个变量在数据块中的位置
				{ // 变量nodeID
					"name": "nodeID",
					"type": "int16",
					"offset": 0, //数据串字节偏移量
					"bit_offset": 0, //该字节下位偏移量
					"length": 2, //字节数
					"value" : 0, //初始值
				}, 
				{ // workOK
					"name": "workOK",
					"type": "bool",
					"offset": 2, //数据串偏移量
					"bit_offset": 0, //该字节下位偏移量
					"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
					"value" : false, //初始值
				}, 
				{ // 
					"name": "commOK",
					"type": "bool",
					"offset": 2, //数据串偏移量
					"bit_offset": 1, //该字节下位偏移量
					"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
					"value" : false, //初始值
				}, 
				{ // 
					"name": "pump_run_1",
					"type": "bool",
					"offset": 2, //数据串偏移量
					"bit_offset": 2, //该字节下位偏移量
					"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
					"value" : false, //初始值
				}, 
				{ // 
					"name": "pump_run_2",
					"type": "bool",
					"offset": 2, //数据串偏移量
					"bit_offset": 3, //该字节下位偏移量
					"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
					"value" : false, //初始值
				}, 
				{ // 
					"name": "pump_run_3",
					"type": "bool",
					"offset": 2, //数据串偏移量
					"bit_offset": 4, //该字节下位偏移量
					"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
					"value" : false, //初始值
				}, 
				{ // 
					"name": "pump_run_4",
					"type": "bool",
					"offset": 2, //数据串偏移量
					"bit_offset": 5, //该字节下位偏移量
					"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
					"value" : false, //初始值
				}, 
				{ // 
					"name": "pump_run_5",
					"type": "bool",
					"offset": 2, //数据串偏移量
					"bit_offset": 6, //该字节下位偏移量
					"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
					"value" : false, //初始值
				}, 
				{ // 变量 temperature
					"name": "temperature",
					"type": "real",
					"offset": 12, //数据串字节偏移量
					"bit_offset": 0, //该字节下位偏移量
					"length": 4, //字节数
					"value" : 0.0, //初始值
				}, 
				{ // 变量 pressure
					"name": "pressure",
					"type": "real",
					"offset": 16, //数据串字节偏移量
					"bit_offset": 0, //该字节下位偏移量
					"length": 4, //字节数
					"value" : 0.0, //初始值
				}, 
				{ // 变量 flow
					"name": "flow",
					"type": "real",
					"offset": 20, //数据串字节偏移量
					"bit_offset": 0, //该字节下位偏移量
					"length": 4, //字节数
					"value" : 0.0, //初始值
				}, 
			],
		}, //数据区 1 完成
	]
};