import './index.less';
import registerConfig from '../CanvasArea/utils/registerConfig';

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

    //组件状态

    //网络IO

    //数据转换

    //逻辑处理函数

    //组件Effect

    return (
        <div>
            {registerConfig.componentList.map(component => (
                <div key={component.type} className="editor-left-item">
                    <span>{component.label}</span>
                    <div>{component.preview()}</div>
                </div>
            ))}
        </div>
    );
};

//props类型定义
interface IProps {}

//prop-type定义，可选

export { MaterialPanel };
