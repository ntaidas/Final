import styled from "styled-components";

const Error = styled.p`
  color: red;
`;

const InputHandler = ({ type, name, formik, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}:
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder ? placeholder : ""}
      />
      {formik.touched[name] && formik.errors[name] && 
        <Error>{formik.errors[name]}</Error>
      }
    </div>
  );
};

export default InputHandler;
