import { useDispatch, useSelector } from "react-redux";

import EditDetailsPage from "../index.jsx";
import FullFeaturedCrudGrid from "../../../component/datatable.jsx";
import { randomId } from "@mui/x-data-grid-generator";
import { Chip, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import {
  addProject,
  addDummyProject,
  deleteProject,
  removeDummyProject,
} from "../../../redux/action.js";

const EditProject = ({ styles }) => {
  const dispatch = useDispatch();
  const { projects, user_id } = useSelector((state) => ({
    projects: state.projects,
    user_id: state.user.id,
  }));

  const setRow = (new_row, original_row) => {
    dispatch(addProject(new_row, user_id));
  };

  const setDummyRow = (id) => {
    dispatch(addDummyProject(id));
  };

  const removeDummyRow = (id) => {
    dispatch(removeDummyProject(id));
  };

  const deleteRow = (row) => {
    dispatch(deleteProject(row, user_id));
  };

  const handleError = (error) => {
    console.log("error", error);
  };

  const project_columns = [
    { field: "mui_id", headerName: "ID", width: 70, align: "left" },
    {
      field: "project_name",
      editable: true,
      headerName: "Name",
      align: "left",
      flex: 1,
    },
    {
      field: "project_description",
      headerName: "Description",
      editable: true,
      align: "left",
      flex: 1,
    },
    {
      field: "github_url",
      headerName: "Github Link",
      editable: true,
      align: "left",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Link href={params.value} target="_blank">
            <ArrowOutwardIcon
              style={{
                color: `var(--primary-color)`,
              }}
            />
          </Link>
        ) : (
          "Not Available"
        ),
    },
    {
      field: "web_url",
      headerName: "Live Link",
      editable: true,
      align: "left",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Link href={params.value} target="_blank">
            <ArrowOutwardIcon
              style={{
                color: `var(--primary-color)`,
              }}
            />
          </Link>
        ) : (
          "Not Available"
        ),
    },
    {
      field: "play_store_url",
      headerName: "Play Store Link",
      editable: true,
      align: "left",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Link href={params.value} target="_blank">
            <ArrowOutwardIcon
              style={{
                color: `var(--primary-color)`,
              }}
            />
          </Link>
        ) : (
          "Not Available"
        ),
    },
    {
      field: "technology_tags",
      headerName: "Technologies",
      editable: true,
      align: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0.25}>
            {params.row.technology_tags?.map((tag) => (
              <Chip label={tag} />
            ))}
          </Stack>
        );
      },
      renderEditCell: (params) => {
        return (
          <TextField
            variant="outlined"
            size="large"
            value={params.value}
            fullWidth
            onChange={(e) => {
              // Update the value in the cell
              const updatedValue = e.target.value;
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: updatedValue,
              });
            }}
          />
        );
      },
    },
  ];

  return (
    <div className={styles.editProjectContainer}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Manage Projects</h2>
        <p className={styles.pageSubtitle}>
          Add, edit, or remove the projects showcased on your portfolio
        </p>
      </div>
      <FullFeaturedCrudGrid
        ButtonName={"Projects"}
        rows={projects?.map((each) => {
          if (each.hasOwnProperty("mui_id")) return each;
          else return { ...each, mui_id: randomId() };
        })}
        setDummyRow={setDummyRow}
        removeDummyRow={removeDummyRow}
        columns={project_columns}
        saveRowInServer={setRow}
        onProcessRowUpdateError={handleError}
        deleteRowFromServer={deleteRow}
      />
    </div>
  );
};

export default EditDetailsPage(EditProject);
