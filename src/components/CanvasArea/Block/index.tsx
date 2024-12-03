import { useEffect, useRef } from 'react';
import './index.css';
import registerConfig, { ScaleMode } from '../../MaterialPanel/registerConfig';
import React from 'react';
import { IBlock } from '../declare/block';
import { globalStore } from '../../../store';

//私有常量
const scaleDotPoints = ['lt', 'rt', 'lb', 'rb']; // 四角缩放
const scaleLinePoints = ['l', 'r', 't', 'b']; // 横竖缩放

const cursorPoints = {
    lt: 'nw',
    rt: 'ne',
    lb: 'sw',
    rb: 'se',
    l: 'w',
    r: 'e',
    t: 'n',
    b: 's',
};
//可抽离的逻辑处理函数/组件

/**
 * 【组件功能】
 *
 * 【应用模块】
 *
 */

let Block = (_props: IProps) => {
    //变量声明、解构
    const { currentSchema, updateCurrentSchema } = globalStore;
    const blockRef = useRef<any>();
    const { block, parentRef, onMouseDown } = _props;
    const blockStyle = {
        ...block.style,
    };

    const component = registerConfig.componentMap[block.type];
    const RenderComponent = component.render();

    //组件状态

    //网络IO

    //数据转换

    //逻辑处理函数
    const handleMouseDown = (e: any) => {
        onMouseDown(e);
        _onMouseDown(e);
    };

    const _onMouseDown = (e: { clientX: number; clientY: number }) => {
        // 记录起始位置
        const initialPlace = {
            startX: e.clientX,
            startY: e.clientY,
        };

        const _blockMouseMove = blockMouseMove(initialPlace);

        // 在抬起的时候移除移动和抬起事件
        const blockMouseUp = () => {
            document.removeEventListener('mousemove', _blockMouseMove);
            document.removeEventListener('mouseup', blockMouseUp);
        };

        // 动态绑定移动事件和鼠标抬起事件
        document.addEventListener('mousemove', _blockMouseMove);
        document.addEventListener('mouseup', blockMouseUp);
    };

    // 在移动的时候实时更新元素位置
    const blockMouseMove = (initialPlace: { startX: number; startY: number }) => {
        return (e: { clientX: number; clientY: number }) => {
            const { clientX, clientY } = e;

            // 计算移动的距离
            const movX = clientX - initialPlace.startX;
            const movY = clientY - initialPlace.startY;

            if (parentRef.current && blockRef.current) {
                const { clientWidth: pW, clientHeight: pH } = parentRef.current;
                const { clientWidth: bW, clientHeight: bH } = blockRef.current;

                // 限制移动范围在渲染区域内 start
                const maxX = pW - bW;
                const maxY = pH - bH;

                // @ts-ignore
                let newLeft = blockStyle.left + movX;
                // @ts-ignore
                let newTop = blockStyle.top + movY;

                newLeft = Math.max(0, Math.min(newLeft, maxX));
                newTop = Math.max(0, Math.min(newTop, maxY));
                // 限制移动范围在渲染区域内 end

                // 更新位置
                // @ts-ignore
                block.style.top = newTop;
                // @ts-ignore
                block.style.left = newLeft;
                // 更新视图
                updateCurrentSchema({ ...currentSchema });
            }
        };
    };

    const getShapeLineStyle = (point: string) => {
        const linePointStyles = {
            l: { width: 3, height: 16, left: -3, top: '50%', marginTop: -8 },
            r: { width: 3, height: 16, right: -3, top: '50%', marginTop: -8 },
            t: { width: 16, height: 3, top: -3, left: '50%', marginLeft: -8 },
            b: { width: 16, height: 3, bottom: -3, left: '50%', marginLeft: -8 },
        };
        return {
            // @ts-ignore
            ...linePointStyles[point],
            // @ts-ignore
            cursor: `${cursorPoints[point]}-resize`,
        };
    };

    const getShapeDotStyle = (point: string) => {
        const { width, height } = block?.style ?? { width: 0, height: 0 };
        const hasL = /l/.test(point),
            hasT = /t/.test(point);
        let left = hasL ? 0 : width,
            top = hasT ? 0 : height;
        const style: React.CSSProperties = {
            left,
            top,
            // @ts-ignore
            cursor: `${cursorPoints[point]}-resize`,
        };
        return style;
    };

    const handleMouseDownPoint = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, point: string) => {
        event.stopPropagation();
        const { clientX: startX, clientY: startY } = event;
        const { width, height, left, top } = block?.style ?? { width: 0, height: 0, left: 0, top: 0 };

        const pointMouseMove = (event: { clientX: any; clientY: any }) => {
            const hasL = /l/.test(point),
                hasT = /t/.test(point),
                hasR = /r/.test(point),
                hasB = /b/.test(point);
            let { clientX: moveX, clientY: moveY } = event;
            const durX = moveX - startX,
                durY = moveY - startY;
            block.style = {
                ...block.style,
                // @ts-ignore
                width: Math.max(10, width + (hasL ? -durX : hasR ? durX : 0)), // 不存在 l 和 r，说明纵向缩放，width 不动
                // @ts-ignore
                height: Math.max(10, height + (hasT ? -durY : hasB ? durY : 0)), // 不存在 t 和 b，说明横向缩放，height 不动
                // @ts-ignore
                left: Math.min(left + width, left + (hasL ? durX : 0)), // 从左向右拖，不能超过 right，从右往左拖，left 不动
                // @ts-ignore
                top: Math.min(top + height, top + (hasT ? durY : 0)), // 从上往下拖，不能超过 bottom，从下往上拖，top 不懂
            };

            updateCurrentSchema({ ...currentSchema });
        };

        const pointMouseUp = () => {
            document.removeEventListener('mousemove', pointMouseMove);
            document.removeEventListener('mouseup', pointMouseUp);
        };

        document.addEventListener('mousemove', pointMouseMove);
        document.addEventListener('mouseup', pointMouseUp);
    };

    // 用于阻止冒泡
    const handleClickBlock = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    useEffect(() => {
        if (!blockRef.current) return;
        let { width, height } = blockRef.current.getBoundingClientRect();
        const offsetWidth = Math.ceil(width),
            offsetHeight = Math.ceil(height);
        const { style } = block;

        // block 初渲染至画布上时，记录一下尺寸大小，用于辅助线显示
        style.width = offsetWidth;
        style.height = offsetHeight;
    }, [block]);

    return (
        <div
            className={`editor-block ${block.focus ? 'editor-block-focus' : ''}`}
            style={blockStyle}
            ref={blockRef}
            onMouseDown={handleMouseDown}
            onClick={handleClickBlock}
        >
            {RenderComponent}
            {block.focus ? (
                <div className="block-focus-shape">
                    {block.scaleMode === ScaleMode.HorizontalVerticalScale
                        ? scaleLinePoints.map(point => (
                              <span
                                  key={point}
                                  className="block-focus-shape__line"
                                  onMouseDown={event => handleMouseDownPoint(event, point)}
                                  style={getShapeLineStyle(point)}
                              ></span>
                          ))
                        : scaleDotPoints.map(point => (
                              <span
                                  key={point}
                                  className="block-focus-shape__dot"
                                  onMouseDown={event => handleMouseDownPoint(event, point)}
                                  style={getShapeDotStyle(point)}
                              ></span>
                          ))}
                </div>
            ) : null}
        </div>
    );
};

//props类型定义
interface IProps {
    block: IBlock;
    onMouseDown: (e: any) => void;
    parentRef: React.MutableRefObject<null | HTMLElement>;
}

//prop-type定义，可选

export { Block };
