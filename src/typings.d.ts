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

type UseFormActionType = "CREATE" | "UPDATE";

type BoardItemDataType = {
  id: any;
  name: string;
  board_type: string;
  administrators: string;
  createdAt: string;
};
