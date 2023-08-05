import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import JobList from "../../components/home components/JobList";

function SearchedJobs() {
  const { search_term } = useParams();
  const [jobs, setJobs] = useState([]);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/jobs?search_term=${search_term}&sortBy=${sort}`
      )
      .then((res) => {
        setJobs(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sort]);

  return (
    <>
      <JobList
        jobs={jobs}
        loading={loading}
        sort={sort}
        setSort={setSort}
        check={false}
      />
    </>
  );
}

export default SearchedJobs;
