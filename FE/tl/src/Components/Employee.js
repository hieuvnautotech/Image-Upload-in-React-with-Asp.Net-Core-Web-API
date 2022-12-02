import React from "react";
import { useState, useEffect } from "react";

const defaultImageSrc = "img/sample.png";

const initialFieldValues = {
  employeeId: 0,
  employeeName: "",
  Occupation: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function Employee() {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(initialFieldValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
    let temp = {}
    temp.employeeName = values.employeeName==""?false:true
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true
    setErrors(temp)
    return Object.values(temp).every(x => x==true)
  }

  const handleFormSubmit = e => { 
    e.preventDefault();
    if (ValidityState()) {
      
    }
  }

  return (
    <>
      <div className="container" text-center>
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
                className="form-control-file"
                onChange={showPreview}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Employee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Occupation"
                name="occupation"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center">
              <button type='submit' className="btn btn-light">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
