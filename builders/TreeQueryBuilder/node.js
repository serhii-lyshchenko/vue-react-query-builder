export default class Node {
  constructor(data, parentId) {
    this.data = data;
    this.children = [];
    this.parentId = parentId;
  }
}