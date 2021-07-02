import Tree from './tree';

export default class TreeQueryBuilder {
  constructor(query){
    this._tree = new Tree(query);
    this.callbacks = [];
  }
  
  get query(){
    return Object.assign({},this._tree.getData());
  }
  
  subscribe(callback){
    this.callbacks.push(callback);
    callback(this.query);
  }
  
  executeCallbacks(){
    this.callbacks.forEach((fn) => fn(this.query));
  }

  add(toId, data){
    this._tree.add(data, toId);
    this.executeCallbacks();
  }
  
  delete(nodeId){
    this._tree.remove(nodeId);
    this.executeCallbacks();
  }
  
  update(data){
    this._tree.update(data);
    this.executeCallbacks();
  }
  
}