import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import AIResponsePreview from "./components/AiResponsePreview";
import Drawer from "../../components/Drawer";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}${API_PATHS.SESSION.GET_ONE(sessionId)}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setSessionData(res.data.session);
      }
      // console.log(res.data.session)
    } catch (error) {
      console.log(error);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setOpenLearnMoreDrawer(true);
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      const res = await axios.post(
        `${BASE_URL}${API_PATHS.AI.GENERATE_EXPLANATION}`,
        {
          question,
        },
        {
          withCredentials: true,
        },
      );
      // console.log(res.data);
      if (res.data) {
        setExplanation(res.data);
      }
    } catch (error) {
      console.log("Generet Quetions Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(openLearnMoreDrawer);
  //   console.log(explanation);
  // }, [explanation]);

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}${API_PATHS.QUESTION.PIN(questionId)}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(res);
      if (res.data && res.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log("Pin Quetion Error", error);
    }
  };

  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axios.post(
        `${BASE_URL}${API_PATHS.AI.GENERATE_QUESTIONS}`,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        },
        {
          withCredentials: true,
        },
      );
      console.log(aiResponse.data)
      const generatedQuestions = aiResponse.data;

      const res = await axios.post(
        `${BASE_URL}${API_PATHS.QUESTION.ADD_TO_SESSION}`,
        {
          sessionId,
          questions: generatedQuestions,
        },
        {
          withCredentials: true,
        },
      );

      if (res.data) {
        toast.success("Added More Q&A!!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log("upload More Questions", error);
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);
  // useEffect(() => {
  //   console.log(sessionData);
  // }, [sessionData]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "--"}
        questions={sessionData?.questions?.length || "--"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />

                    {!isLoading &&
                      sessionData?.questions?.length === index + 1 && (
                        <div className="flex items-center justify-center mt-5">
                          <button
                            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                            disabled={isLoading || isUpdateLoader}
                            onClick={uploadMoreQuestions}
                          >
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className="text-lg" />
                            )}{" "}
                            Load More
                          </button>
                        </div>
                      )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {openLearnMoreDrawer && (
            <div className="col-span-12 md:col-span-5">
              {/* Learn More Drawer */}
            </div>
          )}
        </div>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" />
                {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
