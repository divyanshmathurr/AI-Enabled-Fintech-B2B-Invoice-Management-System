import React from "react";
import "./Grid.css";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Grid({ setSelectedRows, details }) {
  const [pageSize, setPageSize] = React.useState(5);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  const columns = [
    {
      field: "id",
      headerName: "sl no",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "business_code",
      headerName: "Business Code",
      headerAlign: "left",
      align: "center",
    },
    {
      field: "cust_number",
      headerName: "Customer Number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "clear_date",
      headerName: "Clear Date",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "buisness_year",
      headerName: "Buisness Year",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "doc_id",
      headerName: "Document Id",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "posting_date",
      headerName: "Posting Date",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "document_create_date",
      headerName: "Document Create Date",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "due_in_date",
      headerName: "Due In Date",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "invoice_currency",
      headerName: "Invoice Currency",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "document_type",
      headerName: "Document Type",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "posting_id",
      headerName: "Posting Id",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total_open_amount",
      headerName: "Total Open Amount",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "baseline_create_date",
      headerName: "Baseline Create Date",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cust_payment_terms",
      headerName: "Customer Payment Terms",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "invoice_id",
      headerName: "Invoice Id",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "aging_bucket",
      headerName: "Aging Bucket",
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "60vh",
          width: "100%",
          marginTop: "1rem",
          textAlign: "center",
        }}
        id="table"
      >
        <DataGrid
          rows={details}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 15]}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          pagination
          getRowId={details.id}
          checkboxSelection={true}
          color="primary"
          headerHeight={80}
          align="center"
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              textOverflow: "clip",
              whiteSpace: "break-spaces",
              lineHeight: 2,
            },
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = details.filter((row) =>
              selectedIDs.has(row.id)
            );

            setSelectedRows(selectedRows);
          }}
          disableColumnSelector
          disableColumnFilter
        />
      </div>
    </ThemeProvider>
  );
}
