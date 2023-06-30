import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
const FormContainer = ({ onSubmit, result }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (result) {
      const mergevalue = { ...result.msg, ...result.msg.Note };
      reset(mergevalue);
    }
  }, [result, reset]);

  return (
    <div className=" card p-5  box-shadow ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                {...register("patientName", {
                  required: "please enter patientName",
                })}
                type="text"
                placeholder="PatientName"
              />
              {errors.patientName && <span>{errors.patientName.message}</span>}

              <input
                {...register("visitDate", {
                  required: "visitDate is required",
                })}
                type="date"
                placeholder="visited date"
              />
              {errors.visitDate && <span>{errors.visitDate.message}</span>}
            </div>
            <div className="col">
              <input
                {...register("doctorName", {
                  required: "please enter valid doctor name",
                })}
                type="text"
                name="doctorName"
                placeholder="doctorName"
              />
              {errors.doctorName && <span>{errors.doctorName.message}</span>}
              <input
                {...register("doctorSpeciality", {
                  required: "doctor Speciality is required",
                })}
                type="text"
                placeholder="doctorSpeciality"
              />
              {errors.doctorSpeciality && (
                <span>{errors.doctorSpeciality.message}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <textarea
                rows="5"
                cols="30"
                {...register("noteDescription", {
                  required: "noteDescription is required",
                })}
                type="text"
                placeholder="description"
              />
              {errors.noteDescription && (
                <span>{errors.noteDescription.message}</span>
              )}
            </div>
            <div className="row">
              <div className="col">
                <input type="submit" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default FormContainer;
