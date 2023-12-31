import './index.css';
import React, { useEffect, useRef } from 'react';
import { GlobalContext } from '../../store';
import { Block } from './Block';
import { IComponent } from '../MaterialPanel/registerConfig';

//私有常量

//可抽离的逻辑处理函数/组件

/**
 * 【组件功能】
 *
 * 【应用模块】
 *
 */

let CanvasArea = (_props: IProps) => {
    //变量声明、解构
    const { currentMaterial, setCurrentMaterial, setCurrentSchema, currentSchema } = React.useContext(GlobalContext);
    const ref = useRef(null);

    //组件状态

    //网络IO

    //数据转换

    //逻辑处理函数
    const handleDragEnter = (event: { dataTransfer: { dropEffect: string } }) =>
        (event.dataTransfer.dropEffect = 'move');

    const handleDragOver = (event: { preventDefault: () => any }) => event.preventDefault();

    const handleDragLeave = (event: { dataTransfer: { dropEffect: string } }) =>
        (event.dataTransfer.dropEffect = 'none');

    const handleDrop = (event: any) => {
        const { offsetX, offsetY } = event.nativeEvent;
        const config = {
            type: currentMaterial?.type,
            alignCenter: true, // 表示拖拽到画布后，基于鼠标位置居中展示
            focus: false,
            style: {
                width: undefined,
                height: undefined,
                left: offsetX,
                top: offsetY,
                zIndex: 1,
            },
        };
        currentSchema.blocks.push(config);
        setCurrentSchema({ ...currentSchema });
        setCurrentMaterial(null);
    };

    const cleanBlocksFocus = (refresh?: boolean) => {
        currentSchema.blocks.forEach((block: IComponent) => (block.focus = false));
        refresh && setCurrentSchema({ ...currentSchema });
    };

    const handleMouseDown = (
        e: { preventDefault: () => void; stopPropagation: () => void },
        block: IComponent,
        index: number
    ) => {
        e.preventDefault();
        e.stopPropagation();

        cleanBlocksFocus();
        currentSchema.blocks[index].focus = true;

        setCurrentSchema({ ...currentSchema });
    };

    //组件Effect
    useEffect(() => {
        console.log(currentSchema);
    }, [currentSchema]);

    return (
        <div
            id="canvas-container"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ ...currentSchema.container }}
            ref={ref}
        >
            {currentSchema.blocks.map((block: IComponent, index: number) => (
                <Block key={index} block={block} onMouseDown={e => handleMouseDown(e, block, index)} parentRef={ref} />
            ))}
        </div>
    );
};

//props类型定义
interface IProps {}

//prop-type定义，可选

export { CanvasArea };
