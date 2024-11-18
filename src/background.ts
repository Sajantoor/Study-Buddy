console.log("running background script");

const GENERATE_AI_NOTES = "generate-ai-notes";
// Contains randomized string to avoid conflicts with other pages or extensions

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
                    const ROOT_ID = "root_ext_study_buddy";
                    console.log(ROOT_ID);
                    console.log(selectedText);

                    // check if the tab's document has the root element
                    if (document.getElementById(ROOT_ID)) {
                        console.log(
                            "Found existing overlay, skipping creation"
                        );
                        return;
                    } else {
                        console.log("Creating overlay");
                        const overlay = document.createElement("div");
                        overlay.id = ROOT_ID;
                        document.body.appendChild(overlay);
                        console.log("Appended overlay to body");
                        const OVERLAY_SRC = "overlay/overlay.js";
                        const src = chrome.runtime.getURL(OVERLAY_SRC);
                        console.log("Overlay src:", src);
                        await import(src);
                    }

                    //     const summarizer = await window.ai.summarizer.create({
                    //         type: "key-points",
                    //         length: "short",
                    //         format: "plain-text",
                    //         sharedContext: "Generate notes for students",
                    //     });

                    // const result = await summarizer.summarize(selectedText);
                    // tooltip.innerText = result;
                },
            });
        }
    });
});
