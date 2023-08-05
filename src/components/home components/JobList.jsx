import { MdOutlineSort } from "react-icons/md";
import Job from "./Job.jsx";
import "./JobList.css";
import Skeleton from "../loader components/Skeleton.jsx";
import { useEffect } from "react";

function JobList({ jobs, loading, sort, setSort, check }) {
  useEffect(() => {
    const sortMenu = document.querySelector(".sort-menu");
    const sortMenuBtn = document.querySelector(".sort-btn");

    const hideMenu = (event) => {
      if (
        !(sortMenu.contains(event.target) || sortMenuBtn.contains(event.target))
      ) {
        sortMenu.classList.remove("show-sort-menu");
      }
    };

    document.body.addEventListener("click", hideMenu);

    return () => document.body.removeEventListener("click", hideMenu);
  });

  const handleSortMenuToggle = () => {
    const sortMenuEl = document.querySelector(".sort-menu");
    if (sortMenuEl.classList.contains("show-sort-menu")) {
      sortMenuEl.classList.remove("show-sort-menu");
    } else {
      sortMenuEl.classList.add("show-sort-menu");
    }
  };

  const renderSkeletons = Array(12)
    .fill(0)
    .map((_, indx) => <Skeleton key={indx} />);

  const renderJobs = jobs.map((job, indx) => <Job job={job} key={indx} />);
  return (
    <div className="joblist-wrapper">
      {check ? (
        <h2 className="joblist-title">All Popular Listed Jobs</h2>
      ) : (
        <h2 className="joblist-title">Search Results</h2>
      )}
      {!loading && (
        <div className="sort-btn-wrapper">
          <div onClick={handleSortMenuToggle} className="sort-btn">
            <MdOutlineSort size={20} />
            <h4>Sort by</h4>
          </div>
          <div className="sort-menu">
            <div
              onClick={() => {
                handleSortMenuToggle();
                setSort("salary");
              }}
            >
              Salary
            </div>
            <div
              onClick={() => {
                handleSortMenuToggle();
                setSort("vacancy");
              }}
            >
              Vacancy
            </div>
          </div>
        </div>
      )}
      <div className="job-wrapper">
        {loading ? renderSkeletons : renderJobs}
      </div>
    </div>
  );
}

export default JobList;
