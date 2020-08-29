import { combineReducers } from "redux";

import backEnd from "./backEnd";
import people from "./people";
import material from "./material";
import equipamento from "./equipamento";
import custo from "./custo";
import cartaCobertura from "./cartaCobertura";
export default combineReducers({
  backEnd,
  people,
  material,
  equipamento,
  custo,
  cartaCobertura,
});
