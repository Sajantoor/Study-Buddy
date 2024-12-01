import { Box, ChakraProvider, defaultSystem } from "@chakra-ui/react";

import NotesPage from "~views/NotesPage";

import "~style.css";

function IndexPopup() {
  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <Box maxH="20rem" w="500px" overflowY="auto">
          <NotesPage />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default IndexPopup;
