import { combineReducers } from "redux";

import backEnd from "./backEnd";
import people from "./people";
import material from "./material";
import equipamento from "./equipamento";

export default combineReducers({
  backEnd,
  people,
  material,
  equipamento,
});
