const para_origin = [ // copy from TLMS_ESD_SrcGen
    { name: "temperature_zero", type: "Real", rtu: '"TIT".zero', comment: "零点值" },
    { name: "temperature_span", type: "Real", rtu: '"TIT".span', comment: "量程值" },
    { name: "temperature_AH", type: "Real", rtu: '"TIT".AH_limit', comment: "高高值" },
    { name: "temperature_WH", type: "Real", rtu: '"TIT".WH_limit', comment: "高值" },
    { name: "temperature_WL", type: "Real", rtu: '"TIT".WL_limit', comment: "低值" },
    { name: "temperature_AL", type: "Real", rtu: '"TIT".AL_limit', comment: "低低值" },
    { name: "temperature_DZ", type: "Real", rtu: '"TIT".dead_zone', comment: "温度比较死区" },
    { name: "temperature_FT", type: "DInt", rtu: '"TIT".FT_time', comment: "温度比较容错时间" },
    { name: "pressure_zero", type: "Real", rtu: '"PIT".zero', comment: "零点值" },
    { name: "pressure_span", type: "Real", rtu: '"PIT".span', comment: "量程值" },
    { name: "pressure_AH", type: "Real", rtu: '"PIT".AH_limit', comment: "高高值" },
    { name: "pressure_WH", type: "Real", rtu: '"PIT".WH_limit', comment: "高值" },
    { name: "pressure_WL", type: "Real", rtu: '"PIT".WL_limit', comment: "低值" },
    { name: "pressure_AL", type: "Real", rtu: '"PIT".AL_limit', comment: "低低值" },
    { name: "pressure_DZ", type: "Real", rtu: '"PIT".dead_zone', comment: "压力比较死区" },
    { name: "pressure_FT", type: "DInt", rtu: '"PIT".FT_time', comment: "压力比较容错时间" },
    { name: "flow_1", type: "Real", rtu: '"flow_rate_1".equS', comment: "流量1", readonly: true },
    { name: "flow_2", type: "Real", rtu: '"flow_rate_2".equS', comment: "流量2", readonly: true },
    { name: "flow_3", type: "Real", rtu: '"flow_rate_3".equS', comment: "流量3", readonly: true },
    { name: "flow_4", type: "Real", rtu: '"flow_rate_4".equS', comment: "流量4", readonly: true },
    { name: "flow_5", type: "Real", rtu: '"flow_rate_5".equS', comment: "流量5", readonly: true },
    {
        name: "flow_smooth_factor", type: "Real", rtu: [
            '"flow_rate_1".smooth_factor',
            '"flow_rate_2".smooth_factor',
            '"flow_rate_3".smooth_factor',
            '"flow_rate_4".smooth_factor',
            '"flow_rate_5".smooth_factor',
        ], comment: "流量平滑权值", writeonly: true
    },
    { name: "equS1", type: "DInt", rtu: '"flow_rate_1".equS', comment: "流量1当量" },
    { name: "equS2", type: "DInt", rtu: '"flow_rate_2".equS', comment: "流量2当量" },
    { name: "equS3", type: "DInt", rtu: '"flow_rate_3".equS', comment: "流量3当量" },
    { name: "equS4", type: "DInt", rtu: '"flow_rate_4".equS', comment: "流量4当量" },
    { name: "equS5", type: "DInt", rtu: '"flow_rate_5".equS', comment: "流量5当量" },
    { name: "pump_change_delay", type: "DInt", rtu: '"cyclic_pumps".pump_change_delay_time', comment: "泵操作延时" },
];

export function do_cmd(plc, addr_options) {
    const node_data = plc.get_mem(addr_options.node);
    const para_data = plc.get_mem(addr_options.para);
    const cmds_data = plc.get_mem(addr_options.commands);

    let i = 128, j = 256;
    const read_codes = {}, write_codes = {};
    para_origin.forEach(item => {
        let code;
        const addr = para_data.get_tag(item.name);
        if (!item.writeonly) {
            code = i++;
            read_codes[code] = {
                type: item.type,
                str: "read_" + item.name,
                code,
                addr,
                data_type: item.type,
                busy: false,
            };
        }
        if (!item.readonly) {
            code = j++;
            write_codes[code] = {
                type: item.type,
                str: "write_" + item.name,
                code,
                addr,
                data_type: item.type,
            };
        }
    });

    // 泵运行维护
    const pump_run = node_data.get_tag("pump_run");
    const pump_change_F = node_data.get_tag("pump_change_F");
    const pump_run_list = [
        node_data.get_tag("pump_run_1"),
        node_data.get_tag("pump_run_2"),
        node_data.get_tag("pump_run_3"),
        node_data.get_tag("pump_run_4")
    ];
    const pump_change_delay = para_data.get_tag("pump_change_delay");
    pump_run_list.forEach(run => {
        run.on("valuechange", (oldvalue, newvalue) => {
            pump_change_F.value = true;
            setTimeout(() => {
                pump_change_F.value = false;
            }, pump_change_delay.value);
            pump_run.value = pump_run_list[0].value || pump_run_list[1].value || pump_run_list[2].value || pump_run_list[3].value;
        })
    })
    // 停泵命令
    cmds_data.get_tag("stop_pumps").on("valuechange", (oldvalue, newvalue) => {
        if (newvalue) {
            pump_run_list.forEach(run => run.value = false);
            node_data.get_tag("response_code").value = 1;
        } else {
            node_data.get_tag("response_code").value = 0;
        }
    });

    // 压力报警
    const pressure = node_data.get_tag("pressure");
    const pressure_AH_F = node_data.get_tag("pressure_AH_F");
    const pressure_WH_F = node_data.get_tag("pressure_WH_F");
    const pressure_WH = para_data.get_tag("pressure_WH");
    const pressure_AH = para_data.get_tag("pressure_AH");
    pressure.on("valuechange", (oldvalue, newvalue) => {
        pressure_AH_F.value = newvalue > pressure_AH.value;
        pressure_WH_F.value = !pressure_AH_F.value && (newvalue > pressure_WH.value);
    });

    // 命令处理
    const command_code = cmds_data.get_tag("command_code");
    const command_para_real = cmds_data.get_tag("command_para_real");
    const command_para_dint = cmds_data.get_tag("command_para_dint");
    const response_code = node_data.get_tag("response_code");
    const response_code_ex = node_data.get_tag("response_code_ex");
    const response_real_value = node_data.get_tag("response_real_value");
    const response_dint_value = node_data.get_tag("response_dint_value");

    // 读命令
    const response_buffer = [];
    setInterval(() => {
        let curr_cmd;
        let response_done;
        // 取得第一个未处理的命令
        do {
            response_done = false;
            curr_cmd = response_buffer[0];
            if (curr_cmd && !read_codes[curr_cmd.code].busy) {
                response_buffer.shift(); // 已完成则出队
                response_done = true;
            }
        } while (response_done);
        // 处理当前命令
        if (curr_cmd) {// 有命令时
            const value = curr_cmd.value_tag.value;
            if (curr_cmd.data_type == "Real") {
                response_real_value.value = value;
            } else {
                response_dint_value.value = value;
            }
            response_code_ex.value = curr_cmd.code;
        } else {
            response_code_ex.value = 0;
        }
    }, 1000);
    Object.values(read_codes).forEach((read_code) => {
        const code = read_code.code;
        const value_tag = read_code.addr;
        const data_type = read_code.data_type;
        const cmd_tag = cmds_data.get_tag(read_code.str);
        cmd_tag.on("valuechange", (oldvalue, newvalue) => {
            if (newvalue) { // 有命令传入则压入应答缓冲中
                response_buffer.push({ code, value_tag, data_type });
                read_code.busy = true;
            } else { // 有命令已处理或撤消
                read_code.busy = false;
            }
        });
    });

    // 写命令
    command_code.on("valuechange", (oldvalue, newvalue) => {
        const cmd = write_codes[newvalue];
        if (cmd) {// 有命令时
            const value_tag = cmd.addr;
            if (cmd.data_type == "Real") {
                value_tag.value = command_para_real.value;
            } else {
                value_tag.value = command_para_dint.value;
            }
            response_code.value = newvalue;
        } else {
            response_code.value = 0;
        }
    });
}