const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Assistant_Doc_Patient = sequelize.define('Assistant_Doc_Patient',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        },
        //'patient_id','blood_pressure','sugar_test','weight','current_medicines',
        // 'tests_conducted','blood_reports','tag','sleep','eyesight', 'questions', 'answers'
        blood_pressure: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        sugar_test: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        weight: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        current_medicines: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        tests_conducted: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        blood_reports: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        tag :{
            type: Sequelize.STRING,
            defaultValue : null
        },
        sleep :{
            type: Sequelize.STRING,
            defaultValue : null
        },
        eyesight :{
            type: Sequelize.STRING,
            defaultValue : null
        },
        questions_answers :{
            type: Sequelize.STRING(11050),
            defaultValue : null
        },
        status :{
            type : Sequelize.STRING,
            defaultValue : null

        }
    },{
        timestamps : true,
        associate : models => {
            Assistant_Doc_Patient.belongsTo (models.Patient, {
                foreignKey: { name: 'patient_id', allowNull: false },
            });
            Assistant_Doc_Patient.belongsTo (models.Doctor, {
                foreignKey: { name: 'doctor_id', allowNull: false },
            });
            Assistant_Doc_Patient.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
            Assistant_Doc_Patient.hasMany(models.Doc_Patient, {
                foreignKey: { name: 'assistant_doc_patient_id', allowNull: false }
            });
        }
    });
    return Assistant_Doc_Patient ;
};
