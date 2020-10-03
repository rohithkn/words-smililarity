# words-smililarity
To find similarity between two words

### Installation

Install the dependencies and devDependencies and start the server.

```
$ npm install words-similarity
```

### Example

```
const wordsSimilarity = require('words-similarity');
console.log(wordsSimilarity.get('node','nodejs'));
// 0.67

console.log(wordsSimilarity.get('Nodejs','nodejs'));
// 1

console.log(wordsSimilarity.get('Nodejs','nodejs',false)); // to make it case sensitive
// 0.83
```
