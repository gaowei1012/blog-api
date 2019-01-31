const BaseController = require('./base');

class CategoriesController extends BaseController {
    // 查询
    // GET / http://127.0.0.1:7001/api/categories?pageNum=1&pageSize=3&keyword=母
    async index() {
        // const { ctx } = this;
        // let { pageNum = 1, pageSize = 5, keyword = '' } = ctx.query;
        // console.log(ctx.request.query)
        // pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
        // pageSize = isNaN(pageSize) ?  5 : parseInt(pageSize);
        // let queryStr = {};
        // if (keyword) {
        //     queryStr.name = new RegExp(keyword);
        //     console.log(queryStr.name)
        // }
        try {
            // skip 跳过的条数
            // limit 分页
            // let items = await ctx.model.Category.find(queryStr)
            //         .skip((pageNum - 1) * pageSize)
            //         .limit(pageSize)
           await this.getPage('Category', ['name'])
        } catch(error) {
            this.error(error)
        }
    }

    // 增加文章分类
    async create() {
        let { ctx } = this;
        let category = ctx.request.body;
        try {
            // 查询是否有分类存在
            let doc = await ctx.model.Category.findOne(category);
            if (doc) {
                this.error('分类已存在')
            } else {
                doc = await ctx.model.Category.create(category);
                this.success({doc})
            }
        } catch(error) {
            this.error(error);
        }
    }
    // 更新分类信息
    async update() {
        let { ctx } = this;
        let id = ctx.params.id;
        let category = ctx.request.body;

        try {
            let result = await ctx.model.Category.findByIdAndUpdate(id, category)
            this.success('更新成功')
        } catch(error) {
            this.error(error)
        }
    }

    // 删除
    async destroy() {
        let { ctx } = this;
        let id = ctx.params.id;
        let { ids = [] } = ctx.request.body;
        ids.push(id)
        console.log(ids)
        try {
            await ctx.model.Category.remove({_id: { $in: ids }});
            this.success('删除成功')
        } catch(error) {
            this.error(error)
        }
    }

}

module.exports = CategoriesController;