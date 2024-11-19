import { useEffect, useState } from "react";
import "./App.css";
import Note from "./Note";

interface INote {
    content: string;
    url: string;
}

function App() {
    const [notes, setNotes] = useState<INote[]>([]);

    useEffect(() => {
        chrome.storage.local.get("notes", (data) => {
            setNotes(data.notes);
        });

        chrome.storage.onChanged.addListener((changes) => {
            console.log(changes);
            if (changes.notes) {
                setNotes(changes.notes.newValue);
            }
        });
    }, []);

    return (
        <>
            <h1>Your Notes</h1>
            {notes.map((note, index) => (
                <Note key={index} content={note.content} url={note.url} />
            ))}
        </>
    );
}

export default App;
