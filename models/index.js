import sequelize from "../db/index.js";
import Review from "./ReviewModel.js";
import BarrierReview from "./BarrierReviewsModel.js";
import PlaceCategory from "./PlaceCategoryModel.js";
import FileUpload from "./FileUploadModel.js";
import User from "./UserModel.js";
import Role from "./RoleModel.js";
import Barrier from "./BarrierModel.js";

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Role.hasOne(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

Review.hasMany(FileUpload, { foreignKey: "reviewId" });
FileUpload.belongsTo(Review, { foreignKey: "reviewId" });

PlaceCategory.hasMany(Review, { foreignKey: "placeCategoryId" });
Review.belongsTo(PlaceCategory, { foreignKey: "placeCategoryId" });

Barrier.hasMany(BarrierReview, { foreignKey: 'barrierId' });
BarrierReview.belongsTo(Barrier, { foreignKey: 'barrierId' });

Review.hasMany(BarrierReview, { foreignKey: 'reviewId' });
BarrierReview.belongsTo(Review, { foreignKey: 'reviewId' });


await sequelize.sync();
console.log("All models were synchronized successfully.");
