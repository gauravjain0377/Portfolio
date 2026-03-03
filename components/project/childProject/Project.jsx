"use client";
import Style from "./style.module.scss";

const Project = ({ title, manageModal, index, onOpenDetails, isTouchDevice }) => {
  const openPreview = (e) => {
    if (isTouchDevice) return;
    manageModal(true, index, e.clientX, e.clientY);
  };

  const closePreview = (e) => {
    if (isTouchDevice) return;
    manageModal(false, index, e.clientX, e.clientY);
  };

  return (
    <div
      className={Style.project}
      onMouseLeave={closePreview}
    >
      <div
        className={Style.hoverArea}
        onMouseEnter={openPreview}
        onMouseMove={openPreview}
      >
        <h2>{title}</h2>
      </div>
      <div className={Style.projectLinks} onMouseEnter={closePreview}>
        <button
          type="button"
          className={Style.detailsButton}
          onClick={() => onOpenDetails?.()}
        >
          Project Details
        </button>
      </div>
    </div>
  );
};

export default Project;
