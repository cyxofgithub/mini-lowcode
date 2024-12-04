interface IAuxiliaryLineBaseInfo {
    /**
     * 垂直辅助线top值
     */
    lineTop: number;
    /**
     * 垂直辅助线位置
     **/
    lineLeft: number;
    /**
     * 垂直辅助线长度
     */
    length: number;
}

export interface IXAuxiliaryLine extends IAuxiliaryLineBaseInfo {
    /**
     * 触发辅助线显示的位置
     */
    triggerLeft: number;
}

export interface IYAuxiliaryLine extends IAuxiliaryLineBaseInfo {
    /**
     * 触发辅助线显示的位置
     */
    triggerTop: number;
}

export interface IAuxiliaryLines {
    x: IXAuxiliaryLine[];
    y: IYAuxiliaryLine[];
}

export interface IAuxiliaryLine {
    x: IAuxiliaryLineBaseInfo | null;
    y: IAuxiliaryLineBaseInfo | null;
}

export const TriggerGap = 8;
