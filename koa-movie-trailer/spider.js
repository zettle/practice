const puppeteer = require('puppeteer');

// 要爬的地址
const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=time&page_limit=20&page_start=0';

function sleep (sleep) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, sleep);
    });
}

(async() => {
    console.log('开始爬虫');
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await sleep(3000); // 因为豆瓣的列表是通过ajax获取的，所以这里设置个3s延迟，等ajax加载往
    await page.waitForSelector('.more'); // 要等待douban电影上的加载更多的按钮
    for (let i=0; i<1; i++) {
        await sleep(3000); // 等待ajax，估计3s
        await page.click('.more'); // 点击"更多"按钮
    }

    // evaluate在浏览器中执行里面的代码
    
    const result = await page.evaluate(() => {
        let links = [];

        var $ = window.$; // douban自己有引入jquery
        var items = $('.list-wp .list a');
        if (items.length > 1) {
            items.each((index, item) => {
                var it = $(item);
                var doubanId = it.find('div').data('id'); // id
                var title = it.find('img').attr('alt'); // 标题
                var rate = Number(it.find('.rate').text()); // 评分
                var poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio');

                // https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2628762684.jpg
                links.push({doubanId, title, rate, poster});
            });
        }
        return links;
    });

    await browser.close();
    console.log('爬虫结果', result);
})();
    