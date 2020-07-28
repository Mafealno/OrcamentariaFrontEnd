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
        <div id="busca">
          <SearchRegMaterial />
        </div>
        <div id="principal">
          <BasicRegMaterial />
        </div>
      </Provider>
    </div>
  );
}
