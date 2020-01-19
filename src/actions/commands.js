import { parseCommands } from "./../textParser";

export function readCommands() {
    return (dispatch) => {
        parseCommands().then(commands => {
            dispatch({ type: "READ_COMMANDS", payload: commands });
            dispatch(getNextCommand());
        });
    }
}

export function getNextCommand() {
    return {
        type: "GET_NEXT_COMMAND"
    }
}