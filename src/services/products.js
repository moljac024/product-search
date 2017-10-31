import axios from 'axios'
import pick from 'lodash/pick'


export const search = (query = '') => {
  const url = 'https://latency-dsn.algolia.net/1/indexes/*/queries'
  const params = {
    'x-algolia-api-key': '6be0576ff61c053d5f9a3225e2a90f76',
    'x-algolia-application-id': 'latency'
  }

  const data = {
    query,
    indexName: 'ikea',
    hitsPerPage: 16,
  }

  return axios.post(url, {requests: [data]}, {params})
    .then(response => {
      const result = response.data.results[0]

      return {
        data: result.hits,
        ...pick(result, [
          'hitsPerPage',
          'nbHits',
          'nbPages',
          'page',
        ])
      }
    })
}
