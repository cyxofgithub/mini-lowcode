import { IBlock } from './block';

export enum XLineTriggerCondition {
    /**
     * 左对左
     */
    XL2L = 'XL2L',
    /**
     * 左对右
     */
    XL2R = 'XL2R',
    /**
     * 右对左
     */
    XR2L = 'XR2L',
    /**
     * 右对右
     */
    XR2R = 'XR2R',
    /**
     * 中对中
     */
    XC2C = 'XC2C',

    /**
     * 一个容器包裹另一个容器的情况
     * 中对中
     */
    XC2CIn = 'XC2CIn',
    /**
     * 一个容器包裹另一个容器的情况
     * 中对左
     */
    XC2LIn = 'XC2LIn',
    /**
     * 一个容器包裹另一个容器的情况
     * 中对右
     */
    XC2RIn = 'XC2RIn',
}

export enum YLineTriggerCondition {
    /**
     * 上对上
     */
    YT2T = 'YT2T',
    /**
     * 上对下
     */
    YT2B = 'YT2B',
    /**
     * 下对上
     */
    YB2T = 'YB2T',
    /**
     * 下对下
     */
    YB2B = 'YB2B',
    /**
     * 中对中
     */
    YC2C = 'YC2C',

    /**
     * 一个容器包裹另一个容器的情况
     * 中对中
     */
    YC2CIn = 'YC2CIn',
    /**
     * 一个容器包裹另一个容器的情况
     * 中对上
     */
    YC2TIn = 'YC2TIn',
    /**
     * 一个容器包裹另一个容器的情况
     * 中对下
     */
    YC2BIn = 'YC2BIn',
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

export const TriggerGap = 5;
