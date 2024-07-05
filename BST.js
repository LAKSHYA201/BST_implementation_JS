class node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr, start, end) {
    this.root = this.buildTree(arr, start, end);
  }
  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let Node = new node(arr[mid]);

    Node.left = this.buildTree(arr, start, mid - 1);
    Node.right = this.buildTree(arr, mid + 1, end);
    return Node;
  }
  insert(key) {
    this.root = this.insertRec(this.root, key);
  }
  insertRec(root, value) {
    if (root == null) {
      root = new node(value);
      return root;
    }
    if (value > root.data) {
      root.right = this.insertRec(root.right, value);
    } else if (value < root.data) {
      root.left = this.insertRec(root.left, value);
    }
    return root;
  }
  delete(key) {
    this.root = this.deleteItem(this.root, key);
  }
  deleteItem(root, key) {
    if (root === null) {
      return root;
    }
    if (key < root.data) {
      root.left = this.deleteItem(root.left, key);
    } else if (key > root.data) {
      root.right = this.deleteItem(root.right, key);
    } else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;
      root.data = this.minValue(root.right);
      root.right = this.deleteItem(root.right, root.data);
    }
    return root;
  }
  minValue(node) {
    let minv = node.data;
    while (node.left !== null) {
      minv = node.left.key;
      node = node.left;
    }
    return minv;
  }
  find(value) {
    let current = this.root;
    while (current.data) {
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      } else if (value == current.data) {
        return current;
      } else {
        return "Error , Value doesnt exist";
      }
    }
  }
  levelOrder(root) {
    if (!root) {
      return [];
    }

    const queue = [];

    queue.push(root);

    const levels = [];

    while (queue.length > 0) {
      const levelSize = queue.length;

      const currentLevel = [];

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();

        currentLevel.push(node.data);

        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }

      levels.push(currentLevel);
    }

    return levels;
  }
}
arr = [1, 2, 3, 4, 6];
arr.sort();
n = arr.length - 1;
let tree = new Tree(arr, 0, n);
tree.insert(5);
tree.insert(7);
tree.insert(8);
tree.delete(4);
console.log(tree.find(5));
console.log(tree);
console.log(tree.levelOrder(tree.root));
