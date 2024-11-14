import { IBlock } from '../../../store';
import { IAuxiliaryLines } from '../declare';

/**
 * 获取辅助线信息
 **/
export const getLinesPlaceInfo = (focusBlock: IBlock, unFocusedBlocks: IBlock[]) => {
    // 计算纵线的位置使用 x 存放，横线的位置使用 y 存放；
    const lines: IAuxiliaryLines = { x: [], y: [] };

    // 收集拖拽模块移动到其他模块周围时，要显示的 10 条辅助信息
    const { width: focusBlockWidth = 0, height: focusBlockHeight = 0 } = focusBlock.style;
    unFocusedBlocks.forEach(block => {
        const {
            top: unFocusedBlockTop,
            left: unFocusedBlockLeft,
            width: unFocusedBlockWidth = 0,
            height: unFocusedBlockHeight = 0,
        } = block.style;

        // 垂直纵线显示的 5 种情况：（A代表聚焦元素， B代表未聚焦元素）
        // 情况一：左对左，线条展示在 A 的左边
        lines.x.push({ lineLeft: unFocusedBlockLeft, triggerLeft: unFocusedBlockLeft });
        // 情况二：左对右，线条显示在 A 的左边
        lines.x.push({ lineLeft: unFocusedBlockLeft, triggerLeft: unFocusedBlockLeft - focusBlockWidth });
        // 情况三：右对左，线条显示在 A 的右边
        lines.x.push({
            lineLeft: unFocusedBlockLeft + unFocusedBlockWidth,
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth,
        });
        // 情况四：右对右，线条显示在 A 的右边
        lines.x.push({
            lineLeft: unFocusedBlockLeft + unFocusedBlockWidth,
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth - focusBlockWidth,
        });
        // 情况五：中对中，线条显示在 A 的中间
        lines.x.push({
            lineLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2,
            triggerLeft: unFocusedBlockLeft + unFocusedBlockWidth / 2 - focusBlockWidth / 2,
        });

        // 水平横线显示的 5 种情况：（A代表聚焦元素， B代表未聚焦元素）
        // 情况一：A 和 B 顶和顶对，线条显示在 A 的上边
        lines.y.push({ lineTop: unFocusedBlockTop, triggerTop: unFocusedBlockTop });
        // 情况二：A 和 B 顶对底，线条显示在 A 的上边
        lines.y.push({ lineTop: unFocusedBlockTop, triggerTop: unFocusedBlockTop - focusBlockHeight });
        // 情况三：A 和 B 底对顶， 线条显示在 A 的下边
        lines.y.push({
            lineTop: unFocusedBlockTop + unFocusedBlockHeight,
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight,
        });
        // 情况四：A 和 B 底对底， 线条显示在 A 的下边
        lines.y.push({
            lineTop: unFocusedBlockTop + unFocusedBlockHeight,
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight - focusBlockHeight,
        });
        // 情况五：A 和 B 中对中， 线条显示在 A 的中间
        lines.y.push({
            lineTop: unFocusedBlockTop + unFocusedBlockHeight / 2,
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight / 2 - focusBlockHeight / 2,
        });
    });

    return lines;
};
