import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const platformList = ["Codeforces", "LeetCode", "Atcoder", "CodeChef", "hackerrank", "hackerearth"];

export default function Preferences() {
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [notifyBeforeMinutes, setNotifyBeforeMinutes] = useState(30);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPreferences = async () => {
      try {
        const res = await API.get("/user/preferences", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSelectedPlatform(res.data.platforms || []);
        setNotifyBeforeMinutes(res.data.notifyBeforeMinutes || 30);
      } catch (err) {
        setMessage("Please Login to save Preferences");
      }
    };

    fetchPreferences();
  }, []);

  const handleCheckBox = (platform) => {
    setSelectedPlatform((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/user/preferences",
        {
          platforms: selectedPlatform,
          notifyBeforeMinutes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Preferences updated successfully");
      navigate('/');
    } catch (err) {
      setMessage("❌ Error updating preferences");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Your Preferences</h2>
      {message && (
        <p
          className={`mb-4 text-sm font-medium ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
          <div className="space-y-2">
            {platformList.map((platform) => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedPlatform.includes(platform)}
                  onChange={() => handleCheckBox(platform)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-800">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notify Before (minutes)
          </label>
          <input
            type="number"
            min="0"
            value={notifyBeforeMinutes}
            onChange={(e) => setNotifyBeforeMinutes(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}
