# Kahoot abuse

This script is designed to display answers to questions in the Kahoot game.

## Features
- Automatically detects correct and incorrect answers.
- Highlights correct answers in green.
- Draggable UI window for convenience.
- Connects to the Kahoot API to fetch quiz information.

## Installation and Usage
1. Copy the script code and paste it into the browser console on the Kahoot page.
2. Enter the `Quiz ID` in the UI that appears.
3. If the ID is valid, the input field background will turn green, and the script will start tracking questions.
4. When a new question appears:
   - For multiple-choice questions, correct answers will be highlighted in green.

## UI Elements
- **Quiz ID Input Field** — Used to connect to a quiz.
- **Close Button** — Hides the UI and disables answer display.
- **Text Answer Block** — Displays the correct answer for text-input questions.

## Requirements
- Compatible with browsers that support the `fetch` API and `querySelector`.
- Access to the Kahoot API to fetch quiz data.

## License
This project is distributed under the MIT license. You are free to modify and use the code for personal and educational purposes.
