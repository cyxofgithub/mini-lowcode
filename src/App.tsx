import './App.css';
import { CanvasArea } from './components/CanvasArea';
import { MaterialPanel } from './components/MaterialPanel';

function App() {
    return (
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
    );
}

export default App;
