import React from "react";
import AddIcon from "../../assets/images/icons/add.svg";
import "./AddButton.scss";

function AddButton(props: { onAddButtonClick?: CallableFunction }) {
  return (
    <div
      onClick={() => {
        props.onAddButtonClick?.();
      }}
      className="add d-flex justify-content-center"
    >
      <img src={AddIcon} className="add-icon" alt="add" />
    </div>
  );
}

export default AddButton;
