import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import TableLoader from "../../components/loader components/SpinnerLoader";
import LoaderContainer from "../../components/loader components/LoaderContainer";
import "../Form.css";
import { createPortal } from "react-dom";
import Loader from "../../components/loader components/Loader";

function PostJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    phone: "",
    website: "",
    requirements: "",
    salary: "",
    vacancy: "",
    category: [],
    posted_date: "",
    closing_date: "",
    description: "",
    images: null,
  });
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("No selected file");
  const [posting, setPosting] = useState(false);

  const categories = [
    { name: "Cybersecurity", value: "Cybersecurity" },
    { name: "Frontend", value: "Frontend" },
    { name: "Backend", value: "Backend" },
    { name: "Web Developer", value: "Web Developer" },
    { name: "App Developer", value: "App Developer" },
    { name: "Management", value: "Management" },
    { name: "Graphics Designer", value: "Graphics Designer" },
    { name: "Software Developer", value: "Software Developer" },
    { name: "Video Editor", value: "Video Editor" },
    { name: "HR", value: "HR" },
  ];

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/job/${id}`)
        .then(
          ({
            data: {
              title,
              company,
              location,
              phone,
              website,
              requirements,
              salary,
              vacancy,
              category,
              posted_date,
              closing_date,
              description,
              images,
            },
          }) => {
            setJob({
              title,
              company,
              location,
              phone,
              website,
              requirements,
              salary,
              vacancy,
              category,
              posted_date: posted_date.slice(0, 10),
              closing_date: closing_date.slice(0, 10),
              description,
              images: null,
            });
            urlToFile(images);
          }
        )
        .finally(() => {
          setLoading(false);
        });
    } else {
      setJob({
        title: "",
        company: "",
        location: "",
        phone: "",
        website: "",
        requirements: "",
        salary: "",
        vacancy: "",
        category: [],
        posted_date: "",
        closing_date: "",
        description: "",
        images: null,
      });
    }
  }, [id]);

  const urlToFile = (name) => {
    fetch(`https://apiforjob.onrender.com/${name}`)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], name, { type: blob.type });
        setJob((prev) => ({ ...prev, images: file }));
        setFileName(name);
      });
  };

  const handleCategoryChange = (event) => {
    const cat = event.target.value;
    const tempCategories = [...job.category];

    if (tempCategories.includes(cat)) {
      const index = tempCategories.indexOf(cat);
      tempCategories.splice(index, 1);
    } else {
      tempCategories.push(cat);
    }
    setJob({ ...job, category: tempCategories });
  };

  const validateCheckbox = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    return Array.from(checkboxes).some((checkbox) => checkbox.checked);
  };

  const handleChange = (event) => {
    setJob({ ...job, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkboxValidation = validateCheckbox();
    if (checkboxValidation) {
      console.log("has category");
    } else {
      console.log("no category");
    }

    let form_data = new FormData();
    form_data.append("title", job.title);
    form_data.append("company", job.company);
    form_data.append("location", job.location);
    form_data.append("phone", job.phone);
    form_data.append("website", job.website);
    form_data.append("salary", job.salary);
    form_data.append("vacancy", job.vacancy);
    form_data.append("requirements", job.requirements);
    form_data.append("description", job.description);
    form_data.append("posted_date", job.posted_date);
    form_data.append("closing_date", job.closing_date);

    form_data.append("images", job.images);

    let tempCategory = [...job.category];
    tempCategory.forEach((cat) => {
      form_data.append("category", cat);
    });

    let method = "post";
    let url = `${import.meta.env.VITE_SERVER_URL}/job`;

    if (id) {
      method = "put";
      url = `${import.meta.env.VITE_SERVER_URL}/job/${id}`;
    }

    // for (let pair of form_data.entries()) {
    //   if (pair[0] === "images") console.log(pair[0] + ", " + pair[1].name);
    //   else console.log(pair[0] + ", " + pair[1]);
    // }
    setPosting(true);
    axios[method](url, form_data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      "Content-Type": "multipart/form-data",
    })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPosting(false);
      });
  };

  const renderCategories = categories.map((category, indx) => {
    return (
      <div className="category-field" key={indx}>
        <input
          disabled={posting}
          onChange={handleCategoryChange}
          type="checkbox"
          name={category.name}
          value={category.value}
          checked={job.category.includes(category.value)}
        />
        <label htmlFor={category.name}>{category.name}</label>
      </div>
    );
  });

  return (
    <>
      <div className="page-wrapper">
        <h2 className="form-title">{id ? "Edit Job" : "Create a Job"}</h2>
        {loading ? (
          <TableLoader />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="form-wrapper"
            encType="multipart/form-data"
          >
            <div className="input-section">
              <div className="form-field">
                <label htmlFor="company">Company Name</label>
                <input
                  disabled={posting}
                  type="text"
                  onChange={handleChange}
                  name="company"
                  value={job.company}
                  required
                  placeholder="Name *"
                />
              </div>
              <div className="form-field">
                <label htmlFor="website">Company Website</label>
                <input
                  disabled={posting}
                  type="text"
                  onChange={handleChange}
                  value={job.website}
                  name="website"
                  required
                  placeholder="Website Link *"
                />
              </div>
            </div>
            <div className="input-section">
              <div className="form-field">
                <label htmlFor="title">Job Title</label>
                <input
                  disabled={posting}
                  type="text"
                  onChange={handleChange}
                  value={job.title}
                  name="title"
                  required
                  placeholder="Title *"
                />
              </div>
            </div>
            <div className="input-section">
              <div className="form-field">
                <label htmlFor="location">Job Location</label>
                <input
                  disabled={posting}
                  type="text"
                  onChange={handleChange}
                  value={job.location}
                  name="location"
                  required
                  placeholder="Location *"
                />
              </div>
              <div className="form-field">
                <label htmlFor="salary">Salary</label>
                <input
                  disabled={posting}
                  type="number"
                  onChange={handleChange}
                  value={job.salary}
                  name="salary"
                  required
                  placeholder="Salary *"
                />
              </div>
            </div>
            <div className="input-section">
              <div className="form-field">
                <label htmlFor="phone">Contact</label>
                <input
                  disabled={posting}
                  type="number"
                  onChange={handleChange}
                  value={job.phone}
                  name="phone"
                  required
                  placeholder="Contact *"
                />
              </div>
              <div className="form-field">
                <label htmlFor="vacancy">Vacancy No.</label>
                <input
                  disabled={posting}
                  type="number"
                  onChange={handleChange}
                  value={job.vacancy}
                  name="vacancy"
                  required
                  placeholder="Vacancy No. *"
                />
              </div>
            </div>
            <div className="input-section">
              <div className="form-field">
                <label htmlFor="posted_date">Application Start</label>
                <input
                  disabled={posting}
                  type="date"
                  onChange={handleChange}
                  value={job.posted_date}
                  name="posted_date"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="closing_date">Application Deadline</label>
                <input
                  disabled={posting}
                  type="date"
                  onChange={handleChange}
                  value={job.closing_date}
                  name="closing_date"
                  required
                />
              </div>
            </div>
            <div className="input-section">
              <div className="form-field">
                <label htmlFor="requirements">Job Requirement</label>
                <textarea
                  disabled={posting}
                  value={job.requirements}
                  onChange={handleChange}
                  required
                  name="requirements"
                  placeholder="Job Requirement"
                />
              </div>
              <div className="form-field">
                <label htmlFor="description">Job Description</label>
                <textarea
                  disabled={posting}
                  value={job.description}
                  onChange={handleChange}
                  required
                  name="description"
                  placeholder="Job Description"
                />
              </div>
            </div>
            <div className="input-section">
              <div id="category-heading" className="input-category-wrapper">
                <span>Job Category</span>
                <p>#Select at least one category!</p>
                <div className="input-category-container">
                  <div className="category-input-section">
                    {renderCategories.slice(0, 5)}
                  </div>
                  <div className="category-input-section">
                    {renderCategories.slice(5)}
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Upload Image</label>
                <div
                  onClick={() => {
                    document.querySelector(".image-input").click();
                  }}
                  className="image-input-wrapper"
                >
                  <input
                    disabled={posting}
                    onChange={({ target: { files } }) => {
                      files && setFileName(files[0].name);
                      if (files) {
                        setJob({ ...job, images: files[0] });
                      }
                    }}
                    className="image-input"
                    name="images"
                    filename="images"
                    type="file"
                    // formEncType="multipart/form-data"
                    accept="image/*"
                    hidden
                  />
                  {job.images ? (
                    <img src={URL.createObjectURL(job.images)} />
                  ) : (
                    <>
                      <MdCloudUpload size={60} color="#e3e3e3" />
                      <p>Browse Files to upload</p>
                    </>
                  )}
                </div>

                <div className="image-remove-btn-wrapper">
                  <AiFillFileImage color="#338573" />
                  <div>
                    <span>{fileName}</span>
                    <button
                      disabled={posting}
                      type="button"
                      onClick={() => {
                        setFileName("No selected file");
                        setJob({ ...job, images: null });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              disabled={posting}
              type="submit"
              className="form-btn post-btn"
            >
              {posting ? "Posting..." : "Post Job"}
            </button>
          </form>
        )}
      </div>
      {posting &&
        createPortal(
          <LoaderContainer />,
          document.getElementById("modal-container")
        )}
    </>
  );
}

export default PostJobPage;