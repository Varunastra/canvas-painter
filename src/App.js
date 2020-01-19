import React from "react";
import { useEffect, useState } from "react";
import { Canvas } from "./components/Canvas";
import { readCommands, getNextCommand } from "./actions/commands";
import { setCanvas, drawLine, drawRectangle, bucketFill } from "./actions/canvas";
import { useSelector, useDispatch } from "react-redux";

function App() {

	const command = useSelector(state => state.commands.currentCommand);
	const stack = useSelector(state => state.commands.stack);
	const error = useSelector(state => state.canvas.error);

	const dispatch = useDispatch();
	const [executionTime, setExecutionTime] = useState(500);

	const onStepClick = () => {
		dispatch(getNextCommand());
	};

	const onExecutionTimeChange = (event) => {
		setExecutionTime(event.target.value);
	}

	const onStartAllClick = (event) => {
		event.preventDefault();

		const timerId = setInterval(() => dispatch(getNextCommand()), executionTime);
		if (!stack.length) {
			clearInterval(timerId);
		}
	};

	useEffect(() => {
		if (command != null) {
			switch (command.type) {
				case "C":
					dispatch(setCanvas(...command.args));
					break;

				case "L":
					dispatch(drawLine(command.args))
					break;

				case "R":
					dispatch(drawRectangle(command.args));
					break;

				case "B":
					dispatch(bucketFill(command.args));
					break;

				default: break;
			}
		}
	}, [command, dispatch]);

	useEffect(() => {
		dispatch(readCommands());
	}, [dispatch]);

	let render = <div>{error}</div>;

	if (!error) {
		render = <>
			<Canvas />
			<div className="controls">
				<button onClick={onStepClick} className="step-btn">Next Step</button>
				<form onSubmit={onStartAllClick} className="start-form">
					<div>Interval between execution</div>
					<input type="text" onChange={onExecutionTimeChange} value={executionTime}
						className="time-input" />
					<button>Start all commands</button>
				</form>
			</div>
		</>;
	}

	return (
		<div className="App">
			{render}
		</div>
	);
}

export default App;
