export default class Queue {
  constructor() {
    this._queue = [];
  }

  enqueue(node) {
    this._queue.push(node);
  }

  dequeue() {
    return this._queue.splice(0, 1)[0];
  }
}