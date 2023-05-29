import { graphQLRequest } from "../utils/request";

export const foldersLoader = async () => {
  const query = `query Folders {
    folders {
      id
      name
      createdAt
    }
  }`;

  const data = await graphQLRequest({ query });
  console.log("data :>> ", data);
  return data;
};
