// 手动配置 mock 规则
// 具体规则: http://mockjs.com/examples.html
const mockData = [
    {
        path: "/api/random",
        data: {
            "list|10": [
                {
                    "id|+1": 1,
                    "string|1-5": "★",
                    "number|1-100.1-10": 1,
                    "boolean|1-2": true,
                    "object|1-3": {
                        "110000": "北京市",
                        "120000": "天津市",
                        "130000": "河北省",
                        "140000": "山西省",
                    },
                    "array|1-3": ["Hello", "Mock.js", "!"],
                    foo: "Syntax Demo",
                    name: function () {
                        return this.foo;
                    },
                    regexp: /\d{5,10}/,
                    mtime: "@datetime('yyyy-MM-dd A HH:mm:ss')", //随机生成日期时间
                    stars: "@natural(0, 5)", //随机生成1-5的数字
                    nickname: "@cname", //随机生成中文名字
                    color: "@color", //随机生成色值
                },
            ],
        },
        timeout: 100,
        // timeout: "100-300",
    },
];

module.exports = mockData;
