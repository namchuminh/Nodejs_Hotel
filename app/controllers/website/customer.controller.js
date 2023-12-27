const Sequelize = require('sequelize');
const crypto = require('crypto');
const Customer = require("../../models/customer.models");

class customerController {

    //[GET] /khach-hang
    async index(req, res) {
        return res.render('website/customer/index', {title: "Hosteller - Thông tin khách hàng"})
    }

    //[GET] /khach-hang//dang-nhap
    async viewLogin(req, res) {
        return res.render('website/customer/login', {title: "Hosteller - Đăng nhập"})
    }

    //[POST] /khach-hang/dang-nhap
    async login(req, res) {
        const { Username, Password } = req.body;
        try {

            if(!Username || !Password) return res.render('website/customer/login', {title: "Hosteller - Đăng nhập", error: "Vui lòng nhập đủ thông tin đăng nhập!"})

            const hashedPassword = crypto.createHash('md5').update(Password).digest('hex');

            const customer = await Customer.findOne({
                where: {
                    Username,
                    Password: hashedPassword
                }
            });

            if (customer) {
                req.session.customer = customer;
                return res.redirect('/khach-hang/'); 
            } else {
                return res.render('website/customer/login', {title: "Hosteller - Đăng nhập", error: "Sai tên đăng nhập hoặc mật khẩu!"})
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng nhập!' });
        }
    }

    //[GET] /khach-hang//dang-ky
    async viewRegister(req, res) {
        return res.render('website/customer/register', {title: "Hosteller - Đăng ký"})
    }

    //[POST] /khach-hang//dang-ky
    async register(req, res) {
        const { FullName, Phone, Email, Username, Password } = req.body;

        try {

            if(!FullName || !Phone || !Email || !Username || !Password) return res.render('website/customer/register', {title: "Hosteller - Đăng ký", error: "Vui lòng nhập đủ thông tin!"})

            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) return res.render('website/customer/register', {title: "Hosteller - Đăng ký", error: "Vui lòng nhập Email hợp lệ!"})

            if(!/^\d{10}$/.test(Phone)) return res.render('website/customer/register', {title: "Hosteller - Đăng ký", error: "Vui lòng nhập số điện thoại hợp lệ!"})

            if(/\s/.test(Username)) return res.render('website/customer/register', {title: "Hosteller - Đăng ký", error: "Vui lòng nhập tài khoản hợp lệ và không có dấu cách!"})
            
            if(await Customer.findOne({where: {Email}})) return res.render('website/customer/register', {title: "Hosteller - Đăng ký", error: "Email khách hàng đã tồn tại trong hệ thống!"})
            
            if(await Customer.findOne({where: {Phone}})) return res.render('website/customer/register', {title: "Hosteller - Đăng ký", error: "Số điện thoại khách hàng đã tồn tại trong hệ thống!"})

            if(await Customer.findOne({where: {Username}})) return res.render('website/customer/register', {title: "Hosteller - Đăng ký", error: "Tên tài khoản đã tồn tại trong hệ thống!"})

            const hashedPassword = crypto.createHash('md5').update(Password).digest('hex');

            const newCustomer = await Customer.create({
                FullName,
                Phone,
                Email,
                Username,
                Password: hashedPassword // Lưu mật khẩu đã được mã hóa
            });

            return res.render('website/customer/register', {title: "Hosteller - Đăng ký", success: "Đăng ký tài khoản thành công!"})
        } catch (error) {
            // Xử lý lỗi nếu có
            res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng ký!', error: error.message });
        }
    }
}

module.exports = new customerController();
