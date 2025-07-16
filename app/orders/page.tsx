import db from '@/lib/mongodb'
import { Order } from '@/models/order'

export default async function OrdersPage() {
  await db()

  // Get all orders
  const rawOrders = await Order.find().lean()

  // Serialize _id and createdAt
  const orders = rawOrders.map((order) => ({
    _id: String(order._id),
    status: order.status,
    total: order.totalAmount || 0, // Adjust if your schema uses `total`
    createdAt: new Date(order.createdAt).toISOString(),
  }))

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-4 border rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                  <p className="text-sm text-gray-600">Total: ₹{order.total}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
