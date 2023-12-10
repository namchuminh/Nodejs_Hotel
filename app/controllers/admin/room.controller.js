const Rooms = require("../../models/rooms.models");
const Category = require("../../models/category.models");
const Facility = require("../../models/facility.models");
const Rule = require("../../models/rule.models");


class roomController {
  //[GET] /admin/room
  async index(req, res) {
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

  //[GET] /admin/room/add
  async viewAdd(req, res) {
    const category = await Category.findAll({
      where: {Type: 2}
    });
    return res.render('admin/room/add', {category});
  }

  //[POST] /admin/room/add
  async add(req, res) {
    const { name, description, price, people, categoryId, slug } = req.body;
    try {
      const category = await Category.findAll({
        where: {Type: 2}
      });

      if (!name || !description || !price || !people || !categoryId || !slug ) return res.render('admin/room/add', {category, error: "Vui lòng nhập đủ thông tin của phòng này!"});

      if (!/^\d+$/.test(people) || people < 1) return res.render('admin/room/add', {category, error: "Số người tối đa trong phòng không hợp lệ!"}); 

      if (!/^\d+$/.test(people) || people < 1) return res.render('admin/room/add', {category, error: "Giá tiền cho 1 đêm thuê phòng không hợp lệ!"}); 
      
      if (!await Category.findByPk(categoryId)) return res.render('admin/room/add', {category, error: "Danh mục phòng không tồn tại trong hệ thống!"}); 

      if (!req.file) return res.render('admin/room/add', {category, error: "Vui lòng tải lên ảnh đại diện cho phòng này!"});

      await Rooms.create({
        Name: name,
        Description: description,
        Avatar: req.base_url + req.file.path.replace(/\\/g, '/'),
        Price: price,
        People: people,
        CategoryId: categoryId,
        Slug: slug,
        Status: 1
      });

      return res.redirect('/admin/room/');
    } catch (err) {
      console.error(err);
      return res.status(500).send("Đã xảy ra lỗi khi thêm mới phòng.");
    }
  }  

  //[GET] /admin/room/update/:id
  async viewUpdate(req, res) {
    const { id } = req.params;
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        return res.redirect('/admin/rooms/');
      }

      const category = await Category.findAll({
        where: {Type: 2}
      });

      return res.render('admin/room/update', { room, category });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Đã xảy ra lỗi khi tải thông tin phòng để cập nhật.");
    }
  }

  //[POST] /admin/room/update/:id
  async update(req, res) {
    const { id } = req.params;
    const { name, description, price, people, categoryId, slug, status } = req.body;
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        return res.redirect('/admin/room/');
      }

      const category = await Category.findAll({
        where: {Type: 2}
      });

      if (!name || !description || !price || !people || !slug || !status ) return res.render('admin/room/update', {room, category, error: "Vui lòng nhập đủ thông tin của phòng này!"});

      if (!/^\d+$/.test(people) || people < 1) return res.render('admin/room/update', {room, category, error: "Số người tối đa trong phòng không hợp lệ!"}); 

      if (!/^\d+$/.test(people) || people < 1) return res.render('admin/room/update', {room, category, error: "Giá tiền cho 1 đêm thuê phòng không hợp lệ!"}); 
      
      if (!await Category.findByPk(categoryId)) return res.render('admin/room/update', {room, category, error: "Danh mục phòng không tồn tại trong hệ thống!"}); 

      if (status != 1 && status != 0) return res.render('admin/room/update', {room, category, error: "Trạng thái phòng nghỉ không hợp lệ!"}); 

      if (!req.file){
        room.Name = name;
        room.Description = description;
        room.Price = price;
        room.People = people;
        room.CategoryId = categoryId;
        room.Slug = slug;
        room.Status = status;
        await room.save();
      }else{
        room.Name = name;
        room.Description = description;
        room.Price = price;
        room.People = people;
        room.CategoryId = categoryId;
        room.Slug = slug;
        room.Status = status;
        room.Avatar = req.base_url + req.file.path.replace(/\\/g, '/');
        await room.save();
      }

      return res.render('admin/room/update', { room, category, success: "Cập nhật thông tin phòng thành công!" }); 
    } catch (err) {
      console.error(err);
      return res.status(500).send("Đã xảy ra lỗi khi cập nhật thông tin phòng.");
    }
  }
  
  //[GET] /admin/room/delete/:id
  async delete(req, res) {
    const { id } = req.params;
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        return res.redirect('/admin/room/');
      }

      await room.destroy();

      return res.redirect('/admin/room');
    } catch (err) {
      console.error(err);
      return res.status(500).send("Đã xảy ra lỗi khi xóa phòng.");
    }
  }

  //[GET] /admin/room/:id/facility
  async facility(req, res) {
    const { id } = req.params;
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        return res.redirect('/admin/room/');
      }

      if(!await Facility.findOne({where: {RoomId: id} })){
        await Facility.create({
            RoomId:	id,
            Wifi: 0,	
            Washer: 0,	
            Bed: 0,	
            Gym: 0,	
            Kitchen: 0,	
            Air: 0,	
            Support: 0,	
            Storage: 0,	
            Bathroom: 0,
        });
      }

      const facility = await Facility.findOne({where: {RoomId: id} });

      return res.render('admin/room/facility', { room, facility }); 
    } catch (err) {
      console.error(err);
      return res.status(500).send("Đã xảy ra lỗi khi xem tiện ích phòng.");
    }
  }

  //[POST] /admin/room/:id/facility
  async updateFacility(req, res) {
    const { id } = req.params;
    const { wifi, washer, bed, gym, kitchen, air, support, storage, bathroom } = req.body;
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        return res.redirect('/admin/room/');
      }

      const facility = await Facility.findOne({where: {RoomId: id} });

      if(!wifi || !washer || !bed || !gym || !kitchen || !air || !support || !storage || !bathroom) return res.render('admin/room/facility', { room, facility, error: "Vui lòng chọn tiện ích cho phòng!" }); 

      if(wifi != 0 && wifi != 1) return res.render('admin/room/facility', { room, facility, error: "Mạng Wifi chọn không hợp lệ!" });
      
      if(washer != 0 && washer != 1) return res.render('admin/room/facility', { room, facility, error: "Máy giặt chọn không hợp lệ!" }); 

      if(bed != 0 && bed != 1) return res.render('admin/room/facility', { room, facility, error: "Giường ngủ chọn không hợp lệ!" }); 

      if(gym != 0 && gym != 1) return res.render('admin/room/facility', { room, facility, error: "Dụng cụ tập Gym chọn không hợp lệ!" }); 

      if(kitchen != 0 && kitchen != 1) return res.render('admin/room/facility', { room, facility, error: "Bếp nấu ăn chọn không hợp lệ!" }); 

      if(air != 0 && air != 1) return res.render('admin/room/facility', { room, facility, error: "Điều hòa chọn không hợp lệ!" }); 

      if(support != 0 && support != 1) return res.render('admin/room/facility', { room, facility, error: "Nhân viên phục vụ chọn không hợp lệ!" }); 

      if(storage != 0 && storage != 1) return res.render('admin/room/facility', { room, facility, error: "Tủ để đồ chọn không hợp lệ!" }); 

      if(bathroom != 0 && bathroom != 1) return res.render('admin/room/facility', { room, facility, error: "Phòng tắm chọn không hợp lệ!" }); 

      facility.Wifi = wifi;
      facility.Washer = washer;
      facility.Bed = bed;
      facility.Gym = gym;
      facility.Kitchen = kitchen;
      facility.Air = air;
      facility.Support = support;
      facility.Storage = storage;
      facility.Bathroom = bathroom;
      await facility.save();

      return res.render('admin/room/facility', { room, facility, success: "Cập nhật tiện ích phòng thành công!" }); 
    } catch (err) {
      console.error(err);
      return res.status(500).send("Đã xảy ra lỗi khi cập nhật tiện ích phòng.");
    }
  }

  //[GET] /admin/room/:id/rule
  async rule(req, res) {
    const { id } = req.params;
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        return res.redirect('/admin/room/');
      }

      const ruleCount = await Rule.count({ where: { RoomId: id } });
      const rule = await Rule.findAll({where: {RoomId: id} });
      return res.render('admin/room/rule', { room, ruleCount, rule});
    } catch (err) {
      console.error(err);
      return res.status(500).send("Đã xảy ra lỗi khi hiển thị quy tắc.");
    }
  }

  //[POST] /admin/room/:id/rule
  async updateRule(req, res) {
    const { id } = req.params;
    
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        return res.redirect('/admin/room/');
      }

      await Rule.destroy({ where: { RoomId: id } });

      for (const key in req.body) {
        const value = req.body[key];
        await Rule.create({ Rules: value, RoomId: id }); // Giả sử Rule là mô hình Sequelize
      }

      const ruleCount = await Rule.count({ where: { RoomId: id } });
      const rule = await Rule.findAll({where: {RoomId: id} });
      return res.render('admin/room/rule', { room, ruleCount, rule, success: "Cập nhật quy tắc cho phòng nghỉ thành công!"});
    } catch (err) {
      console.error(err);
      return res.status(500).send("Đã xảy ra lỗi cập nhật quy tắc.");
    }
  }

}

module.exports = new roomController();
