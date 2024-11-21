import React from "react";

import type { Note as INote } from "~utils/types";

function Note({ content, url }: INote) {
  return (
    <div
      className="note"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}>
      <p style={{ margin: "0 0 10px" }}>{content}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#007bff", textDecoration: "none" }}>
        {url}
      </a>
    </div>
  );
}

export default Note;
