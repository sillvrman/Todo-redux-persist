import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
const { persistStore, persistReducer } = require("redux-persist");
const storage = require("redux-persist/lib/storage").default;

const persistConfig = {
  key: "Todos",
  blacklist: ["fromServer"], // make sure it does not clash with server keys
  storage
};
let rootReducer = combineReducers({
  todos: todoReducer
});

export default persistReducer(persistConfig, rootReducer);
