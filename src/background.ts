import type { Message } from "~utils/types";

export {};

const GENERATE_AI_NOTES = "generate-ai-notes";

chrome.runtime.onInstalled.addListener(() => {
  console.log(chrome.contextMenus);
  chrome.contextMenus.create({
    id: GENERATE_AI_NOTES,
    title: "Generate Notes with AI",
    type: "normal",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === GENERATE_AI_NOTES) {
      chrome.sidePanel.open({ tabId: tab!.id! });
      const selectedText = info.selectionText;
      const message = {
        type: "generate-notes",
        selectedText: selectedText,
        url: tab.url,
      } as Message;

      // TODO: this is a hack to wait for the side panel to open and use effect
      // to be called
      // wait 1 second before sending the message
      setTimeout(() => {
        chrome.runtime.sendMessage(message);
      }, 2000);
    }
  });
});
