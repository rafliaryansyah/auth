"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
const apiError = require("../Utils/ApiError");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Application, {
                foreignKey: "applicationId",
                as: "application"
            })
        }

        /**
         * Check if nrp has been taken
         * @param {string} nrp - The user nrp
         * @returns {Promise<boolean>}
         */
        static async isNrpTaken(nrp) {
            const user = await this.findOne({
                where: {
                    nrp,
                },
            });
            return !!user;
        }

        /**
         * Check if password matches user password
         * @param {string} requestPassword
         * @param {string} currentPassword
         * @returns {Promise<boolean>} bcrypt
         */
        static async isPasswordMatch(requestPassword, currentPassword) {
            if (!requestPassword || !currentPassword) throw new apiError(400, "BadRequest", "akun terkoneksi dengan google authentikasi, silahkan reset kata sandi atau request kata sandi tidak ditemukan")
            return bcrypt.compare(requestPassword, currentPassword);
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                autoIncrement: true,
                field: "id",
            },
            applicationId: {
                type: DataTypes.UUID,
                field: "application_id",
            },
            site: DataTypes.ENUM("Site A", "Site B", "Site C", "Site D"),
            fullName: {
                type: DataTypes.STRING,
                unique: false,
                field: "full_name",
            },
            nrp: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    unique: function (value, next) {
                        User.isNrpTaken(value).then((taken) => {
                            if (taken) {
                                return next("Nrp telah digunakan");
                            }
                            return next();
                        });
                    }
                }
            },
            definePassword: {
                type: DataTypes.STRING,
                field: "define_password"
            },
            md5Password: {
                type: DataTypes.STRING,
                field: "md5_password"
            },
            password: DataTypes.STRING,
            status: DataTypes.ENUM("Aktif", "Tidak Aktif"),
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
            modelName: "User",
            tableName: "demo_users",
        }
    );
    return User;
};
