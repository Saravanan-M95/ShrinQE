import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'order_id'
  },
  aggregatorName: {
    type: DataTypes.STRING(50),
    defaultValue: 'cashfree',
    field: 'aggregator_name'
  },
  aggregatorOrderId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'aggregator_order_id'
  },
  aggregatorReferenceId: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'aggregator_reference_id'
  },
  transactionId: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'transaction_id'
  },
  aggregatorStatus: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'aggregator_status'
  },
  paymentMethod: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'payment_method'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  rawResponse: {
    type: DataTypes.JSONB,
    allowNull: true,
    field: 'raw_response'
  }
}, {
  tableName: 'payments',
  timestamps: true,
  underscored: true,
});

export default Payment;
