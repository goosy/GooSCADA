<template>
    <s7-tag :type="struct.type" :name="struct.name" :id="id">
        <ul id="subtags" v-if="hasSubTag(struct)">
            <li v-for="subs in struct.tags" :key="subs.name">
                <s7-struct :struct="subs" :id="getSubID(subs)" v-if="hasSubTag(subs)" />
                <s7-tag :type="subs.type" :name="subs.name" :id="getSubID(subs)" :initvalue="subs.value" v-if="!hasSubTag(subs)" />
            </li>
        </ul>
    </s7-tag>
</template>
<script setup>
import {computed} from "vue";
import S7Tag from "./S7Tag.vue";
const emit = defineEmits(["change-value"]);
const props = defineProps({
    struct: JSON,
    id: String,
});
const hasSubTag = struct => struct.hasOwnProperty("tags");
const getSubID = struct => props.id + '/' + struct.name;
</script>

<style scoped>
a {
    color: #42b983;
}
</style>
