export const plc_config_JSON = {
	"host": "127.0.0.1", //S7服务地址
	"areas": [ // 可以设置多个数据区
		{ //数据区 1 开始
			"name": "nodeGD8",
			"type": "DB", // DB块
			"DBNO": 8, // DB块号
			"bytes": 50, // DB块长度
			"tags": [ //分别定义各个变量在数据块中的位置
				{ // 变量nodeID
					"name": "nodeID",
					"type": "INT",
					"value": 8078, //初始值
				},
				{ // workOK
					"name": "workOK",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // commOK
					"name": "commOK",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // pump_run_1
					"name": "pump_run_1",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // pump_run_2
					"name": "pump_run_2",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // pump_run_3
					"name": "pump_run_3",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // 
					"name": "pump_run_4",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // pump_run_5
					"name": "pump_run_5",
					"type": "BOOL",
					"value": false, //初始值
				},
				{
					"name": "datetime",
					"type": "DT",
					"value": "DT#2021-6-30-0:0:0.0", //初始值					
				},
				{ // 变量 temperature
					"name": "temperature",
					"type": "REAL",
					"value": 0.0, //初始值
				},
				{ // 变量 pressure
					"name": "pressure",
					"type": "REAL",
					"value": 0.0, //初始值
				},
				{ // 变量 flow
					"name": "flow",
					"type": "REAL",
					"value": 0.0, //初始值
				},
			],
		}, //数据区 1 完成

		{ //数据区 2 开始
			"name": "commands_GD8",
			"type": "DB", // DB块
			"DBNO": 10, // DB块号
			"bytes": 50, // DB块长度
			"tags": [ //分别定义各个变量在数据块中的位置
				{ // 变量nodeID
					"name": "nodeID",
					"type": "INT",
					"value": 8078, //初始值
				},
				{ // stopPumps
					"name": "stopPumps",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // stopHeaters
					"name": "stopHeaters",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // warning
					"name": "warning",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // resetWarning
					"name": "resetWarning",
					"type": "BOOL",
					"value": false, //初始值
				},
				{ // reserve
					"name": "reserve",
					"type": "ARRAY",
					"element": {
						type: "BYTE",
						length: 46,
					}, //初始值
				},
			],
		}, //数据区 2 完成

	]
};
