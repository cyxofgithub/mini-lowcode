import { IBlock } from '../../../store';

/**
 * 获取辅助线信息
 **/
export const getLinesPlaceInfo = (focusBlock: IBlock, unFocusedBlocks: IBlock[]) => {
    // 计算横线的位置使用 y 存放；纵线的位置使用 x 存放。
    // 我们声明：B 代表最近一个选中拖拽的元素，A 则是对应的参照物，对比两者的位置
    const { width: focusBlockWidth = 0, height: focusBlockHeight = 0 } = focusBlock.style;
    const lines: {
        x: {
            // 辅助线位置
            lineLeft: number;
            // 触发辅助线显示的位置
            triggerLeft: number;
        }[];
        y: {
            lineTop: number;
            triggerTop: number;
        }[];
    } = { x: [], y: [] };

    // 收集 B 移动到每个 unFocusedBlocks 周围时，要显示的 10 条线信息
    unFocusedBlocks.forEach(block => {
        const {
            top: unFocusedBlockTop,
            left: unFocusedBlockLeft,
            width: unFocusedBlock = 0,
            height: unFocusedBlockHeight = 0,
        } = block.style;

        // 水平横线显示的 5 种情况：（A代表聚焦元素， B代表未聚焦元素）
        // 情况一：A 和 B 顶和顶对，线条显示在 A 的上边
        lines.y.push({ lineTop: unFocusedBlockTop, triggerTop: unFocusedBlockTop });
        // 情况二：A 和 B 顶对底，线条显示在 A 的上边
        lines.y.push({ lineTop: unFocusedBlockTop, triggerTop: unFocusedBlockTop - focusBlockHeight });
        // 情况三：A 和 B 中对中， 线条显示在 A 的中间
        lines.y.push({
            lineTop: unFocusedBlockTop + unFocusedBlockHeight / 2,
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight / 2 - focusBlockHeight / 2,
        });
        // 情况四：A 和 B 底对顶， 线条显示在 A 的下边
        lines.y.push({
            lineTop: unFocusedBlockTop + unFocusedBlockHeight,
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight,
        });
        // 情况五：A 和 B 底对底， 线条显示在 A 的下边
        lines.y.push({
            lineTop: unFocusedBlockTop + unFocusedBlockHeight,
            triggerTop: unFocusedBlockTop + unFocusedBlockHeight - focusBlockHeight,
        });

        // 垂直纵线显示的 5 种情况：（A代表聚焦元素， B代表未聚焦元素）
        // 情况一：A 和 B 左对左，线条展示在 A 的左边
        lines.x.push({ lineLeft: unFocusedBlockLeft, triggerLeft: unFocusedBlockLeft });
        // 情况二：A 和 B 右对左，线条显示在 A 的右边
        lines.x.push({
            lineLeft: unFocusedBlockLeft + unFocusedBlock,
            triggerLeft: unFocusedBlockLeft + unFocusedBlock,
        });
        // A 和 B 中对中，线条显示在 A 的中间
        lines.x.push({
            lineLeft: unFocusedBlockLeft + unFocusedBlock / 2,
            triggerLeft: unFocusedBlockLeft + unFocusedBlock / 2 - focusBlockWidth / 2,
        });
        // A 和 B 右对右，线条显示在 A 的右边
        lines.x.push({
            lineLeft: unFocusedBlockLeft + unFocusedBlock,
            triggerLeft: unFocusedBlockLeft + unFocusedBlock - focusBlockWidth,
        });
        // A 和 B 左对右，线条显示在 A 的左边
        lines.x.push({ lineLeft: unFocusedBlockLeft, triggerLeft: unFocusedBlockLeft - focusBlockWidth });
    });

    return lines;
};
