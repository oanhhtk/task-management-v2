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
        email
      }
      administrators
      board_type
      descriptions
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
      name
      id
      createdAt
      tasks {
        DONE {
          id
          createdAt
          updatedAt
          content {
            _id
            name
            descriptions
            status
            issue_type
            priority
          }
        }
        INPROGRESS {
          id
          createdAt
          updatedAt
          content {
            _id
            name
            descriptions
            status
            issue_type
            priority
          }
        }
        RELEASED {
          id
          createdAt
          updatedAt
          content {
            _id
            name
            descriptions
            status
            issue_type
            priority
          }
        }
        RESOLVED {
          id
          createdAt
          updatedAt
          content {
            _id
            name
            descriptions
            status
            issue_type
            priority
          }
        }
        TODO {
          id
          createdAt
          updatedAt
          content {
            _id
            name
            descriptions
            status
            issue_type
            priority
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

export const updateTask = async (updateTaskId: string, content: any) => {
  const query = `mutation Mutation($updateTaskId: String, $content: TaskContentInput) {
    updateTask(id: $updateTaskId, content: $content) {
      updatedAt
      createdAt
      content {
        _id
        name
        descriptions
        status
        issue_type
        priority
      }
      id
    }
  }`;

  const variables = {
    updateTaskId,
    content,
  };
  const data = await graphQLRequest({ query, variables });
  return data;
};

export const addTask = async (folderId: string, content: any) => {
  const query = `mutation Mutation($folderId: ID!, $content: TaskContentInput) {
    addTask(folderId: $folderId, content: $content) {
      content {
        _id
        name
        descriptions
        status
        issue_type
        priority
      }
      id
      createdAt
      updatedAt
    }
  }`;

  const variables = {
    folderId,
    content,
  };
  const data = await graphQLRequest({ query, variables });
  return data;
  1;
};

export const addBoard = async (content: any) => {
  const query = `mutation Mutation($name: String!, $administrators: String!, $board_type: String!, $descriptions: String) {
    addBoard(name: $name, administrators: $administrators, board_type: $board_type, descriptions: $descriptions) {
      id
      name
      createdAt
      administrators
      board_type
      descriptions
    }
  }`;

  const variables = {
    ...content,
  };
  const data = await graphQLRequest({ query, variables });
  return data;
  1;
};

export const deleteBoard = async (id: any) => {
  const query = `mutation DeleteBoard($id: String!) {
    deleteBoard(id: $id) {
      id
      name
      createdAt
      administrators
      board_type
      descriptions
    }
  }`;

  const variables = {
    id,
  };
  const data = await graphQLRequest({ query, variables });
  return data;
  1;
};
export const updateBoard = async (updateBoardId: any, content: any) => {
  const query = `mutation Mutation($updateBoardId: String!, $content: BoardInput) {
    updateBoard(id: $updateBoardId, content: $content) {
      id
      name
      board_type
      administrators
      descriptions
      createdAt
      updatedAt
    }
  }`;

  const variables = {
    updateBoardId,
    content,
  };
  const data = await graphQLRequest({ query, variables });
  return data;
  1;
};
