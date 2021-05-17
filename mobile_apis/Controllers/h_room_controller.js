const db = require('../../config/sequelize').db;
const responseModule = require('../../config/response');

let getAllRooms = async (req, res, next) => {
    let {hospital_id} = req.params;
    try {
        let rooms = await db.Hospital_rooms.findAll({
            where: {
                hospital_id: hospital_id,
            },
            include: [
                {
                    model: db.Room,
                },
            ],
        });

        return responseModule.successResponse(res, {
            success: true,
            nurses: rooms
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let addRoom = async (req, res, next) => {
    let {
        name,
        description,
        ward_id
    } = req.body;
    let {hospital_id } = req.params ;
    try {

        let room = await db.Room.create({
            name: name,
            description : description,
            ward_id  : ward_id,
        });

        let h_room = await db.Hospital_rooms.create({
            room_id: room.id,
            hospital_id : hospital_id,
        });

        return responseModule.successResponse(res, {
            success: true,
            message: 'Room successfully added.',
            room : room
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let deleteRoom = async (req, res, next) => {
    let {hospital_id , room_id} = req.params;

    try {
        let room = await db.Room.findOne({where: {id: room_id,}});
        if(room !== null){

            let deleteRoom = await db.Room.destroy({
                where: { id: room_id }
            });

            let deleteHospitalRoom = await db.Hospital_rooms.destroy({
                where: {
                    hospital_id : hospital_id,
                    room_id : room_id
                }
            });

            return responseModule.successResponse(res, {
                success: true,
                message: "Successfully Deleted !"
            });


        }else{
            return responseModule.failResponse(res, {
                success: false,
                message: "invalid nurse Id"
            });
        }
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};
let updateRoom = async (req, res, next) => {
    let {
        name,
        description,
        ward_id,
    } = req.body;
    let {room_id} = req.params ;
    try {

        let room = await db.Room.update({
            name: name,
            description : description,
            ward_id :ward_id
        },{where : {
                id : room_id
            }});
        return responseModule.successResponse(res, {
            success: true,
            message: 'Room successfully registered.',
            room : room,
        });
    } catch (err) {
        return responseModule.failResponse(res, {
            success: false,
            error: err
        });
    }
};

module.exports = {
    addRoom,
    getAllRooms,
    deleteRoom,
    updateRoom
};
