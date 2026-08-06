import React from "react";
import SpinnerLoader from "./Loader/SpinnerLoader"; // Change path if needed

const DeleteAlertContent = ({ content, onDelete, loading }) => {
  return (
    <div className="p-5">
      <p className="text-[14px]">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="btn-small cursor-pointer flex items-center justify-center min-w-[100px]"
          onClick={onDelete}
          disabled={loading}
        >
          {loading ? <div className="flex gap-2" ><SpinnerLoader /> Deleting</div> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;