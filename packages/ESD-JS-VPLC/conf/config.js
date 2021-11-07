export const plc_config_JSON = {
	"host": "192.168.37.18", //S7 http websocket 服务主机地址
	"port": 8078, //http and ws serve port
	"description": "孤岛站孤永线出口",
	"areas": [ // 可以设置多个数据区
		{ //数据区 1 开始
			"name": "nodes",
			"type": "DB", // DB块
			"DBNO": 8, // DB块号
			"bytes": 50, // DB块长度
			"tags": [ //分别定义各个变量在数据块中的位置
				{
					"name": "nodeGD8",
					"type": "STRUCT",
					"tags": [{ // 变量nodeID
						"name": "node_ID",
						"type": "INT",
						"value": 8078, //初始值
					}, { // commOK
						"name": "comm_OK",
						"type": "BOOL",
						"value": true, //初始值
					}, { // workOK
						"name": "work_OK",
						"type": "BOOL",
						"value": true, //初始值
					}, { // pump_run
						"name": "pump_run",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_change_F
						"name": "pump_change_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_1
						"name": "pump_run_1",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_2
						"name": "pump_run_2",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_3
						"name": "pump_run_3",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_4
						"name": "pump_run_4",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_AH_F
						"name": "temperature_AH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_WH_F
						"name": "temperature_WH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_WL_F
						"name": "temperature_WL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_AL_F
						"name": "temperature_AL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_AH_F
						"name": "pressure_AH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_WH_F
						"name": "pressure_WH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_WL_F
						"name": "pressure_WL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_AL_F
						"name": "pressure_AL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, {
						"name": "datetime",
						"type": "DT",
						"value": "DT#2021-6-30-0:0:0.0", //初始值					
					}, { // 变量 temperature
						"name": "temperature",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // 变量 pressure
						"name": "pressure",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // 变量 flowmeter
						"name": "flowmeter",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // response_code
						"name": "response_code",
						"type": "INT",
						"value": 0, //初始值
					}, { // response_code_ex
						"name": "response_code_ex",
						"type": "INT",
						"value": 0, //初始值
					}, { // response_value
						"name": "response_value",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // reserve
						"name": "reserve",
						"type": "ARRAY",
						"element": { type: "BYTE" },
						"length": 18, 
					}]
				}, {
					"name": "nodeSC1",
					"type": "STRUCT",
					"tags": [{ // 变量nodeID
						"name": "nodeID",
						"type": "INT",
						"value": 8181, //初始值
					}, { // commOK
						"name": "comm_OK",
						"type": "BOOL",
						"value": true, //初始值
					}, { // workOK
						"name": "work_OK",
						"type": "BOOL",
						"value": true, //初始值
					}, { // pump_run
						"name": "pump_run",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_change_F
						"name": "pump_change_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_1
						"name": "pump_run_1",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_2
						"name": "pump_run_2",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_3
						"name": "pump_run_3",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_4
						"name": "pump_run_4",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_AH_F
						"name": "temperature_AH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_WH_F
						"name": "temperature_WH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_WL_F
						"name": "temperature_WL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_AL_F
						"name": "temperature_AL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_AH_F
						"name": "pressure_AH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_WH_F
						"name": "pressure_WH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_WL_F
						"name": "pressure_WL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_AL_F
						"name": "pressure_AL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, {
						"name": "datetime",
						"type": "DT",
						"value": "DT#2021-6-30-0:0:0.0", //初始值					
					}, { // 变量 temperature
						"name": "temperature",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // 变量 pressure
						"name": "pressure",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // 变量 flowmeter
						"name": "flowmeter",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // response_code
						"name": "response_code",
						"type": "INT",
						"value": 0, //初始值
					}, { // response_code_ex
						"name": "response_code_ex",
						"type": "INT",
						"value": 0, //初始值
					}, { // response_value
						"name": "response_value",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // reserve
						"name": "reserve",
						"type": "ARRAY",
						"element": { type: "BYTE" },
						"length": 18, 
					}]
				}, {
					"name": "nodeKX1",
					"type": "STRUCT",
					"tags": [{ // 变量nodeID
						"name": "nodeID",
						"type": "INT",
						"value": 8179, //初始值
					}, { // commOK
						"name": "comm_OK",
						"type": "BOOL",
						"value": true, //初始值
					}, { // workOK
						"name": "work_OK",
						"type": "BOOL",
						"value": true, //初始值
					}, { // pump_run
						"name": "pump_run",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_change_F
						"name": "pump_change_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_1
						"name": "pump_run_1",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_2
						"name": "pump_run_2",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_3
						"name": "pump_run_3",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_4
						"name": "pump_run_4",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_AH_F
						"name": "temperature_AH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_WH_F
						"name": "temperature_WH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_WL_F
						"name": "temperature_WL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_AL_F
						"name": "temperature_AL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_AH_F
						"name": "pressure_AH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_WH_F
						"name": "pressure_WH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_WL_F
						"name": "pressure_WL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_AL_F
						"name": "pressure_AL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, {
						"name": "datetime",
						"type": "DT",
						"value": "DT#2021-6-30-0:0:0.0", //初始值					
					}, { // 变量 temperature
						"name": "temperature",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // 变量 pressure
						"name": "pressure",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // 变量 flowmeter
						"name": "flowmeter",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // response_code
						"name": "response_code",
						"type": "INT",
						"value": 0, //初始值
					}, { // response_code_ex
						"name": "response_code_ex",
						"type": "INT",
						"value": 0, //初始值
					}, { // response_value
						"name": "response_value",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // reserve
						"name": "reserve",
						"type": "ARRAY",
						"element": { type: "BYTE" },
						"length": 18, 
					}]
				}, {
					"name": "nodeSC2",
					"type": "STRUCT",
					"tags": [{ // 变量nodeID
						"name": "nodeID",
						"type": "INT",
						"value": 8191, //初始值
					}, { // commOK
						"name": "comm_OK",
						"type": "BOOL",
						"value": true, //初始值
					}, { // workOK
						"name": "work_OK",
						"type": "BOOL",
						"value": true, //初始值
					}, { // pump_run
						"name": "pump_run",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_change_F
						"name": "pump_change_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_1
						"name": "pump_run_1",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_2
						"name": "pump_run_2",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_3
						"name": "pump_run_3",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pump_run_4
						"name": "pump_run_4",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_AH_F
						"name": "temperature_AH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_WH_F
						"name": "temperature_WH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_WL_F
						"name": "temperature_WL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // temperature_AL_F
						"name": "temperature_AL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_AH_F
						"name": "pressure_AH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_WH_F
						"name": "pressure_WH_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_WL_F
						"name": "pressure_WL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, { // pressure_AL_F
						"name": "pressure_AL_F",
						"type": "BOOL",
						"value": false, //初始值
					}, {
						"name": "datetime",
						"type": "DT",
						"value": "DT#2021-6-30-0:0:0.0", //初始值					
					}, { // 变量 temperature
						"name": "temperature",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // 变量 pressure
						"name": "pressure",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // 变量 flowmeter
						"name": "flowmeter",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // response_code
						"name": "response_code",
						"type": "INT",
						"value": 0, //初始值
					}, { // response_code_ex
						"name": "response_code_ex",
						"type": "INT",
						"value": 0, //初始值
					}, { // response_value
						"name": "response_value",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // reserve
						"name": "reserve",
						"type": "ARRAY",
						"element": { type: "BYTE" },
						"length": 18, 
					}]
				},
			],
		}, //数据区 1 完成

		{ //数据区 2 开始
			"name": "node_para",
			"type": "DB", // DB块
			"DBNO": 9, // DB块号
			"bytes": 112, // DB块长度
			"tags": [ //分别定义各个变量在数据块中的位置
				{ // temperature_zero
					"name": "temperature_zero",
					"type": "REAL",
					"value": 0, //初始值
				}, { // temperature_span
					"name": "temperature_span",
					"type": "REAL",
					"value": 100, //初始值
				}, { // temperature_AH
					"name": "temperature_AH",
					"type": "REAL",
					"value": 100, //初始值
				}, { // temperature_WH
					"name": "temperature_WH",
					"type": "REAL",
					"value": 100, //初始值
				}, { // temperature_WL
					"name": "temperature_WL",
					"type": "REAL",
					"value": 0, //初始值
				}, { // temperature_AL
					"name": "temperature_AL",
					"type": "REAL",
					"value": 0, //初始值
				}, { // temperature_DZ
					"name": "temperature_DZ",
					"type": "REAL",
					"value": 0, //初始值
				}, { // temperature_FT
					"name": "temperature_FT",
					"type": "REAL",
					"value": 0, //初始值
				}, { // pressure_zero
					"name": "pressure_zero",
					"type": "REAL",
					"value": 0, //初始值
				}, { // pressure_span
					"name": "pressure_span",
					"type": "REAL",
					"value": 4, //初始值
				}, { // pressure_AH
					"name": "pressure_AH",
					"type": "REAL",
					"value": 1, //初始值
				}, { // pressure_WH
					"name": "pressure_WH",
					"type": "REAL",
					"value": 1, //初始值
				}, { // pressure_WL
					"name": "pressure_WL",
					"type": "REAL",
					"value": 0, //初始值
				}, { // pressure_AL
					"name": "pressure_AL",
					"type": "REAL",
					"value": 0, //初始值
				}, { // pressure_DZ
					"name": "pressure_DZ",
					"type": "REAL",
					"value": 0, //初始值
				}, { // pressure_FT
					"name": "pressure_FT",
					"type": "REAL",
					"value": 0, //初始值
				}, { // flow_1
					"name": "flow_1",
					"type": "REAL",
					"value": 0, //初始值
				}, { // flow_2
					"name": "flow_2",
					"type": "REAL",
					"value": 0, //初始值
				}, { // flow_3
					"name": "flow_3",
					"type": "REAL",
					"value": 0, //初始值
				}, { // flow_4
					"name": "flow_4",
					"type": "REAL",
					"value": 0, //初始值
				}, { // flow_5
					"name": "flow_5",
					"type": "REAL",
					"value": 0, //初始值
				}, { // flow_smooth_factor
					"name": "flow_smooth_factor",
					"type": "REAL",
					"value": 0, //初始值
				}, { // equS1
					"name": "equS1",
					"type": "REAL",
					"value": 0, //初始值
				}, { // equS2
					"name": "equS2",
					"type": "REAL",
					"value": 0, //初始值
				}, { // equS3
					"name": "equS3",
					"type": "REAL",
					"value": 0, //初始值
				}, { // equS4
					"name": "equS4",
					"type": "REAL",
					"value": 0, //初始值
				}, { // equS5
					"name": "equS5",
					"type": "REAL",
					"value": 0, //初始值
				}, { // pump_change_delay
					"name": "pump_change_delay",
					"type": "REAL",
					"value": 0, //初始值
				},
			],
		}, //数据区 2 完成

		{ //数据区 3 开始
			"name": "commands_GD8",
			"type": "DB", // DB块
			"DBNO": 10, // DB块号
			"bytes": 50, // DB块长度
			"tags": [ //分别定义各个变量在数据块中的位置
				{ // 节点ID
					"name": "node_ID",
					"type": "INT",
					"value": 8078, //初始值
				}, { // 停泵命令
					"name": "stop_pumps",
					"type": "BOOL",
					"value": false,
				}, { // 保留
					"name": "stop_heaters",
					"type": "BOOL",
					"value": false,
				}, { // 输出报警
					"name": "horn",
					"type": "BOOL",
					"value": false,
				}, { // 停止报警
					"name": "reset_horn",
					"type": "BOOL",
					"value": false,
				}, { // 读取零点值
					"name": "read_temperature_zero",
					"type": "BOOL",
					"value": false,
				}, { // 读取量程值
					"name": "read_temperature_span",
					"type": "BOOL",
					"value": false,
				}, { // 读取高高值
					"name": "read_temperature_AH",
					"type": "BOOL",
					"value": false,
				}, { // 读取高值
					"name": "read_temperature_WH",
					"type": "BOOL",
					"value": false,
				}, { // 读取低值
					"name": "read_temperature_WL",
					"type": "BOOL",
					"value": false,
				}, { // 读取低低值
					"name": "read_temperature_AL",
					"type": "BOOL",
					"value": false,
				}, { // 读取零点值
					"name": "read_pressure_zero",
					"type": "BOOL",
					"value": false,
				}, { // 读取量程值
					"name": "read_pressure_span",
					"type": "BOOL",
					"value": false,
				}, { // 读取高高值
					"name": "read_pressure_AH",
					"type": "BOOL",
					"value": false,
				}, { // 读取高值
					"name": "read_pressure_WH",
					"type": "BOOL",
					"value": false,
				}, { // 读取低值
					"name": "read_pressure_WL",
					"type": "BOOL",
					"value": false,
				}, { // 读取低低值
					"name": "read_pressure_AL",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量1当量
					"name": "read_equS1",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量2当量
					"name": "read_equS2",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量3当量
					"name": "read_equS3",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量4当量
					"name": "read_equS4",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量5当量
					"name": "read_equS5",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量6当量
					"name": "read_equS6",
					"type": "BOOL",
					"value": false,
				}, { // 读取泵操作延时
					"name": "read_pump_change_delay",
					"type": "BOOL",
					"value": false,
				}, { // 扩展命令参数
					"name": "command_para",
					"type": "REAL",
					"value": false,
				}, { // 写入零点值
					"name": "write_temperature_zero",
					"type": "BOOL",
					"value": false,
				}, { // 写入量程值
					"name": "write_temperature_span",
					"type": "BOOL",
					"value": false,
				}, { // 写入高高值
					"name": "write_temperature_AH",
					"type": "BOOL",
					"value": false,
				}, { // 写入高值
					"name": "write_temperature_WH",
					"type": "BOOL",
					"value": false,
				}, { // 写入低值
					"name": "write_temperature_WL",
					"type": "BOOL",
					"value": false,
				}, { // 写入低低值
					"name": "write_temperature_AL",
					"type": "BOOL",
					"value": false,
				}, { // 写入零点值
					"name": "write_pressure_zero",
					"type": "BOOL",
					"value": false,
				}, { // 写入量程值
					"name": "write_pressure_span",
					"type": "BOOL",
					"value": false,
				}, { // 写入高高值
					"name": "write_pressure_AH",
					"type": "BOOL",
					"value": false,
				}, { // 写入高值
					"name": "write_pressure_WH",
					"type": "BOOL",
					"value": false,
				}, { // 写入低值
					"name": "write_pressure_WL",
					"type": "BOOL",
					"value": false,
				}, { // 写入低低值
					"name": "write_pressure_AL",
					"type": "BOOL",
					"value": false,
				}, { // 写入流量1当量
					"name": "write_equS1",
					"type": "BOOL",
					"value": false,
				}, { // 写入流量2当量
					"name": "write_equS2",
					"type": "BOOL",
					"value": false,
				}, { // 写入流量3当量
					"name": "write_equS3",
					"type": "BOOL",
					"value": false,
				}, { // 写入流量4当量
					"name": "write_equS4",
					"type": "BOOL",
					"value": false,
				}, { // 写入流量5当量
					"name": "write_equS5",
					"type": "BOOL",
					"value": false,
				}, { // 写入流量6当量
					"name": "write_equS6",
					"type": "BOOL",
					"value": false,
				}, { // 写入泵操作延时
					"name": "write_pump_change_delay",
					"type": "BOOL",
					"value": false,
				}, { // 保留
					"name": "reserve",
					"type": "ARRAY",
					"element": {
						type: "BYTE",
					}, 
					"length": 36,
				},
			],
		}, //数据区 3 完成

	]
};