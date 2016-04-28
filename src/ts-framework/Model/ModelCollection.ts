import {Model} from "./Model";

/**
 * Collection of controllers
 * @format string -> controller
 */
export type ModelCollection = {[s: string]: Model<any>};