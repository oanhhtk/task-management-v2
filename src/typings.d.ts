type TaskItemType = {
  id: string;
  _id: string;
  name: string;
  status: string;
  issue_type: string;
  priority: string;
  descriptions: string;
};

type DroppableColumnsType = {
  name: string;
  items: TaskItemType[];
};
