import { Box, Button, Heading } from "@chakra-ui/react";
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
    <Box p={4}>
      <Heading color="teal.300"> Click to add to an existing note! </Heading>
      {notes.map((note, index) => (
        <Note
          onClick={() => updateNote(index)}
          key={index}
          content={note.content}
          url={note.url}
        />
      ))}
      <Button
        position="fixed"
        bottom="20px"
        right="20px"
        borderRadius="50%"
        width="50px"
        height="50px"
        fontSize="24px"
        backgroundColor="teal.300"
        color="black"
        onClick={() => saveNote()}>
        +
      </Button>{" "}
    </Box>
  );
}

export default SavePage;
