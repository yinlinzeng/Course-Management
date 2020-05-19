const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport")

const app = express();

// 加载路由
const ideas = require('./routes/ideas');
const users = require('./routes/users');

require("./config/passport")(passport)

// 连接到 mongoose
const db = require("./config/database");
mongoose.connect(db.mongoURL)
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch(err => {
        console.log(err)
    })

// 引入模型
require("./models/Idea")

const Idea = mongoose.model('ideas');


// handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body-parser middleware
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 使用静态文件
app.use(express.static(path.join(__dirname, 'public')));


// method-override middleware
app.use(methodOverride('_method'));

// express-session & connect-flash middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// 配置全局变量
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next();
})

// 配置路由
app.get("/", (req, res) => {
    const title = "欢迎来到课程管理系统"
    res.render("index", {
        title: title
    });
})

app.get("/about", (req, res) => {
    res.render("about");
})

// 使用routes
app.use("/ideas", ideas)
app.use("/users", users)

// 监听服务器端口
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
})