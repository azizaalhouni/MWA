const child_process = require("child_process");
console.log("1:Start");
const newProcess = child_process.spawn("node", ["computation/_fibonaci"],{stdio :"inherit"});
console.log("2: End");