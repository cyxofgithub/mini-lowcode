import React from 'react';
import { IComponent } from '../components/MaterialPanel/registerConfig';

interface IGlobalContext {
    currentMaterial: IComponent | null;
    setCurrentMaterial: React.Dispatch<React.SetStateAction<IComponent | null>>;
    currentSchema: any;
    setCurrentSchema: React.Dispatch<React.SetStateAction<any>>;
}
const GlobalContext = React.createContext<IGlobalContext>({
    currentMaterial: null,
    setCurrentMaterial: () => {},
    currentSchema: {},
    setCurrentSchema: () => {},
});

export { GlobalContext };
