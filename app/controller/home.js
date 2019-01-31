'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '欢迎使用blog-api';
  }
}

module.exports = HomeController;
