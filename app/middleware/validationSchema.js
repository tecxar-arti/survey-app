import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email(),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Must Contain 6 Characters, One Alphabet, One Number and one special case Character',
    ),
});

export const surveyFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email(),
  fullName: Yup.string().required('fullName is required'),
});
