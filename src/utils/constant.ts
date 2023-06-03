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

export const ISSUE_TYPES_OPTIONS = [
  {
    value: "task",
    label: "Task",
    color: "blue",
  },
  {
    value: "bug",
    label: "Bug",
    color: "error",
  },
  {
    value: "improvement",
    label: "Improvement",
    color: "purple",
  },
  {
    value: "story",
    label: "Story",
    color: "green",
  },
];

export const PRIORITY_OPTIONS = [
  {
    value: "low",
    label: "Low",
    color: "blue",
  },
  {
    value: "hight",
    label: "Hight",
    color: "error",
  },
  {
    value: "lowest",
    label: "Lowest",
    color: "geekblue",
  },
  {
    value: "medium",
    label: "Medium",
    color: "orange",
  },
  {
    value: "blocker",
    label: "Blocker",
    color: "default",
  },
];
export const BOARD_TYPE = [
  {
    value: "scrum",
    label: "Scrum",
    color: "purple",
  },
  {
    value: "kanban",
    label: "Kanban",
    color: "geekblue",
  },
];
export const GRAPHQL_SERVER =
  "https://oanhhtk-task-management-server.onrender.com";
// export const GRAPHQL_SERVER = "http://localhost:4000";
