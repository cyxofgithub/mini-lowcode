import { globalStore } from '../../store';
import './index.css';
import registerConfig, { IComponent } from './registerConfig';

//私有常量

//可抽离的逻辑处理函数/组件

/**
 * 【组件功能】
 *
 * 【应用模块】
 *
 */

let MaterialPanel = (_props: IProps) => {
    //变量声明、解构
    const { updateCurrentMaterial } = globalStore;

    //组件状态

    //网络IO

    //数据转换

    //逻辑处理函数
    //监听 dragStart 事件在拖拽开始时记录被拖拽组件信息
    const handleDragStart = (e: any, component: IComponent) => {
        // 记录鼠标相对于元素左边和上边的距离
        const { offsetX, offsetY } = e.nativeEvent;
        component.offsetInfo = {
            offsetX,
            offsetY,
        };
        component.element = e?.target ?? null;
        updateCurrentMaterial(component);
    };

    //组件Effect

    return (
        <div>
            {registerConfig.componentList.map(component => (
                <div key={component.type} className="editor-left-item">
                    <span>{component.label}</span>
                    <div draggable onDragStart={e => handleDragStart(e, component)}>
                        {component.preview()}
                    </div>
                </div>
            ))}
        </div>
    );
};

//props类型定义
interface IProps {}

//prop-type定义，可选

export { MaterialPanel };
