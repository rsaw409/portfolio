import { useDispatch, useSelector } from "react-redux";
import CircularProgressWithLabel from "../../../component/circularprogessbarwithlabel/index";
import FullFeaturedCrudGrid from "../../../component/datatable.jsx";
import { randomId } from "@mui/x-data-grid-generator";
import dayjs from "dayjs";
import {
  addDummyEducation,
  addEducation,
  deleteEducation,
  removeDummyEducation,
} from "../../../redux/action.js";

import EditDetailsPage from "../index.jsx";

const EditEducations = ({ styles }) => {
  const dispatch = useDispatch();
  const { educations, user_id } = useSelector((state) => ({
    educations: state.educations,
    user_id: state.user.id,
  }));

  const setRow = (new_row, original_row) => {
    dispatch(addEducation(new_row, user_id));
  };

  const setDummyRow = (id) => {
    dispatch(addDummyEducation(id));
  };

  const removeDummyRow = (id) => {
    dispatch(removeDummyEducation(id));
  };

  const deleteRow = (row) => {
    dispatch(deleteEducation(row, user_id));
  };

  const handleError = (error) => {
    console.log("error", error);
  };

  const education_columns = [
    { field: "mui_id", headerName: "ID", flex: 1, align: "left" },
    {
      field: "degree_name",
      headerName: "Degree",
      flex: 1,
      editable: true,
      align: "left",
    },
    {
      field: "institute_name",
      headerName: "Institute",
      flex: 1,
      editable: true,
      align: "left",
    },
    {
      field: "start_date",
      headerName: "Start",
      flex: 1,
      editable: true,
      align: "left",
      type: "date",
      valueFormatter: (params) => dayjs(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "end_date",
      headerName: "End",
      flex: 1,
      editable: true,
      align: "left",
      type: "date",
      valueFormatter: (params) => dayjs(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "score",
      headerName: "Score",
      flex: 1,
      editable: true,
      align: "left",
      type: "number",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <CircularProgressWithLabel
            value={params.value <= 10 ? params.value * 10 : params.value}
          />
        );
      },
    },
  ];

  return (
    <div className={styles.editEducationContainer}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Manage Education</h2>
        <p className={styles.pageSubtitle}>
          Add, edit, or remove your education entries
        </p>
      </div>
      <FullFeaturedCrudGrid
        ButtonName={"Education"}
        rows={educations?.map((each) => {
          if (each.hasOwnProperty("mui_id")) return each;
          else return { ...each, mui_id: randomId() };
        })}
        setDummyRow={setDummyRow}
        removeDummyRow={removeDummyRow}
        columns={education_columns}
        saveRowInServer={setRow}
        onProcessRowUpdateError={handleError}
        deleteRowFromServer={deleteRow}
      />
    </div>
  );
};

export default EditDetailsPage(EditEducations);
