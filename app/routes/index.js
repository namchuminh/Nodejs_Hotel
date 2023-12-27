const categoryRoute = require("./admin/category.routes");
const newsRoute = require("./admin/news.routes");
const roomRoute = require("./admin/room.routes");

const webCustomerRoute = require("./website/customer.routes");
const webRoomRoute = require("./website/room.routes");
function route(app){
    app.use("/admin/category", categoryRoute);
    app.use("/admin/news", newsRoute);
    app.use("/admin/room", roomRoute);
    app.use("/phong-nghi", webRoomRoute);
    app.use("/khach-hang", webCustomerRoute);
}

module.exports = route