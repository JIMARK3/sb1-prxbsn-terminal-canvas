import { Terminal } from './src/terminal/Terminal.js';
import { InputHandler } from './src/terminal/input-handler.js';

const canvas = document.getElementById('terminal');
const terminal = new Terminal(canvas);
new InputHandler(terminal);