console.log("compiling webpack config...")
require("babel-register")
console.log("run webpack...")

module.exports = require("./webpack").browser
