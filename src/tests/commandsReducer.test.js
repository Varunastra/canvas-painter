import { commands as reducer } from "../reducers/commands";
import { getNextCommand } from "../actions/commands";

const initialState = { stack: [], currentCommand: null };
const commands = [
    {
        type: "C",
        args: ["5", "5"]
    },
    {
        type: "L",
        args: ["1", "3", "1", "5"]
    }
];

describe("Commands reducer", () => {

    it("should return the intial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should handle GET_NEW_COMMAND", () => {
        expect(reducer({ ...initialState, stack: commands }, getNextCommand())).toEqual({
            stack: [commands[1]],
            currentCommand: commands[0]
        });
    });
});