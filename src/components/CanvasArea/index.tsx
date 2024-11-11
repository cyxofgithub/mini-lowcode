import './index.css';
import React, { useRef, useState } from 'react';
import { GlobalContext, IBlock } from '../../store';
import { Block } from './Block';

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

    // 记录当前选中拖动的 block 索引
    const currentBlockIndex = useRef(-1);
    // 水平、垂直辅助线显示的位置
    const [markLine, setMarkLine] = useState({ x: null, y: null });

    const dragState = useRef<any>();

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
        if (!currentMaterial) return;
        // 1、 获取元素位置
        const { offsetX, offsetY } = event.nativeEvent;
        const { clientWidth, clientHeight } = currentMaterial.element ?? { clientWidth: 0, clientHeight: 0 };

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
            type: currentMaterial.type,
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
        currentSchema.blocks.forEach((block: IBlock) => (block.focus = false));
        refresh && setCurrentSchema({ ...currentSchema });
    };

    const handleMouseDown = (e: any, index: number) => {
        e.preventDefault();
        e.stopPropagation();

        cleanBlocksFocus();
        currentSchema.blocks[index].focus = true;
        currentBlockIndex.current = index;

        handleBlockMove(e);

        setCurrentSchema({ ...currentSchema });
    };

    const blocksFocusInfo = () => {
        const focusBlocks: Pick<IBlock, 'style'>[] = [];
        const unfocusedBlocks: Pick<IBlock, 'style'>[] = [
            // 画布的边界也是一个 block，用于实现 block 移动时的辅助线
            {
                style: {
                    left: 0,
                    top: 0,
                    width: currentSchema.container.width,
                    height: currentSchema.container.height,
                },
            },
        ];

        currentSchema.blocks.forEach(block => {
            if (block.focus) {
                focusBlocks.push({ style: { ...block.style } });
            } else {
                unfocusedBlocks.push({ style: { ...block.style } });
            }
        });

        return { focusBlocks, unfocusedBlocks };
    };

    const handleBlockMove = (e: { clientX: any; clientY: any }) => {
        const { focusBlocks, unfocusedBlocks } = blocksFocusInfo();
        const lastSelectBlock = currentSchema.blocks[currentBlockIndex.current];
        // 我们声明：B 代表最近一个选中拖拽的元素，A 则是对应的参照物，对比两者的位置
        const { width: BWidth = 0, height: BHeight = 0, left: BLeft, top: BTop } = lastSelectBlock.style;

        dragState.current = {
            // 用于实现 block 在画布上进行移动
            startX: e.clientX,
            startY: e.clientY,
            startPos: focusBlocks.map(({ style }) => ({ top: style.top, left: style.left })),

            // 用于实现 block 在画布上的辅助线
            startLeft: BLeft,
            startTop: BTop,

            // 找到其余 A block（unfocusedBlocks）作为参照物时，参照物周围可能出现的 lines
            lines: (() => {
                const lines: {
                    x: { showLeft: number; left: number }[];
                    y: { showTop: number; top: number }[];
                } = { x: [], y: [] }; // 计算横线的位置使用 y 存放；纵线的位置使用 x 存放。

                // 收集 B 移动到每个 unfocusedBlocks 周围时，要显示的 10 条线信息
                unfocusedBlocks.forEach(block => {
                    const { top: ATop, left: ALeft, width: AWidth = 0, height: AHeight = 0 } = block.style;

                    // 水平横线显示的 5 种情况：（可以对着上图来看）
                    lines.y.push({ showTop: ATop, top: ATop }); // 情况一：A 和 B 顶和顶对其。当拖拽元素移动到 ATop（lines.y.top） 位置时，显示这根辅助线，辅助线的位置是 ATop（lines.y.showTop）
                    lines.y.push({ showTop: ATop, top: ATop - BHeight }); // 情况二：A 和 B 顶对底
                    lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2 }); // 情况三：A 和 B 中对中
                    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight }); // 情况四：A和B 底对顶
                    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight }); // 情况四：A和B 底对底

                    // 垂直纵线显示的 5 种情况：（可以对着上图来看）
                    lines.x.push({ showLeft: ALeft, left: ALeft }); // A 和 B 左对左，线条显示在 A 的左边
                    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }); // A 和 B 右对左，线条显示在 A 的右边
                    lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - BWidth / 2 }); // A 和 B 中对中，线条显示在 A 的中间
                    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth }); // A 和 B 右对右，线条显示在 A 的右边
                    lines.x.push({ showLeft: ALeft, left: ALeft - BWidth }); // A 和 B 左对右，线条显示在 A 的左边
                });

                return lines;
            })(),
        };

        const blockMouseMove = (e: { clientX: any; clientY: any }) => {
            let { clientX: moveX, clientY: moveY } = e;

            // 计算鼠标拖动后，B block 最新的 left 和 top 值
            let left = moveX - dragState.current.startX + dragState.current.startLeft;
            let top = moveY - dragState.current.startY + dragState.current.startTop;
            let x = null,
                y = null;

            // 将当前 B block 移动的位置，和上面记录的 lines 进行一一比较，如果移动到的范围内有 A block 存在，显示对应的辅助线
            for (let i = 0; i < dragState.current.lines.x.length; i++) {
                const { left: l, showLeft: s } = dragState.current.lines.x[i];
                if (Math.abs(l - left) < 5) {
                    // 接近 5 像素距离时显示辅助线
                    x = s;
                    break;
                }
            }
            for (let i = 0; i < dragState.current.lines.y.length; i++) {
                const { top: t, showTop: s } = dragState.current.lines.y[i];
                if (Math.abs(t - top) < 5) {
                    // 接近 5 像素距离时显示辅助线
                    y = s;
                    break;
                }
            }

            setMarkLine({ x, y });

            const durX = moveX - dragState.current.startX;
            const durY = moveY - dragState.current.startY;

            focusBlocks.forEach((block, index) => {
                block.style.top = dragState.current.startPos[index].top + durY;
                block.style.left = dragState.current.startPos[index].left + durX;
            });

            setCurrentSchema({ ...currentSchema });
        };

        const blockMouseUp = () => {
            document.removeEventListener('mousemove', blockMouseMove);
            document.removeEventListener('mouseup', blockMouseUp);
            setMarkLine({ x: null, y: null });
        };

        document.addEventListener('mousemove', blockMouseMove);
        document.addEventListener('mouseup', blockMouseUp);
    };

    // 点击画布空白处时清空所有 block 的 focus 状态
    const handleClickCanvas = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        currentBlockIndex.current = -1;
        cleanBlocksFocus(true);
    };

    return (
        <div
            id="canvas-container"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickCanvas}
            style={{ ...currentSchema.container }}
            ref={ref}
        >
            {currentSchema.blocks.map((block: IBlock, index: number) => (
                <Block key={index} block={block} onMouseDown={e => handleMouseDown(e, index)} parentRef={ref} />
            ))}
            {markLine.x !== null && <div className="editor-line-x" style={{ left: markLine.x }}></div>}
            {markLine.y !== null && <div className="editor-line-y" style={{ top: markLine.y }}></div>}
        </div>
    );
};

//props类型定义
interface IProps {}

//prop-type定义，可选

export { CanvasArea };
