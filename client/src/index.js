import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col, Input, Button, Alert } from 'antd'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider, Mutation } from 'react-apollo'
import { RestLink } from 'apollo-link-rest'
import { SHORTEN_LINK } from './mutations'
import './index.css'

const baseURL = 'http://localhost:4000'
const restLink = new RestLink({
  uri: baseURL
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache,
  link: restLink
})

const App = () => {
  const [url, setUrl] = useState("")
  const handleChange = e => {
    setUrl(e.target.value)
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Mutation mutation={SHORTEN_LINK}>
          {(shortenLink, { data, error }) =>
            <> 
              <Row>
                <Col span={18}>
                  <Input placeholder="Shorten your link" onChange={handleChange} />
                </Col>
                <Col span={5} offset={1}>
                  <Button type="primary" onClick={() => {
                    shortenLink({ variables: { url }})
                  }}>Go</Button>
                </Col>
              </Row>
              <Row style={{marginTop: 20}}>
                <Col span={24}>
                  {error && url && <Alert
                    message={error.networkError.result}
                    type="error"
                    showIcon />
                  }
                  {data && url && <Alert
                    message={
                      <a 
                        href={`${baseURL}${data.shortenLink.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {baseURL}{data.shortenLink.short_url}
                      </a>
                    }
                    type="info"
                    showIcon />
                  }
                </Col>
              </Row>
            </>
          }
        </Mutation>
      </div>
    </ApolloProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))