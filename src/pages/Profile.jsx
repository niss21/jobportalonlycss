import React, { useState, useEffect } from "react";
import axios from "axios";
import SpinnerLoader from "../components/loader components/SpinnerLoader";
import "./jobs/JobsTable.css";

function Profile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://apiforjob.onrender.com/api/getuserdata`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("id")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="page-wrapper">
      <h2 className="job-table-heading">Profile</h2>

      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="list">
          <h2>
            Name : <span>{user.name}</span>
          </h2>
          <h2>
            Email : <span>{user.email}</span>
          </h2>
          <h2>
            PhoneNumber : <span>{user.phoneNumber}</span>
          </h2>
          {localStorage.getItem("role") === "applicant" ? (
            <h2>
              Education : <span>{user.education}</span>
            </h2>
          ) : (
            <h2>
              Company : <span>{user.company}</span>
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
