import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

export default function FullFeaturedCrudGrid({
  ButtonName,
  rows,
  setDummyRow,
  removeDummyRow,
  columns,
  saveRowInServer,
  deleteRowFromServer,
  onProcessRowUpdateError,
}) {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [deleteTarget, setDeleteTarget] = React.useState(null);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setDeleteTarget(id); // open confirmation dialog
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deleteRowFromServer(
        rows.find((row) => row.mui_id === deleteTarget)
      );
      setDeleteTarget(null);
    }
  };

  //   // If user cancels edit on a new row → remove it
  // if (params.reason === GridRowEditStopReasons.cancel) {
  //   const row = rows.find((r) => r.id === params.id);
  //   if (row?.isNew) {
  //     setRows((prev) => prev.filter((r) => r.id !== params.id));
  //     setRowModesModel((prev) => {
  //       const { [params.id]: removed, ...rest } = prev;
  //       return rest;
  //     });
  //   }
  // }

  const handleCancelClick = (id) => () => {

    console.log("cancelling", id);
    const isNew = id.toString().startsWith("new_"); // or however you mark temp rows

    console.log("isNew", isNew);

    if (isNew) {
      removeDummyRow(id);
    } else {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    }
  };

  const processRowUpdate = async (newRow, oldRow) => {
    try {
      const updatedRow = await saveRowInServer(newRow, oldRow);
      return { ...updatedRow, isNew: false };
    } catch (error) {
      return oldRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const new_columns = [
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      width: 120,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<SaveIcon fontSize="small" />}
              label="Save"
              sx={{ color: "var(--primary-color, #14b8a6)" }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<CancelIcon fontSize="small" />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              sx={{ color: "text.secondary" }}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon fontSize="small" />}
            label="Edit"
            onClick={handleEditClick(id)}
            sx={{ color: "var(--primary-color, #14b8a6)" }}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon fontSize="small" />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            sx={{ color: "error.main" }}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 3,
        border: "1px solid rgba(20, 184, 166, 0.15)",
        boxShadow: "0 4px 14px rgba(20, 184, 166, 0.08)",
        overflow: "hidden",
        "& .MuiDataGrid-root": {
          border: "none",
          backgroundColor: "transparent",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "rgba(20, 184, 166, 0.06)",
          borderBottom: "1px solid rgba(20, 184, 166, 0.18)",
        },
        "& .MuiDataGrid-columnHeader": {
          fontWeight: 600,
          color: "#0f766e",
          fontSize: "0.85rem",
          letterSpacing: "0.02em",
        },
        "& .MuiDataGrid-cell": {
          fontSize: "0.9rem",
          color: "#333",
          borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
        },
        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
          outline: "none",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "rgba(20, 184, 166, 0.04)",
        },
        "& .MuiDataGrid-row.Mui-editing": {
          backgroundColor: "rgba(20, 184, 166, 0.06)",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "1px solid rgba(20, 184, 166, 0.12)",
          backgroundColor: "rgba(20, 184, 166, 0.03)",
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.mui_id}
        rows={rows}
        columns={new_columns}
        disableColumnMenu
        autoHeight
        density="comfortable"
        initialState={{
          columns: {
            columnVisibilityModel: { mui_id: false },
          },
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { ButtonName, setDummyRow, setRowModesModel } }}
      />

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function EditToolbar({ ButtonName, setDummyRow, setRowModesModel }) {
  const handleClick = () => {
    const id = "new_"+ randomId();
    setDummyRow(id);
    setRowModesModel((oldModel) => ({
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "skill_name" },
      ...oldModel,
    }));
  };

  return (
    <GridToolbarContainer
      sx={{
        p: 1.5,
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
        Tip: click the pencil to edit, trash to delete
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          fontWeight: 500,
          backgroundColor: "var(--primary-color)",
          boxShadow: "none",
          "&:hover": { backgroundColor: "var(--primary-color-dark, #0f766e)" },
        }}
      >
        Add {ButtonName}
      </Button>
    </GridToolbarContainer>
  );
}
