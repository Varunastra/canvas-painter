import { floodFill } from "../floodFill";
import { errors } from "../errors";

function verifyCoordinates(...args) {
    let errFlag = false;
    args.forEach(coord => errFlag = coord <= 0 ? true : false);
    return !errFlag;
}

function verifyMatrix(matrix) {
    return matrix ? true : false;
}

export function canvas(state = { matrix: null, fontSize: 30, error: errors.CanvasNotSet }, action) {

    let matrix;

    if (verifyMatrix(state.matrix)) {
        matrix = copyMatrix(state.matrix);
    }

    switch (action.type) {

        case "SET_TABLE": {
            const { width, height } = action.payload;

            if (!verifyCoordinates(width, height)) {
                return { ...state, error: errors.WrongCoordinates };
            }

            matrix = Array.from({ length: height }, () => (
                Array.from({ length: width }, () => "")
            ));

            return { ...state, error: null, matrix };

        }

        case "PAINT_LINE": {

            if (!verifyCoordinates(...action.payload)) {
                return { ...state, error: errors.WrongCoordinates }
            }

            if (!verifyMatrix(state.matrix)) {
                return { ...state, error: errors.CanvasNotSet };
            }

            const [x1, y1, x2, y2] = action.payload;

            if (x1 === x2) {
                const min = Math.min(y1, y2) - 1;
                const max = Math.max(y1, y2);

                for (let i = min; i < max; i++) {
                    matrix[i][x1 - 1] = "x";
                }
            }

            if (y1 === y2) {
                const min = Math.min(x1, x2) - 1;
                const max = Math.max(x1, x2);

                for (let i = min; i < max; i++) {
                    matrix[y1 - 1][i] = "x";
                }
            }

            return { ...state, error: null, matrix };
        }

        case "PAINT_RECTANGLE": {

            if (!verifyCoordinates(...action.payload)) {
                return { ...state, error: errors.WrongCoordinates };
            }
            if (!verifyMatrix(state.matrix)) {
                return { ...state, error: errors.CanvasNotSet };
            }

            const [x1, y1, x2, y2] = action.payload;

            for (let i = y1 - 1; i < y2; i++) {
                for (let j = x1 - 1; j < x2; j++) {

                    if (i === y1 - 1 || i === y2 - 1 ||
                        j === x1 - 1 || j === x2 - 1) {
                        matrix[i][j] = "x";
                    }
                }
            }
            return { ...state, error: null, matrix };
        }

        case "BUCKET_FILL": {

            const [y, x, color] = action.payload;

            if (!verifyMatrix(state.matrix)) {
                return { ...state, error: errors.CanvasNotSet };
            }
            
            if (!verifyCoordinates(x, y)) {
                return { ...state, error: errors.WrongCoordinates };
            }

            floodFill(x - 1, y - 1, color, matrix[x - 1][y - 1], matrix, matrix.length, matrix[0].length);

            return { ...state, error: null, matrix };

        }

        default: return state;
    }
}

const copyMatrix = matrix => matrix.map(elem => [...elem]);