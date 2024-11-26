import { Box, ChakraProvider, defaultSystem, Heading } from "@chakra-ui/react";
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
      <ChakraProvider value={defaultSystem}>
        <Box
          maxH="20rem"
          w="500px"
          overflowY="auto"
          bgColor="gray.800"
          color="white"
          p={4}>
          <Heading as="h1" size="lg" mb={2}>
            Your Notes
          </Heading>
          {notes.map((note, index) => (
            <Note key={index} content={note.content} url={note.url} />
          ))}
        </Box>
      </ChakraProvider>
    </>
  );
}

export default IndexPopup;
