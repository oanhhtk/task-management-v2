import { useState } from "react";
import DraggableItem from "../DraggableItem";

interface DraggableListProps {
  list: any[];
  onItemClick: (item: TaskItemType) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({ list, onItemClick }) => {
  return (
    <>
      {list?.length > 0 &&
        list?.map((item, index) => {
          return (
            <DraggableItem
              key={item?.id}
              item={item?.content}
              index={index}
              onClick={() => {
                console.log("object :>> ", item?.content?._id);
                onItemClick(item);
              }}
            />
          );
        })}
    </>
  );
};

export default DraggableList;
