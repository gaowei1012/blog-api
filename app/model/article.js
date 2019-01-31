
/**
 * 文章模型
 */

module.exports = app => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;
    let ObjectId = Schema.Types.ObjectId;
    let ArticleSchema = new Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: ObjectId, ref: 'Category'},
        user: {
            type: ObjectId,
            ref: 'User', // 关联表的名字
        },
        pv: { type: Number, default: 0 },
        comments: [
            { user: { type: ObjectId, ref: 'User'}, content: String, createAt: { type: Date, default: Date.now } }
        ],
        createAt: { type: Date, default: Date.now }
    });

    let Article = mongoose.model('Article', ArticleSchema);
    return Article;
}