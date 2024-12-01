import { Box, Heading } from "@chakra-ui/react";

import "~style.css";

import NotesList from "../components/NotesList";

function NotesPage() {
  return (
    <>
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
        <NotesList />
      </Box>
    </>
  );
}

export default NotesPage;
