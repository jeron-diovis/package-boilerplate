console.log("compiling webpack config...")
console.time("config compiled")

require("babel-register")
var cfg = require("./webpack").dev_server

console.timeEnd("config compiled")

module.exports = cfg
