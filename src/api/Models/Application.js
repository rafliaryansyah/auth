"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Application extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    Application.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                autoIncrement: true,
                field: "id",
            },
            name: DataTypes.STRING,
            key: {
                type: DataTypes.STRING,
                unique: true
            },
            deletedAt: {
                type: "DATETIME",
                allowNull: true,
                defaultValue: null,
                field: "deleted_at",
            },
            updatedAt: {
                type: "DATETIME",
                allowNull: false,
                defaultValue: new Date(),
                field: "updated_at",
            },
            createdAt: {
                type: "DATETIME",
                allowNull: false,
                defaultValue: new Date(),
                field: "created_at",
            },
        },
        {
            sequelize,
            modelName: "Application",
            tableName: "demo_applications",
        }
    );
    return Application;
};
