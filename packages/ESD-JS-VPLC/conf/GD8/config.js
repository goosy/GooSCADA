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
					}, { // response_real_value
						"name": "response_real_value",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // response_dint_value
						"name": "response_dint_value",
						"type": "DINT",
						"value": 0, //初始值
					}, { // reserve
						"name": "reserve",
						"type": "ARRAY",
						"element": { type: "BYTE" },
						"length": 14, 
					}]
				}, {
					"name": "nodeSC8",
					"type": "STRUCT",
					"tags": [{ // 变量nodeID
						"name": "nodeID",
						"type": "INT",
						"value": 7108, //初始值
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
					}, { // response_real_value
						"name": "response_real_value",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // response_dint_value
						"name": "response_dint_value",
						"type": "DINT",
						"value": 0, //初始值
					}, { // reserve
						"name": "reserve",
						"type": "ARRAY",
						"element": { type: "BYTE" },
						"length": 14, 
					}]
				}, {
					"name": "nodeKX",
					"type": "STRUCT",
					"tags": [{ // 变量nodeID
						"name": "nodeID",
						"type": "INT",
						"value": 8111, //初始值
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
					}, { // response_real_value
						"name": "response_real_value",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // response_dint_value
						"name": "response_dint_value",
						"type": "DINT",
						"value": 0, //初始值
					}, { // reserve
						"name": "reserve",
						"type": "ARRAY",
						"element": { type: "BYTE" },
						"length": 14, 
					}]
				}, {
					"name": "nodeSC",
					"type": "STRUCT",
					"tags": [{ // 变量nodeID
						"name": "nodeID",
						"type": "INT",
						"value": 8110, //初始值
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
					}, { // response_real_value
						"name": "response_real_value",
						"type": "REAL",
						"value": 0.0, //初始值
					}, { // response_dint_value
						"name": "response_dint_value",
						"type": "DINT",
						"value": 0, //初始值
					}, { // reserve
						"name": "reserve",
						"type": "ARRAY",
						"element": { type: "BYTE" },
						"length": 14, 
					}]
				},
			],
		}, //数据区 1 完成

		{ //数据区 2 开始
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
				}, { // 读取温度死区
					"name": "read_temperature_DZ",
					"type": "BOOL",
					"value": false,
				}, { // 读取温度容错时间
					"name": "read_temperature_FT",
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
				}, { // 读取压力死区
					"name": "read_pressure_DZ",
					"type": "BOOL",
					"value": false,
				}, { // 读取压力容错时间
					"name": "read_pressure_FT",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量1
					"name": "read_flow1",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量2
					"name": "read_flow2",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量3
					"name": "read_flow3",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量4
					"name": "read_flow4",
					"type": "BOOL",
					"value": false,
				}, { // 读取流量5
					"name": "read_flow5",
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
				}, { // 扩展命令代码
					"name": "command_code",
					"type": "INT",
					"value": 0,
				}, { // 扩展命令参数 实数型
					"name": "command_para_real",
					"type": "REAL",
					"value": 0.0,
				}, { // 扩展命令参数 长整型
					"name": "command_para_dint",
					"type": "DINT",
					"value": 0,
				}, { // 保留
					"name": "reserve",
					"type": "ARRAY",
					"element": { type: "BYTE" }, 
					"length": 34,
				},
			],
		}, //数据区 2 完成

	]
};