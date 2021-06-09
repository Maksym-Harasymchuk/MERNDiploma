import mongoose from 'mongoose';

// const orderSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//     orderItem: [
//       {
//         name: { type: String, required: true },
//         qty: { type: Number, required: true },
//         img: { type: String, required: true },
//         price: { type: Number, required: true },
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           required: true,
//           ref: 'Product',
//         },
//       },
//     ],
//     shippingAddress: {
//       address: {
//         type: String,
//         required: false,
//       },
//       city: {
//         type: String,
//         required: false,
//       },
//       region: {
//         type: String,
//         required: false,
//       },
//     },
//     paymentMethod: {
//       type: String,
//       required: false,
//     },
//     // paymentResult: {
//     //   id: { type: String },
//     //   status: { type: String },
//     //   update_time: { type: String },
//     //   email_address: { type: String },
//     // },
//     taxPrice: {
//       type: Number,
//       required: false,
//       default: 0,
//     },
//     shippingPrice: {
//       type: Number,
//       required: false,
//       default: 0,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     isPaid: {
//       type: Boolean,
//       required: false,
//       default: 0,
//     },
//     // paidAt: {
//     //   type: Date,
//     // },
//     isDelivered: {
//       type: Boolean,
//       required: false,
//       defaul: false,
//     },
//     deliveredAt: {
//       type: Date,
//     },
//   },
//   {
//     timestapms: true,
//   }
// );

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
    },
  },
  {
    timestapms: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
