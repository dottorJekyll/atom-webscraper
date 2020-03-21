export default class Node {
  constructor(root, object) {
    // eslint-disable-next-line no-underscore-dangle
    const _root = root;
    Object.assign(this, object);

    this.getRoot = () => _root;
  }

  static Create(object) {
    return new Node(object, object);
  }
}
