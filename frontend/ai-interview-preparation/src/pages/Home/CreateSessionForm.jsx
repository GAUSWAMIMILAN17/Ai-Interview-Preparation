import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx"
import SpinnerLoader from "../../components/Loader/SpinnerLoader.jsx";
import { setLoading } from "../../redux/authSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { API_PATHS, BASE_URL } from "../../utils/apiPaths.js";
import axios from "axios";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{loading} = useSelector((store) => store.auth);

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
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
    dispatch(setLoading(true))
    try {
      const aiResponse = await axios.post(`${BASE_URL}${API_PATHS.AI.GENERATE_QUESTIONS}`, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions : 10
      }, {
        withCredentials: true
      })

      const generatedQuestions = aiResponse.data;

      const res = await axios.post(`${BASE_URL}${API_PATHS.SESSION.CREATE}`,
        {
          ...formData,
          questions : generatedQuestions
        }, 
        {
          withCredentials: true
        }
      )

      if(res.data?.session?._id){
        navigate(`/interview-prep/${res.data?.session._id}`)
      }
    } catch(error) {
      console.log("Session Creation Error", error)
    } finally {
      dispatch(setLoading(false))
    }

  };

  return (
  <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
    <h3 className="text-lg font-semibold text-block">
      Start a New Interview Journey
    </h3>

    <p className="text-x5 text-slate-700 mt-[5px] mb-3">
      Fill out a few quick details and unlock your personalized set of
      interview questions!
    </p>

    <form onSubmit={handleCreateSession} className="flex flex-col">
      <Input
        value={formData.role}
        onChange={({ target }) => handleChange("role", target.value)}
        label="Target Role"
        placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
        type="text"
      />

      <Input
        value={formData.experience}
        onChange={({ target }) => handleChange("experience", target.value)}
        label="Years of Experience"
        placeholder="(e.g., 1 year, 3 years, 5+ years)"
        type="number"
      />

      <Input
        value={formData.topicsToFocus}
        onChange={({ target }) =>
          handleChange("topicsToFocus", target.value)
        }
        label="Topics to Focus On"
        placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
        type="text"
      />

      <Input
        value={formData.description}
        onChange={({ target }) =>
          handleChange("description", target.value)
        }
        label="Description"
        placeholder="(Any specific goals or notes for this session)"
        type="text"
      />

      {error && <p className="text-red-500 text-x5 pb-2.5">{error}</p>}

      <button
        type="submit"
        className="btn-primary w-full mt-2"
        // disabled={}
      > {
        loading && <SpinnerLoader />
      }
        Create Session
      </button>
    </form>
  </div>
);
};

export default CreateSessionForm;