export type Restaurant = {
  name: string,
  url: string,
  geo: {
    address: {
      streetAddress: string,
      postalCode: string,
      addressLocality: string
    }
  }
}

export type RootState = {
  app: {
    data: {
      data: {
        restaurant: {
          items: Restaurant[] | null
        }
      }
    }
  }
}

type State = {
  data: Restaurant[] | []
}

export default State