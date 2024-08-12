import React from "react";
import { useParams } from "react-router-dom";
import AddIncome from "./AddIncome";

function EditIncome() {
  const { id } = useParams();

  return <AddIncome id={id} />;
}

export default EditIncome;
