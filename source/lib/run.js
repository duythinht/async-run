export function run(regenerator) {
  return new Promise((resolve, reject) => {
    var generator = regenerator();
    next();
    function next(err, result) {
      if (err != null) {
        reject(err)
        return generator.throw(err);
      }
      var nextItem = generator.next(result);

      // What is done is done
      if (nextItem.done) return resolve(nextItem.value);
      //If has nextItem
      nextItem.value.then(function (result) {
        return next(null, result);
      }).catch(next);
    }
  })
}
