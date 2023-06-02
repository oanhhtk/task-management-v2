import { Avatar, Divider, Space, Tag, Typography } from "antd";
import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BoardContext } from "../../context/BoardContext";

interface DraggableItemProps {
  item: TaskItemType;
  index: number;
  onClick: (item: TaskItemType) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  index,
  onClick,
}) => {
  const { activeId, setActiveId } = useContext(BoardContext);

  if (!item) return <></>;
  return (
    <Draggable key={item?.id} draggableId={item?._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="box-shadow m-2 task-draggable-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: 10,
              minHeight: "50px",
              backgroundColor:
                activeId === item._id ? "rgb(222,235,255)" : "#fff",
              color: "#000",
              borderRadius: 7,
              ...provided.draggableProps.style,
              cursor: "move",
            }}
            onClick={() => {
              onClick(item);
              setActiveId?.(item._id);
            }}
          >
            <Space size={[0, 4]} wrap>
              {item?.priority ? (
                <Tag bordered={false} color="warning">
                  {item?.priority}
                </Tag>
              ) : null}
            </Space>
            <Space direction="vertical">
              <Typography.Title level={5}>{item?.name}</Typography.Title>
              <Typography.Text>{item?.descriptions}</Typography.Text>
            </Space>
            <>
              <Divider className="mt-2 mb-2" />
              <Avatar
                style={{
                  border: "1px solid #ddd",
                }}
                src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
              />
            </>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableItem;
