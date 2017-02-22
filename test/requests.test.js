process.env.NODE_ENV = 'test'

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

const server = require('../src/server')
const { resetDatabase, Book } = require('../src/models')

chai.use(chaiHttp)

describe('/books', function() {
  before(function(done) {
    resetDatabase()
    .then(function() {
      done()
    })
    .catch(function(error) {
      done(error)
    })
  })

  describe('GET /books', function() {
    beforeEach(function(done) {
      Book.create({title: 'Some title', author: 'Algun author'})
      .then(function() {
        done()
      })
    })

    it('works', function(done) {
      chai.request(server)
        .get('/books')
        .end(function(error, response) {
          expect(error).to.be.null
          expect(response.body.books).to.deep.equal([{title: 'Some title', author: 'Algun author'}])
          done()
        })
    })
  })
})
