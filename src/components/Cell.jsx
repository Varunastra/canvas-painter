import React from 'react';
import { useSelector } from 'react-redux';

export function Cell(props) {
    const symbol = props.symbol;
    const size = useSelector(state => state.canvas.fontSize);

    const style = {
        fontSize: size - 2 + "px",
        width: size + "px",
        height: size + "px"
    }

    return <div style={style}>{symbol}</div>
}