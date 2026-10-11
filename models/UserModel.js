import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";
import Role from "./RoleModel.js";


const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: "id",
        },
        defaultValue: 3,
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    // The password hash is never loaded unless explicitly requested via User.scope("withPassword")
    defaultScope: {
        attributes: { exclude: ["password"] },
    },
    scopes: {
        withPassword: {
            attributes: { include: ["password"] },
        },
    },
});

// Never serialize the password hash, even if it was loaded
User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
};

export default User;
