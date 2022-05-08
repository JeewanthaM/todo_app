import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { DatePicker } from "antd";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import AddButton from "./components/AddButton/AddButton";
import AppHeader from "./components/AppHeader/AppHeader";
import AppLoading from "./components/AppLoading/AppLoading";
import DataTable from "./components/DataTable/DataTable";
import { handleErrors, showNotification } from "./services/HelperMethods";
import { RootState } from "./store/reducers/index";
import { AppButton } from "./components/AppButton/AppButton";
import "./App.scss";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { createTodo } from "./store/actions/todo_actions";
import { isLoading } from "./store/actions/loading_actions";

function App() {
  const appIsLoading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    console.log("appIsLoading", appIsLoading);
  }, [appIsLoading]);

  const dispatch = useDispatch();
  const [endDate, setEndDate] = useState(moment(moment(), "d/mm/yyyy"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isRefreshTable, setisRefreshTable] = useState(false);

  function clearFields() {
    setTitle("");
    setDescription("");
    setEndDate(moment());
  }

  function handleSubmit() {
    if (title.trim() === "") {
      showNotification("Validation Error", "error", "error");
      return;
    }

    if (description.trim() === "") {
      showNotification("Validation Error", "error", "error");
      return;
    }

    let dataToSubmit = {
      title,
      description,
      status,
      endDate,
    };

    dispatch(isLoading(true));

    dispatch(createTodo(dataToSubmit))
      .then((res: any) => {
        if (res?.payload?.status == "201") {
          dispatch(isLoading(false));
          setisRefreshTable(true);
        }
      })
      .catch((err) => {
        handleErrors(err);
        dispatch(isLoading(false));
      });

    clearFields();
    setisRefreshTable(false);
    setIsShowAddModal(false);
  }

  return (
    <div className="App">
      <AppLoading
        color="#8ACB87"
        style={{ left: 0, backgroundColor: "white", zIndex: 15 }}
        isLoading={appIsLoading.todos}
      />
      <ToastContainer />

      <div id="date-popup" />

      <Modal
        centered
        show={isShowAddModal}
        onHide={() => {
          clearFields();
          setIsShowAddModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-group">
            <div>
              <p className="m-des-hd">Title</p>
              <input
                placeholder="Title"
                style={{ border: "1px solid #4bbb46" }}
                className="form-control"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </div>

            <div className="mt-3">
              <p className="m-des-hd">Description</p>
              <textarea
                style={{ border: "1px solid rgb(75, 187, 70)" }}
                placeholder="Description"
                rows={5}
                className="form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </div>
            <div id="date-popup" />

            <div className="mt-3" id="date-popup">
              <p className="m-des-hd">Description</p>
              <DatePicker
                popupStyle={{
                  position: "absolute",
                  zIndex: "5000",
                }}
                value={endDate}
                defaultValue={moment()}
                onChange={(d) => {
                  if (d) {
                    setEndDate(d);
                  }
                }}
                disabledDate={(current) => current.isBefore(moment())}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <AppButton
            label={"Save"}
            backgroundColor="#4bbb46"
            primary={true}
            size={"large"}
            onClick={() => {
              handleSubmit();
            }}
          />
        </Modal.Footer>
        <div id="date-popup" />
      </Modal>

      <AppHeader />

      <div className="body__wrapper container">
        <div className="add__wrapper">
          <AddButton
            onAddButtonClick={() => {
              setIsShowAddModal(!isShowAddModal);
            }}
          />
        </div>

        <div className="table__wrapper">
          <DataTable isRefreshTable={isRefreshTable} />
        </div>
      </div>
    </div>
  );
}

export default App;
