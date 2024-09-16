import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Barrier = sequelize.define("Barrier", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export default Barrier;