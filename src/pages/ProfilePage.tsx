import React, { useState, useEffect } from "react";

const ProfilePage: React.FC = () => {
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        registerNumber: "",
        department: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(userData);

    // Load user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
            setTempData(JSON.parse(storedUser)); // Ensure tempData is updated
        }
    }, []);

    // Handle input changes when editing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempData({
            ...tempData,
            [e.target.name]: e.target.value,
        });
    };

    // Save updated data
    const handleSave = () => {
        setUserData(tempData);
        localStorage.setItem("user", JSON.stringify(tempData));
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-green-500 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Profile</h1>

                <div className="space-y-4">
                    {["name", "username", "email", "registerNumber", "department"].map((field) => (
                        <div key={field}>
                            <label className="text-gray-700 font-medium capitalize">
                                {field === "registerNumber" ? "Register Number" : field.replace(/([A-Z])/g, " $1")}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name={field}
                                    value={tempData[field as keyof typeof tempData]}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    placeholder={`Enter ${field}`}
                                />
                            ) : (
                                <p className="p-2 border-2 border-gray-300 rounded-lg bg-gray-50 mt-1 text-gray-700">
                                    {userData[field as keyof typeof userData] || "—"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-center">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-medium"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
