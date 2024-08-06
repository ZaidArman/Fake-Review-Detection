import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password don't match");
      return;
    }

    try {
      const resetToken = new URLSearchParams(window.location.search).get('token');
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/password_reset/confirm/', {
        token: resetToken,
        new_password: newPassword,  // Ensure this matches what your backend expects
      });

      if (response.status === 200) {
        setMessage('Password reset successful!');
        navigate('/login');
      } else {
        setError(response.data?.message || 'An error occurred during password reset.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during password reset.');
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-center px-4 py-32 sm:py-40">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" alt="Logo" />
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Reset Your Password
            </h3>
          </div>
        </div>
        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label className="font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Reset Password
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
