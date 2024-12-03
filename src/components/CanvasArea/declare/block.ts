import { IComponent } from '../../MaterialPanel/registerConfig';

export type IBlock = Pick<IComponent, 'type' | 'focus'> & {
    style: {
        /**
         * block 相对于 container 的左边距
         */
        left: number;
        /**
         * block 相对于 container 的上边距
         */
        top: number;
        width?: number;
        height?: number;
        zIndex?: number;
    };
    focus: boolean;
    scaleMode: IComponent['scaleMode'];
};
