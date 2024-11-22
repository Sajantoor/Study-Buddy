export interface Message {
  type: "generate-notes";
  selectedText: string;
  url: string;
}

export interface Note {
  content: string;
  url: string;
}
