import { COLORS, FONT, PADDING, CURSOR_BLINK_RATE } from './constants.js';

export class Terminal {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.lines = ['Welcome to Canvas Terminal'];
    this.currentLine = '';
    this.cursorVisible = true;
    this.prompt = '> ';
    
    this.setupCanvas();
    this.startCursorBlink();
  }

  setupCanvas() {
    // Set canvas size to window size
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Set font
    this.ctx.font = `${FONT.size} ${FONT.family}`;
    
    // Initial render
    this.render();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.render();
  }

  startCursorBlink() {
    setInterval(() => {
      this.cursorVisible = !this.cursorVisible;
      this.render();
    }, CURSOR_BLINK_RATE);
  }

  addCharacter(char) {
    this.currentLine += char;
    this.render();
  }

  handleEnter() {
    this.lines.push(this.prompt + this.currentLine);
    this.currentLine = '';
    this.render();
  }

  handleBackspace() {
    if (this.currentLine.length > 0) {
      this.currentLine = this.currentLine.slice(0, -1);
      this.render();
    }
  }

  render() {
    // Clear canvas
    this.ctx.fillStyle = COLORS.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set text properties
    this.ctx.fillStyle = COLORS.text;
    this.ctx.font = `${FONT.size} ${FONT.family}`;

    // Draw previous lines
    let y = PADDING + FONT.lineHeight;
    for (const line of this.lines) {
      this.ctx.fillText(line, PADDING, y);
      y += FONT.lineHeight;
    }

    // Draw current line with prompt
    const currentLineWithPrompt = this.prompt + this.currentLine;
    this.ctx.fillStyle = COLORS.prompt;
    this.ctx.fillText(currentLineWithPrompt, PADDING, y);

    // Draw cursor
    if (this.cursorVisible) {
      const cursorX = PADDING + this.ctx.measureText(currentLineWithPrompt).width;
      this.ctx.fillStyle = COLORS.cursor;
      this.ctx.fillRect(cursorX, y - FONT.lineHeight + 4, 2, FONT.lineHeight - 4);
    }
  }
}