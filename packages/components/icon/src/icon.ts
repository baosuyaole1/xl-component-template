import { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
  size: [Number, String] as PropType<number | string>,
  color: String,
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;