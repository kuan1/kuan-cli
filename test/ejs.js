const ejs = require('ejs')
const readFiles = require("../lib/utils/readFiles")

readFiles('dist').then(res => {
  const t = res['public/index.html']
  const r = ejs.render(t, { name: '测试', title: '测试-title', description: '这个描述啊啊啊啊啊这个描述啊啊啊啊啊' })
  console.log(r)
})