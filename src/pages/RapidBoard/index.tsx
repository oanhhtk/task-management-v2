import { Form, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import DroppableColumns from "../../components/DroppableColumn";
import { BoardsLoader } from "../../service";
import TaskDetail from "./components/TaskDetail";
import UseForm from "./components/UseForm";

function RapidBoard() {
  const { folderId } = useParams();
  const [columns, setColumns] =
    useState<Record<string, DroppableColumnsType>>();

  const [form] = Form.useForm();

  const [taskDetail, setTaskDetail] = useState<TaskItemType>();
  const [openUseForm, setOpenUseForm] = useState(false);

  useEffect(() => {
    (async () => {
      if (!folderId) return;
      const res = await BoardsLoader(folderId);
      console.log(res);
      const result: any = {};
      Object.entries(res?.board?.tasks).map(([key, value]) => {
        result[key] = {
          name: key,
          items: value,
        };
      });
      setColumns(result);

      //   TODO: {
      //     name: "To do",
      //     items: res?.board?.folders?.map((fd: any) => {
      //       if (
      //         fd?.content &&
      //         typeof fd?.content !== "string" &&
      //         Object.keys(fd?.content).length > 0
      //       ) {
      //         return fd?.content;
      //       }
      //     }),
      //   },
      //   INPROGRESS: {
      //     name: "Inprogress",
      //     items: [],
      //   },
      //   DONE: {
      //     name: "Done",
      //     items: [],
      //   },
      // });
    })();
  }, [folderId]);

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
  const [formSubmiting, setFormSubmiting] = useState(false);

  const onFromSubmit = async (value: any) => {
    console.log(value);
    try {
      setFormSubmiting(true);
      setTimeout(() => {
        setFormSubmiting(false);
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
        className="text-center"
        style={{
          marginTop: "30px",
        }}
      >
        ECOPAY Sprint 20
      </Typography.Text>
      <div className="flex">
        <div
          style={{
            // minWidth: "700px",
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
            <div className="flex h-full">
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
          projectName={"oanh project"}
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
