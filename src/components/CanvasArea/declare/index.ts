import { IBlock } from './block';

export enum XLineTriggerCondition {
    /**
     * 左对左
     */
    L2L = 'L2L',
    /**
     * 左对右
     */
    L2R = 'L2R',
    /**
     * 右对左
     */
    R2L = 'R2L',
    /**
     * 右对右
     */
    R2R = 'R2R',
    /**
     * 中对中
     */
    C2C = 'C2C',
}

export enum YLineTriggerCondition {
    /**
     * 上对上
     */
    T2T = 'T2T',
    /**
     * 上对下
     */
    T2B = 'T2B',
    /**
     * 下对上
     */
    B2T = 'B2T',
    /**
     * 下对下
     */
    B2B = 'B2B',
    /**
     * 中对中
     */
    C2C = 'C2C',
}
export interface IAuxiliaryLineInfo {
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

export interface IAuxiliaryLineInfos {
    x: IAuxiliaryLineInfo | null;
    y: IAuxiliaryLineInfo | null;
}

export interface IXAuxiliaryLineTriggerInfo {
    /**
     * 触发辅助线显示的位置
     */
    triggerLeft: number;
    /**
     * 触发辅助线显示的block
     */
    triggerBlock: IBlock;
    /**
     * 触发辅助线显示的条件
     */
    triggerCondition: XLineTriggerCondition;
}

export interface IYAuxiliaryLineTriggerInfo {
    /**
     * 触发辅助线显示的位置
     */
    triggerTop: number;
    /**
     * 触发辅助线显示的block
     */
    triggerBlock: IBlock;
    /**
     * 触发辅助线显示的条件
     */
    triggerCondition: YLineTriggerCondition;
}

export interface IAuxiliaryLineTriggerInfos {
    x: IXAuxiliaryLineTriggerInfo[];
    y: IYAuxiliaryLineTriggerInfo[];
}

export const TriggerGap = 8;
