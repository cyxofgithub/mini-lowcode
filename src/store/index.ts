import { makeAutoObservable } from 'mobx';
import { IComponent } from '../components/MaterialPanel/registerConfig';
import { ISchema } from '../declare/schema';
import schema from '../schema';

class GlobalStore {
    currentMaterial: IComponent | null = null;
    currentSchema: ISchema = schema;

    constructor() {
        makeAutoObservable(this);
    }

    updateCurrentMaterial = (material: IComponent | null) => {
        this.currentMaterial = material;
    };

    updateCurrentSchema = (schema: ISchema) => {
        this.currentSchema = schema;
    };
}

const globalStore = new GlobalStore();
export { globalStore };
