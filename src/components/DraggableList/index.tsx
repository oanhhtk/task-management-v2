import { useState } from "react";
import DraggableItem from "../DraggableItem";

interface DraggableListProps {
  list: any[];
  onItemClick: (item: any) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({ list, onItemClick }) => {
  return (
    <>
      {list?.length > 0 &&
        list?.map((item, index) => (
          <DraggableItem
            key={item?.id}
            draggableId={item?.id}
            item={item?.content}
            index={index}
            onClick={() => {
              onItemClick(item);
            }}
          />
        ))}
    </>
  );
};

export default DraggableList;
