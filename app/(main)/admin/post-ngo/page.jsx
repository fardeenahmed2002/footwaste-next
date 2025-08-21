"use client";

import axios from "axios";
import { useState } from "react";

const AddOrganizationPage = () => {
    const [formData, setFormData] = useState({
        titleBn: "",
        titleEn: "",
        descBn: "",
        descEn: "",
        siteLink: "",
        logo: null,
    });

    const [logoPreview, setLogoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
            setLogoPreview(URL.createObjectURL(files[0])); // Preview set
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.titleBn || !formData.titleEn || !formData.siteLink) {
            alert("Please fill all required fields!");
            return;
        }

        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            const res = await axios.post("/api/admin/add-organization", data, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            if (res.data.success) {
                alert("Organization added successfully!");
                setFormData({
                    titleBn: "",
                    titleEn: "",
                    descBn: "",
                    descEn: "",
                    siteLink: "",
                    logo: null,
                })
                setLogoPreview(null);
            } else {
                alert("Something went wrong!");
                console.log(res.data.message)
            }

        } catch (err) {
            console.error(err);
            alert("Error submitting form!");
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6">Add New Organization</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
                <div>
                    <label className="block mb-1 font-medium">Title (বাংলা)</label>
                    <input
                        type="text"
                        name="titleBn"
                        value={formData.titleBn}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Title in Bangla"
                    />
                </div>

          
                <div>
                    <label className="block mb-1 font-medium">Title (English)</label>
                    <input
                        type="text"
                        name="titleEn"
                        value={formData.titleEn}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Title in English"
                    />
                </div>

         
                <div>
                    <label className="block mb-1 font-medium">Description (বাংলা)</label>
                    <textarea
                        name="descBn"
                        value={formData.descBn}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Description in Bangla"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description (English)</label>
                    <textarea
                        name="descEn"
                        value={formData.descEn}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Description in English"
                    />
                </div>

     
                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Site Link</label>
                    <input
                        type="url"
                        name="siteLink"
                        value={formData.siteLink}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="https://example.com"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Logo</label>
                    <input
                        type="file"
                        name="logo"
                        onChange={handleChange}
                        accept="image/*"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {logoPreview && (
                        <img
                            src={logoPreview}
                            alt="Logo Preview"
                            className="mt-3 h-24 object-contain border rounded-md"
                        />
                    )}
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddOrganizationPage;
