import { Form, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import DroppableColumns from "../../components/DroppableColumn";
import { BoardsLoader } from "../../service";
import TaskDetail from "./components/TaskDetail";
import UseForm from "./components/UseForm";

const orderSortArr = ["TODO", "INPROGRESS", "RESOLVED", "DONE", "RELEASED"];

function RapidBoard() {
  const { folderId } = useParams();
  const [columns, setColumns] =
    useState<Record<string, DroppableColumnsType>>();
  const [form] = Form.useForm();
  const [projectName, setProjectName] = useState("");

  const [taskDetail, setTaskDetail] = useState<TaskItemType>();
  const [openUseForm, setOpenUseForm] = useState(false);
  const [formSubmiting, setFormSubmiting] = useState(false);

  useEffect(() => {
    (async () => {
      if (!folderId) return;
      const res = await BoardsLoader(folderId);
      console.log(res);
      const data: any = {};
      const result: any = {};
      setProjectName(res?.board?.name);
      Object.entries(res?.board?.tasks).map(([key, value]) => {
        data[key] = {
          name: key,
          items: value,
        };
      });
      orderSortArr.map((key) => {
        result[key] = data[key];
      });
      setColumns(result);
    })();
  }, [folderId]);

  console.log("columns :>> ", columns);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = columns?.[source.droppableId];
    const destColumn = columns?.[destination.droppableId];
    //
    const sourceItems = [...(sourceColumn?.items || [])];
    const destItems = [...(destColumn?.items || [])];

    if (source.droppableId !== destination.droppableId) {
      //handle move to
      const [itemRemoved] = sourceItems.splice(source.index, 1);

      // Inserts in destination items
      destItems.splice(destination.index, 0, itemRemoved);
      // update columns data
      setColumns((prevColumns: any) => ({
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
      setColumns((prevColumns: any) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      }));
    }
  };

  const onFromSubmit = async (value: any) => {
    console.log(value);
    try {
      setFormSubmiting(true);
      setTimeout(() => {
        setFormSubmiting(false);
        setOpenUseForm(false);
      }, 5000);
    } catch (error) {}
  };

  return (
    <div
      style={{
        maxHeight: "100vh",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Typography.Text
        className="text-center logo"
        style={{
          marginTop: "30px",
        }}
      >
        {projectName}
      </Typography.Text>
      <div className="flex">
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              maxHeight: "100vh",
              minHeight: "100vh",
              overflow: "scroll",
            }}
          >
            <div
              className="flex h-full"
              style={{
                width: "1240px",
                minWidth: "100%",
              }}
            >
              {columns ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  {Object.entries(columns).map(([columnKey, column]) => {
                    return (
                      <DroppableColumns
                        key={columnKey}
                        columnKey={columnKey}
                        columnData={column}
                        columnName={column.name}
                        handleAddNewToDo={() => {
                          setOpenUseForm(true);
                          // setColumns(
                          //   (prev) =>
                          //     prev && {
                          //       ...prev,
                          //       ["TODO"]: {
                          //         ...prev["TODO"],
                          //         items: [
                          //           {
                          //             _id: `${column?.items.length + 1}`,
                          //             id: `${column?.items.length + 1}`,
                          //             name: "string",
                          //             descriptions: "This is descriptions",
                          //             status: "TODO",
                          //           },
                          //           ...prev["TODO"]?.items,
                          //         ],
                          //       },
                          //     }
                          // );
                        }}
                        onItemClick={(item) => {
                          console.log(item);
                          setTaskDetail(item);
                        }}
                      />
                    );
                  })}
                </DragDropContext>
              ) : (
                <div className="flex justify-center items-center">
                  <Spin />
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <TaskDetail data={taskDetail} />
        </div>
      </div>

      {openUseForm ? (
        <UseForm
          open={openUseForm}
          onCancel={() => setOpenUseForm(false)}
          projectName={projectName}
          form={form}
          onSubmit={onFromSubmit}
          formProps={{
            isSubmiting: formSubmiting,
          }}
        />
      ) : null}
    </div>
  );
}

export default RapidBoard;
