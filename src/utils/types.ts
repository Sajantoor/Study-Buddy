export interface Message {
  type: "generate-notes";
  selectedText: string;
}

export interface Note {
  content: string;
  url: string;
}
