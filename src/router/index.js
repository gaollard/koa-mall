const router = require('koa-router')();
const axios = require('axios');

axios.defaults.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'

// 获取书籍列表
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    name: '拉德影视'
  })
});

// 获取书籍列表
router.get('/book', async (ctx, next) => {
  await next();
  var id = ctx.params.id || 1220562;
  let res = await axios.get(`https://api.douban.com/v2/book/${id}`);
  ctx.body = res.data;
});

/**
 * 获取书籍详情
 * 1220562
 */
router.get('/book/:id', async (ctx, next) => {
  await next();
  let id = ctx.params.id;
  let res = await axios.get(`https://api.douban.com/v2/book/${id}`);
  ctx.body = res.data;
});

/*
 * 获取电影列表
 * @tag in_theaters 正在热映
 * @tag coming_soon 即将上映
 * @tag top250 top250排行榜
 * @tag weekly 口碑榜
 * @tag us_box 北美票房榜
 * @tag new_movies 新片榜
 */
router.get('/movie/:tag', async (ctx, next) => {
  await next();
  let tag = ctx.params.tag;
  let start = ctx.query.start || 0;
  let count = ctx.query.count || 10;
  const movieUrl = 'https://api.douban.com/v2/movie/';
  try {
    let res = await axios.get(`${movieUrl}${tag}?start=${start}&count=${count}`);
    ctx.body = res.data;
  } catch (e) {
    ctx.body = 'error';
    console.log(e.Error);
  }
});

module.exports = router;