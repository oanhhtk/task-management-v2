import DraggableItem from "../DraggableItem";

interface DraggableListProps {
  list: any[];
  onItemClick: (item: TaskItemType) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({ list, onItemClick }) => {
  console.log("list :>> ", list);
  return (
    <>
      {list?.length > 0 &&
        list?.map((item, index) => {
          return (
            <DraggableItem
              key={item?.id}
              item={item?.content}
              index={index}
              onClick={onItemClick}
            />
          );
        })}
    </>
  );
};

export default DraggableList;
