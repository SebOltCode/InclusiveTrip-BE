import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Review from './ReviewModel.js';

const BarrierReview = sequelize.define('BarrierReview', {
    reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Reviews',
            key: 'id'
        }
    },
    barrierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Barriers',
            key: 'id'
        }
    },
    reviews: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});




export default BarrierReview;
