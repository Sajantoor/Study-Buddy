import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import NoteCreation from "~views/NoteCreation";
import SavePage from "~views/SavePage";

import "~style.css";

import NotesPage from "~views/NotesPage";

function IndexSidePanel() {
  return (
    <ChakraProvider value={defaultSystem}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<NoteCreation />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </MemoryRouter>
    </ChakraProvider>
  );
}

export default IndexSidePanel;
