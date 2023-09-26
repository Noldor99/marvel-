import * as yup from "yup"

const validationSchema = yup.object().shape({
  nickname: yup
    .string()
    .required('Name is required')
    .max(60, "the max is 60")
    .min(2, "the min is 2"),
  real_name: yup
    .string()
    .required('Name is required')
    .max(60, "the max is 60")
    .min(2, "the min is 2"),
  origin_description: yup
    .string()
    .required('Name is required')
    .min(2, "the min is 2"),
  catch_phrase: yup
    .string()
    .required('Name is required')
    .min(2, "the min is 2"),
  price: yup
    .number()
    .required('Price is required'),
});

export default validationSchema;

