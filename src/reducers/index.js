import { combineReducers } from "redux";
import { canvas } from "./canvas";
import { commands } from "./commands";

export const reducer = combineReducers({ canvas, commands });