import React from 'react';

const page = () => {
  const blogs = [
    { id: 1, title: "How to Reduce Food Waste", author: "Aminul", date: "2025-05-20" },
    { id: 2, title: "The Power of Community Donation", author: "Sharmin", date: "2025-05-18" },
    { id: 3, title: "Top 10 Ways to Preserve Leftovers", author: "Jamil", date: "2025-05-15" },
    { id: 4, title: "Importance of Food Safety", author: "Nadia", date: "2025-05-10" },
    { id: 5, title: "How NGOs Are Fighting Hunger", author: "Rahim", date: "2025-05-05" },
    { id: 6, title: "Why Every Meal Counts", author: "Salma", date: "2025-04-30" },
    { id: 7, title: "Cooking With Extra Ingredients", author: "Kamal", date: "2025-04-28" },
    { id: 8, title: "Sustainable Eating Habits", author: "Lubna", date: "2025-04-25" },
    { id: 9, title: "Behind the Scenes: Food Distribution", author: "Hasib", date: "2025-04-22" },
    { id: 10, title: "Volunteering to Make a Difference", author: "Tanvir", date: "2025-04-20" },
    { id: 11, title: "What Happens to Unused Food?", author: "Rina", date: "2025-04-17" },
    { id: 12, title: "Starting Your Own Donation Drive", author: "Faisal", date: "2025-04-15" },
    { id: 13, title: "The Global Impact of Food Waste", author: "Mehzabin", date: "2025-04-12" },
    { id: 14, title: "Food Waste in Urban Areas", author: "Omar", date: "2025-04-10" },
    { id: 15, title: "Celebrating World Hunger Day", author: "Mithila", date: "2025-04-08" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      <ul className="space-y-4">
        {blogs.map(blog => (
          <li key={blog.id} className="p-4 border rounded-lg shadow bg-white">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-600">by {blog.author} on {blog.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
