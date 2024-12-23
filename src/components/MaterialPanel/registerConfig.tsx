import { CSSProperties } from 'react';

export enum ScaleMode {
    // 四个角度缩放
    SquaringScale,
    // 横纵伸缩
    HorizontalVerticalScale,
}

export interface IComponent {
    label: string;
    preview: () => JSX.Element | string;
    render: () => JSX.Element | string;
    type: string;
    scaleMode: ScaleMode;
    style?: CSSProperties;
    focus?: boolean;
    element?: HTMLElement;
    offsetInfo?: {
        offsetX: number;
        offsetY: number;
    };
}

const createEditorConfig = () => {
    const componentList: IComponent[] = []; // 自定义组件（物料）
    const componentMap: Record<string, IComponent> = {}; // 组件和画布中元素的渲染映射

    return {
        componentList,
        componentMap,
        register: (component: IComponent) => {
            componentList.push(component);
            componentMap[component.type] = component;
        },
    };
};

const registerConfig = createEditorConfig();

registerConfig.register({
    label: '按钮',
    preview: () => <button style={{ display: 'inline-block', width: '100%', height: '100%' }}>四个角度缩放</button>,
    render: () => <button style={{ display: 'inline-block', width: '100%', height: '100%' }}>四个角度缩放</button>,
    type: 'text',
    scaleMode: ScaleMode.SquaringScale,
});

registerConfig.register({
    label: '按钮',
    preview: () => <button style={{ display: 'inline-block', width: '100%', height: '100%' }}>横纵伸缩</button>,
    render: () => <button style={{ display: 'inline-block', width: '100%', height: '100%' }}>横纵伸缩</button>,
    type: 'button',
    scaleMode: ScaleMode.HorizontalVerticalScale,
});

registerConfig.register({
    label: '输入框',
    preview: () => <input placeholder="预览输入框" />,
    render: () => <input placeholder="渲染输入框" />,
    type: 'input',
    scaleMode: ScaleMode.SquaringScale,
});

export default registerConfig;
