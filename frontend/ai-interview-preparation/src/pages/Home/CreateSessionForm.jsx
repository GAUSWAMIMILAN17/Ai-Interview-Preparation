import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/Inputs/Input.jsx";
import SpinnerLoader from "../../components/Loader/SpinnerLoader.jsx";

import { API_PATHS, BASE_URL } from "../../utils/apiPaths.js";
import { setLoading } from "../../redux/authSlice.js";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((store) => store.auth);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");

    dispatch(setLoading(true));

    try {
      // Generate AI Questions
      const aiResponse = await axios.post(
        `${BASE_URL}${API_PATHS.AI.GENERATE_QUESTIONS}`,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        },
        {
          withCredentials: true,
        }
      );

      const generatedQuestions = aiResponse.data;

      // Create Interview Session
      const res = await axios.post(
        `${BASE_URL}${API_PATHS.SESSION.CREATE}`,
        {
          ...formData,
          questions: generatedQuestions,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data?.session?._id) {
        navigate(`/interview-prep/${res.data.session._id}`);
      }
    } catch (error) {
      console.log("Session Creation Error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to create interview session.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>

      <p className="text-sm text-slate-700 mt-1 mb-5">
        Fill out a few quick details and unlock your personalized interview
        questions.
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="Frontend Developer"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="2"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) =>
            handleChange("topicsToFocus", target.value)
          }
          label="Topics to Focus On"
          placeholder="React, Node.js, MongoDB"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) =>
            handleChange("description", target.value)
          }
          label="Description"
          placeholder="Any additional notes..."
          type="text"
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <SpinnerLoader />
              Creating Session...
            </>
          ) : (
            "Create Session"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;