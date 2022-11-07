<template>
  <svg :class="bem.b()" :style="style" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script lang="ts">
import { computed, CSSProperties, defineComponent } from "vue";
import "./font/iconfont.js";
import { createNamespace } from "@xlz-ui/utils";
import { iconProps } from "./icon";

export default defineComponent({
  name: "XIcon",
  props: iconProps,
  setup(props) {
    const bem = createNamespace("icon");
    const iconName = computed(() => {
      return `#xlz-${props?.name}`;
    });
    const style = computed<CSSProperties>(() => {
      const { size, color } = props;
      if (!color && !size) {
        return {};
      }
      return {
        ...(size ? { "font-size": size + "px" } : {}),
        ...(color ? { color: color } : {}),
      };
    });
    return {
      style,
      iconName,
      bem,
    };
  },
});
</script>
<!-- <script lang="ts" setup>
defineOptions({
  name: "XIcon",
});
const props = defineProps(iconProps);
</script> -->
