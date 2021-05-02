
export const GRAPHQL_API = "http://localhost:8080/query";

export const GET_USER_QUERY = `
query users{
    users{
        id
        phone_number
        city
  
    }
  }
`;