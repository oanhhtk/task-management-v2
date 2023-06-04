import { PlusOutlined } from "@ant-design/icons";
import { Badge, Button, Space, Tooltip, Typography } from "antd";
import { Droppable } from "react-beautiful-dnd";
import DraggableList from "../DraggableList";
import { COLUMS_TASK_LIST_ENUM } from "../../utils/constant";

export interface IDroppableColumnsProps {
  columnKey: string;
  columnData: DroppableColumnsType;
  columnName: string;
  handleAddNewToDo: () => void;
  onItemClick: (item: { id: string; content: TaskItemType }) => void;
}

export default function DroppableColumns({
  columnKey,
  columnData,
  columnName,
  handleAddNewToDo,
  onItemClick,
}: IDroppableColumnsProps) {
  return (
    <div
      style={{
        width: "25%",
        margin: 6,
        height: "100%",
        minHeight: "700px",
      }}
    >
      <div
        key={columnKey}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
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
            color={COLUMS_TASK_LIST_ENUM[columnKey]?.color}
            count={columnData?.items?.length}
          />
        </Space>

        <div className="w-full h-full">
          <div className="h-full">
            {columnKey === "TODO" ? (
              <Tooltip title="Add new task">
                <Button
                  onClick={() => {
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
              </Tooltip>
            ) : (
              ""
            )}
          </div>
          <div className="h-full">
            <Droppable droppableId={columnKey} key={columnKey}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? "#ddd" : "#f1f1f1",
                      border: !snapshot.isDraggingOver
                        ? "0px dashed #91caff"
                        : "1px dashed #91caff",
                      padding: 4,
                      width: "100%",
                      minHeight: "1000px",
                      borderColor: "#ddd",
                      height: "100%",
                    }}
                    key={columnKey}
                  >
                    <DraggableList
                      list={columnData?.items}
                      onItemClick={onItemClick}
                      key={columnKey}
                    />
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        </div>
      </div>
    </div>
  );
}
