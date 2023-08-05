import Header from "./components/custom components/Header.jsx";
import Footer from "./components/custom components/Footer.jsx";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import PostJobPage from "./pages/jobs/PostJobPage.jsx";
import ShowJob from "./pages/jobs/ShowJob.jsx";
import PostedJobs from "./pages/jobs/PostedJobs.jsx";
import AppliedJobs from "./pages/jobs/AppliedJobs.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import SearchedJobs from "./pages/jobs/SearchedJobs.jsx";
import Charts from "./components/Charts.jsx";

import "./App.css";
import ForbiddenPage from "./pages/ForbiddenPage.jsx";

function App() {
  const role = localStorage.getItem("role") || "noRole";

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<ProtectedRoutes check="formpage" />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/search/:search_term" element={<SearchedJobs />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="job/:id" element={<ShowJob />} />

        <Route element={<ProtectedRoutes check="profile" />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoutes role="recruiter" />}>
          <Route path="/postjob" element={<PostJobPage />} />
          <Route path="/editjob/:id" element={<PostJobPage />} />
          <Route path="/postedjobs" element={<PostedJobs />} />
        </Route>

        <Route element={<ProtectedRoutes role="applicant" />}>
          <Route path="/appliedjobs" element={<AppliedJobs />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
