import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { Button, Tooltip } from "@material-ui/core";
import Modal from "../../components/Modal";
import axios from "axios";

const ViewDrive = () => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [resume, setResume] = useState();
  const [company, setCompany] = useState({});
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/api/v1/user/get-drive/${id}`)
        .then((res) => {
          setCompany(res.data);
          setResume(res.data.jdfile);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, [id]);

  return (
    <>
      <section className="company-details col-lg-10 mx-auto py-5 col-11">
        <h4>{company.companyName}</h4>
        <h6 className="mb-4">
          By- {company?.postedBy} -{new Date(company?.postedAt).toDateString()}
        </h6>
        <p dangerouslySetInnerHTML={{ __html: company.editorData }} />
        <p>
          <Tooltip title="View Job Description">
            <Button
              onClick={() => setModal(true)}
              style={{ backgroundColor: "brown" }}
            >
              <PictureAsPdfIcon
                htmlColor="red"
                aria-label="Download JD"
                style={{ cursor: "pointer", width: "30px" }}
              />
            </Button>
          </Tooltip>
        </p>

        {modal === true && <Modal setModal={setModal} resume={resume} />}
      </section>
    </>
  );
};

export default ViewDrive;
