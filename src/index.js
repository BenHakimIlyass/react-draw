import React from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import styled from "styled-components";
import "./styles.css";
const arr = ["#000", "#fcba03", "#b31515", "#5dad37", "#26a1bf", "#601fc2"];
function App() {
  const [drawColor, set] = React.useState({ first: 0, seconde: 0 });
  const [draw, setDraw] = React.useState("");
  const [brushSize, setSize] = React.useState(10);
  const firstRef = React.useRef();
  const secondeRef = React.useRef();

  return (
    <div className="App">
      <h1>Skribbl like</h1>
      <h3>Draw whatever you want</h3>
      <div style={Box}>
        <button onClick={() => setDraw(firstRef.current.getSaveData())}>
          Save draw
        </button>
        <button onClick={() => firstRef.current.clear()}>Clear</button>
      </div>
      <label>
        Bruch size
        <input
          onChange={e => setSize(e.target.value)}
          value={brushSize < 1 ? 0 : brushSize}
          type="number"
        />
      </label>
      <CanvasDraw
        ref={firstRef}
        brushRadius={brushSize < 1 ? 0 : brushSize}
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }}
        brushColor={drawColor.first}
      />
      <div style={Box}>
        {arr.map(item => (
          <button
            style={Color(item)}
            onClick={() => set({ ...drawColor, first: item })}
          />
        ))}
      </div>
      <h3>Here we see if the previous draw is saved</h3>
      {draw < 2 ? (
        "Save your draw before"
      ) : (
        <button
          onClick={() =>
            secondeRef.current.loadSaveData(draw.toString(), false)
          }
        >
          Load saved draw
        </button>
      )}
      <CanvasDraw
        ref={secondeRef}
        style={{
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }}
        brushColor={drawColor.seconde}
      />
      <div style={Box}>
        {arr.map((item, i) => (
          <button
            style={Color(item)}
            onClick={() => set({ ...drawColor, seconde: item })}
          />
        ))}
      </div>
    </div>
  );
}
const Box = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "space-around"
};
const Color = color => ({
  border: "none",
  borderRadius: 50,
  width: 60,
  height: 60,
  backgroundColor: color
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
