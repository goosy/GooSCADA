export function program(plc) {
    const node_data = plc.get_mem("node_data");
    const commands = plc.get_mem("commands");
    const commands_code = {
        "stop_pumps": 1,
        "stop_heaters": 2,
        "horn": 4,
        "reset_horn": 8,
        "reset_CPU": 16,
        "reset_conn": 32,
        "read_paras": 64,
        "write_paras": 128,
    }
    const node_basic = node_data.get_tag("basic");
    const node_para = node_data.get_tag("para");
    const commands_basic = commands.get_tag("basic");
    const commands_para = commands.get_tag("para");

    // 泵运行维护
    const pump_run = node_basic.get_tag("pump_run");
    const pump_change_F = node_basic.get_tag("pump_change_F");
    const pump_run_list = [
        node_basic.get_tag("pump_run_1"),
        node_basic.get_tag("pump_run_2"),
        node_basic.get_tag("pump_run_3"),
        node_basic.get_tag("pump_run_4")
    ];
    const pump_change_delay = node_para.get_tag("pump_change_delay");
    function get_pump_run() {
        return pump_run_list[0].value
            || pump_run_list[1].value
            || pump_run_list[2].value
            || pump_run_list[3].value;
    }
    let pump_run_timeout_ID;
    pump_run_list.forEach(run => {
        run.on("valuechange", (_0, _1) => {
            pump_change_F.value = true;
            clearTimeout(pump_run_timeout_ID);
            pump_run_timeout_ID = setTimeout(() => {
                pump_change_F.value = false;
            }, pump_change_delay.value);
            // pump_run_list 决定 pump_run
            pump_run.value = get_pump_run();
        })
    });
    pump_run.on('valuechange', (_, newvalue) => {
        // 保证值仅由 pump_run_list 决定
        const correct_value = get_pump_run();
        if (newvalue != correct_value) pump_run.value = correct_value;
    });

    // 压力报警
    const pressure = node_basic.get_tag("pressure");
    const pressure_AH_F = node_basic.get_tag("pressure_AH_F");
    const pressure_WH_F = node_basic.get_tag("pressure_WH_F");
    const pressure_WH = node_para.get_tag("pressure_WH");
    const pressure_AH = node_para.get_tag("pressure_AH");
    pressure.on("valuechange", (_, newvalue) => {
        pressure_AH_F.value = newvalue > pressure_AH.value;
        pressure_WH_F.value = !pressure_AH_F.value && (newvalue > pressure_WH.value);
    });

    // 命令处理
    const response_code = node_basic.get_tag("response_code");

    // 停泵命令
    commands_basic.get_tag("stop_pumps").on("valuechange", (_, newvalue) => {
        if (newvalue) {
            pump_run_list.forEach(run => run.value = false);
            node_basic.get_tag("response_code").value |= commands_code.stop_pumps;
        } else {
            node_basic.get_tag("response_code").value &= ~commands_code.stop_pumps;
        }
    });
    // 读参数命令
    commands_basic.get_tag("read_paras").on("valuechange", (_, newvalue) => {
        if (newvalue) {
            // TODO 让发送数据扩展到para
            node_basic.get_tag("response_code").value |= commands_code.read_paras;
        } else {
            node_basic.get_tag("response_code").value &= ~commands_code.read_paras;
        }
    });
    // 写参数命令
    commands_basic.get_tag("write_paras").on("valuechange", (_, newvalue) => {
        if (newvalue) {
            // TODO 让发送数据扩展到para
            // TODO commands_para => node_para
            node_basic.get_tag("response_code").value |= commands_code.write_paras;
        } else {
            node_basic.get_tag("response_code").value &= ~commands_code.write_paras;
        }
    });
}
