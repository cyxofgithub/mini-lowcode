import { CSSProperties } from 'react';

export interface IComponent {
    label: string;
    preview: () => JSX.Element | string;
    render: () => JSX.Element | string;
    type: string;
    style?: CSSProperties;
    focus?: boolean;
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
    label: '文本',
    preview: () => '预览文本',
    render: () => <span style={{ display: 'inline-block', width: 'max-content' }}>渲染文本</span>,
    type: 'text',
});

registerConfig.register({
    label: '按钮',
    preview: () => <button style={{ width: 'max-content' }}>预览按钮</button>,
    render: () => <button style={{ width: 'max-content' }}> 渲染按钮</button>,
    type: 'button',
});

registerConfig.register({
    label: '输入框',
    preview: () => <input placeholder="预览输入框" />,
    render: () => <input placeholder="渲染输入框" />,
    type: 'input',
});

export default registerConfig;
