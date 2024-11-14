export interface IAuxiliaryLines {
    x: {
        /**
         * 垂直辅助线位置
         **/
        lineLeft: number;
        // 拖拽元素的左边界在这个位置的时候会触发辅助线显示
        triggerLeft: number;
    }[];
    y: {
        // 水平辅助线位置
        lineTop: number;
        // 拖拽元素的上边界在这个位置的时候会触发辅助线显示
        triggerTop: number;
    }[];
}
