class queue {
  constructor() {
    this.count = 0
    this.fila = {}
    this.top = 0
  }

  isEmpty() {
    return this.count === this.top ? true : false;
  }

  peek() {
    if (this.isEmpty()) {
      return 'A fila está vazia'
    }
    return this.fila[this.top];
  }

  addQueue(value) {
    this.fila[this.count] = value;
    this.count += 1;
    return this.fila[this.count - 1];
  }

  actQueue() {
    if (this.isEmpty()) {
      return 'A fila está vazia'
    };
    return this.fila;
  };

  deleteFirts() {
    if (this.isEmpty()) {
      return 'A fila está vazia'
    };

    delete this.fila[this.top];
    this.top += 1;
  }
}
const fila = new queue();

module.exports = fila;