import { GraphQLClient, RequestMiddleware, ResponseMiddleware } from 'graphql-request'

const requestMiddleware: RequestMiddleware = async (request) => {
  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization:
        localStorage && localStorage.getItem('token')
          ? 'Bearer ' + localStorage.getItem('token')
          : '',
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }
}

const responseMiddleware: ResponseMiddleware = (response: any) => {
  return response
}

const graphQLClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}`, {
  requestMiddleware,
  responseMiddleware,
  errorPolicy: 'all',
})

export { graphQLClient }
