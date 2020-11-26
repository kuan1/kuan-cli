const readFiles = require("../lib/utils/readFiles")

readFiles(process.cwd()).then(res => {
  console.log(Object.keys(res))
})