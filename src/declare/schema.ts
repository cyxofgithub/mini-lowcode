import { IBlock } from '../components/CanvasArea/declare/block';

export interface ISchema {
    container: {
        width: number;
        height: number;
    };
    blocks: IBlock[];
}
