import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Typography } from "@material-ui/core";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const [placed, setPlaced] = useState([]);
  const [companyplaced, setCompanyPlaced] = useState([]);
  const [branchSpecific, setBranchSpecific] = useState([]);
  var brancharray = [];
  var countarray = [];

  const columns1 = [
    {
      field: "username",
      headerName: "Name",
      width: 250,
    },
    {
      field: "branch",
      headerName: "Branch Name",
      width: 300,
    },
    {
      field: "company",
      headerName: "Company Placed",
      width: 500,
    },
    {
      field: "package",
      headerName: "Package (lpa)",
      width: 300,
    },
  ];

  const columns2 = [
    {
      field: "_id",
      headerName: "Company Name",
      width: 600,
      // renderCell: (params) => <b>{params.row._id}</b>,
    },
    {
      field: "count",
      headerName: "No of Students Placed",
      width: 600,
      // renderCell: (params) => <b>{params.row.count}</b>,
    },
  ];

  const getArr = async () => {
    let i = 0;
    for (i; i < branchSpecific.length; i++) {
      brancharray.push(branchSpecific[i]._id);
      countarray.push(branchSpecific[i].count);
    }

    console.log(brancharray, countarray);
  };
  useEffect(() => {
    const getAllPlacedStudent = async () => {
      await axios.get("/api/v1/admin/get-all-placed").then((res) => {
        console.log(res.data);
        setPlaced(res.data.allplaced);
        setCompanyPlaced(res.data.aggrcount);
        setBranchSpecific(res.data.branchCount);
      });
    };
    getAllPlacedStudent();
  }, []);

  const state = {
    series: countarray,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: brancharray,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <>
      <main>
        <Card className="col-11 mx-auto my-5">
          <Typography variant="h5" className="text-center my-2" color="primary">
            All Placed Students
          </Typography>
          <DataGrid
            style={{ height: 400, width: "100%" }}
            rows={placed}
            columns={columns1}
            pageSize={5}
            getRowId={(row) => row._id}
          />
        </Card>

        <Card className="col-11 mx-auto mt-4">
          <Typography variant="h5" className="text-center my-2" color="#351f6e">
            Company Specific Placed Students
          </Typography>
          <DataGrid
            style={{ height: 400, width: "100%" }}
            rows={companyplaced}
            columns={columns2}
            pageSize={5}
            getRowId={(row) => row._id}
          />
        </Card>

        <section className="d-flex col-12 my-5 justify-content-around align-items-center">
          {getArr() && (
            <Card className="col-5">
              <Chart
                // width={600}
                options={state.options}
                series={state.series}
                type="pie"
              />
            </Card>
          )}

          {
            <Card className="col-5">
              <Chart
                type="bar"
                // width={500}
                height={400}
                series={[
                  {
                    name: "No of Student Placed ",
                    data: countarray,
                  },
                ]}
                options={{
                  labels: brancharray,
                  colors: ["#35346b"],
                  chart: {
                    animations: {
                      enabled: true,
                      easing: "easeinout",
                      speed: 800,
                      animateGradually: {
                        enabled: true,
                        delay: 150,
                      },
                      dynamicAnimation: {
                        enabled: true,
                        speed: 350,
                      },
                    },
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 200,
                        },
                        legend: {
                          position: "bottom",
                        },
                      },
                    },
                  ],
                }}
              />
            </Card>
          }
        </section>

        {/* {getArr() && (
          <div id="chart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width={500}
            />
          </div>
        )} */}

        {/* <section className="mt-4">
          <div className="col-lg-4 col-md-8 col-10 d-flex justify-content-between mx-auto">
            <p>Computer Engineering</p>
            <p>{cmpn}</p>
          </div>
          <div className="col-lg-4 col-md-8 col-10 d-flex justify-content-between mx-auto">
            <p>IT Engineering</p>
            <p>{it}</p>
          </div>
          <div className="col-lg-4 col-md-8 col-10 d-flex justify-content-between mx-auto">
            <p>Electronics & Telecommunication Engineering</p>
            <p>{extc}</p>
          </div>
          <div className="col-lg-4 col-md-8 col-10 d-flex justify-content-between mx-auto">
            <p>Electronics Engineering</p>
            <p>{etrx && etrx}</p>
          </div>
        </section> */}
      </main>
    </>
  );
};

export default Dashboard;
