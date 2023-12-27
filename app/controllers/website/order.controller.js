const Sequelize = require('sequelize');
const Order = require("../../models/orders.models");
const Rooms = require("../../models/rooms.models");
const Category = require("../../models/category.models");
const nodemailer = require('nodemailer');


class orderController {

    //[POST] /dat-phong
    async index(req, res) {
        const { RoomId, startDate, endDate } = req.body;
        try {
            const room = await Rooms.findOne({ 
                where: { Id: RoomId }, 
                include: [
                    {
                        model: Category,
                        as: 'category', 
                        attributes: ['Name']
                    }
                ] 
            });
            if (!room) return res.redirect('/phong-nghi/'); 
            
            return res.render('website/order/index',{room, startDate: startDate == "" ? false : startDate, endDate: endDate == "" ? false : endDate, title: "Hosteller - Thông tin đặt phòng"})
        } catch (err) {
            console.error(err);
            return res.status(500).send("Đã xảy ra lỗi khi đặt phòng.");
        }
    }


    //[POST] /dat-phong/thanh-toan
    async pay(req, res) {
        const { RoomId, Start, End, FullName, Email, Phone } = req.body;
        try {
            const room = await Rooms.findOne({ 
                where: { Id: RoomId }, 
                include: [
                    {
                        model: Category,
                        as: 'category', 
                        attributes: ['Name']
                    }
                ] 
            });
            if (!room) return res.redirect('/phong-nghi/'); 

            if(!Start || !End || !FullName || !Email || !Phone) return res.render('website/order/index',{room, FullName, Email, Phone, startDate: Start, endDate: Start, title: "Hosteller - Thông tin đặt phòng", error: "Vui lòng nhập đủ thông tin người đặt phòng!"})

            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) return res.render('website/order/index',{room, FullName, Email, Phone, startDate: Start, endDate: Start, title: "Hosteller - Thông tin đặt phòng", error: "Vui lòng Email hợp lệ!"})

            if(!/^\d{10}$/.test(Phone)) return res.render('website/order/index',{room, FullName, Email, Phone, startDate: Start, endDate: Start, title: "Hosteller - Thông tin đặt phòng", error: "Vui lòng số điện thoại hợp lệ!"})

            const numberDay = Math.floor((new Date(End) - new Date(Start)) / (1000 * 60 * 60 * 24)) + 1;

            if(numberDay <= 0) return res.render('website/order/index',{room, FullName, Email, Phone, startDate: Start, endDate: Start, title: "Hosteller - Thông tin đặt phòng", error: "Ngày trả phòng phải sau ngày thuê phòng!"})

            let Total = room.Price * numberDay;

            if (numberDay >= 7 && numberDay <= 14) {
                Total = room.Price * numberDay;
                Total *= 0.8; 
            } else if (numberDay >= 15) {
                Total = room.Price * numberDay;
                Total *= 0.7; 
            } 

            const Code = Array.from({ length: 12 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('').toUpperCase();

            if(req.session.customer){
                const order = await Order.create({ RoomId: room.Id, Code, Start, End, CustomerId: req.session.customer.Id, FullName, Email, Phone, Total, StatusOrder: 1, StatusPay: 0 });
            }else{
                const order = await Order.create({ RoomId: room.Id, Code, Start, End, FullName, Email, Phone, Total, StatusOrder: 1, StatusPay: 0 });
            }

            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'lienhe.shopclone247@gmail.com', 
                    pass: 'mabpkfkgbxlltrsw' 
                }
            });

            let mailOptions = {
                from: 'Hosteller Đặt Phòng Nghỉ & Khách Sạn', // Thay bằng địa chỉ email của bạn
                to: Email, // Địa chỉ email nhận
                subject: 'Xác nhận đơn đặt phòng', // Chủ đề email
                text: `Chào ${FullName}, Đơn đặt phòng của bạn đã được xác nhận. Mã đặt phòng của bạn là: ${Code}.`, // Nội dung email
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.render('website/order/thankyou',{room, Total, Code, FullName, Email, Phone, numberDay, startDate: Start, endDate: Start, title: "Hosteller - Thông tin đặt phòng", error: "Thành Công!"})
        } catch (err) {
            console.error(err);
            return res.status(500).send("Đã xảy ra lỗi khi đặt phòng.");
        }
    }
}

module.exports = new orderController();
