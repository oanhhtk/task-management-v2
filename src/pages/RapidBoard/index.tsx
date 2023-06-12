import { Form, Spin, Typography, message, notification } from "antd";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import DroppableColumns from "../../components/DroppableColumn";
import { BoardsLoader, addTask, updateTask } from "../../service";
import TaskDetail from "./components/TaskDetail";
import UseForm from "./components/UseForm";
import BoardProvier from "../../context/BoardContext";
import Loading from "../../components/Loading";

const orderSortArr = ["TODO", "INPROGRESS", "RESOLVED", "DONE", "RELEASED"];

function RapidBoard() {
  const { folderId } = useParams();
  const [columns, setColumns] =
    useState<Record<string, DroppableColumnsType>>();
  const [projectName, setProjectName] = useState("");

  const [taskDetail, setTaskDetail] = useState<any>();
  const [openUseForm, setOpenUseForm] = useState(false);
  const [formSubmiting, setFormSubmiting] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useFormType, setUseFormType] = useState<UseFormActionType>("CREATE");
  const [selectedRecord, setSelectedRecord] = useState<TaskItemType>();

  const getBoards = async () => {
    if (!folderId) return;
    try {
      setLoading(true);
      const res = await BoardsLoader(folderId);
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
    } catch (error) {
      notification.error({
        type: "error",
        message: "Error!",
        description: "Failed to fetch board data. Try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoards();
  }, [folderId, triggerReload]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, draggableId, destination } = result;
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
    //!! handle update api
    try {
      await updateTask(draggableId, {
        status: destination.droppableId,
      });
      setTriggerReload((prev) => !prev);
      message.success("Updated successfully!");
    } catch (error) {
      message.error("Error! Try again");
    }
  };

  const onFromSubmit = async (value: any) => {
    value.status = "TODO";
    if (!folderId) return;
    try {
      setFormSubmiting(true);
      await addTask(folderId, value);
      notification.success({
        type: "success",
        message: "Successfully",
        description: "Add new task successfully",
      });
      setTriggerReload(true);
    } catch (error) {
      notification.error({
        type: "error",
        message: "Failed to add new task!!",
        description: "Add new task failed!. Try again",
      });
    } finally {
      setFormSubmiting(false);
      setOpenUseForm(false);
    }
  };

  return (
    <BoardProvier>
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
          <Loading loading={loading} />

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
                            setUseFormType("CREATE");
                            setOpenUseForm(true);
                            setSelectedRecord(undefined);
                          }}
                          onItemClick={(item) => {
                            setTaskDetail(item);
                          }}
                        />
                      );
                    })}
                  </DragDropContext>
                ) : (
                  <Loading loading />
                )}
              </div>
            </div>
          </div>
          <div>
            <TaskDetail
              data={taskDetail}
              openEditForm={() => {
                setUseFormType("UPDATE");
                setOpenUseForm(true);
                setSelectedRecord(taskDetail);
              }}
              // type="UPDATE"
            />
          </div>
        </div>

        {openUseForm ? (
          <UseForm
            title={useFormType === "CREATE" ? "New Task" : "Update task"}
            open={openUseForm}
            onCancel={() => setOpenUseForm(false)}
            projectName={projectName}
            onSubmit={onFromSubmit}
            record={selectedRecord}
            formProps={{
              isSubmiting: formSubmiting,
            }}
            type={useFormType}
          />
        ) : null}
      </div>
    </BoardProvier>
  );
}

export default RapidBoard;
