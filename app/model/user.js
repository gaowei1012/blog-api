
/**
 * user 数据模型
 */

module.exports = app => {
    let mongoose = app.mongoose;

    let Schema = mongoose.Schema;
    let UserSchema = new Schema({
        username: String,
        password: { type: String, select: false },
        email: { type: String, select: false }
    });

    // 返回一个User用户模型，可以对数据库进行增删改查
    return mongoose.model('User', UserSchema)
}