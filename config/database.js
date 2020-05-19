// 根据环境判断 mongo 连接地址
if (process.env.NODE_ENV == 'production') {
    module.exports = {
        mongoURL: "mongodb://course:management123@ds119702.mlab.com:19702/node-course-management-prod"
    }
} else {
    module.exports = {
        mongoURL: "mongodb://localhost/node-app"
    }
}