import React from "react";
import "./People.css";
import BasicRegPeople from "./BasicRegPeople/BasicRegPeople";
import ContactPeople from "./ContactPeople/ContactPeople";
import SearchRegPeople from "./SearchRegPeople/SearchRegPeople";
import AddressPeople from "./AddressPeople/AddressPeople";
import { Provider } from "react-redux";

import store from "../../store/store";

export default function People() {
  return (
    <div id="containerPeople">
      <Provider store={store}>
        <div id="busca">
          <SearchRegPeople></SearchRegPeople>
        </div>
        <div id="principal">
          <BasicRegPeople></BasicRegPeople>
        </div>
        <div id="contato">
          <ContactPeople></ContactPeople>
        </div>
        <div id="endereco">
          <AddressPeople></AddressPeople>
        </div>
      </Provider>
    </div>
  );
}
