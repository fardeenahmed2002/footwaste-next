import React from 'react'

const page = () => {
  const soldFoods = [
    { id: 1, name: "Vegetable Curry", price: "৳120", buyer: "Hasan", date: "2025-05-20" },
    { id: 2, name: "Beef Biryani", price: "৳200", buyer: "Amina", date: "2025-05-19" },
    { id: 3, name: "Chicken Sandwich", price: "৳80", buyer: "Rahim", date: "2025-05-18" },
    { id: 4, name: "Mixed Salad", price: "৳60", buyer: "Lamia", date: "2025-05-17" },
    { id: 5, name: "Fish Fry", price: "৳150", buyer: "Omar", date: "2025-05-16" },
    { id: 6, name: "Pulao & Chicken", price: "৳180", buyer: "Mitu", date: "2025-05-15" },
    { id: 7, name: "Paratha & Veg", price: "৳40", buyer: "Kamal", date: "2025-05-14" },
    { id: 8, name: "Khichuri", price: "৳90", buyer: "Shakib", date: "2025-05-13" },
    { id: 9, name: "Pasta", price: "৳110", buyer: "Farzana", date: "2025-05-12" },
    { id: 10, name: "Fried Rice", price: "৳130", buyer: "Sajjad", date: "2025-05-11" },
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Sold Foods</h2>
      <ul className="space-y-4">
        {soldFoods.map(food => (
          <li key={food.id} className="p-4 border rounded-lg shadow bg-white">
            <h3 className="text-lg font-semibold">{food.name}</h3>
            <p className="text-sm text-gray-600">Buyer: {food.buyer}</p>
            <p className="text-sm text-gray-600">Price: {food.price}</p>
            <p className="text-sm text-gray-500">Date: {food.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default page
