import React from 'react';
import { IComponent } from '../components/MaterialPanel/registerConfig';

export type IBlock = Pick<IComponent, 'type' | 'focus'> & {
    style: {
        left: number;
        top: number;
        width?: number;
        height?: number;
        zIndex?: number;
    };
    focusShape?: IComponent['focusShape'];
};
interface ISchema {
    container: {
        width: number;
        height: number;
    };
    blocks: IBlock[];
}
interface IGlobalContext {
    currentMaterial: IComponent | null;
    setCurrentMaterial: React.Dispatch<React.SetStateAction<IComponent | null>>;
    currentSchema: ISchema;
    setCurrentSchema: React.Dispatch<React.SetStateAction<any>>;
}
const GlobalContext = React.createContext<IGlobalContext>({
    currentMaterial: null,
    setCurrentMaterial: () => {},
    currentSchema: {
        container: {
            width: 0,
            height: 0,
        },
        blocks: [],
    },
    setCurrentSchema: () => {},
});

export { GlobalContext };
