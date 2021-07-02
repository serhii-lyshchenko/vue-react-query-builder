const defaultQuery = {
  id: uuid(),
  rules: [],
  combinator: ''
}

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default class PathQueryBuilder {
  constructor(query){
    this._query = {};
    this.callbacks = [];
    this.paths = {};
    if (query) {
      this._query = this.fillChild(query);
    } else {
      this._query = Object.assign({}, defaultQuery);
      this.paths[this._query.id] = "";
    }
  }

  fillChild(query, rootIndex = '') {
    const id = uuid();
    Object.assign(query, {id});
    this.paths[id] = rootIndex;
    const ind = rootIndex.length ? `${rootIndex}.`: rootIndex;
    query.rules && query.rules.forEach((rule, index) => this.fillChild(rule, ind + index));
    return query;
  }

  subscribe(callback){
    this.callbacks.push(callback);
    callback(this._query);
  }

  findNodeById(nodeId) {
    return this.paths[nodeId].split('.').reduce((acc, key) => key ? acc.rules[key] : acc, this._query);
  }

  findNodeByPath(path) {
    return path.reduce((acc, key) => key ? acc.rules[key] : acc, this._query);
  }

  updatePaths(parent, index) {
    const parentPath = this.paths[parent.id];
    const idsForUpdate = Object.keys(this.paths).filter(key => {
      return this.paths[key].startsWith(parentPath) && this.paths[key] !== parentPath;
    });
    idsForUpdate.forEach(id => {
      let updateLength;
      updateLength = parentPath.length ? parentPath.split('.').length : 0;
      const path = this.paths[id].split('.');
      let ind = path[updateLength];
      if(parseInt(index) < parseInt(ind)) path[updateLength]--;
      this.paths[id] = path.join('.');
    });
  }

  deleteChildsPaths(nodeId) {
    const nodePath = this.paths[nodeId];
    const idsForUpdate = Object.keys(this.paths).filter(key => {
      return this.paths[key].startsWith(nodePath);
    });
    idsForUpdate.forEach(id => {
      delete this.paths[id];
    });
  }

  add(parentNodeId, node){
    const id = uuid();
    const parentNode = this.findNodeById(parentNodeId);
    const parentPath = this.paths[parentNode.id];
    const index = parentNode.rules.push(Object.assign(node, { id })) - 1;
    const ind = parentPath.length ? `${parentPath}.` : `${parentPath}`;
    this.paths[id] = ind+index;
    this.callbacks.forEach((fn)=> fn(this._query));
  }

  update(node) {
    const nodePath = this.paths[node.id].split('.');
    const index = nodePath.pop();
    const parent = this.findNodeByPath(nodePath);
    Object.assign(parent.rules[index], node);
    this.callbacks.forEach((fn)=> fn(this._query));
  }

  delete(nodeId) {
    const nodePath = this.paths[nodeId].split('.');
    const index = nodePath.pop();
    const parent = this.findNodeByPath(nodePath);
    parent.rules.splice(index, 1);
    this.deleteChildsPaths(nodeId);
    delete this.paths[nodeId];
    this.updatePaths(parent, index);
    this.callbacks.forEach((fn)=> fn(this._query));
  }

}
