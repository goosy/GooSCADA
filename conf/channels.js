// 本配置文件用于解析从TCP协议传送过来的二进制数据，具体解析类为Goonode
// 可以设置多个通道，每个通道对应一个TCP连接传送过来的数据，数据帧为2进制数据串
export let channels = [
	{ //通道 0 开始 指示2进制数据串各个字节及位的意义
		"name":"gb_goosyds", // 通道1 名称
		"host":"home.goosy.org", // 通道 1 地址
		"port":2000, // 通道 1 端口
		"tags":[ //分别定义各个变量在数据串中的位置和意义
			{ // 变量nodeID
				"name": "nodeID",
				"type": "int16",
				"offset": 0, //数据串字节偏移量
				"bit_offset": 0, //该字节下位偏移量
				"length": 2, //字节数
			}, 
			{ // workOK
				"name": "workOK",
				"type": "bool",
				"offset": 2, //数据串偏移量
				"bit_offset": 0, //该字节下位偏移量
				"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
			}, 
			{ // 
				"name": "commOK",
				"type": "bool",
				"offset": 2, //数据串偏移量
				"bit_offset": 1, //该字节下位偏移量
				"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
			}, 
			{ // 
				"name": "pump_run_1",
				"type": "bool",
				"offset": 2, //数据串偏移量
				"bit_offset": 2, //该字节下位偏移量
				"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
			}, 
			{ // 
				"name": "pump_run_2",
				"type": "bool",
				"offset": 2, //数据串偏移量
				"bit_offset": 3, //该字节下位偏移量
				"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
			}, 
			{ // 
				"name": "pump_run_3",
				"type": "bool",
				"offset": 2, //数据串偏移量
				"bit_offset": 4, //该字节下位偏移量
				"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
			}, 
			{ // 
				"name": "pump_run_4",
				"type": "bool",
				"offset": 2, //数据串偏移量
				"bit_offset": 5, //该字节下位偏移量
				"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
			}, 
			{ // 
				"name": "pump_run_5",
				"type": "bool",
				"offset": 2, //数据串偏移量
				"bit_offset": 6, //该字节下位偏移量
				"length": 0.125, //字节数 当为bool量时（即1位），本属性可忽略
			}, 
			{ // 变量 temperature
				"name": "temperature",
				"type": "real",
				"offset": 12, //数据串字节偏移量
				"bit_offset": 0, //该字节下位偏移量
				"length": 4, //字节数
			}, 
			{ // 变量 pressure
				"name": "pressure",
				"type": "real",
				"offset": 16, //数据串字节偏移量
				"bit_offset": 0, //该字节下位偏移量
				"length": 4, //字节数
			}, 
			{ // 变量 flow
				"name": "flow",
				"type": "real",
				"offset": 20, //数据串字节偏移量
				"bit_offset": 0, //该字节下位偏移量
				"length": 4, //字节数
			}, 
		],
	}, //通道 0 结束
]