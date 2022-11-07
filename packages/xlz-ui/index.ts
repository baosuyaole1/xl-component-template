import * as components from  '@xlz-ui/components'
import type { App } from "vue"; // ts中的优化只获取类型
export default {
    install: (app: App) => {
        for (const comkey in components) {
            app.component((components as any)[comkey].name, (components as any)[comkey])
        }
    }
}
// export * from "@xlz-ui/components";