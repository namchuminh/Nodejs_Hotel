const Sequelize = require('sequelize');
const Rooms = require("../../models/rooms.models");
const Category = require("../../models/category.models");
const Facility = require("../../models/facility.models");
const Rule = require("../../models/rule.models");
const Image = require("../../models/image.models");

class roomController {
    //[GET] /phong-nghi
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

    //[GET] /phong-nghi/:slug
    async viewDetail(req, res) {
        const { id } = req.params;
        try {
            const room = await Rooms.findOne({ where: { slug: id } });
            if (!room) {
                return res.render('website/error/index');
            }

            const facility = await Facility.findAll({
                where: { RoomId: room.Id }
            });

            const rule = await Rule.findAll({
                where: { RoomId: room.Id }
            });

            const image = await Image.findAll({
                where: { RoomId: room.Id }
            });

            const related = await Rooms.findAll({
                where: { CategoryId: room.CategoryId },
                include: [Facility], //Lấy kèm theo Facility tương ứng
                order: Sequelize.literal('RAND()'), // Sử dụng hàm RAND() để sắp xếp ngẫu nhiên
                limit: 4 // Lấy ra 4 bản ghi
            });

            return res.render('website/room/detail', {room,facility,rule,image,related,title: "Hosteller - " + room.Name});
        } catch (err) {
            console.error(err);
            return res.status(500).send("Đã xảy ra lỗi khi tải chi tiết phòng.");
        }
    }

}

module.exports = new roomController();
