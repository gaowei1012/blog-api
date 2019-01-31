const BaseController = require('./base');

class ArticlesController extends BaseController {

    // 查询文章
    // GET / http://127.0.0.1:7001/api/articles?pageNum=1&pageSize=2&keyword=标题3
    async index() {
        try {
            // await this.getPage({
            //     modeName: 'Article',
            //     fields: ['title', 'content'],
            //     populateFields: ['category']
            // })
            await this.getPage('Article', ['title', 'content'], ['category'])
        } catch(error) {
            this.error(error);
        }
    }

    // 发表文章
    // POST / http://127.0.0.1:7001/api/articles
    // body / {"title": "标题1", "content": "内容1"}
    async create() {
        const { ctx } = this;
        let article = ctx.request.body; // 请求体
        console.log(article) // category
        article.user = this.user; // 当前用户
        try {
            let result = await ctx.model.Article.create(article)
            console.log(result)
            this.success('文章发表成功')
        } catch(error) {
            this.error(error);
        }
    }

    // 更新文章
    // PUT / http://127.0.0.1:7001/api/articles/:id
    async update() {
        const { ctx } = this;
        let id = ctx.params.id;
        let article = ctx.request.body;
        try {
            await ctx.model.Article.findByIdAndUpdate(id, article)
            this.success('更新文章成功')
        } catch(error) {
            this.error(error);
        }
    }
    // 删除文章
    // DELETE / http://127.0.0.1:7001/api/articles/:id
    async destroy() {
        const { ctx } = this;
        let id = ctx.params.id;
        try {
            await ctx.model.Article.findByIdAndRemove(id);
            this.success('删除文章成功');
        } catch(error) {
            this.error(error);
        }
    }
    // 增加pv数
    // GET / http://127.0.0.1:7001/api/articles/pv/5c4c642bd916cf3cf5e8288a
    async addPv() {
        let { ctx } = this;
        let id = ctx.params.id;
        try {
            await ctx.model.Article.findByIdAndUpdate(id, { $inc: { pv: 1 }});
            this.success('修改pv数成功')
        } catch(error) {
            this.error(error);
        }
    }

    // 增加评论
    // POST / http://127.0.0.1:7001/api/articles/comment/:id
    async addComment() {
        const { ctx } = this;
        let id = ctx.params.id;
        let comment = ctx.request.body;
        comment.user = this.user; // 当前评论人
        try {
            await ctx.model.Article.findByIdAndUpdate(id, { $push: { comments: comment }})
            this.success('更新评论成功')
        } catch(error) {
            this.error(error);
        }
    } 

}

module.exports = ArticlesController;