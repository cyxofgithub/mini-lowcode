import { makeAutoObservable } from 'mobx';
import { IComponent } from '../components/MaterialPanel/registerConfig';
import { ISchema } from '../declare/schema';

class GlobalStore {
    currentMaterial: IComponent | null = null;
    currentSchema: ISchema = {
        container: {
            width: 0,
            height: 0,
        },
        blocks: [],
    };

    constructor() {
        makeAutoObservable(this);
    }

    updateCurrentMaterial(material: IComponent | null) {
        this.currentMaterial = material;
    }

    updateCurrentSchema(schema: ISchema) {
        this.currentSchema = schema;
    }
}

const globalStore = new GlobalStore();
export { globalStore };
