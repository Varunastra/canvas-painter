export function commands(state = { stack: [], currentCommand: null }, action)
{
    switch (action.type) {

        case "GET_NEXT_COMMAND":
            const [currentCommand, ...stack] = state.stack;
            return { ...state, currentCommand, stack };

        case "READ_COMMANDS":
            return { ...state, stack: action.payload };

        default:
            return state;
    }
}