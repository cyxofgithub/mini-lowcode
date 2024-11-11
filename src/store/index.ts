import React from 'react';
import { IComponent } from '../components/MaterialPanel/registerConfig';

export type IBlock = Pick<IComponent, 'type' | 'focus'> & {
    style: {
        /**
         * block 相对于 container 的左边距
         */
        left: number;
        /**
         * block 相对于 container 的上边距
         */
        top: number;
        width?: number;
        height?: number;
        zIndex?: number;
    };
    focus: boolean;
    focusShape: IComponent['focusShape'];
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
