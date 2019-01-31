const { Controller } = require('egg')

/**
 * 封装公共方法
 */
class BaseController extends Controller {

    get user() {
        return this.ctx.session.user;
    }

    success(data) {
        this.ctx.body = {
            code: 0,
            data
        }
    }
    error(error) {
        console.error(error)
        this.ctx.body = {
            code: 1,
            error
        }
    }

    // 分页
    async getPage(modelName = '', fields = [], populateFields = []) {
        const { ctx } = this;
        let { pageNum = 1, pageSize = 5, keyword = '' } = this.ctx.query;
        // console.log(ctx.query)
        pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
        pageSize = isNaN(pageSize) ?  5 : parseInt(pageSize);
        let queryStr = {};
        // 过滤
        if (keyword || fields.length > 0) {
            queryStr['$or']= fields.map(field => ({ [field]: new RegExp(keyword)}))
        }
        let total = await ctx.model[modelName].count(queryStr);
        let cursor = ctx.model[modelName].find(queryStr).skip((pageNum - 1) * pageSize).limit(pageSize);
        populateFields.forEach(field => {
            cursor = cursor.populate(field);
        })
        let items = await cursor;
        this.success({
            pageNum,
            pageSize,
            items,
            total,
            pageCount: Math.ceil(total/pageSize) // 向上取整
        });
    }
}

module.exports = BaseController;