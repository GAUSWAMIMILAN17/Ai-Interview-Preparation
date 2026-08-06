import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../../utils/apiPaths.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice.js";

const Login = ({ setCurrentPage, setOpenAuthModel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {loading} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (!password) {
    setError("Please enter the password");
    return;
  }

  setError("");

  dispatch(setLoading(true));

  try {
    const res = await axios.post(
      `${BASE_URL}${API_PATHS.AUTH.LOGIN}`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      dispatch(setUser(res.data.userData));
      setOpenAuthModel(false);
      navigate("/");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    dispatch(setLoading(false));
  }
};

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Welcome Back
      </h3>

      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && (
  <p className="text-red-500 text-xs pb-2.5">
    {error}
  </p>
)}

<button
  type="submit"
  disabled={loading}
  className="btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Logging in...
    </>
  ) : (
    "LOGIN"
  )}
</button>

<p className="text-[13px] text-slate-800 mt-3">
  Don't have an account?{" "}
  <button
    className="font-medium text-primary underline cursor-pointer"
    onClick={() => {
      setCurrentPage("signup");
    }}
  >
    SignUp
  </button>
</p>
      </form>
    </div>
  );
};

export default Login;