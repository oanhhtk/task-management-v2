import DraggableItem from "../DraggableItem";

interface DraggableListProps {
  list: any[];
}

const DraggableList: React.FC<DraggableListProps> = ({ list }) => {
  console.log("list :>> ", list);
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
