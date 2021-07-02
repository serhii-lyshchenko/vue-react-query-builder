import Node from './node';
import Queue from './queue';

export default class Tree {

  constructor(data) {
    this._root = this.syncData(data);
  }
  
  get uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  
  syncData(data, parentId){
    const { rules, ...rest } = data;
    const node = new Node(Object.assign({},rest, {id: this.uuid }), parentId);
    node.children = (rules || []).map((rule)=> this.syncData(rule, node.data.id));
    return node;
  }
  
  getNode(id) {
      const queue = new Queue();
      let currentTree = this._root;
      let foundNode = null;
      while (currentTree) {
        currentTree.children.forEach((node)=> queue.enqueue(node));
        currentTree = currentTree.data.id === id ? (foundNode = currentTree, null) : queue.dequeue();
      }
      return foundNode;
  }

  add(data, toId) {
    const child = new Node(Object.assign(data, {id : this.uuid}), toId);
    const parent = this.getNode(toId);
    parent.children.push(child);
  }

  remove(id) {
    const child = this.getNode(id);
    const parent = this.getNode(child.parentId);
    const index = this.findIndex(parent.children, id);
    return parent.children.splice(index, 1);
  }

  findIndex(arr, id) {
    return arr.findIndex(({data})=> data.id === id);
  }

  update(data){
    const node = this.getNode(data.id);
    Object.assign(node.data, data);
  }
  
  getData(node){
    let { data, children } = node || this._root;
    let newData = Object.assign({}, data);
    if(children.length){
      Object.assign(newData, { rules: children.map(this.getData.bind(this)) });
    }
    return newData;
  }
}