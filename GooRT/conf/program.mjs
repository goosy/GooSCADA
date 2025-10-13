export function program(plc) {
    const node_data = plc.get_mem("node_data");
    const commands = plc.get_mem("commands");
    const node_basic = node_data.get_tag("basic");

    // 泵运行维护
    const pump_run = node_basic.get_tag("pump_run");
    const pump_change_F = node_basic.get_tag("pump_change_F");
    const pump_run_list = [
        node_basic.get_tag("pump_run_1"),
        node_basic.get_tag("pump_run_2"),
        node_basic.get_tag("pump_run_3"),
        node_basic.get_tag("pump_run_4")
    ];
    const pump_change_delay = node_data.get_tag("para.pump_change_delay");
    function get_pump_run() {
        return pump_run_list[0].value
            || pump_run_list[1].value
            || pump_run_list[2].value
            || pump_run_list[3].value;
    }
    let timeout_ID;
    for (const run of pump_run_list) {
        run.on("valuechange", (_0, _1) => {
            pump_change_F.value = true;
            clearTimeout(timeout_ID);
            timeout_ID = setTimeout(() => {
                pump_change_F.value = false;
            }, pump_change_delay.value);
            // pump_run_list 决定 pump_run
            pump_run.value = get_pump_run();
        });
    }
    pump_run.on('valuechange', (_, newvalue) => {
        // 保证值仅由 pump_run_list 决定
        const correct_value = get_pump_run();
        if (newvalue !== correct_value) pump_run.value = correct_value;
    });

    // 停泵命令
    const response_code = node_basic.get_tag("response_code");
    commands.get_tag("basic.stop_pumps").on("valuechange", (_, newvalue) => {
        if (newvalue) {
            for (const run of pump_run_list) {
                run.value = false;
            }
            response_code.value = 1;
        } else {
            response_code.value = 0;
        }
    });
}
