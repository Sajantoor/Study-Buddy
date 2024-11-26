import { Box } from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Note({ content, url }: { content: string; url?: string }) {
  return (
    <Box
      p={2}
      mb={4}
      bgColor="gray.700"
      minH="50px"
      borderRadius="md"
      overflowY="auto">
      <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
}

export default Note;
