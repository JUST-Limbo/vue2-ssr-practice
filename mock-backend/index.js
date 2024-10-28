const express = require("express")

const app = express()
const users = require("./users.json")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require("cors")
app.use(cors({
    origin: "http://localhost:9500",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
}))

app.get("/userinfo",(req,res) => {
    if (!req.cookies.userId) {
        return res.status(200).send({
            // 未登录
            code: '401',
            msg:'未登录'
        })
    }
    const user = users.find((u) => u.id == req.cookies.userId);
    res.send({
        code: '200',
        data: user,
    });
})

app.post('/queryuserlist',(req,res) => {
    // 从请求体中获取 page 和 id 参数
    const { page = 1,name,pageSize = 10,gender } = req.body;

    // 根据 id 过滤 users 数组
    const filtered = users.filter(u => {
        return (name ? u.name === name : true) && (gender ? u.gender == gender : true)
    })

    // 计算 start 和 end
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // 构造响应结果
    const result = {
        total: filtered.length,
        pageSize,
        pageCount: Math.ceil(filtered.length / pageSize),
        page: page,
        data: filtered.slice(start,end),
    };
    res.send({
        code: '200',
        data: result,
    });
})

app.get('/user/:id',(req,res) => {
    const id = req.params.id;
    const targetUser = users.find(u => {
        return u.id == id
    })
    if (targetUser) {
        res.status(200).send({
            code: '200',
            data:targetUser
        })
    } else {
        res.status(200).send({
            code: '500',
            msg: 'not found'
        })
    }
})

app.post('/login',(req,res) => {
    const { id,password } = req.body
    const targetUser = users.find(u => {
        return u.id == id && u.id == password
    })
    if (targetUser) {
        res.status(200).cookie('userId',targetUser.id,{
            sameSite: 'none',
            secure: true,
            // maxAge:60000, // 毫秒? 标准的好像是秒
        }).send({
            code: '200'
        })
    } else {
        res.status(200).send({
            code: '500',
            msg: '用户名密码不匹配'
        })
    }
})

app.listen(9600,() => {
    console.log("服务器已启动，监听端口 9600")
    console.log("http://localhost:9600")
})
