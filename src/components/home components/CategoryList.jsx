import { SiSecurityscorecard, SiFrontendmentor } from "react-icons/si";
import { BsServer } from "react-icons/bs";
import { GiSpiderWeb } from "react-icons/gi";
import { MdDeveloperMode, MdManageAccounts, MdVideocam } from "react-icons/md";
import { SiTaichigraphics, SiPaloaltosoftware } from "react-icons/si";
import { FaUserTie } from "react-icons/fa";
import Category from "./Category.jsx";
import "./CategoryList.css";

function CategoryList({category, setCategory}) {
  const categories = [
    { name: "Cybersecurity", icon: <SiSecurityscorecard size={20} /> },
    { name: "Frontend", icon: <SiFrontendmentor size={20} /> },
    { name: "Backend", icon: <BsServer size={20} /> },
    { name: "Web Developer", icon: <GiSpiderWeb size={20} /> },
    { name: "App Developer", icon: <MdDeveloperMode size={20} /> },
    { name: "Management", icon: <MdManageAccounts size={20} /> },
    { name: "Graphics Designer", icon: <SiTaichigraphics size={20} /> },
    { name: "Software Developer", icon: <SiPaloaltosoftware size={20} /> },
    { name: "Video Editor", icon: <MdVideocam size={20} /> },
    { name: "HR", icon: <FaUserTie size={20} /> },
  ];

  const renderList = categories.map((cat, indx) => (
    <Category
      cat={cat}
      key={indx}
      category={category}
      setCategory={setCategory}
    />
  ));

  return (
    <div className="categorylist-wrapper">
      <h2 className="categorylist-title">Popular Categories</h2>
      <div className="category-wrapper">{renderList}</div>
    </div>
  );
}

export default CategoryList;
