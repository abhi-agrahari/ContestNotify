import React, { useState } from "react";
import API from "../api";

const platformList = ['Codefroces', 'LeetCode', 'Atcoder'];

export default function Preferences() {
    const [selectedPlatform, setSelectedPlatform] = useState([]);
    const [notifyBeforeMinutes, setNotifyBeforeMinutes] = useState(30);
    const [message, setMessage] = useState('');

    const handleCheckBox = (platform) => {
        setSelectedPlatform(prev =>
            prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await API.post('/user/preferences',
                {
                    platforms: selectedPlatform, notifyBeforeMinutes,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            setMessage('Preferences updated successfully');
        } catch (err) {
            setMessage('Error updating preferences');
        }
    }

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center"> Update Preferences </h2>
            {message && <p className="mb-4 text-center text-sm text-green-600">{message}</p>}
            <form onSubmit={handleSubmit}  className="space-y-6">
            <div>
                    <label className="block text-lg font-semibold mb-2">Select Platforms:</label>
                    <div className="flex flex-col gap-2">
                        {platformList.map((platform) => (
                            <label key={platform} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    checked={selectedPlatform.includes(platform)}
                                    onChange={() => handleCheckBox(platform)}
                                />
                                <span className="ml-2 text-gray-700">{platform}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Notify Before (minutes):
                    </label>
                    <input
                        type="number"
                        value={notifyBeforeMinutes}
                        onChange={(e) => setNotifyBeforeMinutes(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Save Preferences
                </button>
            </form>
        </div>
    )
}