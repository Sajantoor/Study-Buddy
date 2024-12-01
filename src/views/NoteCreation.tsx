import {
  Box,
  Button,
  ChakraProvider,
  defaultSystem,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Note from "~components/Note";
import type { Message } from "~utils/types";

import "~style.css";

function NoteCreation() {
  const [content, setContent] = useState("");
  const [context, setContext] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [prompter, setPrompter] = useState<AILanguageModel>();
  const [summarizer, setSummarizer] = useState<AISummarizer>();
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: Message) => {
      if (message.type == "generate-notes") {
        generateNotes(message.selectedText);
      }
    });
  }, []);

  async function generateNotes(text: string) {
    // update the existing context
    setContext(context + "\n" + text);
    setContent("Generating your notes...");

    let model = summarizer;

    if (!model) {
      model = await window.ai.summarizer.create({
        type: "key-points",
        length: "short",
        format: "markdown",
        sharedContext: "Generate notes for students",
      });

      setSummarizer(model);
    }

    const stream = model.summarizeStreaming(text);

    // @ts-ignore types seem to be wrong
    for await (const chunk of stream) {
      setContent(chunk);
    }

    setIsGenerated(true);
  }

  async function handleSave() {
    const note = {
      content: content,
      // TODO: get url from the tab
      url: "https://www.example.com",
    };

    // redirect to save page with note data
    navigate("/save", { state: { note } });
  }

  const askAi = async () => {
    let session = prompter;
    setChatMessages([...chatMessages, `You: ${userPrompt}`]);
    setUserPrompt("");

    if (!session) {
      console.log("Creating new session");
      session = await window.ai.languageModel.create({
        systemPrompt:
          "You are helping the user understand the content of the page. Answer their questions regarding the content of the page, if you do not know say so:",
      });

      setPrompter(session);
      await session.prompt("Here is the provided context: " + context);
    }

    // TODO: Update this to prompt streaming
    const result = await session.prompt(userPrompt);
    setChatMessages([...chatMessages, `AI: ${result}`]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      askAi();
    }
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Box p={5} w="full" h="100vh" bgColor="gray.800" color="white">
        <Heading mb={4} size="md" color="teal.300">
          AI Notes
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
          mb={4}
          borderRadius="md"
          flex="1"
          maxH="50%" // TODO: Needs to be adjusted
          overflowY="auto">
          {chatMessages.map((msg, index) => (
            <Box key={index}>{msg}</Box>
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
            <Button
              bgColor="blue.500"
              colorScheme="dark"
              onClick={() => askAi()}>
              Ask
            </Button>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default NoteCreation;
