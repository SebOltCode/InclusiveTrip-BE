import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";
import BarrierReview from "./BarrierReviewsModel.js";

const Review = sequelize.define("Review", {
    placeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    placeId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});




export default Review;
