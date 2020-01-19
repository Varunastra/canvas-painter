export function setCanvas(width, height) {
    return { type: "SET_TABLE", payload:  { width, height } };
}

export function drawLine(coordinates) {
    return { type: "PAINT_LINE", payload: coordinates };
}

export function drawRectangle(coordinates) {
    return { type: "PAINT_RECTANGLE", payload: coordinates };
}

export function bucketFill(args) {
    return { type: "BUCKET_FILL", payload: args };
}