// 本文件用于定义变量结构
export let structs = [ 
	{ // 基本类型 bool
		"name":"bool",
		"length": 0.125, //字节数
		"isBit" : true,
		"value" : false, //初始值
	}, 
	{ // 基本类型 byte
		"name": "byte",
		"length": 1, //字节数
		"value" : 0x0, //初始值
	}, 
	{ // 基本类型 int16
		"name": "int16",
		"length": 2, //字节数
		"value" : 0, //初始值
	}, 
	{ // 基本类型 word
		"name": "word",
		"length": 2, //字节数
		"value" : 0x0, //初始值
	}, 
	{ // 基本类型 real
		"name": "flow",
		"type": "real",
		"length": 4, //字节数
		"value" : 0.0, //初始值
	}, 
	{ // 
		"name":"node",
		"type":"struct",
		"length": -1, // 值为-1时指示系统自动计算
		"member":[
			{ // 变量nodeID
				"name": "nodeID",
				"type": "int16",
			}, 
			{ // workOK
				"name": "workOK",
				"type": "bool",
				"value" : false, //初始值
			}, 
			{ // 
				"name": "commOK",
				"type": "bool",
				"value" : false, //初始值
			}, 
			{ // 
				"name": "pump_run_1",
				"type": "bool",
				"value" : false, //初始值
			}, 
			{ // 
				"name": "pump_run_2",
				"type": "bool",
				"value" : false, //初始值
			}, 
			{ // 
				"name": "pump_run_3",
				"type": "bool",
				"value" : false, //初始值
			}, 
			{ // 
				"name": "pump_run_4",
				"type": "bool",
				"value" : false, //初始值
			}, 
			{ // 
				"name": "pump_run_5",
				"type": "bool",
				"value" : false, //初始值
			}, 
			{ // 变量 temperature
				"name": "temperature",
				"type": "real",
				"value" : 0.0, //初始值
			}, 
			{ // 变量 pressure
				"name": "pressure",
				"type": "real",
				"value" : 0.0, //初始值
			}, 
			{ // 变量 flow
				"name": "flow",
				"type": "real",
				"value" : 0.0, //初始值
			}, 
		],
	}, 
];