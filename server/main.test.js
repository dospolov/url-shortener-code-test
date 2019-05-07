import app from './main'
import request from 'supertest'

let shortLink, originalLink

describe('POST url', () => {
  it('returns error message, if url is not valid', done => {
    const testUrl = "http://www.farmdrop.22"
    request(app)
      .post('/')
      .send({ "url": testUrl })
      .expect(401)
      .then(error => {
        expect(JSON.parse(error.text)).toEqual("Invalid Original Url.")
        done()
      })
  })

  it('returns correct original url, if url is valid', done => {
    const testUrl = "farmdrop.com"
    request(app)
      .post('/')
      .send({ "url": testUrl })
      .then(response => {
        const { body: { url, short_url }} = response
        originalLink = url
        shortLink = short_url
        expect(url).toBe(testUrl)
        done()
      })
  })
})

describe('GET url', () => {
  it('redirects to stored URL', done => {
    request(app)
      .get(shortLink)
      .then(response => {
        const { headers: { location }} = response
        expect(location).toEqual(originalLink)
        done()
    })
  })
})