import React from "react";
import "./Material.css";
import SearchRegMaterial from "./SearchRegMaterial/SearchRegMaterial";
import BasicRegMaterial from "./BasicRegMaterial/BasicRegMaterial";
import { Provider } from "react-redux";

import store from "../../store/store";

export default function Material() {
  return (
    <div id="containerMaterial">
      <Provider store={store}>
        <div id="busca-material">
          <SearchRegMaterial />
        </div>
        <div id="principal-material">
          <BasicRegMaterial />
        </div>
      </Provider>
    </div>
  );
}
