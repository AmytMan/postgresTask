import React, { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function Update() {
  const navigate = useNavigate();
  const [result, setResult] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchbyID = async () => {
      const response = await fetch(`http://localhost:3000/api/user/?id=${id}`);
      const data = await response.json();
      setResult(data);
    };
    fetchbyID();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (result.success === true) {
        toast.success(result.msg);
        navigate("/");
      } else toast.error("error updating notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" container">
      <h2 className="text-center">Update the notes</h2>
      <FormContainer onSubmit={onSubmit} result={result} />
    </div>
  );
}

export default Update;
