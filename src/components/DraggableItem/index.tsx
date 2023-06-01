import { Avatar, Divider, Space, Tag, Typography } from "antd";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface DraggableItemProps {
  item: TaskItemType;
  index: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
  if (!item) return <></>;
  return (
    <Draggable key={item?.id} draggableId={item?._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="box-shadow m-2"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: 10,
              minHeight: "50px",
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: 7,
              // border: snapshot.isDragging ? '' : '1px dashed #ddd',
              boxShadow: "",
              ...provided.draggableProps.style,
            }}
          >
            <Space size={[0, 4]} wrap>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
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
