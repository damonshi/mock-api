const express = require("express");
const cors = require("cors");
const Mock = require("mockjs");
const mockRule = require("./mock");

const app = express();
const port = 3000;
const Random = Mock.Random;
const log = console.log.bind(console);

// 自定义数据返回结构，data 为 mock 数据
const resType = {
    status: true,
    data: {},
    message: "success",
};

const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const resTimeout = function (timeout) {
    if (typeof timeout === 'undefined') {
        return 0
    }
    if (typeof timeout === 'number') {
        return timeout
    }
    if (typeof timeout === 'string') {
        let numList = timeout.split('-')
        let isNum = numList.every(e => isNaN(e) === false)
        if (numList.length === 2 && isNum) {
            let num = numList.map(e => Number(e))
            let r = getRandomIntInclusive(num[0], num[1])
            return r
        } else {
            return 0
        }
    }
}

const mockData = function (req, res, next) {
    let path = req.path;
    let rule = mockRule.filter((e) => e.path === path);
    let { data, timeout } = rule.length && rule[0];
    let mockMake = Mock.mock(data);
    resType.data = mockMake;
    resType.timeout = resTimeout(timeout);
    let r = resType;
    req.mockData = r;
    next();
};

app.use(cors());
app.use(mockData);

app.get("*", (req, res) => {
    let r = req.mockData;
    setTimeout(() => {
        delete r.timeout;
        res.json(r);
    }, r.timeout);
});

app.post("*", (req, res) => {
    let r = req.mockData;
    setTimeout(() => {
        delete r.timeout
        res.json(r);
    }, r.timeout)
});

app.listen(port, () => console.log(`mock app listening on port ${port}!`));
