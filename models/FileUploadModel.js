import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";


const FileUpload = sequelize.define("FileUpload", {
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


export default FileUpload;