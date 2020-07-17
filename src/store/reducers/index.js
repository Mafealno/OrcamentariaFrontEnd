import { combineReducers } from "redux";

import backEnd from "./backEnd";
import people from "./people";

export default combineReducers({
  backEnd,
  people,
});
