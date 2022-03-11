const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks')
const Ping = require('./models/ping')

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({ force: false})
.then(() => {
    console.log('데이터베이스 연결 성공')
})
.catch((err) => {
    console.error(err)
});

app.use("/static", express.static('./static/'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ping', async (req, res, next)=> {
    let pingObj = await Ping.findOne({
        id: 1
    });
    count = pingObj.count + 1
    console.log(pingObj.count + 1)
    await Ping.update({
        count: count,
    },{
        where: {id: 1},
    })
    return res.status(200).json({Pong: count})
})


app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
})
