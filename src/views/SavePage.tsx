import { Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Note from "~components/Note";
import type { Note as INote } from "~utils/types";

function SavePage() {
  const [notes, setNotes] = useState<INote[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    chrome.storage.local.get("notes", (data) => {
      if (data.notes) {
        setNotes(data.notes);
      }
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.notes) {
        setNotes(changes.notes.newValue);
      }
    });
  }, []);

  const updateNote = (index: number) => {
    console.log("updating note", index);
    const newNotes: INote[] = [...notes];
    let content = newNotes[index].content;
    const updatedContent = location.state.note.content;
    content += "\n" + updatedContent;

    newNotes[index] = {
      ...newNotes[index],
      content: content,
    };

    chrome.storage.local.set({ notes: newNotes });
    navigateToNotesPage();
  };

  const saveNote = () => {
    const newNotes: INote[] = [...notes];
    newNotes.push(location.state.note);
    chrome.storage.local.set({ notes: newNotes });
    navigateToNotesPage();
  };

  const navigateToNotesPage = () => {
    navigate("/notes");
  };

  return (
    <>
      <Heading> Save Your Note! </Heading>

      {notes.map((note, index) => (
        <Note
          onClick={() => updateNote(index)}
          key={index}
          content={note.content}
          url={note.url}
        />
      ))}

      <Button onClick={() => saveNote()}>Create New Note</Button>
    </>
  );
}

export default SavePage;
