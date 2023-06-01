import DraggableItem from "../DraggableItem";

interface DraggableListProps {
  list: {
    _id: string;
    content: TaskItemType;
  }[];
}

const DraggableList: React.FC<DraggableListProps> = ({ list }) => {
  return (
    <>
      {list?.length > 0 &&
        list?.map((item, index) => {
          return (
            <DraggableItem key={item?._id} item={item?.content} index={index} />
          );
        })}
    </>
  );
};

export default DraggableList;
