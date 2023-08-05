import axios from "axios";
import "../loader components/ModalWrapper.css";
import "./DialougeModal.css";
import { useState } from "react";
import DeleteLoader from "../loader components/DeleteLoader";

function DialougeModal({
  jobId,
  posted_jobs,
  setShowDeleteModal,
  setShowDialouge,
}) {
  const [deleting, setDeleting] = useState(false);
  const [initil, setInitial] = useState(true);
  const [err, setErr] = useState(null);

  const deleteJob = () => {
    if (!deleting) {
      setDeleting(true);
    }
    if (initil) {
      setInitial(false);
    }
    if (err) {
      setErr(null);
    }

    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((_) => {
        posted_jobs();
      })
      .catch((err) => {
        setErr(err);
      })
      .finally(() => {
        setDeleting(false);
      });
  };
  return (
    <div className="modal-wrapper">
      <div className="dialouge-wrapper">
        {deleting ? (
          <>
            <DeleteLoader />
          </>
        ) : initil ? (
          <>
            <h2>Are you sure you want to delete this job?</h2>
            <div className="dialouge-btns">
              <button onClick={() => deleteJob()} className="delete-btn">
                Delete
              </button>
              <button
                onClick={() => setShowDialouge(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </>
        ) : err ? (
          <>
            <h2>Error while deleting job!</h2>
            <div className="dialouge-btns">
              <button onClick={() => deleteJob()} className="delete-btn">
                Try Again
              </button>
              <button
                onClick={() => setShowDialouge(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Job Deleted Successfully!</h2>
            <div className="dialouge-btns">
              <button
                onClick={() => setShowDialouge(false)}
                className="cancel-btn"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DialougeModal;
