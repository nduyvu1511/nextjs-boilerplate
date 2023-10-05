import { GET_PRODUCTS } from '@/graphql'
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
  if (!(response instanceof Error) && response.errors) {
    if (response.errors[0]?.extensions?.category === 'graphql-authorization') {
      localStorage.removeItem('token')
      localStorage.removeItem('cartId')
      localStorage.removeItem('loginSocial')
      window.location.replace(`${window.location.origin}/login`)
    }

    const errorMessage = response?.errors[0]?.message
    if (errorMessage) {
      //   toast.error(errorMessage)
      throw Error(errorMessage)
    }
  }
  return {
    ...response,
  }
}

const graphQLClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}`, {
  requestMiddleware,
  responseMiddleware,
  errorPolicy: 'all',
})

// if (typeof window !== 'undefined') {
//   graphQLClient.setHeaders({
//     Authorization:
//       localStorage && localStorage.getItem('token')
//         ? 'Bearer ' + localStorage.getItem('token')
//         : '',
//     'Content-Type': 'application/json',
//     accept: 'application/json',
//   })
// }

export { graphQLClient }

const getData = async () => {
  const data = await graphQLClient.request(GET_PRODUCTS, {})
}
