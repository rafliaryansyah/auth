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
            slug: DataTypes.STRING,
            key: {
                type: DataTypes.STRING,
                unique: true
            },
            accessSecretToken: {
                type: DataTypes.STRING,
                field: "access_secret_token"
            },
            accessExpiredDuration: {
                type: DataTypes.STRING,
                field: "access_expired_duration"
            },
            refreshSecretToken: {
                type: DataTypes.STRING,
                field: "refresh_secret_token"
            },
            refreshExpiredDuration: {
                type: DataTypes.STRING,
                field: "refresh_expired_duration"
            },
            expiredUnit: {
                type: DataTypes.ENUM("hours", "days"),
                field: "expired_unit"
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
