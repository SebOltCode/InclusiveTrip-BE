import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";


const PlaceCategory = sequelize.define("PlaceCategory", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    searchName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "amenity",
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    iconColor: {
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

export default PlaceCategory;