import React, { useState } from 'react';
import { FaUser, FaLink, FaSave, FaImage, FaEnvelope, FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAuthContext } from '../Context/useAuthContext';

const MyProfile = () => {
  const { user, updateUser, setUser } = useAuthContext();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!displayName) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      await updateUser({ displayName, photoURL }); 
      setUser((prev) => ({ ...prev, displayName, photoURL }));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-20 px-4">
      <title>FinEase | My Profile</title>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-xl border border-base-300 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-secondary opacity-20"></div>
              
              <div className="relative mt-4">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl">
                    <img src={user?.photoURL || 'https://i.ibb.co/V3Tj6Vf/user.png'} alt="User" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-1/2 translate-x-12 bg-primary text-white p-2 rounded-full shadow-lg">
                  <FaCamera size={14} />
                </div>
              </div>

              <h2 className="text-2xl font-black mt-6 text-base-content">{user?.displayName || 'FinEase User'}</h2>
              <p className="text-sm opacity-60 font-medium flex items-center justify-center gap-2 mt-1">
                <FaEnvelope className="text-primary" /> {user?.email}
              </p>
              
              <div className="divider opacity-50 my-6"></div>
              
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-xs uppercase font-bold opacity-40">Status</p>
                  <p className="text-sm font-bold text-success">Verified</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold opacity-40">Role</p>
                  <p className="text-sm font-bold">Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-base-300">
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">Edit <span className="text-primary">Profile</span></h3>
              <p className="text-base-content/60 mb-10">Keep your personal information up to date to get the best experience.</p>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label font-bold text-xs uppercase opacity-60">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-4 text-primary opacity-50" />
                      <input
                        type="text"
                        className="input input-bordered w-full pl-12 bg-base-200 focus:input-primary rounded-2xl border-none font-medium"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label font-bold text-xs uppercase opacity-60">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-4 text-primary opacity-50" />
                      <input
                        type="email"
                        className="input input-bordered w-full pl-12 bg-base-200 cursor-not-allowed rounded-2xl border-none opacity-60 font-medium"
                        value={user?.email}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-60">Profile Image URL</label>
                  <div className="relative">
                    <FaImage className="absolute left-4 top-4 text-primary opacity-50" />
                    <input
                      type="url"
                      className="input input-bordered w-full pl-12 bg-base-200 focus:input-primary rounded-2xl border-none font-medium"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <p className="text-[10px] mt-2 opacity-50 flex items-center gap-1 ml-2 uppercase tracking-widest font-bold">
                    <FaLink /> Direct image links only (ImgBB, Cloudinary etc)
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-2xl px-10 gap-3 text-white shadow-lg shadow-primary/30 group"
                  >
                    <FaSave /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;