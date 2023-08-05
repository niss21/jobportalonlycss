import { useEffect } from "react";
import Loader from "./Loader";
import "./ModalWrapper.css";

function LoaderContainer() {
  useEffect(() => {
    document.body.classList.add("prevent-scroll");

    return () => document.body.classList.remove("prevent-scroll");
  });

  return (
    <div className="modal-wrapper">
      <Loader />
    </div>
  );
}

export default LoaderContainer;
