import {
    IAuxiliaryLineInfo,
    IAuxiliaryLineTriggerInfos,
    XLineTriggerCondition,
    YLineTriggerCondition,
} from '../declare';
import { IBlock } from '../declare/block';

/**
 * 获取辅助线信息
 **/
export const getLinesPlaceInfo = (focusBlock: IBlock, unFocusBlocks: IBlock[]) => {
    // 计算纵线的位置使用 x 存放，横线的位置使用 y 存放；
    const lines: IAuxiliaryLineTriggerInfos = { x: [], y: [] };

    // 收集拖拽模块移动到其他模块周围时，要显示的 10 条辅助信息
    const { width: focusBlockWidth = 0, height: focusBlockHeight = 0, left: focusBlockLeft } = focusBlock.style;

    unFocusBlocks.forEach(block => {
        const {
            top: unFocusedBlockTop,
            left: unFocusedBlockLeft,
            width: unFocusedBlockWidth = 0,
            height: unFocusedBlockHeight = 0,
        } = block.style;

        // 未聚焦元素包裹聚焦元素的情况
        // 垂直纵线显示的 3 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：中对中
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2 - focusBlockWidth / 2,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.XC2CIn,
        });
        // 情况二：中对左
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.XC2LIn,
        });
        // 情况三：中对右
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2 - focusBlockWidth,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.XC2RIn,
        });

        // 水平横线显示的 3 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：中对中
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight / 2 - focusBlockHeight / 2,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.YC2CIn,
        });
        // 情况二：中对上
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight / 2,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.YC2CIn,
        });
        // 情况三：中对下
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight / 2 - focusBlockHeight,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.YC2CIn,
        });

        // 垂直纵线显示的 5 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：左对左，线条展示在 A 的左边
        lines.x.push({
            triggerLeft: unFocusedBlockLeft,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.XL2L,
        });
        // 情况二：左对右，线条显示在 A 的左边
        lines.x.push({
            triggerLeft: unFocusedBlockLeft - focusBlockWidth,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.XL2R,
        });
        // 情况三：右对左，线条显示在 A 的右边
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.XR2L,
        });
        // 情况四：右对右，线条显示在 A 的右边
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth - focusBlockWidth,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.XR2R,
        });
        // 情况五：中对中，线条显示在 A 的中间
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2 - focusBlockWidth / 2,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.XC2C,
        });

        // 水平横线显示的 5 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：A 和 B 顶和顶对，线条显示在 A 的上边
        lines.y.push({
            triggerTop: unFocusedBlockTop,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.YT2T,
        });
        // 情况二：A 和 B 顶对底，线条显示在 A 的上边
        lines.y.push({
            triggerTop: unFocusedBlockTop - focusBlockHeight,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.YT2B,
        });
        // 情况三：A 和 B 底对顶， 线条显示在 A 的下边
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.YB2T,
        });
        // 情况四：A 和 B 底对底， 线条显示在 A 的下边
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight - focusBlockHeight,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.YB2B,
        });
        // 情况五：A 和 B 中对中， 线条显示在 A 的中间
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight / 2 - focusBlockHeight / 2,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.YC2C,
        });
    });

    return lines;
};

/**
 * 获取线的信息
 */
export const getLineInfo: (params: {
    focusBlock: IBlock;
    unFocusBlock: IBlock;
    triggerCondition: XLineTriggerCondition | YLineTriggerCondition;
}) => IAuxiliaryLineInfo = params => {
    const { focusBlock, unFocusBlock, triggerCondition } = params;

    const {
        width: focusBlockWidth = 0,
        height: focusBlockHeight = 0,
        top: focusBlockTop,
        left: focusBlockLeft,
    } = focusBlock.style;
    const {
        top: unFocusedBlockTop,
        left: unFocusedBlockLeft,
        width: unFocusedBlockWidth = 0,
        height: unFocusedBlockHeight = 0,
    } = unFocusBlock.style;

    const xLineTop =
        unFocusedBlockTop > focusBlockTop ? focusBlockTop + focusBlockHeight : unFocusedBlockTop + unFocusedBlockHeight;
    const xLineLength = unFocusedBlockTop > focusBlockTop ? unFocusedBlockTop - xLineTop : focusBlockTop - xLineTop;

    const yLineLeft =
        unFocusedBlockLeft > focusBlockLeft
            ? focusBlockLeft + focusBlockWidth
            : unFocusedBlockLeft + unFocusedBlockWidth;

    const yLineLength =
        unFocusedBlockLeft > focusBlockLeft ? unFocusedBlockLeft - yLineLeft : focusBlockLeft - yLineLeft;

    const xLength = xLineLength;
    const xTop = xLineTop;
    const yLength = yLineLength;
    const yLeft = yLineLeft;

    switch (triggerCondition) {
        // 未聚焦元素包裹聚焦元素的情况
        // 垂直纵线显示的 3 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 中对中、中对左、中对右
        case XLineTriggerCondition.XC2CIn:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2,
                lineTop: unFocusedBlockTop,
                length: unFocusedBlockHeight,
            };
        case XLineTriggerCondition.XC2LIn:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2,
                lineTop: unFocusedBlockTop,
                length: unFocusedBlockHeight,
            };
        case XLineTriggerCondition.XC2RIn:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2,
                lineTop: unFocusedBlockTop,
                length: unFocusedBlockHeight,
            };
        // 水平横线显示的 3 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 中对中、中对上、中对下
        case YLineTriggerCondition.YC2CIn:
            return {
                lineLeft: unFocusedBlockLeft,
                lineTop: unFocusedBlockTop + unFocusedBlockHeight / 2,
                length: unFocusedBlockWidth,
            };
        case YLineTriggerCondition.YC2TIn:
            return {
                lineLeft: unFocusedBlockLeft,
                lineTop: unFocusedBlockTop + unFocusedBlockHeight / 2,
                length: unFocusedBlockWidth,
            };
        case YLineTriggerCondition.YC2BIn:
            return {
                lineLeft: 0,
                lineTop: unFocusedBlockTop + unFocusedBlockHeight / 2,
                length: unFocusedBlockWidth,
            };

        // 垂直纵线显示的 5 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：左对左，线条展示在 A 的左边
        case XLineTriggerCondition.XL2L:
            return {
                lineLeft: unFocusedBlockLeft,
                lineTop: xTop,
                length: xLength,
            };
        // 情况二：左对右，线条显示在 A 的左边
        case XLineTriggerCondition.XL2R:
            return {
                lineLeft: unFocusedBlockLeft,
                lineTop: xTop,
                length: xLength,
            };
        // 情况三：右对左，线条显示在 A 的右边
        case XLineTriggerCondition.XR2L:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth,
                lineTop: xTop,
                length: xLength,
            };
        // 情况四：右对右，线条显示在 A 的右边
        case XLineTriggerCondition.XR2R:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth,
                lineTop: xTop,
                length: xLength,
            };
        // 情况五：中对中，线条显示在 A 的中间
        case XLineTriggerCondition.XC2C:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2,
                lineTop: xTop,
                length: xLength,
            };

        // 水平横线显示的 5 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：A 和 B 顶和顶对，线条显示在 A 的上边
        case YLineTriggerCondition.YT2T:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop,
                length: yLength,
            };
        // 情况二：A 和 B 顶对底，线条显示在 A 的上边
        case YLineTriggerCondition.YT2B:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop,
                length: yLength,
            };
        // 情况三：A 和 B 底对顶， 线条显示在 A 的下边
        case YLineTriggerCondition.YB2T:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop + unFocusedBlockHeight,
                length: yLength,
            };
        // 情况四：A 和 B 底对底， 线条显示在 A 的下边
        case YLineTriggerCondition.YB2B:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop + unFocusedBlockHeight,
                length: yLength,
            };
        // 情况五：A 和 B 中对中， 线条显示在 A 的中间
        case YLineTriggerCondition.YC2C:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop + unFocusedBlockHeight / 2,
                length: yLength,
            };
        default:
            return {
                lineLeft: 0,
                lineTop: 0,
                length: 0,
            };
    }
};
