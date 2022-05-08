import React, { useEffect, useState } from "react";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import { useDispatch } from "react-redux";
import {
  getTodos,
  changeStatus,
  deleteTodo,
} from "../../store/actions/todo_actions";
import { isLoading } from "../../store/actions/loading_actions";
import { handleErrors } from "../../services/HelperMethods";
import moment from "moment";

function DataTable(props: { isRefreshTable?: boolean }) {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([] as any);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (props.isRefreshTable) {
      getData();
    }
  }, [props.isRefreshTable]);

  async function getData() {
    dispatch(isLoading(true));
    dispatch(getTodos())
      .then((res: any) => {
        if (res.payload.data.todos.length) {
          setTodos(res.payload.data.todos);
          
        }
        dispatch(isLoading(false));
      })
      .catch((err) => {
        handleErrors(err);
        dispatch(isLoading(false));
      });
  }

  async function handleEdit(rowData: any) {
    dispatch(isLoading(true));
    dispatch(changeStatus(rowData))
      .then((res: any) => {
        dispatch(isLoading(false));
        getData();
      })
      .catch((err) => {
        handleErrors(err);
        dispatch(isLoading(false));
        getData();
      });
  }

  async function handleDelete(rowData: any) {
    dispatch(isLoading(true));
    dispatch(deleteTodo(rowData))
      .then((res: any) => {
        dispatch(isLoading(false));
        getData();
      })
      .catch((err) => {
        handleErrors(err);
        dispatch(isLoading(false));
        getData();
      });
  }

  const tableIcons = {
    Add: forwardRef<SVGSVGElement>((props, ref) => (
      <AddBox {...props} ref={ref} />
    )),
    Check: forwardRef<SVGSVGElement>((props, ref) => (
      <Check {...props} ref={ref} />
    )),
    Clear: forwardRef<SVGSVGElement>((props, ref) => (
      <Clear {...props} ref={ref} />
    )),
    Delete: forwardRef<SVGSVGElement>((props, ref) => (
      <DeleteOutline {...props} ref={ref} />
    )),
    DetailPanel: forwardRef<SVGSVGElement>((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef<SVGSVGElement>((props, ref) => (
      <Edit {...props} ref={ref} />
    )),
    Export: forwardRef<SVGSVGElement>((props, ref) => (
      <SaveAlt {...props} ref={ref} />
    )),
    Filter: forwardRef<SVGSVGElement>((props, ref) => (
      <FilterList {...props} ref={ref} />
    )),
    FirstPage: forwardRef<SVGSVGElement>((props, ref) => (
      <FirstPage {...props} ref={ref} />
    )),
    LastPage: forwardRef<SVGSVGElement>((props, ref) => (
      <LastPage {...props} ref={ref} />
    )),
    NextPage: forwardRef<SVGSVGElement>((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    PreviousPage: forwardRef<SVGSVGElement>((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef<SVGSVGElement>((props, ref) => (
      <Clear {...props} ref={ref} />
    )),
    Search: forwardRef<SVGSVGElement>((props, ref) => (
      <Search {...props} ref={ref} />
    )),
    SortArrow: forwardRef<SVGSVGElement>((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef<SVGSVGElement>((props, ref) => (
      <ViewColumn {...props} ref={ref} />
    )),
  };

  return (
    <div>
      <MaterialTable
        title={" "}
        icons={tableIcons}
        columns={[
          { title: "", field: "_id", hidden: true },
          { title: "Title", field: "title" },
          { title: "Description", field: "description" },
          {
            title: "Status",
            field: "status",
            render: (rowData) => {
              if (rowData.status == 1) {
                return "Done";
              }
              return "Pending";
            },
          },

          {
            title: "Cretaed Date",
            field: "createdAt",
            render: (rowData) => {
              return moment
                .utc(rowData?.createdAt)
                .local()
                .format("MMMM DD, YYYY");
            },
          },
          

          {
            title: "End Date",
            field: "endDate",
            render: (rowData) => {
              return moment
                .utc(rowData?.endDate)
                .local()
                .format("MMMM DD, YYYY");
            },
          },
        ]}
        data={todos}
        options={{
          actionsColumnIndex: -1,
          pageSize: 4,
          pageSizeOptions: [4, 8],
          filtering: false,
          exportButton: {
            csv: true,
            pdf: true,
          },

          searchFieldStyle: {
            font: "1rem Inter",
            fontSize: "1rem",
            color: "black",
          },
        }}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: "Change Status",
            onClick: (event, rowData) => {
              handleEdit(rowData);
            },
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: "Delete ",
            onClick: (event, rowData) => {
              handleDelete(rowData);
            },
          },
        ]}
      />
    </div>
  );
}

export default DataTable;
