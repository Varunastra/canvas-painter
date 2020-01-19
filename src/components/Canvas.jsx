import React from "react";
import { Cell } from "./Cell";
import { useSelector } from "react-redux";

export function Canvas(props) {
    const canvas = useSelector(state => state.canvas.matrix);
    const size = useSelector(state => state.canvas.fontSize);
    const width = canvas[0].length * size;
    const height = canvas.length * size;

    const canvasStyle = {
        width: width + "px",
        height: height + "px",
        border: "1px solid black",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
    };

    const renderItems = canvas.map(
        (row, i) => {
            return row.map((cell, j) => {
                return <Cell key={parseInt(i.toString() + j.toString())} symbol={cell} />
            });
        });

    return <div className="canvas" style={canvasStyle}>{renderItems}</div>;
}
