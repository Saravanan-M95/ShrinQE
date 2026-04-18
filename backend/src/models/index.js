import sequelize from '../config/database.js';
import User from './User.js';
import Url from './Url.js';
import Click from './Click.js';
import Order from './Order.js';
import Payment from './Payment.js';

// Define associations
User.hasMany(Url, { foreignKey: 'userId', as: 'urls', onDelete: 'CASCADE' });
Url.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Url.hasMany(Click, { foreignKey: 'urlId', as: 'clicks', onDelete: 'CASCADE' });
Click.belongsTo(Url, { foreignKey: 'urlId', as: 'url' });

// Payment Associations
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Order.hasMany(Payment, { foreignKey: 'order_id', as: 'payments' });
Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

export { sequelize, User, Url, Click, Order, Payment };
