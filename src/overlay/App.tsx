import { useEffect, useState } from "react";

interface Message {
    type: "generate-notes";
    data: string;
}

function App() {
    const [visible, setVisible] = useState(true);
    const [content, setContent] = useState("");
    const [currentContext, setCurrentContext] = useState("");

    useEffect(() => {
        window.onmessage = (event) => {
            const data = event.data as Message;
            if (data.type !== "generate-notes") return;

            setVisible(true);
            setCurrentContext(data.data);
            setContent("Generating your notes...");
            generateNotes(data.data);
        };
    }, []);

    async function generateNotes(text: string) {
        const summarizer = await window.ai.summarizer.create({
            type: "key-points",
            length: "short",
            format: "plain-text",
            sharedContext: "Generate notes for students",
        });

        const result = await summarizer.summarize(text);
        setContent(result);
    }

    async function promptAi(prompt: string) {
        // @ts-expect-error assistant isn't in the types
        const session = (await window.ai.assistant.create({
            // TODO: Update this prompt
            systemPrompt: `You are responding to a student to help with their questions. Only answer using the provided information: "${currentContext}". If you cannot answer confidently, say "I don't know".`,
        })) as AILanguageModel;

        const response = await session.prompt(prompt);
        console.log(response);
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
        <div style={{ display: visible ? "block" : "none" }}>
            <h1 className="text-3xl caret-emerald-950 float-right">Test</h1>
            <button onClick={() => setVisible(!visible)}>X</button>
            <div>
                {content.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>

            <input
                type="text"
                placeholder="Ask AI..."
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        promptAi((e.target as HTMLInputElement).value);
                    }
                }}
            />

            <button onClick={() => handleSave()}>Save</button>
        </div>
    );
}

export default App;
