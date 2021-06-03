import { Link as RouterLink, /* useNavigate */ } from 'react-router-dom';
// import { useHistory } from "react-router";
import React from 'react';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import ApiService from '../ApiService';

// const history = useHistory();

const initialValues = {
    id: '',
    password: '',
    name: '',
    zipcode: '',
    address: '',
    address_detail: '',
    phone: '',
    email: '',
    birthday: '',
    policy: false
};
  
const Register = (history) => {

  function saveUser(user) {
    ApiService.addUser(user)
    .then(res => {
      console.log(res.statusText);
      history.push('/users');
    }) 
    .catch(err => {
      console.log("saveUser() 에러", err);
    });
  }
  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={initialValues}
            validationSchema={
              Yup.object().shape({
                id: Yup.string().max(255).required('ID is required'),
                password: Yup.string().max(255).required('password is required'),
                name: Yup.string().max(255).required('Name is required'),
                zipcode: Yup.string().max(255).required('Zipode is required'),
                address: Yup.string().max(255).required('Address is required'),
                address_detail: Yup.string().max(255).required('Address detail is required'),
                phone: Yup.string().max(255).required('Phone is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                birthday: Yup.date().default(() => new Date()),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(values) => {
              // navigate('/app/dashboard', { replace: true });
              console.log(values);
              saveUser(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 1, mt: 5 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="ID"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.zipcode && errors.zipcode)}
                  fullWidth
                  helperText={touched.zipcode && errors.zipcode}
                  label="Zipcode"
                  margin="normal"
                  name="zipcode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.zipcode}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.address && errors.address)}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Address"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.address_detail && errors.address_detail)}
                  fullWidth
                  helperText={touched.address_detail && errors.address_detail}
                  label="Address detail"
                  margin="normal"
                  name="address_detail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address_detail}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Phone"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  variant="outlined"
                />
                <TextField
                  // InputLabelProps={{shrink : true}}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  InputLabelProps={{shrink : true}}
                  error={Boolean(touched.birthday && errors.birthday)}
                  fullWidth
                  helperText={touched.birthday && errors.birthday}
                  label="Birth Day"
                  margin="normal"
                  name="birthday"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="date"
                  value={values.birthday}
                  variant="outlined"
                />
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
