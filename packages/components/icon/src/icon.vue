<template>
  <svg :class="bem.b()" :style="style" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from 'vue';
import './font/iconfont.js';
import { createNamespace } from '@xlz-ui/utils/create';
import { iconProps } from './icon';
const bem = createNamespace('icon');
defineOptions({
  name: 'XIcon',
});
const props = defineProps(iconProps);
const iconName = computed(() => {
  return `#xlz-${props?.name}`;
});
const style = computed<CSSProperties>(() => {
  const { size, color } = props;
  if (!color && !size) {
    return {};
  }
  return {
    ...(size ? { 'font-size': size + 'px' } : {}),
    ...(color ? { color: color } : {}),
  };
});
</script>
<style scoped>
.xlz-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
