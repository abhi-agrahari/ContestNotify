import React from "react";

export default function VerifyEmail() {

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-xl text-red-900 font-semibold mb-2">Email Verification</h2>
        <p className="text-gray-700">We have sent an <largr> Email Verification Link </largr>, Please verify your email.</p>
      </div>
    </div>
  );
}
