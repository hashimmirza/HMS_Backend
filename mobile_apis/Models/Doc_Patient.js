const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let Doc_Patient = sequelize.define('Doc_Patient',{
        // attributes
        id: {
            primaryKey : true,
            type: Sequelize.INTEGER,
            autoIncrement : true,
            allowNull: false,
        },
        eprescription: {
            type: Sequelize.STRING(11050),
            defaultValue : null
        },
        recommendation: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        required: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        stay_away: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        start_eating: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        visit: {
            type: Sequelize.STRING,
            defaultValue : null
        },
        status :{
            type : Sequelize.STRING,
            defaultValue : null

        }
    },{
        timestamps : true,
        associate : models => {
            Doc_Patient.belongsTo (models.Assistant_Doc_Patient, {
                foreignKey: { name: 'assistant_doc_patient_id', allowNull: false },
            });
            Doc_Patient.belongsTo (models.Hospital, {
                foreignKey: { name: 'hospital_id', allowNull: false },
            });
        }
    });
    return Doc_Patient ;
};
