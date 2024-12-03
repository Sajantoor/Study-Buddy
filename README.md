# Study Buddy AI

Study Buddy AI is a Chrome extension that helps you study more effectively. It
uses AI to help you generate notes from text and helps answer any questions
you have.

## Demo

Check out our demo video on YouTube

[![Study Buddy AI Demo](https://img.youtube.com/vi/MU-5DV-I_3I/0.jpg)](https://www.youtube.com/watch?v=MU-5DV-I_3I)

## Getting Started

First, run the development server:

```bash
pnpm install # or npm install
pnpm dev # or npm run dev
```

## Making production build

Run the following:

```bash
pnpm build # or npm run build
```

## Inspiration

I was inspired to create this project because I wanted to help students study
more effectively. I wanted to create a tool that would help students generate
notes and get quick and easy answers to their questions, all without leaving
their current tab.

## What It Does

Study Buddy AI is a Chrome extension which uses Gemini Nano to generate notes and
answer questions. It is designed to help students study more effectively by
providing them with a tool that can help them generate notes and answer any
questions they have. The user can select text on a webpage, right click and
select "Generate Notes with AI" to generate notes from the selected text. This opens
a sidebar where the user can view the generated notes. The user can also ask questions
in the prompt box and get answers from the AI. This is all done without leaving
the current tab.

## How It's Built

This project uses Plasmo and React for the Chrome extension. It uses several Chrome
APIs to interact with the browser's tabs, storage and sidebar. The AI APIs used are
the summarizer and Prompt APIs to generate notes and answer questions.
