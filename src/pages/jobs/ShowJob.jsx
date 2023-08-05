import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobsTable.css";
import SpinnerLoader from "../../components/loader components/SpinnerLoader";
import { createPortal } from "react-dom";
import LoaderContainer from "../../components/loader components/LoaderContainer";

function ShowJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/job/${id}`)
      .then((res) => {
        setJob(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const applyJob = (job) => {
    setApplying(true);
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/applyjob`,
        {
          jobs: { job_id: job._id },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        navigate("/appliedjobs");
      })
      .finally(() => {
        setApplying(false);
      });
  };

  return (
    <>
      <div className="page-wrapper">
        {loading ? (
          <SpinnerLoader />
        ) : (
          <>
            <div className="job-table-heading">
              <span>
                {job.title} - {job.company}
              </span>
            </div>

            <div className="showcontainer">
              {localStorage.getItem("role") === "applicant" && (
                <div className="btn">
                  <button onClick={() => applyJob(job)}>Apply This job</button>
                </div>
              )}
              <div className="list">
                <h2>
                  Title : <span>{job.title}</span>{" "}
                </h2>
                <h2>
                  Location : <span>{job.location}</span>{" "}
                </h2>
                <h2>
                  Company : <span>{job.company}</span>{" "}
                </h2>
                <h2>
                  Phone : <span>{job.phone}</span>{" "}
                </h2>
                <h2>
                  Website : <span>{job.website}</span>{" "}
                </h2>
                <h2>
                  Salary : <span>{job.salary}</span>{" "}
                </h2>
                <h2>
                  Vacancy : <span>{job.vacancy}</span>{" "}
                </h2>
              </div>

              <div className="desc">
                <h3>Job Description:</h3>
                <p>{job.description}</p>
                <h3>Job Requriements:</h3>
                <p>{job.requirements}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {applying &&
        createPortal(
          <LoaderContainer />,
          document.getElementById("modal-container")
        )}
    </>
  );
}

export default ShowJob;
