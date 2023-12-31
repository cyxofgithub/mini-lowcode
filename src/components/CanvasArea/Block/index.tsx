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
    const { block, parentRef, ...otherProps } = _props;
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
        // 进行移动
        handleBlockMove(e);
    };

    const handleBlockMove = (e: { clientX: any; clientY: any }) => {
        // 1、记录鼠标拖动前的位置信息，以及所有选中元素的位置信息
        const startPlace = {
            startX: e.clientX,
            startY: e.clientY,
        };

        const blockMouseMove = (e: { clientX: any; clientY: any }) => {
            const { clientX: moveX, clientY: moveY } = e;
            const durX = moveX - startPlace.startX;
            const durY = moveY - startPlace.startY;

            const parentRect = parentRef.current?.getBoundingClientRect();
            const blockRect = blockRef.current?.getBoundingClientRect();

            if (parentRect && blockRect) {
                const maxX = parentRect.width - blockRect.width;
                const maxY = parentRect.height - blockRect.height;

                // @ts-ignore
                let newLeft = blockStyle.left + durX;
                // @ts-ignore
                let newTop = blockStyle.top + durY;

                newLeft = Math.max(0, Math.min(newLeft, maxX));
                newTop = Math.max(0, Math.min(newTop, maxY));

                // @ts-ignore
                block.style.top = newTop;
                // @ts-ignore
                block.style.left = newLeft;

                setCurrentSchema({ ...currentSchema });
            }
        };

        const blockMouseUp = () => {
            document.removeEventListener('mousemove', blockMouseMove);
            document.removeEventListener('mouseup', blockMouseUp);
        };

        // 2、通过 document 监听移动事件，计算每次移动的新位置，去改变 focus block 的 top 和 left
        document.addEventListener('mousemove', blockMouseMove);
        document.addEventListener('mouseup', blockMouseUp);
    };

    //组件Effect

    return (
        <div
            className={`editor-block ${block.focus ? 'editor-block-focus' : ''}`}
            style={blockStyle}
            ref={blockRef}
            {...otherProps}
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
