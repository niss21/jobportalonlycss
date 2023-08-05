import { useEffect } from "react";
import four from "../assets/four.png";
import zero from "../assets/zero.png";
import three from "../assets/three.png";
import { Link } from "react-router-dom";
import "./ForbiddenPage.css";

function ForbiddenPage() {
  useEffect(() => {
    const pupil = document.querySelector(".pupil");
    const moveEye = (event) => {
      let rect = pupil.getBoundingClientRect();
      let x = (event.pageX - rect.left) / 30 + "px";
      let y = (event.pageY - rect.top) / 30 + "px";
      pupil.style.transform = `translate3d(${x},${y},0px)`;
    };

    window.addEventListener("mousemove", moveEye);

    return () => window.removeEventListener("mousemove", moveEye);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="forbidden-wrapper">
        <div className="number-wrapper">
          <img src={four} />
        </div>
        <div className="number-wrapper">
          <img src={zero} />
          <div className="eye-wrapper">
            <div className="eye">
              <div className="pupil"></div>
              <div className="angry-eye"></div>
            </div>
          </div>
        </div>
        <div className="number-wrapper">
          <img src={three} />
        </div>
      </div>
      <div className="forbidden-msg">
        <h1>YOU ARE NOT ALLOWED TO ENTER HERE</h1>
        <h2>
          GO <Link to="/">HOME!</Link>
        </h2>
      </div>
    </div>
  );
}

export default ForbiddenPage;
