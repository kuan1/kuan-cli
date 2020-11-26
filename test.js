const fs = require("fs")

fs.readdirSync('lib').forEach(item => {
  console.log(item)
})