// 声明icon类型
import { ExtractPropTypes } from 'vue';
export const iconProps = {
  name: {
    type: String,
  },
  size: {
    type: [String, Number],
  },
  color: {
    type: String,
  },
};
export type IconProps = ExtractPropTypes<typeof iconProps>;
