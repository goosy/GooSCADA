const host = "127.0.0.1:8078";
const hostdesc = "孤岛站孤永线出口";
const sendDB = {
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
};

const recvDB = {
    name: "commands_GD8",
    type: "DB",
    DBNO: 10,
    bytes: 50,
    tags: [
        {
            name: "nodeID",
            type: "INT",
            value: 8078,
        },
        {
            name: "stopPumps",
            type: "BOOL",
            value: false,
        },
        {
            name: "stopHeaters",
            type: "BOOL",
            value: false,
        },
        {
            name: "warning",
            type: "BOOL",
            value: false,
        },
        {
            name: "resetWarning",
            type: "BOOL",
            value: false,
        },
        { name: "reserve", type: "ARRAY", element: { type: "BYTE", length: 46 } },
    ],
};

export {host, hostdesc, sendDB, recvDB}