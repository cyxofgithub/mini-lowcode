import { useEffect, useReducer, useRef } from 'react';
import './index.css';
import registerConfig, { IComponent } from '../../MaterialPanel/registerConfig';

//私有常量

//可抽离的逻辑处理函数/组件

/**
 * 【组件功能】
 *
 * 【应用模块】
 *
 */

let Block = (_props: IProps) => {
    //变量声明、解构
    const [, forceUpdate] = useReducer(v => v + 1, 0);
    const blockRef = useRef<any>();
    const { block, ...otherProps } = _props;
    const blockStyle = {
        top: block?.style?.top,
        left: block?.style?.left,
        zIndex: block?.style?.zIndex,
    };
    console.log('🚀 ~ file: index.tsx:26 ~ Block ~ blockStyle:', blockStyle);

    const component = registerConfig.componentMap[block.type];
    const RenderComponent = component.render();

    //组件状态

    //网络IO

    //数据转换

    //逻辑处理函数

    //组件Effect
    useEffect(() => {
        const { offsetWidth, offsetHeight } = blockRef.current;
        const { style = {} } = block;
        if (block.alignCenter) {
            style.left = style?.left ?? 0 - offsetWidth / 2;
            style.top = style?.top ?? 0 - offsetHeight / 2;
            delete block?.alignCenter; // 删除，一次性的属性
            forceUpdate();
        }
    }, [block]);

    return (
        <div
            className={`editor-block ${block.focus ? 'editor-block-focus' : ''}`}
            style={blockStyle}
            ref={blockRef}
            {...otherProps}
        >
            {RenderComponent}
        </div>
    );
};

//props类型定义
interface IProps {
    block: IComponent;
    onMouseDown: (e: any) => void;
}

//prop-type定义，可选

export { Block };
