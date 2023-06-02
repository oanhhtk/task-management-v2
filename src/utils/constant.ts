export const COLUMS_TASK_LIST_ENUM: Record<string, any> = {
  REQUESTED: {
    value: "REQUESTED",
    title: "New Requested",
    color: "red",
  },
  TODO: {
    title: "To do",
    value: "TODO",
    color: "blue",
  },
  INPROGRESS: {
    title: "In Progress",
    value: "INPROGRESS",
    color: "orange",
  },
  RESOLVED: {
    title: "Resolved",
    value: "RESOLVED",
    color: "green",
  },
  DONE: {
    title: "Done",
    value: "DONE",
    color: "purple",
  },
};

// export const GRAPHQL_SERVER =
//   "https://oanhhtk-task-management-server.onrender.com";
export const GRAPHQL_SERVER = "http://localhost:4000";
