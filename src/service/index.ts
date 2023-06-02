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
  return data;
  1;
};
export const getBoardList = async () => {
  const query = `query Boards {
    boards {
      id
      name
      createdAt
      author {
        uid
        name
      }
    }
  }`;

  const data = await graphQLRequest({ query });
  return data;
  1;
};

//6476ceffc107ec2d7b286e37
export const BoardsLoader = async (folderId: string) => {
  const query = `query Query($folderId: String!) {
    board(folderId: $folderId) {
      tasks {
        TODO {
          updatedAt
          id
          content {
            status
            name
            descriptions
            _id
          }
        }
        INPROGRESS {
          id
          content {
            _id
            name
            descriptions
            status
          }
          updatedAt
        }
        DONE {
          id
          content {
            _id
            name
            descriptions
            status
          }
          updatedAt
        }
        RESOLVED {
          id
          updatedAt
          content {
            status
            name
            descriptions
            _id
          }
        }
        RELEASED {
          updatedAt
          id
          content {
            status
            _id
            descriptions
            name
          }
        }
      }
    }
  }`;

  const variables = {
    folderId,
  };

  const data = await graphQLRequest({ query, variables });
  return data;
};
