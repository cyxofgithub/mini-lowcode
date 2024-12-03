interface ISchema {
    container: {
        width: number;
        height: number;
    };
    blocks: any[];
}

const schema: ISchema = {
    container: {
        width: 800, // iPhone 6/7/8 尺寸（具体按照设计稿尺寸）
        height: 667,
    },
    blocks: [
        // 画布中拖拽的元素集合，下面介绍
    ],
};

export default schema;
