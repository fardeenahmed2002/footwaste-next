'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Page = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.image) data.append('image', formData.image);

    try {
      const response = await axios.post('/api/collector/postAday', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Server response:', response.data);
      alert('Blog submitted successfully!');
      setFormData({ title: '', content: '', image: null });
      setPreview(null);
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('Failed to submit blog.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      {/* Title Bar */}
      <div className="w-full max-w-2xl bg-teal-600 text-white rounded-t-lg p-4 shadow-md text-center">
        <h1 className="text-2xl font-bold">Create a day</h1>
        <p className="text-sm mt-1">Fill the form below to publish a new day</p>
      </div>

      {/* Form */}
      <form 
        className="w-full max-w-2xl bg-white rounded-b-lg shadow-md p-6 mt-2 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {preview && (
            <img 
              src={preview} 
              alt="Preview" 
              className="mt-2 w-full h-auto rounded-md border border-gray-200"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Page;
