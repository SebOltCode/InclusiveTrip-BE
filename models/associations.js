import BarrierReview from './BarrierReviewsModel.js';
import Review from './ReviewModel.js';

BarrierReview.belongsTo(Review, { foreignKey: 'reviewId' });
Review.hasMany(BarrierReview, { foreignKey: 'reviewId' });

export default function associateModels() { }
