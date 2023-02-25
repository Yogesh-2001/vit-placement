import * as React from "react";
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
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setDrives } from "../../redux/features/driveSlice";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { Link } from "react-router-dom";
var emailarray = [];

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <Link to={`/student/view-profile/${params.row.userId}`}>
        <Avatar alt="Travis Howard" src={`${params.row.photourl}`} />
      </Link>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  { field: "branch", headerName: "Branch", width: 200 },
  { field: "engineering_division", headerName: "Division", width: 130 },
  { field: "engineeringAggrpercent", headerName: "Aggr CGPA", width: 150 },
  { field: "engineeringpercent", headerName: "Eng Aggr %", width: 170 },
  // {
  //   field: "placed",
  //   headerName: "Status",
  //   width: 130,
  //   renderCell: (params) => (
  //     <p className="my-auto">
  //       {params.value ? (
  //         <CheckCircleIcon style={{ color: "greenyellow" }} />
  //       ) : (
  //         <CancelIcon style={{ color: "red" }} />
  //       )}
  //     </p>
  //   ),
  // },
  {
    field: "action",
    headerName: "Action",
    width: "130",
    renderCell: (params) => <EditIcon />,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
// doc_id name company_name package
const AllStudentsTable = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]); //all students
  const [selectedRows, setSelectedRows] = React.useState([]); // id of selected rows
  const [companies, setCompanies] = React.useState([]);
  const [formData, setFormData] = React.useState({
    companyName: "",
    package: "",
  });

  const getAllStudents = async () => {
    await axios.get("/api/v1/admin/get-allstudents/").then((res) => {
      console.log(res.data);
      setRows(res.data.allstudents);
      dispatch(setDrives(res.data.allCompanies));
      setCompanies(res.data.allCompanies);
    });
  };

  React.useEffect(() => {
    getAllStudents();
  }, []);

  const callFunc = async () => {
    //  setData([...data, { ...formData, _id: selectedRows[i] }]);
    var i = 0;
    const arrr = [];
    for (i; i < selectedRows.length; i++) {
      arrr.push({
        company: formData.companyName,
        package: formData.package,
        username: selectedRows[i].name,
        branch: selectedRows[i].branch,
      });

      emailarray.push(selectedRows[i].email);
    }
    return arrr;
  };
  const updateStudent = async (e) => {
    e.preventDefault();
    const rrr = await callFunc();

    await axios
      .post("/api/v1/admin/add-placed-students", rrr)
      .then(async (res) => {
        // message.success(res.data.message);
        alert(res.data.message);
        await axios
          .post("/api/v1/admin/send-email-notification", {
            emailarray,
            formData,
          })
          .then((res) => {
            message.success(res.data.message);
          });
        setFormData({
          companyName: "",
          package: "",
        });
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setFormData({
          companyName: "",
          package: "",
        });
      });
  };
  return (
    <>
      <h4>All Students List</h4>
      <DataGrid
        style={{ height: 400, width: "100%" }}
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row._id.toString())
          );
          setSelectedRows(selectedRowData);
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      <section className="col-12 ">
        <form
          className="col-10 mx-auto my-3 text-center"
          onSubmit={updateStudent}
        >
          <TextField
            variant="outlined"
            name="package"
            type={"number"}
            label="Package"
            required
            value={formData.package}
            onChange={(e) =>
              setFormData({ ...formData, package: e.target.value })
            }
            className="col-md-6 col-11 my-4"
          />
          <br />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            className="col-md-6 col-11 my-4 text-left"
          >
            {companies &&
              companies.map((company) => (
                <MenuItem value={company?.companyName}>
                  {company?.companyName}
                </MenuItem>
              ))}
          </Select>
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="col-md-6 col-11 my-4"
          >
            Update Selected Rows
          </Button>
        </form>
      </section>
    </>
  );
};

export default AllStudentsTable;
