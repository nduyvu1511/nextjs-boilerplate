import { gql } from 'graphql-request'

export const GET_PRODUCTS = gql`
  query getProducts(
    $filter: ProductAttributeFilterInput
    $search: String
    $pageSize: Int
    $currentPage: Int
    $sort: ProductAttributeSortInput
  ) {
    products(
      filter: $filter
      search: $search
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        related_products {
          name
          sort_name
          sku
          uid
          color
          unit
          height
          width
          length
          country_of_manufacture
          description {
            html
          }
          rating_summary
          review_count
          reviews {
            items {
              comments {
                ...ReviewOptionsFields
              }
              created_at
              customer_avatar
              images {
                ...ReviewOptionsFields
              }
              review_id
              link_video
              nickname
              ratings_breakdown {
                name
                value
              }
              statistics {
                comment
                dislike
                images
                like
                video
              }
              average_rating
              created_at
              nickname
              text
              product {
                image {
                  url
                }
              }
            }
            page_info {
              current_page
              page_size
              total_pages
            }
          }
          media_gallery {
            url
          }
          daily_sale {
            end_date
            entity_id
            product_id
            sale_price
            sale_qty
            sold_qty
            start_date
          }
          stock_status
          image {
            url
          }
          price_tiers {
            discount {
              percent_off
            }
            final_price {
              value
              currency
            }
          }
          price_range {
            maximum_price {
              final_price {
                ...MoneyFields
              }
              regular_price {
                ...MoneyFields
              }
            }
            minimum_price {
              final_price {
                ...MoneyFields
              }
              regular_price {
                ...MoneyFields
              }
            }
          }
          reviews {
            items {
              comments {
                ...ReviewOptionsFields
              }
              created_at
              customer_avatar
              images {
                ...ReviewOptionsFields
              }
              review_id
              link_video
              nickname
              ratings_breakdown {
                name
                value
              }
              statistics {
                comment
                dislike
                images
                like
                video
              }
            }
          }
        }
        ...ProductItemField
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }

  fragment ProductItemField on ProductInterface {
    name
    sku
    uid
    color
    package_size
    country_of_manufacture
    description {
      html
    }
    sort_name
    rating_summary
    review_count
    unit
    height
    width
    length
    brand_id
    brand {
      entity_id
      name
      image
      logo
    }
    country
    short_description {
      html
    }
    reviews {
      items {
        comments {
          ...ReviewOptionsFields
        }
        created_at
        customer_avatar
        images {
          ...ReviewOptionsFields
        }
        review_id
        link_video
        nickname
        ratings_breakdown {
          name
          value
        }
        statistics {
          comment
          dislike
          images
          like
          video
        }
        average_rating
        created_at
        nickname
        text
        product {
          image {
            url
          }
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
    media_gallery {
      url
    }
    daily_sale {
      end_date
      entity_id
      product_id
      sale_price
      sale_qty
      sold_qty
      start_date
    }
    stock_status
    image {
      url
    }
    price_tiers {
      discount {
        percent_off
      }
      final_price {
        value
        currency
      }
    }
    price_range {
      maximum_price {
        final_price {
          ...MoneyFields
        }
        regular_price {
          ...MoneyFields
        }
      }
      minimum_price {
        final_price {
          ...MoneyFields
        }
        regular_price {
          ...MoneyFields
        }
      }
    }
    reviews {
      items {
        comments {
          ...ReviewOptionsFields
        }
        created_at
        customer_avatar
        images {
          ...ReviewOptionsFields
        }
        review_id
        link_video
        nickname
        ratings_breakdown {
          name
          value
        }
        statistics {
          comment
          dislike
          images
          like
          video
        }
      }
    }
  }

  fragment MoneyFields on Money {
    value
    currency
  }
  fragment ReviewOptionsFields on ReviewOptions {
    content
    created_at
    customer_avatar
    customer_id
    post_by
    review_id
    status
    type
  }
`
