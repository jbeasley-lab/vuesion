/* istanbul ignore file */
import gql from 'graphql-tag';

export const GetDocsPageData = gql`
  query GetDocsPageData($slug: String, $locale: String) {
    pageCollection(where: { OR: [{ slug: $slug }, { sys: { id: $slug } }] }, limit: 1, locale: $locale) {
      items {
        sys {
          id
        }
        slug
        title
        metaDescription
        contentCollection(limit: 10) {
          items {
            sys {
              id
            }
            fullWidth
            text {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    contentType
                    url
                    description
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
