import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";
function NotesTable() {
  const [result, setData] = useState();

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`http://localhost:3000/api/users?id=${id}`, {
        method: "DELETE",
      });
      const data = await resp.json();
      toast.success(data.msg);
      setData((prevData) => prevData.filter((item) => item.noteId !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-light" box-shadow>
      <Link to="/addnotes" className="btn btn-success m-3">
        add note
      </Link>
      </div>
      
      <table className="table table-bordered  ">
        <thead  >
          <tr >
            <th className="bg-dark text-white">NoteID</th>
            <th className="bg-dark text-white">PatientName</th>
            <th className="bg-dark text-white">DoctorName</th>
            <th className="bg-dark text-white">DoctorSpeciality</th>
            <th className="bg-dark text-white">Description</th>
            <th className="bg-dark text-white">visited on</th>
            <th className="bg-dark text-white">Action's</th>
          </tr>
        </thead>
        {result ? (
          <tbody>
            {result.map((item, index) => (
              <tr key={item.Note.noteId}>
                <th>{index + 1}</th>
                <th>{item.patientName}</th>
                <th>{item.Note.doctorName}</th>
                <th>{item.Note.doctorSpeciality}</th>
                <th>{item.Note.noteDescription}</th>
                <th>{item.visitDate}</th>
                <th className="d-flex">
                  <div
                    onClick={() => handleDelete(item.Note.noteId)}
                    className="mx-2"
                    style={{ cursor: "pointer" }}
                  >
                    <AiFillDelete color="red" size='25px'/>
                  </div>
                  <Link
                    to={`/updates/${item.noteId}`}
                    className="mx-2"
                    style={{ cursor: "pointer" }}
                  >
                    <MdUpdate color="orange" size='25px'/>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default NotesTable;
