import { Box } from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Note({
  content,
  url,
  onClick,
}: {
  content: string;
  url?: string;
  onClick?: () => void;
}) {
  return (
    <Box
      p={2}
      mb={4}
      bgColor="gray.700"
      minH="50px"
      borderRadius="md"
      overflowY="auto"
      onClick={onClick}>
      <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
}

export default Note;
