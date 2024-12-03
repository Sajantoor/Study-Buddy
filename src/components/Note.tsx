import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Note as INote } from "~utils/types";

function Note({
  content,
  url,
  onClick,
}: {
  content: string;
  url?: string;
  onClick?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [hovering, setHovering] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  async function deleteNote() {
    const notes = await chrome.storage.local.get("notes");
    const newNotes = notes.notes.filter(
      (note: INote) => note.content !== content,
    );
    await chrome.storage.local.set({ notes: newNotes });
  }

  if (copied) {
    return (
      <Box
        p={2}
        mb={4}
        bgColor="cyan.800"
        minH="100vh"
        minW="100%"
        display="flex"
        borderRadius="md"
        alignItems="center"
        justifyContent="center">
        <Box
          p={4}
          bgColor="gray.900"
          borderRadius="md"
          border="2px solid"
          borderColor="cyan.300"
          textAlign="center">
          ✨Copied to clipboard!
        </Box>
      </Box>
    );
  }

  return (
    <Box
      p={2}
      mb={4}
      bgColor="gray.700"
      minH="50px"
      borderRadius="md"
      overflowY="auto"
      onClick={onClick ? onClick : copyToClipboard}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      position="relative">
      <Box
        position="relative"
        float="right"
        display={hovering ? "block" : "none"}
        onClick={(e) => {
          e.stopPropagation();
          deleteNote();
        }}>
        🗑️
      </Box>
      <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
      {url && (
        <Box mt={2} fontSize="sm" color="cyan.300">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </Box>
      )}
    </Box>
  );
}

export default Note;
