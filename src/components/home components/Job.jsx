import React from "react";
import { Link } from "react-router-dom";

import { MdLocationOn } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";

import "./Job.css";

function Job({ job }) {
  return (
    <div className="job">
      <img
        // src="https://static.vecteezy.com/system/resources/previews/013/948/549/original/google-logo-on-transparent-white-background-free-vector.jpg"
        // alt="job"
        src={`https://apiforjob.onrender.com/${job.images}`}
      />
      <div className="preview-right">
        <div className="job-preview">
          <span className="company-name">{job.company}</span>
          <h3>{job.title}</h3>
          <div className="job-mini-details">
            <div>
              <MdLocationOn />
              <span>{job.location}</span>
            </div>
            <div>
              <FaMoneyBillWave />
              <span>{job.salary}</span>
            </div>
            <div>
              <BiSolidUser />
              <span>{job.vacancy}</span>
            </div>
          </div>
        </div>

        <Link to={`/job/${job._id}`}>
          <button>View Details</button>
        </Link>

      </div>
    </div>
  );
}

export default Job;
