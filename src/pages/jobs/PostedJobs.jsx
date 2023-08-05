import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import DialougeModal from "../../components/custom components/DialougeModal";
import SpinnerLoader from "../../components/loader components/SpinnerLoader";
import "./JobsTable.css";

function PostedJobs() {
  const [postedjobs, setPostedjobs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [loading, setLoading] = useState(false);

  const posted_jobs = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_SERVER_URL}/postedjobs/${localStorage.getItem(
          "id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setPostedjobs(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteJob = (id) => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/job/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setShowDeleteModal(false);
        posted_jobs();
      });
  };

  useEffect(() => {
    posted_jobs();
  }, []);

  const renderJobs = postedjobs.map((job, indx) => {
    return (
      <div className="jobs-table-row" key={indx}>
        <span>{job.title}</span>
        <span>{job.location}</span>
        <span>{job.posted_date.slice(0, 10)}</span>
        <span>{job.closing_date.slice(0, 10)}</span>
        <span className="job-actions">
          <Link to={`/job/${job._id}`}>
            <AiOutlineEye size={18} fill="#338573" />
          </Link>
          <Link to={`/editjob/${job._id}`}>
            <GoPencil size={18} fill="#04BCF6" />
          </Link>
          <RiDeleteBin7Line
            size={18}
            fill="#FA0606"
            onClick={() => {
              setJobId(job._id);
              setShowDeleteModal(true);
            }}
          />
        </span>
      </div>
    );
  });

  return (
    <>
      <div className="page-wrapper">
        <h2 className="job-table-heading">My Jobs List</h2>
        <div className="jobs-table">
          <div className="jobs-table-header">
            <span>Title</span>
            <span>Location</span>
            <span>Posted On</span>
            <span>Deadline</span>
            <span>Action</span>
          </div>
          {!loading && postedjobs.length > 0 && renderJobs}
        </div>
        {loading && <SpinnerLoader />}
        {!loading && postedjobs.length === 0 && (
          <h2 className="jobtable-status">No Jobs Posted</h2>
        )}
      </div>
      {showDeleteModal &&
        createPortal(
          <DialougeModal
            jobId={jobId}
            posted_jobs={posted_jobs}
            setShowDeleteModal={setShowDeleteModal}
            setShowDialouge={setShowDeleteModal}
          />,
          document.getElementById("modal-container")
        )}
    </>
  );
}

export default PostedJobs;
