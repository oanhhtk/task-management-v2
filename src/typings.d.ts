type TaskItemType = {
  id: string;
  _id: string;
  name: string;
  status: string;
  descriptions: string;
};

type DroppableColumnsType = {
  name: string;
  items: TaskItemType[];
};
