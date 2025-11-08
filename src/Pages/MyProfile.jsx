import React, { useState } from 'react';
import { FaUser, FaLink, FaSave, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuthContext } from '../Context/useAuthContext';

const MyProfile = () => {
  const { user, updateUser, setUser } = useAuthContext();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || 'https://i.ibb.co/V3Tj6Vf/user.png');
  
  const handleImageError = (e) => {
    e.target.src = 'https://i.ibb.co/V3Tj6Vf/user.png'; 
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!displayName) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      await updateUser(displayName, photoURL); 
      
      setUser((prevUser) => ({
        ...prevUser,
        displayName: displayName,
        photoURL: photoURL,
      }));
      
      toast('Profile updated successfully!');
    } catch (error) {
      console.error("Profile update error:", error);
      toast(error.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8 flex items-center justify-center font-sans">
      <div className="card w-full max-w-xl bg-white shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        <div className="card-body p-6 md:p-10">
          <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-2">
            Update Your Profile
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Manage your personal information and profile picture.
          </p>

          <form onSubmit={handleProfileUpdate} className="space-y-7">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="avatar">
                <div className="w-36 h-36 rounded-full ring-4 ring-indigo-300 ring-offset-base-100 ring-offset-2 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  <img
                    src={user?.photoURL || 'https://i.ibb.co/V3Tj6Vf/user.png'}
                    alt="User Profile"
                    className="object-cover w-full h-full"
                    onError={handleImageError}
                  />
                </div>
              </div>
              <p className="text-lg font-medium text-gray-800">
                {user?.displayName || 'Guest User'}
              </p>
              <p className="text-sm text-gray-500 -mt-2">
                {user?.email || 'email@example.com'}
              </p>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold text-base">
                  Your Name
                </span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-gray-50 focus-within:border-indigo-400">
                <FaUser className="text-gray-400 text-xl" />
                <input
                  type="text"
                  name="displayName"
                  className="grow outline-none bg-transparent text-gray-800 text-base"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold text-base">
                  Profile Picture URL
                </span>
              </label>
              <label className="input input-bordered flex items-center gap-3 bg-gray-50 focus-within:border-indigo-400">
                <FaImage className="text-gray-400 text-xl" />
                <input
                  type="url"
                  name="photoURL"
                  className="grow outline-none bg-transparent text-gray-800 text-base"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Paste image URL here"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2 ml-1">
                <FaLink className="inline-block mr-1" />
                Provide a direct link to your profile image (e.g., from ImgBB).
              </p>
            </div>

            <div className="form-control mt-10">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 text-xl"
              >
                <FaSave />
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;