import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-medium text-gray-900">
                    {role}
                  </h2>

                  <p className="text-sm font-medium text-gray-600 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-3 mt-5">
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience: {experience} {experience == 1 ? "Year" : "Years"}
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient */}
      <div className="absolute top-0 right-0 w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center overflow-hidden">
        <div className="w-16 h-16 bg-lime-400 rounded-full blur-[65px] animate-blob1"></div>

        <div className="w-16 h-16 bg-teal-400 rounded-full blur-[65px] animate-blob2"></div>

        <div className="w-16 h-16 bg-cyan-300 rounded-full blur-[45px] animate-blob3"></div>

        <div className="w-16 h-16 bg-fuchsia-200 rounded-full blur-[45px] animate-blob1"></div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;