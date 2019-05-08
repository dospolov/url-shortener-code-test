import gql from 'graphql-tag'

export const SHORTEN_LINK = gql`
  mutation shortenLink (
    $url: String!
  ){
    shortenLink (
      input: { url: $url }
    ) @rest (
      method: "POST",
      path: "/"
    ) {
      url
      short_url
      __typeName
    }
  }
`