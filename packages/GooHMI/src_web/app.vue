
<template>
  <p>
    <label for="host">{{ s7plc.hostdesc }}:</label>
    <span id="host">{{ s7plc.host }}</span>
    <span> 通信状态:{{ ws_state }}</span>
  </p>
  <s7-struct :struct="s7plc.sendDB" :id="s7plc.sendDB.name" />
  <s7-struct :struct="s7plc.recvDB" :id="s7plc.recvDB.name" />
</template>
<script setup>
import { host, hostdesc, sendDB, recvDB } from "/conf/data.js";
import S7Struct from "./components/S7Struct.vue";
import { computed, reactive, ref, inject } from "vue";
document.title = hostdesc;
let ws_state_id = ref(-1);
const ws = inject("websocket");
function update_ws_state(){ws_state_id.value = ws.readyState}
ws.addEventListener('open', update_ws_state);
ws.addEventListener('close', update_ws_state);

const s7plc = reactive({
  host,
  hostdesc,
  sendDB,
  recvDB,
});
const ws_state = computed(() => {
  switch (ws_state_id.value) {
    case ws.CONNECTING:
      return "正在连接";
    case ws.CLOSING:
      return "正在关闭";
    case ws.CLOSED:
      return "已关闭";
    case ws.OPEN:
      return "已打开";
    default:
      return "未初始化";
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
