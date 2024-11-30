export class InputHandler {
  constructor(terminal) {
    this.terminal = terminal;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.terminal.handleEnter();
      } else if (e.key === 'Backspace') {
        this.terminal.handleBackspace();
      } else if (e.key.length === 1) {
        this.terminal.addCharacter(e.key);
      }
    });
  }
}