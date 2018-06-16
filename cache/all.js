
function all(promises) {
  return new Promise(function(resolve, reject) {
    var results = [];
    if (promises.length === 0){
      return success(successArr);
    }
  
    promises.forEach(function(promise, i) {
      promise.then(function(result) {
        results[i] = result;
        if ()
          success(successArr);
      }, function(error) {
        fail(error);
      });
    });
  });
}