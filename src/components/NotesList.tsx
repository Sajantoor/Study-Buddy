import { useEffect, useState } from "react";

import Note from "~components/Note";
import type { Note as INote } from "~utils/types";

function NotesList() {
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

  return notes.map((note, index) => (
    <Note key={index} content={note.content} url={note.url} />
  ));
}

export default NotesList;
