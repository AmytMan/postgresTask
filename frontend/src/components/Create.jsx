import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";
const Create = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success == true) {
        toast.success(result.msg);
        navigate("/");
      } else {
        toast.error("validation error, please enter correct data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" container px-5  ">
      <h2 className="  text-center">Add notes</h2>
      <FormContainer onSubmit={onSubmit} />
    </div>
  );
};

export default Create;
