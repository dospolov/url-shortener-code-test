import validUrl from 'valid_url'
import generate from 'nanoid/generate'

let urlList = []

export default (app) => {
  app.get('/:shortId', (req, res) => {
    const { params: { shortId }} = req
    const item = urlList.find(url => url.id == shortId)
    return item && res.status(301).redirect(item.url)
  })

  app.post('/', (req, res) => {
    const { body: { url }} = req
    if (validUrl(url)) {
      const newUrl = {
        id: generate('1234567890abcdef', 5),
        url
      }
      urlList.push(newUrl)
      res.status(200).json({
        url: newUrl.url,
        short_url: `/${newUrl.id}`
      })
    } else {
      return res.status(401).json('Invalid Original Url.')
    }
  })
}