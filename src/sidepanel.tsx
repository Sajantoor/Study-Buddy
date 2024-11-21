import { useEffect, useState } from "react";

import "~style.css";

import type { Message } from "~utils/types";

function IndexSidePanel() {
  const [content, setContent] = useState("");

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: Message) => {
      if (message.type == "generate-notes") {
        console.log("Selected Text: ", message.selectedText);
        generateNotes(message.selectedText);
      }
    });
  }, []);

  async function generateNotes(text: string) {
    setContent("Generating your notes...");

    const summarizer = await window.ai.summarizer.create({
      type: "key-points",
      length: "short",
      format: "plain-text",
      sharedContext: "Generate notes for students", // TODO: Update this prompt
    });

    const result = await summarizer.summarize(text);
    setContent(result);
  }

  async function handleSave() {
    const note = {
      content: content,
      url: window.location.href,
    };

    const notes = await chrome.storage.local.get("notes");
    console.log(notes);

    if (!notes || Object.keys(notes).length === 0) {
      await chrome.storage.local.set({ notes: [note] });
    } else {
      const updatedNotes = [...notes.notes, note];
      await chrome.storage.local.set({ notes: updatedNotes });
    }
  }

  return (
    <div className="plasmo-p-5">
      <h1>Side Panel</h1>
      <div>{content}</div>
      <button onClick={() => handleSave()}>Save</button>
    </div>
  );
}

export default IndexSidePanel;
