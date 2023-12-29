module.exports = {
    tabWidth: 4, // 指定 tab 索引长度为 4 个空格
    printWidth: 120, // 每一行代码字符数最大为 120 个字符
    semi: true, // 行末需要加分号
    endOfLine: 'lf', // 行末使用 \n 作为换行符
    singleQuote: true, // 使用单引号
    bracketSpacing: true, // 当对象字面量写成一行时，前后需要加空格
    trailingComma: 'es5', // 当对象字面量写成一行时，对象字面量的最后一个键值对不需要加逗号
    useTabs: false, // 不允许用 tab 缩进，就算从键盘中按下 tab 键，也会自动转化为 4 个空格
    overrides: [
        {
            files: ['*.code-snippets'],
            options: {
                parser: 'json',
            },
        },
    ],
};
