import { globalStore } from '../../../store';
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
    const { width: focusBlockWidth = 0, height: focusBlockHeight = 0 } = focusBlock.style;

    unFocusBlocks.forEach(block => {
        const {
            top: unFocusedBlockTop,
            left: unFocusedBlockLeft,
            width: unFocusedBlockWidth = 0,
            height: unFocusedBlockHeight = 0,
        } = block.style;

        // 垂直纵线显示的 5 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：左对左，线条展示在 A 的左边
        lines.x.push({
            triggerLeft: unFocusedBlockLeft,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.L2L,
        });
        // 情况二：左对右，线条显示在 A 的左边
        lines.x.push({
            triggerLeft: unFocusedBlockLeft - focusBlockWidth,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.L2R,
        });
        // 情况三：右对左，线条显示在 A 的右边
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.R2L,
        });
        // 情况四：右对右，线条显示在 A 的右边
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth - focusBlockWidth,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.R2R,
        });
        // 情况五：中对中，线条显示在 A 的中间
        lines.x.push({
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2 - focusBlockWidth / 2,
            triggerBlock: block,
            triggerCondition: XLineTriggerCondition.C2C,
        });

        // 水平横线显示的 5 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：A 和 B 顶和顶对，线条显示在 A 的上边
        lines.y.push({
            triggerTop: unFocusedBlockTop,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.T2T,
        });
        // 情况二：A 和 B 顶对底，线条显示在 A 的上边
        lines.y.push({
            triggerTop: unFocusedBlockTop - focusBlockHeight,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.T2B,
        });
        // 情况三：A 和 B 底对顶， 线条显示在 A 的下边
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.B2T,
        });
        // 情况四：A 和 B 底对底， 线条显示在 A 的下边
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight - focusBlockHeight,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.B2B,
        });
        // 情况五：A 和 B 中对中， 线条显示在 A 的中间
        lines.y.push({
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight / 2 - focusBlockHeight / 2,
            triggerBlock: block,
            triggerCondition: YLineTriggerCondition.C2C,
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

    const container = globalStore.currentSchema.container;
    const isFilledContainerBlock = container.width === unFocusedBlockWidth && container.height === unFocusedBlockHeight;

    // 容器也是一个 block，用于实现对其容器边界时的辅助线
    const xLength = isFilledContainerBlock ? container.height : xLineLength;
    const xTop = isFilledContainerBlock ? 0 : xLineTop;
    const yLength = isFilledContainerBlock ? container.width : yLineLength;
    const yLeft = isFilledContainerBlock ? 0 : yLineLeft;

    switch (triggerCondition) {
        // 垂直纵线显示的 5 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：左对左，线条展示在 A 的左边
        case XLineTriggerCondition.L2L:
            return {
                lineLeft: unFocusedBlockLeft,
                lineTop: xTop,
                length: xLength,
            };
        // 情况二：左对右，线条显示在 A 的左边
        case XLineTriggerCondition.L2R:
            return {
                lineLeft: unFocusedBlockLeft,
                lineTop: xTop,
                length: xLength,
            };
        // 情况三：右对左，线条显示在 A 的右边
        case XLineTriggerCondition.R2L:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth,
                lineTop: xTop,
                length: xLength,
            };
        // 情况四：右对右，线条显示在 A 的右边
        case XLineTriggerCondition.R2R:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth,
                lineTop: xTop,
                length: xLength,
            };
        // 情况五：中对中，线条显示在 A 的中间
        case XLineTriggerCondition.C2C:
            return {
                lineLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2,
                lineTop: xTop,
                length: xLength,
            };

        // 水平横线显示的 5 种情况：（A代表未聚焦元素， B代表聚焦元素）
        // 情况一：A 和 B 顶和顶对，线条显示在 A 的上边
        case YLineTriggerCondition.T2T:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop,
                length: yLength,
            };
        // 情况二：A 和 B 顶对底，线条显示在 A 的上边
        case YLineTriggerCondition.T2B:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop,
                length: yLength,
            };
        // 情况三：A 和 B 底对顶， 线条显示在 A 的下边
        case YLineTriggerCondition.B2T:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop + unFocusedBlockHeight,
                length: yLength,
            };
        // 情况四：A 和 B 底对底， 线条显示在 A 的下边
        case YLineTriggerCondition.B2B:
            return {
                lineLeft: yLeft,
                lineTop: unFocusedBlockTop + unFocusedBlockHeight,
                length: yLength,
            };
        // 情况五：A 和 B 中对中， 线条显示在 A 的中间
        case YLineTriggerCondition.C2C:
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
