const BigNumber = require('bignumber.js');
function getSimilarity(__this, that,caseInsensitive=true) {

    if(caseInsensitive)
    {
        __this=__this.toLowerCase();
        that=that.toLowerCase();
    }

    const thisLength = __this.length,
        thatLength = that.length,
        matrix = [];
  
    const limit = (thatLength > thisLength ? thatLength : thisLength)+1;
  
    for (let i = 0; i < limit; i++) {
      matrix[i] = [i];
      matrix[i].length = limit;
    }
    for (let i = 0; i < limit; i++) {
      matrix[0][i] = i;
    }
  
    if (Math.abs(thisLength - thatLength) > (limit || 100)){
      return prepare (limit || 100);
    }
    if (thisLength === 0){
      return prepare (thatLength);
    }
    if (thatLength === 0){
      return prepare (thisLength);
    }
  
    // Calculate matrix.
    let t;
    for (let i = 1; i <= thisLength; ++i) {
      const this_i = __this[i-1];
  
      // Step 4
      for (let j = 1; j <= thatLength; ++j) {
        // Check the jagged ld total so far
        if (i === j && matrix[i][j] > 4) return prepare (thisLength);
  
        const that_j = that[j-1];
        const cost = (this_i === that_j) ? 0 : 1; // Step 5
        // Calculate the minimum (much faster than Math.min(...)).
        let min    = matrix[i - 1][j    ] + 1; // Deletion.
        if ((t = matrix[i    ][j - 1] + 1   ) < min) min = t;   // Insertion.
        if ((t = matrix[i - 1][j - 1] + cost) < min) min = t;   // Substitution.
  
        // Update matrix.
        matrix[i][j] = (i > 1 && j > 1 && this_i === that[j-2] && __this[i-2] === that_j && (t = matrix[i-2][j-2]+cost) < min) ? t : min; // Transposition.
      }
    }
  
    return prepare (matrix[thisLength][thatLength]);
  
  /**
   *
   */
    function prepare(steps) {
      const length = Math.max(thisLength, thatLength)
      const relative = length === 0
        ? 0
        : new BigNumber(steps).dividedBy(length);
        const similarity = new BigNumber(1).minus(relative)
      return new BigNumber(similarity.toFixed(2)).toNumber(2);
    }
  
  };
  module.exports = { getSimilarity };