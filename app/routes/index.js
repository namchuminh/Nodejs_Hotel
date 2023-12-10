const categoryRoute = require("./admin/category.routes");
const newsRoute = require("./admin/news.routes");

function route(app){
    app.use("/admin/category", categoryRoute);
    app.use("/admin/news", newsRoute);
}

module.exports = route