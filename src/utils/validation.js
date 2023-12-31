import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("name is required"),

    email: Yup.string().email().required("Email is required"),
  
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
      
  });

export const loginSchema = Yup.object().shape({

  email: Yup.string().email().required("Email is required"),
  
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum")

})  