import React from 'react';
import './App.css';
import { CanvasArea } from './components/CanvasArea';
import { MaterialPanel } from './components/MaterialPanel';
import { IComponent } from './components/MaterialPanel/registerConfig';
import { GlobalContext } from './store';
import schema from './schema';

function App() {
    const [currentMaterial, setCurrentMaterial] = React.useState<IComponent | null>(null);
    const [currentSchema, setCurrentSchema] = React.useState<any>(schema);

    return (
        <GlobalContext.Provider value={{ currentMaterial, setCurrentMaterial, currentSchema, setCurrentSchema }}>
            <div className="editor-wrapper">
                <div className="editor-header">顶部工具栏</div>
                <div className="editor-main">
                    <div className="editor-left">
                        <MaterialPanel />
                    </div>
                    <div className="editor-container">
                        <CanvasArea />
                    </div>
                    <div className="editor-right">右侧属性区</div>
                </div>
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
