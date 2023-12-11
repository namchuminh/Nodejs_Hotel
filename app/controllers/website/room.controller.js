const Rooms = require("../../models/rooms.models");
const Category = require("../../models/category.models");
const Facility = require("../../models/facility.models");
const Rule = require("../../models/rule.models");
const Image = require("../../models/image.models");

class roomController {
    //[GET] /room
    async viewAll(req, res) {
        try {
            const perPage = 5;
            const page = parseInt(req.query.trang) || 1;

            const { count, rows: roomList } = await Rooms.findAndCountAll({
                limit: perPage,
                offset: (page - 1) * perPage,
                order: [['Id', 'DESC']] // Thêm điều kiện ORDER BY Id DESC
            });

            const totalPages = Math.ceil(count / perPage);

            for (const room of roomList) {

                const facilityInfo = await Facility.findOne({ where: { RoomId: room.Id } });

                room.Bed = facilityInfo ? facilityInfo.dataValues.Bed : null;

                room.Description = room.Description.replace(/<[^>]+>/g, '').substring(0, 62) + " ...";
            }

            return res.render('website/room/all', { roomList, totalPages, currentPage: page, title: "Hosteller - Danh sách phòng nghỉ" });
        } catch (err) {
            console.error(err);
            return res.status(500).send("Đã xảy ra lỗi khi tải danh sách phòng.");
        }
    }

    //[GET] /room/:slug
    async viewDetail(req, res) {
        try {
            const perPage = 5;
            const page = parseInt(req.query.page) || 1;

            const { count, rows: roomList } = await Rooms.findAndCountAll({
                limit: perPage,
                offset: (page - 1) * perPage,
                include: [{ model: Category, as: 'category' }],
                order: [['Id', 'DESC']] // Thêm điều kiện ORDER BY Id DESC
            });

            const totalPages = Math.ceil(count / perPage);

            return res.render('admin/room/index', { roomList, totalPages, currentPage: page });
        } catch (err) {
            console.error(err);
            return res.status(500).send("Đã xảy ra lỗi khi tải danh sách phòng.");
        }
    }

}

module.exports = new roomController();
