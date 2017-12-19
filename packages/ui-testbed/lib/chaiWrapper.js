module.exports = function (chai) {
  chai.should()
  chai.use(require('sinon-chai'))
  chai.use(require('chai-string'))
  chai.use(require('chai-enzyme')())

  const Assertion = chai.Assertion

  chai.use((chai, utils) => {
    utils.addMethod(Assertion.prototype, 'accessible', function (done, options = {}) {
      const obj = utils.flag(this, 'object')

      obj.getA11yViolations(options, result => {
        try {
          new Assertion(result.violations.length).to.equal(0)
          done()
        } catch (e) {
          done(result.error)
        }
      })
    })
  })

  global.chai = chai
  global.expect = chai.expect
}
