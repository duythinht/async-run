import { run } from '../lib/run'
import { expect } from 'chai'
import "babel-polyfill"


function doAsync(result, success) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) return resolve(result)
      reject(result)
    })
  })
}


describe('#run', () => { 
  it('should await a result from doAsync', done => {
    run(function*() {
      var result = yield doAsync('result', true)
      expect('result').to.equal(result)
      done()
    })
  })

  it('should catch an error by try-catch', done => {
    run(function*() {
      try {
        var result = yield doAsync('An error', false)
      } catch(e) {
        expect('An error').to.equal(e)
        done()
      }
    })
  })
  it('should catch a final result', done => {
    run(function*() {
      var result = yield doAsync('result', true)
      return `final ${result}` 
    }).then(result => {
      expect('final result').equals(result)
      done()
    })
  })

  it('should catch an error', done => {
    run(function*() {
      var result = yield doAsync('the error', false)
      return `final ${result}` 
    }).catch(err => {
      console.log(err)
      expect('the error').equals(err)
      done()
    })
  })
})
