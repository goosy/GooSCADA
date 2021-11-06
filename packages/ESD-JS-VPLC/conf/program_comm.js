const node_para = [
    "temperature_zero",
    "temperature_span",
    "temperature_AH",
    "temperature_WH",
    "temperature_WL",
    "temperature_AL",
    "temperature_DZ",
    "temperature_FT",
    "pressure_zero",
    "pressure_span",
    "pressure_AH",
    "pressure_WH",
    "pressure_WL",
    "pressure_AL",
    "pressure_DZ",
    "pressure_FT",
    "flow_1",
    "flow_2",
    "flow_3",
    "flow_4",
    "flow_5",
    "flow_smooth_factor",
    "equS1",
    "equS2",
    "equS3",
    "equS4",
    "equS5",
    "pump_change_delay",
];

export function do_cmd(plc, addr_options){
    console.log(addr_options.node, addr_options.para, addr_options.commands);
    //    plc.get_mem(node+'.node_ID');
}