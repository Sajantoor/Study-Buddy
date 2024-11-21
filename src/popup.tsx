import { useEffect, useState } from "react";

import Note from "~components/Note";
import type { Note as INote } from "~utils/types";

import "~style.css";

function IndexPopup() {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    chrome.storage.local.get("notes", (data) => {
      if (data.notes) {
        setNotes(data.notes);
      }
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
      <div className="plasmo-p-5">
        <h1 className="text-3xl font-bold underline">Your Notes</h1>
        {notes.map((note, index) => (
          <Note key={index} content={note.content} url={note.url} />
        ))}
      </div>
    </>
  );
}

export default IndexPopup;
