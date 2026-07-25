import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_PATHS, BASE_URL } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/authSlice';

const ProfileInfoCard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((store) => store.auth)
    
    const handleLogout = async() => {
        try{
            const res = await axios.post(`${BASE_URL}${API_PATHS.AUTH.LOGOUT}`,{}, {
            withCredentials : true
        })

        if(res.data.success){
            dispatch(logoutUser())
            navigate("/")
        }
        } catch (error) {
            console.log("Logout Error" , error)
        }
    }
  return (
    <div className="flex items-center">
    <img
      src={user.profileImageUrl}
      alt=""
      className="w-11 h-11 bg-gray-300 rounded-full mr-3"
    />

    <div>
      <div className="text-[15px] text-black font-bold leading-3">
        {user.name || ""}
      </div>

      <button
        className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>
  );
};

export default ProfileInfoCard;