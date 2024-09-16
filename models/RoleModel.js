import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";


const Role = sequelize.define("Role", {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


export default Role;