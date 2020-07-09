import React from "react";
import "./ResultSearchPeople.css";

export default function ResultSearchPeople(props) {
  const itemDisplay = props.resultados.map((item) => (
    <>
      <div className="form-row" onClick={""}>
        <div className="col-4">{item.pessoA_ID}</div>
        <div className="col-4">{item.nomE_PESSOA}</div>
        <div className="col-4">{item.tipO_PESSOA}</div>
      </div>
    </>
  ));
  return (
    <>
      <div id="container-result" className={props.show ? "show-result" : ""}>
        {itemDisplay}
      </div>
    </>
  );
}
