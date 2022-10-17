# Icon 图标

XLZ-ui 推荐使用 xicons 作为图标库。

$ pnpm install @vicons/ionicons5

## 使用图标

- 如果你想像用例一样直接使用，你需要全局注册组件，才能够直接在项目里使用。

<script setup lang="ts">
import ZIcon from '@xlz-ui/components/icon';
import { AccessibilityOutline , ArrowRedoOutline} from '@vicons/ionicons5'
import {glyphs} from '@xlz-ui/components/icon/src/font/iconfont.json'
</script>

<ZIcon v-for="item in glyphs" :name="item.font_class" size="44">{{item.name}}</ZIcon>

## API

### Icon Props

| 名称  | 类型             | 默认值    | 说明     |
| ----- | ---------------- | --------- | -------- |
| color | string           | undefined | 图标颜色 |
| size  | number \| string | undefined | 图片大小 |
