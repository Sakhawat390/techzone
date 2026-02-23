import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Account: React.FC = () => {
    const { user, updateUser } = useContext(AuthContext);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logic to update user profile
        // Call updateUser with new data
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <h1 className="text-4xl font-bold mb-6">Account Management</h1>
            <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 transition">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Account;