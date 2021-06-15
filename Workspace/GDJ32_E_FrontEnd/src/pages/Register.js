import { Link as RouterLink,  useNavigate } from 'react-router-dom';
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
import ApiService from '../service/ApiService';

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
  
const Register = () => {

  const navigate = useNavigate();

  function saveUser(user) {
    ApiService.addUser(user)
    .then(res => {
      console.log(res.statusText);
      // history.push('/');
      navigate('/app/home', { replace: true });
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
                id: Yup.string().max(255).required('아아디를 입력해 주세요'),
                password: Yup.string().max(255).required('비밀번호를 입력해 주세요'),
                name: Yup.string().max(255).required('이름을 입력해 주세요'),
                zipcode: Yup.string().max(255).required('우편번호를 입력해 주세요'),
                address: Yup.string().max(255).required('주소를 입력해 주세요'),
                address_detail: Yup.string().max(255).required('상세 주고를 입력해 주세요'),
                phone: Yup.string().max(255).required('전화번호를 입력해 주세요'),
                email: Yup.string().email('유효한 이메일이 아닙니다').max(255).required('이메일을 입력해 주세요'),
                birthday: Yup.date().default(() => new Date()),
                policy: Yup.boolean().oneOf([true], '체크해주세요')
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
                    회원 가입
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="아이디"
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
                  label="비밀번호"
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
                  label="이름"
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
                  label="우편번호"
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
                  label="주소"
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
                  label="상세 주소"
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
                  label="전화번호"
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
                  label="이메일"
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
                  label="생년월일"
                  margin="normal"
                  name="birthday"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="date"
                  value={values.birthday}
                  variant="outlined"
                />
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
                    확인했습니다.
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      이용약관
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
                    회원가입
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  이미 계정이 있습니까?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    로그인
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
