import './index.css';
import React, { useRef } from 'react';
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
    //当拖拽元素进入渲染区域时改变光标手势，表示元素进入渲染区域
    const handleDragEnter = (event: { dataTransfer: { dropEffect: string } }) =>
        (event.dataTransfer.dropEffect = 'move');

    //当拖拽元素离开渲染区域时恢复正常光标，表示元素离开渲染区域
    const handleDragLeave = (event: { dataTransfer: { dropEffect: string } }) =>
        (event.dataTransfer.dropEffect = 'none');

    //取消默认的拖放行为，如阻止打开文件链接
    const handleDragOver = (event: { preventDefault: () => any }) => event.preventDefault();

    //当放置元素时生成元素配置加入渲染区域渲染
    const handleDrop = (event: any) => {
        // 1、 获取元素位置
        const { offsetX, offsetY } = event.nativeEvent;
        const { clientWidth, clientHeight } = currentMaterial?.element ?? { clientWidth: 0, clientHeight: 0 };

        // 开始拖拽元素时鼠标相对于元素的左边缘位置信息
        const offsetInfo = currentMaterial?.offsetInfo ?? { offsetX: 0, offsetY: 0 };

        // 两个值相减即可得修正后元素偏移量
        const left = offsetX - offsetInfo.offsetX;
        const top = offsetY - offsetInfo.offsetY;

        // 元素可偏移的最大位置
        const maxLeft = currentSchema.container.width - clientWidth;
        const maxTop = currentSchema.container.height - clientHeight;

        // 限制元素位置不超出渲染区域
        const curLeft = Math.max(Math.min(left, maxLeft), 0);
        const curTop = Math.max(Math.min(top, maxTop), 0);

        // 2、生成组件配置
        const config = {
            type: currentMaterial?.type,
            focus: false,
            style: {
                left: curLeft,
                top: curTop,
                zIndex: 1,
            },
        };
        // 3、将组件配置加入画布配置中
        currentSchema.blocks.push(config);
        // 4、更新画布配置
        setCurrentSchema({ ...currentSchema });
        // 5、清空当前选中的物料组件
        setCurrentMaterial(null);
    };

    const cleanBlocksFocus = (refresh?: boolean) => {
        currentSchema.blocks.forEach((block: IComponent) => (block.focus = false));
        refresh && setCurrentSchema({ ...currentSchema });
    };

    const handleMouseDown = (e: { preventDefault: () => void; stopPropagation: () => void }, index: number) => {
        e.preventDefault();
        e.stopPropagation();

        cleanBlocksFocus();
        currentSchema.blocks[index].focus = true;

        setCurrentSchema({ ...currentSchema });
    };

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
                <Block key={index} block={block} onMouseDown={e => handleMouseDown(e, index)} parentRef={ref} />
            ))}
        </div>
    );
};

//props类型定义
interface IProps {}

//prop-type定义，可选

export { CanvasArea };
