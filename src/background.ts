console.log("running background script");

const GENERATE_AI_NOTES = "generate-ai-notes";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: GENERATE_AI_NOTES,
        title: "Generate Notes with AI",
        type: "normal",
        contexts: ["selection"],
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        console.log(info);
        console.log(tab);

        if (info.menuItemId === GENERATE_AI_NOTES) {
            chrome.scripting.executeScript<string[], void>({
                target: { tabId: tab!.id! },
                args: [info.selectionText!],
                func: async (selectedText: string) => {
                    console.log("Generating notes for:", selectedText);

                    const tooltip = document.createElement("div");
                    tooltip.style.position = "fixed";
                    tooltip.style.maxWidth = "300px";
                    tooltip.style.top = "10px";
                    tooltip.style.right = "10px";
                    tooltip.style.backgroundColor = "#282c34";
                    tooltip.style.color = "#61dafb";
                    tooltip.style.borderRadius = "5px";
                    tooltip.style.padding = "10px 20px";
                    tooltip.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                    tooltip.style.fontFamily = "Arial, sans-serif";

                    document.body.appendChild(tooltip);
                    tooltip.innerText = "🤖 Generating AI notes...";
                    tooltip.style.zIndex = "1000";
                    tooltip.style.fontSize = "14px";

                    const summarizer = await window.ai.summarizer.create({
                        type: "key-points",
                        length: "short",
                        format: "plain-text",
                        sharedContext: "Generate notes for students",
                    });

                    const result = await summarizer.summarize(selectedText);
                    tooltip.innerText = result;
                },
            });
        }
    });
});
