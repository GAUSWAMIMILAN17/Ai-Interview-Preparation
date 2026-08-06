import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_PATHS, BASE_URL } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice";
import Modal from "../Modal";
import SpinnerLoader from "../Loader/SpinnerLoader";

const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}${API_PATHS.AUTH.LOGOUT}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(logoutUser());
        navigate("/");
      }
    } catch (error) {
      console.log("Logout Error:", error);
    } finally {
      setLoading(false);
      setShowLogoutModal(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <img
          src={user?.profileImageUrl}
          alt="Profile"
          className="w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover"
        />

        <div>
          <div className="text-[15px] text-black font-bold">
            {user?.name || ""}
          </div>

          <button
            className="text-amber-600 font-semibold cursor-pointer hover:underline"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
  isOpen={showLogoutModal}
  onClose={() => setShowLogoutModal(false)}
  title="Logout"
>
  <div className="p-5">
    <p className="text-[14px] text-gray-700">
      Are you sure you want to logout from your account?
    </p>

    <div className="flex justify-end gap-3 mt-6">
      <button
        type="button"
        disabled={loading}
        onClick={() => setShowLogoutModal(false)}
        className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={handleLogout}
        className="btn-small flex items-center justify-center min-w-[100px] cursor-pointer"
      >
        {loading ? <div className="flex gap-2" ><SpinnerLoader /> Logging out...</div> : "Logout"}
      </button>
    </div>
  </div>
</Modal>
      
    </>
  );
};

export default ProfileInfoCard;