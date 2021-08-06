<script lang='jsx'>
import { inject, computed, nextTick, reactive, ref, toRefs, watch } from "vue";
export default {
    setup(props, { attrs, slots, /* emit */ }) {
        const tags = inject("TagMap");
        const add_tag = inject("addTag");
        const write_tag = inject("writeTagValue");
        // for local test
        // const tags = reactive(new Map());
        // const add_tag = (name, initValue) => { if (tags.has(name)) return; tags.set(name, initValue); }
        // const read_tag = (name) => tags.get(name); 
        // const write_tag = (name, value) => tags.set(name, value); 

        const { // no need reactive
            type,
            id,
            name,
            initvalue,
        } = attrs;
        const tag = computed({
            get: () => tags.get(id),
            set: (value) => write_tag(id, value)
        });
        const label = type === "DB" ? "数据块符号" : "变量名称";
        
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
                tag.value = new_value.value;
            }
        };
        const cancelEdit = () => {
            is_changing.value = false;
            new_value.value = tag.value;
        }

        function get_value_vnode() {
            switch (type) {
                case "BOOL":
                    add_tag(id, initvalue);
                    return (
                        <>
                            <span style="cursor:default" onclick={change} >{tag.value ? '✅True' : '⬜False'}</span>
                        </>
                    );
                    break;
                case "BYTE":
                case "WORD":
                case "INT":
                case "DINT":
                case "DWORD":
                case "REAL":
                case "DT":
                    add_tag(id, initvalue);
                    return (
                        /** @todo focus not work */
                        <>
                            <span id="value"
                                v-show={!is_changing.value}
                                onclick={event => {
                                    event.target.blur();
                                    showEdit();
                                }}>
                                {tag.value}
                            </span>
                            <span v-show={is_changing.value} name="valueedit">
                                <input
                                    type="text"
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
                    );
                    break;
                default:
                    return slots.default?.();
                    break;
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
