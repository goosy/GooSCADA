<script lang='jsx'>
import { inject, computed, nextTick, reactive, ref, toRefs, watch } from "vue";
const test_mode = process.env.WEBTEST;
export default {
    setup(props, { attrs, slots, /* emit */ }) {
        const tags = test_mode ? reactive(new Map()) : inject("TagMap");
        const add_tag = test_mode
            ? (name, initValue) => { if (tags.has(name)) return; tags.set(name, initValue); }
            : inject("addTag");
        const write_tag = test_mode ? (name, value) => tags.set(name, value) : inject("writeTagValue");
        const read_tag = test_mode ? (name) => tags.get(name) : inject("readTagValue");

        const { // no need reactive
            type,
            id,
            name,
            initvalue,
        } = attrs;
        const tag = computed({
            get: () => tags.get(id),
            set: value => write_tag(id, value)
        });
        const label = type === "DB" ? "数据块符号" : "变量名称";
        const has_value = ["BOOL", "BYTE", "WORD", "INT", "DINT", "DWORD", "REAL", "DT", "STRING"].includes(type);
        if (has_value) add_tag(id, initvalue);
        const js_type = type === "BOOL" ? Boolean : (
            ["DT", "STRING"].includes(type) ? String : (
                has_value ? Number : null
            )
        );

        const is_changing = ref(false);
        const edit_el = ref(null);
        const showEdit = async () => {
            is_changing.value = true;
            await nextTick();
            edit_el.value.focus();
            edit_el.value.select();
        };

        const new_value = ref(initvalue);
        const change = () => {
            if (type === "BOOL") tag.value = !tag.value;
            else {
                is_changing.value = false;
                tag.value = js_type(new_value.value);
            }
        };
        const cancelEdit = () => {
            is_changing.value = false;
            new_value.value = tag.value;
        }

        function get_value_vnode() {
            if (type === 'BOOL') {
                return (
                    <>
                        <span style="cursor:default" onclick={change} >{tag.value ? '✅True' : '⬜False'}</span>
                    </>
                );
            } else if (has_value) {
                return (
                    <>
                        <span
                            id="value"
                            v-show={!is_changing.value}
                            onclick={event => {
                                event.target.blur();
                                showEdit();
                            }}>
                            {tag.value}
                        </span>
                        <span v-show={is_changing.value} name="valueedit">
                            <input
                                type={js_type === String ? 'text' : 'number'}
                                id={'input_' + id}
                                v-model={new_value.value}
                                onkeyup={event => {
                                    if (event.keyCode === 13) change();
                                    if (event.keyCode === 27) cancelEdit();
                                }}
                                ref={edit_el}
                            />
                            <button onclick={change}>修改</button>
                            <button onclick={cancelEdit}>取消</button>
                        </span>
                    </>
                )
            } else {
                return slots.default?.();
            }
        }

        return () => (
            <>
                <label for="name">{label}:</label>
                <span id="name">{name}</span>：
                {get_value_vnode()}
            </>
        );
    }
}
</script>

<style>
</style>
