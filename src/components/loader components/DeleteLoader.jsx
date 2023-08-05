import "./DeleteLoader.css";

function DeleteLoader() {
  return (
    <div className="delete-loader-wrapper">
      <div className="cont">
        <div className="paper"></div>
        <div className="button">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          Deleting
        </div>
        <div className="g-cont">
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
          <div className="garbage"></div>
        </div>
      </div>
    </div>
  );
}

export default DeleteLoader;
