import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DroppableColumns from "../../components/DroppableColumn";
import TaskDetail from "../../components/TaskDetail";

const tasks = [
  {
    id: "1",
    label: "Task label",
    content: "First task Data disk type: MongoDB ",
  },
  {
    id: "2",
    label: "Task label",
    content: "Second task Data disk type: MongoDB",
  },
  {
    id: "3",
    label: "Task label",
    content: "Third task Data disk type: MongoDB",
  },
  {
    id: "4",
    label: "Task label",
    content: "Fourth task Data disk type: MongoDB",
  },
  {
    id: "5",
    label: "Task label",
    content: "Fifth task Data disk type: MongoDB",
  },
];

const taskStatus: Record<string, DroppableColumnsType> = {
  TODO: {
    name: "To do",
    items: tasks,
  },
  INPROGRESS: {
    name: "In Progress",
    items: [],
  },
  RESOLVED: {
    name: "Resolved",
    items: [],
  },
  DONE: {
    name: "Done",
    items: [],
  },
};

function RapidBoard() {
  console.log("RapidBoard");
  const [columns, setColumns] =
    useState<Record<string, DroppableColumnsType>>(taskStatus);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    //
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    if (source.droppableId !== destination.droppableId) {
      //handle move to
      const [itemRemoved] = sourceItems.splice(source.index, 1);

      // Inserts in destination items
      destItems.splice(destination.index, 0, itemRemoved);
      // update columns data
      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }));
    } else {
      //handle re-order
      const [itemRemoved] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, itemRemoved);
      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      }));
    }
  };
  useEffect(() => {
    setColumns(taskStatus);
  }, []);
  return (
    <div
      style={{
        maxHeight: "100vh",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Typography.Text
        className="text-center"
        style={{
          marginTop: "30px",
        }}
      >
        ECOPAY Sprint 20
      </Typography.Text>
      <Row justify="space-between">
        <Col
          span={16}
          style={{
            minWidth: "700px",
            height: "100%",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              maxHeight: "100vh",
              overflow: "scroll",
            }}
          >
            <div className="flex justify-center h-full">
              <DragDropContext onDragEnd={onDragEnd}>
                {Object.entries(columns).map(([columnKey, column]) => {
                  return (
                    <DroppableColumns
                      key={columnKey}
                      columnKey={columnKey}
                      columnData={column}
                      columnName={column.name}
                      handleAddNewToDo={() => {
                        setColumns((prev) => ({
                          ...prev,
                          ["TODO"]: {
                            ...prev["TODO"],
                            items: [
                              {
                                id: `${column.items.length + 1}`,
                                label: "string",
                                content: "string",
                              },
                              ...prev["TODO"].items,
                            ],
                          },
                        }));
                      }}
                    />
                  );
                })}
              </DragDropContext>
            </div>
          </div>
        </Col>
        <Col
          span={8}
          style={{
            padding: "8px",
            height: "100%",
            maxHeight: "100vh",
            overflow: "scroll",
          }}
        >
          <h4>Detail</h4>
          <TaskDetail />
        </Col>
      </Row>
    </div>
  );
}

export default RapidBoard;
