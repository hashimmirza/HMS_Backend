const cron = require("node-cron");

module.export =  cron.schedule("* */1 * * *", function() {
    let nowTime = new Date();
    console.log("Job Updated at" + nowTime);

});
