import { useRef } from 'react';
import './index.css';
import registerConfig, { IComponent } from '../../MaterialPanel/registerConfig';
import React from 'react';
import { GlobalContext } from '../../../store';

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
    const blockRef = useRef<any>();
    const { block, parentRef, onMouseDown } = _props;
    const { setCurrentSchema, currentSchema } = React.useContext(GlobalContext);

    const blockStyle = {
        top: block?.style?.top,
        left: block?.style?.left,
        zIndex: block?.style?.zIndex,
    };

    const component = registerConfig.componentMap[block.type];
    const RenderComponent = component.render();

    //组件状态

    //网络IO

    //数据转换

    //逻辑处理函数
    const handleMouseDown = (e: any) => {
        onMouseDown(e);
        // 进行移动
        handleBlockMove(e);
    };

    const handleBlockMove = (e: { clientX: number; clientY: number }) => {
        // 记录起始位置
        const initialPlace = {
            startX: e.clientX,
            startY: e.clientY,
        };

        const blockMouseMove = (e: { clientX: number; clientY: number }) => {
            const { clientX, clientY } = e;

            // 计算移动的距离
            const movX = clientX - initialPlace.startX;
            const movY = clientY - initialPlace.startY;

            if (parentRef.current && blockRef.current) {
                const { clientWidth: pW, clientHeight: pH } = parentRef.current;
                const { clientWidth: bW, clientHeight: bH } = blockRef.current;

                // 限制移动范围
                const maxX = pW - bW;
                const maxY = pH - bH;

                // @ts-ignore
                let newLeft = blockStyle.left + movX;
                // @ts-ignore
                let newTop = blockStyle.top + movY;

                newLeft = Math.max(0, Math.min(newLeft, maxX));
                newTop = Math.max(0, Math.min(newTop, maxY));

                // 更新位置
                // @ts-ignore
                block.style.top = newTop;
                // @ts-ignore
                block.style.left = newLeft;

                // 更新视图
                setCurrentSchema({ ...currentSchema });
            }
        };

        const blockMouseUp = () => {
            document.removeEventListener('mousemove', blockMouseMove);
            document.removeEventListener('mouseup', blockMouseUp);
        };

        // 通过 document 监听移动事件和鼠标抬起事件
        document.addEventListener('mousemove', blockMouseMove);
        document.addEventListener('mouseup', blockMouseUp);
    };

    //组件Effect

    return (
        <div
            className={`editor-block ${block.focus ? 'editor-block-focus' : ''}`}
            style={blockStyle}
            ref={blockRef}
            onMouseDown={handleMouseDown}
        >
            {RenderComponent}
        </div>
    );
};

//props类型定义
interface IProps {
    block: IComponent;
    onMouseDown: (e: any) => void;
    parentRef: React.MutableRefObject<null | HTMLElement>;
}

//prop-type定义，可选

export { Block };
