import { Box, Heading } from "@chakra-ui/react";

import "~style.css";

import NotesList from "../components/NotesList";

function NotesPage() {
  return (
    <>
      <Box p={4}>
        <Heading as="h1" size="lg" color="teal.300" mb={2}>
          Your Notes
        </Heading>
        <NotesList />
      </Box>
    </>
  );
}

export default NotesPage;
