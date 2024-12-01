import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import NotesPage from "~views/NotesPage";

import "~style.css";

function IndexPopup() {
  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <NotesPage />
      </ChakraProvider>
    </>
  );
}

export default IndexPopup;
