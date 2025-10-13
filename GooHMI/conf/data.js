const host = "127.0.0.1:8078";
const hostdesc = "孤岛站孤永线出口";
const DBs = [
  {
    name: "nodes",
    type: "DB",
    DBNO: 8,
    bytes: 50,
    tags: [
      {
        name: "nodeGD8",
        type: "STRUCT",
        tags: [
          {
            name: "nodeID",
            type: "INT",
            value: 8078,
          },
          {
            name: "workOK",
            type: "BOOL",
            value: true,
          },
          {
            name: "commOK",
            type: "BOOL",
            value: true,
          },
          {
            name: "pump_run_1",
            type: "BOOL",
            value: false,
          },
          {
            name: "pump_run_2",
            type: "BOOL",
            value: false,
          },
          {
            name: "pump_run_3",
            type: "BOOL",
            value: false,
          },
          {
            name: "pump_run_4",
            type: "BOOL",
            value: false,
          },
          {
            name: "pump_run_5",
            type: "BOOL",
            value: false,
          },
          {
            name: "datetime",
            type: "DT",
            value: "DT#2021-6-30-0:0:0.0",
          },
          {
            name: "temperature",
            type: "REAL",
            value: 0,
          },
          {
            name: "pressure",
            type: "REAL",
            value: 0,
          },
          {
            name: "flow",
            type: "REAL",
            value: 0,
          },
        ],
      },
    ],
  }, {
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
  }, {
    name: "commands_GD8",
    type: "DB",
    DBNO: 10,
    bytes: 50,
    tags: [
      {
        name: "nodeID",
        type: "INT",
        value: 8078,
      }, {
        name: "stopPumps",
        type: "BOOL",
        value: false,
      }, {
        name: "stopHeaters",
        type: "BOOL",
        value: false,
      }, {
        name: "warning",
        type: "BOOL",
        value: false,
      }, {
        name: "resetWarning",
        type: "BOOL",
        value: false,
      }, {
        name: "reserve",
        type: "ARRAY",
        element: { type: "BYTE" },
        length: 46
      },
    ],
  }
];

export { host, hostdesc, DBs }