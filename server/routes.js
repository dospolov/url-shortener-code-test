import validUrl from 'valid_url'
import generate from 'nanoid/generate'

let urlList = [] 

export default (app) => {
  app.get('/:shortId', (req, res) => {
    const { params: { shortId }} = req
    const item = urlList.find(item => item.id == shortId)
    return item 
      ? res.status(301).redirect(item.url)
      : res.status(404).json('Invalid Short Url.')
  })

  app.post('/', (req, res) => {
    const { body: { url }} = req
    if (validUrl(url)) {
      let item = urlList.find(item => item.url === url)
      if(!item) {
        item = {
          id: generate('1234567890abcdef', 5),
          url
        }
        urlList.push(item)
      }

      res.status(200).json({
        url: item.url,
        short_url: `/${item.id}`
      })
    } else {
      return res.status(401).json('Invalid Original Url.')
    }
  })
}