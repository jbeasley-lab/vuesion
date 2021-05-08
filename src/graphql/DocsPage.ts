/* istanbul ignore file */
import gql from 'graphql-tag';

export const GetDocsPageData = gql`
  query GetDocsPageData($slug: String, $locale: String) {
    pageCollection(where: { OR: [{ slug: $slug }, { sys: { id: $slug } }] }, limit: 1, locale: $locale) {
      items {
        slug
        title
        metaDescription
        contentCollection(limit: 10) {
          items {
            image {
              url
              title
            }
            fullWidth
            text {
              json
            }
          }
        }
      }
    }
    categoryCollection(order: [position_ASC]) {
      items {
        sys {
          id
        }
        title
        pagesCollection {
          items {
            title
            slug
          }
        }
      }
    }
  }
`;
