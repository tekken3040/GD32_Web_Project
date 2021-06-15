import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import ApiService from 'src/ApiService';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialValues = {
  id: '',
  password: ''
}

const errMassage = {
  hidden: false,
  Massage: '회원 정보가 잘못 입력되었습니다. 다시 입력해 주세요'
}

const Login = () => {
  // const navigate = useNavigate();

  function loginUser(user) {
    ApiService.loginUser(user)
      .then(res => {
        console.log("res");
        console.log(res.statusText);
        console.log(res.data.accessToken);
        cookies.set("accessToken", res.data.accessToken);
        cookies.set("tokenType", res.data.tokenType)
        console.log(res.data)
        console.log(cookies.get("accessToken"));
        // window.location.replace("/")
        // navigate('/', { replace: true });
      })
      .catch(err => {
        console.log("login err : ", err);
        alert("회원정보가 잘못되었습니다.");
        errMassage.hidden = false;
        cookies.remove("userId");
        window.location.assign("/login")
        // navigate('/', { replace: true });
      });
  }

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
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
            initialValues={{ initialValues }}
            validationSchema={Yup.object().shape({
              id: Yup.string().max(255).required('아이디를 입력해 주세요'),
              password: Yup.string().max(255).required('비밀번호를 입력해 주세요')
            })}
            onSubmit={(values) => {
              // navigate('/app/dashboard', { replace: true });
              console.log(values);
              loginUser(values);
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
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    로그인
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      페이스북 계정으로 로그인
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      구글 계정으로 로그인
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    혹은 일반 아이디로 로그인
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
                  type="text"
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
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    로그인
                  </Button>
                </Box>
                <Typography
                  hidden={errMassage.hidden}
                  color="red"
                  value={errMassage.Massage} />
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  아직 계정이 없습니까?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    회원 가입
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

export default Login;
