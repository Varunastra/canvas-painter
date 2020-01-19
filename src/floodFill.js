export function floodFill(x, y, newColor, oldColor, buffer, width, height) {
    if (x < 0 || x >= width || y < 0 || y >= height) {
        return;
    }

    if (buffer[x][y] !== oldColor) {
        return;
    } 

    buffer[x][y] = newColor;
    floodFill(x + 1, y, newColor, oldColor, buffer, width, height);
    floodFill(x - 1, y, newColor, oldColor, buffer, width, height);
    floodFill(x, y + 1, newColor, oldColor, buffer, width, height);
    floodFill(x, y - 1, newColor, oldColor, buffer, width, height);
}