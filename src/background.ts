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
                func: async (selectedText) => {
                    const ROOT_ID = "root_ext_study_buddy";

                    // check if the tab's document has the root element
                    if (!document.getElementById(ROOT_ID)) {
                        const overlay = document.createElement("div");
                        overlay.id = ROOT_ID;
                        document.body.appendChild(overlay);
                        const OVERLAY_SRC = "overlay/overlay.js";
                        const src = chrome.runtime.getURL(OVERLAY_SRC);
                        await import(src);
                    }

                    // TODO: Probably use chrome.runtime.sendMessage instead
                    // but that wasn't working so I used this for now as a
                    // temporary solution
                    window.postMessage(
                        {
                            type: "generate-notes",
                            data: selectedText,
                        },
                        "*"
                    );
                },
            });
        }
    });
});
