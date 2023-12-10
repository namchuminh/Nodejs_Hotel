const categoryRoute = require("./admin/category.routes");
const newsRoute = require("./admin/news.routes");
const roomRoute = require("./admin/room.routes");

function route(app){
    app.use("/admin/category", categoryRoute);
    app.use("/admin/news", newsRoute);
    app.use("/admin/room", roomRoute);
}

module.exports = route