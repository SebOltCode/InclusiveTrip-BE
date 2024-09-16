import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const BarrierReview = sequelize.define('BarrierReview', {
    reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Reviews', // Name of the target model
            key: 'id'
        }
    },
    barrierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Barriers', // Name of the target model
            key: 'id'
        }
    },
    reviews: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default BarrierReview;