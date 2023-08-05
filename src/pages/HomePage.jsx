import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/home components/SearchBar.jsx";
import CategoryList from "../components/home components/CategoryList.jsx";
import JobList from "../components/home components/JobList.jsx";
import Pagination from "../components/home components/Pagination.jsx";

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [metadata, setMetaData] = useState({
    total: 1,
    page: 1,
    per_page: 9,
  });
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const debounce = (mainFunc, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        mainFunc();
      }, delay);
    };
  };

  function fetchJobs() {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_SERVER_URL}/jobs?page=${
          metadata.page
        }&search_term=&category=${category}&sortBy=${sort}`
      )
      .then((res) => {
        setJobs(res.data.data);
        if (res.data.meta) {
          setMetaData({
            ...metadata,
            total: res.data.meta.total,
            per_page: res.data.meta.per_page,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    const debouncedFetchJobs = debounce(fetchJobs, 500);
    debouncedFetchJobs();
    // fetchJobs();
  }, [metadata.page, category, sort]);

  const handlePageClick = (event) => {
    setMetaData({ ...metadata, page: event.selected + 1 });
  };

  return (
    <div className="page-wrapper">
      <SearchBar />
      <CategoryList category={category} setCategory={setCategory} />
      <JobList
        jobs={jobs}
        loading={loading}
        sort={sort}
        setSort={setSort}
        check={true}
      />
      {!loading && (
        <Pagination
          currentPage={metadata.page}
          totalPages={metadata.total / metadata.per_page}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
  );
}

export default HomePage;
