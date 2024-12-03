import { Box, Button, Heading, Input, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Note from "~components/Note";
import type { Message } from "~utils/types";

import "~style.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function NoteCreation() {
  const [content, setContent] = useState("");
  const [context, setContext] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [prompter, setPrompter] = useState<AILanguageModel>();
  const [summarizer, setSummarizer] = useState<AISummarizer>();
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: Message) => {
      if (message.type == "generate-notes") {
        generateNotes(message.selectedText);
        setCurrentUrl(message.url);
      }
    });
  }, []);

  async function generateNotes(text: string) {
    setContext(context + "\n" + text);
    setContent("Generating your notes...");

    let model = summarizer;

    if (!model) {
      if ((await window.ai.summarizer.capabilities()).available != "readily") {
        setContent(
          "The AI model needed to generate notes is not available. Please try again later.",
        );
      }

      model = await window.ai.summarizer.create({
        type: "key-points",
        length: "short",
        format: "markdown",
        sharedContext: "Generate notes for students",
      });

      setSummarizer(model);
    }

    try {
      const stream = model.summarizeStreaming(text);
      // @ts-ignore types seem to be wrong
      for await (const chunk of stream) {
        setContent(chunk);
      }

      setIsGenerated(true);
    } catch (e) {
      console.error(e);
      setContent("Failed to generate notes. Please try again.");
    }
  }

  async function handleSave() {
    const note = {
      content: content,
      url: currentUrl,
    };

    // redirect to save page with note data
    navigate("/save", { state: { note } });
  }

  const askAi = async () => {
    let session = prompter;
    const messages = [...chatMessages, `You: ${userPrompt}`];
    setChatMessages(messages);
    setUserPrompt("");

    if (!session) {
      session = await window.ai.languageModel.create({
        systemPrompt:
          "You are helping the user understand the content of the page. Answer their questions regarding the content of the page, if you do not know say so:",
      });

      setPrompter(session);
      try {
        await session.prompt("Here is the provided context: " + context);
      } catch (e) {
        console.error(e);
      }
    }

    try {
      const result = session.promptStreaming(userPrompt);
      // @ts-ignore types seem to be wrong
      for await (const chunk of result) {
        setChatMessages([...messages, `AI: ${chunk}`]);
      }
    } catch (e) {
      console.error(e);
      setChatMessages([
        ...messages,
        "AI: I encountered an error while processing your request. Please try again.",
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      askAi();
    }
  };

  const messageBox = (msg: string) => {
    try {
      const element = (
        <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
          {msg}
        </ReactMarkdown>
      );

      return element;
    } catch (e) {
      return <Box>{msg}</Box>;
    }
  };

  return (
    <Box p={5} w="full" h="full">
      <Heading mb={4} size="md" color="teal.300">
        Generating Notes with AI
      </Heading>
      <Note content={content} />
      <Button
        bgColor={isGenerated ? "blue.500" : "gray.500"}
        colorScheme="dark"
        onClick={() => {
          if (isGenerated) {
            handleSave();
          }
        }}
        w="full"
        mb={4}>
        Save Note
      </Button>
      <Spacer />
      <Box
        p={4}
        mb={20}
        maxH="60vh"
        borderRadius="md"
        flex="1"
        overflowY="auto">
        {chatMessages.map((msg, index) => (
          <Box key={index} mb={4}>
            {messageBox(msg)}
          </Box>
        ))}
      </Box>

      {isGenerated && (
        <Box
          display="flex"
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p={5}
          bgColor="gray.800">
          <Input
            placeholder="Ask something..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            bgColor="gray.600"
            borderColor="gray.500"
            p={2}
            flex="1"
            mr={2}
          />
          <Button bgColor="blue.500" colorScheme="dark" onClick={() => askAi()}>
            Ask
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default NoteCreation;
