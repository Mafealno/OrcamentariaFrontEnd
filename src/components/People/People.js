import React from "react";
import "./People.css";
import BasicRegPeople from "../BasicRegPeople/BasicRegPeople";

export default function People() {
  return (
    <div id="containerPeople">
      <div id="principal">
        <BasicRegPeople></BasicRegPeople>
      </div>
      <div id="contato"></div>
      <div id="endereco"></div>
    </div>
  );
}
