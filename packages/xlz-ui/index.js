import * as components from '@xlz-ui/components';
export default {
    install: (app) => {
        for (const comkey in components) {
            app.component(components[comkey].name, components[comkey]);
        }
    }
};
