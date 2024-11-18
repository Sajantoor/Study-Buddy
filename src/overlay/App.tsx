import { useState } from "react";

function App() {
    const [visible, setVisible] = useState(true);
    const content = "Hello, World!";

    return (
        <div style={{ visibility: visible ? "visible" : "hidden" }}>
            <button onClick={() => setVisible(!visible)}>X</button>
            <p> {visible ? content : ""} </p>
        </div>
    );
}

export default App;
