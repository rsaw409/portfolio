import { useDispatch, useSelector } from "react-redux";
import FullFeaturedCrudGrid from "../../../component/datatable.jsx";
import { randomId } from "@mui/x-data-grid-generator";
import { Chip, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import EditDetailsPage from "../index.jsx";

import {
  addDummyCertificate,
  addCertificate,
  deleteCertificate,
  removeDummyCertificate,
} from "../../../redux/action.js";

const EditCertificates = ({ styles }) => {
  const dispatch = useDispatch();
  const { certificates, user_id } = useSelector((state) => ({
    certificates: state.certificates,
    user_id: state.user.id,
  }));

  const setRow = (new_row, original_row) => {
    dispatch(addCertificate(new_row, user_id));
  };

  const setDummyRow = (id) => {
    dispatch(addDummyCertificate(id));
  };

  const removeDummyRow = (id) => {
    dispatch(removeDummyCertificate(id));
  };

  const deleteRow = (row) => {
    dispatch(deleteCertificate(row, user_id));
  };

  const handleError = (error) => {
    console.log("error", error);
  };

  const certificate_columns = [
    { field: "mui_id", headerName: "ID", width: 70, align: "left" },
    {
      field: "certificate_name",
      editable: true,
      headerName: "Name",
      align: "left",
      flex: 1,
    },
    {
      field: "certification_authority",
      headerName: "Certified By",
      editable: true,
      align: "left",
      flex: 1,
    },
    {
      field: "certification_date",
      headerName: "Certified On",
      editable: true,
      align: "left",
      flex: 1,
      type: "date",
      valueFormatter: (params) => dayjs(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "verification_url",
      headerName: "Verification Link",
      editable: true,
      align: "left",
      flex: 1,
      renderCell: (params) => (
        <Link href={params.value} target="_blank">
          <ArrowOutwardIcon
            style={{
              color: `var(--primary-color)`,
            }}
          />
        </Link>
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
    <div className={styles.editCertificateContainer}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Manage Certificates</h2>
        <p className={styles.pageSubtitle}>
          Add, edit, or remove the certificates listed on your portfolio
        </p>
      </div>
      <FullFeaturedCrudGrid
        ButtonName={"Certificate"}
        rows={certificates?.map((each) => {
          if (each.hasOwnProperty("mui_id")) return each;
          else return { ...each, mui_id: randomId() };
        })}
        setDummyRow={setDummyRow}
        removeDummyRow={removeDummyRow}
        columns={certificate_columns}
        saveRowInServer={setRow}
        onProcessRowUpdateError={handleError}
        deleteRowFromServer={deleteRow}
      />
    </div>
  );
};

export default EditDetailsPage(EditCertificates);
