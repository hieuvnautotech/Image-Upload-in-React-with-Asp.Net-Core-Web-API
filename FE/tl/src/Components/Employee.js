import React from "react";
import { useState, useEffect } from "react";
import "../index";
import TextField from "@mui/material/TextField";
const defaultImageSrc = "img/sample.png";

const initialFieldValues = {
  employeeID: 0,
  employeeName: "",
  Occupation: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function Employee(props) {
  const { addOrEdit, recordForEdit } = props;
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialFieldValues);

useEffect(() => {
  if (recordForEdit != null) setValues(recordForEdit);
}, [recordForEdit]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    // temp.employeeName = values.employeeName === "" ? "employNameNull" : false;
    // temp.Occupation = values.Occupation === "" ? true : false;
    // temp.imageSrc = values.imageSrc === defaultImageSrc ? true : false;
    temp.employeeName = values.employeeName === "" ? false : true
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    console.log("reset");
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log("NhanRoisubmit");
    if (validate()) {
      const formData = new FormData();
      formData.append("employeeID", values.employeeID);
      formData.append("employeeName", values.employeeName);
      formData.append("occupation", values.occupation);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);
      console.log("ValidateSubmit");
      addOrEdit(formData, resetForm);
    }
  };

  useEffect(() => {
    console.log(errors, "okoko");
  }, [errors]);
  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? "invalid-field" : "";

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" />
          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass("employeeName")}
                placeholder="Employee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
              {/* <TextField
                error={errors.employeeName ? true : false}
                label="Employee Name"
                onChange={(e) => {
                  setValues({ ...values, employeeName: e.target.value });
                }}
                helperText={errors.employeeName}
              /> */}
            </div>

            <div className="form-group">
              <input className="form-control" placeholder="Occupation" name="occupation" value={values.occupation} onChange={ handleInputChange}>
              
              </input>
              {/* <TextField
                error={errors.Occupation ? true : false}
                label="Occupation"
                onChange={(e) => {
                  setValues({ ...values, Occupation: e.target.value });
                }}
              /> */}
            </div>
            <div className="form-group text-center">
              <button
                type="submit"
                className="btn btn-light"
                
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
