import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'initiated',
  },
  paymentStatus: {
    type: DataTypes.STRING(50),
    defaultValue: 'pending',
    field: 'payment_status'
  },
  cashfreeOrderId: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'cashfree_order_id'
  },
  aggregatorOrderId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'aggregator_order_id'
  },
  itemType: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'item_type'
  },
  itemId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'item_id'
  }
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true,
});

export default Order;
