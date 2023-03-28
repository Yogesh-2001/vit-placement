import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { message } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ allColumns: true }} />
    </GridToolbarContainer>
  );
}

const AllDrivesTable = () => {
  const [rows, setRows] = useState([]);
  const [profile, setProfile] = useState();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const alldrives = async () => {
      await axios.get("/api/v1/user/get-all-drives").then((res) => {
        setRows(res.data);
      });

      await axios
        .get(`/api/v1/user/get-profile-details/${user?._id}`)
        .then((res) => {
          setProfile(res.data[0]);
        });
    };
    alldrives();
  }, []);

  const columns = [
    {
      field: "companyName",
      headerName: "Company Name",
      width: 400,
    },
    {
      field: "Date",
      headerName: "Drive Date",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {new Date(params.row?.driveDate).toDateString()}
        </p>
      ),
    },
    {
      field: "engAggrrpercentCriteria",
      headerName: "Engineering Aggregate",
      width: 180,
      renderCell: (params) => (
        <p className="my-auto">
          {params.row?.engAggrrpercentCriteria > 0
            ? params.row.engAggrrpercentCriteria + " % & Above"
            : "-"}
        </p>
      ),
    },
    {
      field: "branchcriteria",
      headerName: "Branch Criteria",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {params.row?.branchcriteria != [] ? (
            <FormControl style={{ width: "150px" }}>
              <Select labelId="demo-simple-select-helper-label">
                {params.row?.branchcriteria.map((branch) => (
                  <MenuItem>{branch}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            "-"
          )}
        </p>
      ),
    },
    {
      field: "postedBy",
      headerName: "Posted By",
      width: 200,
    },
    {
      field: "postedAt",
      headerName: "Posted on",
      width: 200,
      renderCell: (params) => (
        <p className="my-auto">
          {new Date(params.row?.postedAt).toDateString()}
        </p>
      ),
    },
    {
      field: "Eligible",
      headerName: "Eligble/Not-Eligible",
      width: 200,
      renderCell: (params) => (
        <p>
          {profile?.engineeringpercent > params.row?.engAggrrpercentCriteria &&
          params.row?.branchcriteria.includes(profile?.branch)
            ? "Eligible"
            : "Not Eligible"}
        </p>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          component={Link}
          to={`/view-drive/${params.row._id}`}
          // onClick={() => <Navigate to={`/view-drive/${params.row._id}`} />}
        >
          view drive
        </Button>
      ),
    },
  ];
  return (
    <>
      <DataGrid
        style={{ height: 400, width: "100%" }}
        rows={rows}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row._id}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </>
  );
};

export default AllDrivesTable;
