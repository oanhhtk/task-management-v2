import { PlusOutlined } from "@ant-design/icons";
import { Badge, Button, Space, Typography } from "antd";
import { Droppable } from "react-beautiful-dnd";
import DraggableList from "../DraggableList";
import { COLUMS_TASK_LIST_ENUM } from "../../utils/constant";

export interface IDroppableColumnsProps {
  columnKey: string;
  columnData: DroppableColumnsType;
  columnName: string;
  handleAddNewToDo: () => void;
}

export default function DroppableColumns({
  columnKey,
  columnData,
  columnName,
  handleAddNewToDo,
}: IDroppableColumnsProps) {
  return (
    <div
      style={{
        width: "25%",
        margin: 6,
      }}
    >
      <div
        key={columnKey}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Space
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography.Title level={5} color="#ddd">
            {columnName}
          </Typography.Title>
          <Badge
            color={COLUMS_TASK_LIST_ENUM[columnKey].color}
            count={columnData.items.length}
          />
        </Space>

        <div className="w-full">
          {columnKey === "TODO" ? (
            <Button
              onClick={() => {
                console.log("TODO");
                handleAddNewToDo();
              }}
              icon={<PlusOutlined />}
              style={{
                padding: 16,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: 7,
                border: "1px solid #ddd",
                width: "100%",
              }}
            />
          ) : (
            ""
          )}

          <Droppable droppableId={columnKey} key={columnKey}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? "#ddd" : "#f1f1f1",
                    border: !snapshot.isDraggingOver ? "" : "1px dashed blue",
                    padding: 4,
                    width: "100%",
                    minHeight: 500,
                    borderColor: "#ddd",
                  }}
                >
                  <DraggableList list={columnData.items} />
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </div>
    </div>
  );
}
