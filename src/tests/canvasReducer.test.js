import { canvas as reducer } from "../reducers/canvas";
import { errors } from "../errors";
import { setCanvas, drawLine, drawRectangle, bucketFill } from "../actions/canvas";

const state = { matrix: null, fontSize: 30, error: null };
const matrix = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""]
]

describe("Canvas reducer", () => {

    it("should return the intial state", () => {
        expect(reducer(undefined, {})).toEqual({ ...state, error: errors.CanvasNotSet });
    });

    it("should handle SET_TABLE", () => {
        expect(reducer(state, setCanvas(matrix[0].length, matrix.length))).toEqual(
            { ...state, matrix }
        );
    });

    it("should handle PAINT_LINE", () => {
        const newMatrix = [
            ["", "", "", ""],
            ["x", "x", "x", "x"],
            ["", "", "", ""],
            ["", "", "", ""]
        ]

        expect(reducer({ ...state, matrix }, drawLine([1, 2, 4, 2]))).toEqual(
            { ...state, matrix: newMatrix }
        );
    })

    it("should handle PAINT_RECTANGLE", () => {
        const newMatrix = [
            ["", "", "", ""],
            ["x", "x", "x", "x"],
            ["x", "x", "x", "x"],
            ["", "", "", ""]
        ];

        expect(reducer({ ...state, matrix }, drawRectangle([1, 2, 4, 3]))).toEqual(
            { ...state, matrix: newMatrix }
        );
    });

    it("should handle BUCKET_FILL", () => {
        const beforeFill = [
            ["", "", "", ""],
            ["x", "x", "x", "x"],
            ["x", "", "", "x"],
            ["x", "x", "x", "x"]
        ];

        const afterFill = [
            ["", "", "", ""],
            ["x", "x", "x", "x"],
            ["x", "o", "o", "x"],
            ["x", "x", "x", "x"]
        ]

        expect(reducer({ ...state, matrix: beforeFill }, bucketFill([2, 3, "o"]))).toEqual(
            { ...state, matrix: afterFill }
        );

        expect(reducer({ ...state, matrix: beforeFill }, bucketFill([0, 0, "o"]))).toEqual(
            { ...state, matrix: beforeFill, error: errors.WrongCoordinates }
        );
    });
});