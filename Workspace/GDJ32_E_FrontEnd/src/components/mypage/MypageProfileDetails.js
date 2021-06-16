import { useState } from 'react';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama'
//   },
//   {
//     value: 'new-york',
//     label: 'New York'
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco'
//   }
// ];

const MypageProfileDetails = (props) => {
  const [values, setValues] = useState({
    id: decodeURI(cookies.get("id")),
    name: decodeURI(cookies.get("name")),
    zipcode: (cookies.get("zipcode")),
    address: decodeURI(cookies.get("address")),
    addressDetail: decodeURI(cookies.get("addressDetail")),
    phone: cookies.get("phone"),
    emailAddress: (cookies.get("email")),
    birthDay: cookies.get("birthday")
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      validationschema={
        Yup.object().shape({
          id: Yup.string().max(255).required('ID is required'),
          password: Yup.string().max(255).required('password is required'),
          name: Yup.string().max(255).required('Name is required'),
          zipcode: Yup.string().max(255).required('Zipode is required'),
          address: Yup.string().max(255).required('Address is required'),
          address_detail: Yup.string().max(255).required('Address detail is required'),
          phone: Yup.string().max(255).required('Phone is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          birthDay: Yup.date().default(() => new Date())
        })
      }
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="아이디"
                name="id"
                onChange={handleChange}
                required
                value={values.id}
                variant="outlined"
                inputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="이름"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="우편 번호"
                name="zipcode"
                onChange={handleChange}
                required
                value={values.zipcode}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="기본 주소"
                name="adress"
                onChange={handleChange}
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="상세 주소"
                name="addressDetail"
                onChange={handleChange}
                required
                value={values.addressDetail}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="전화 번호"
                name="phone"
                onChange={handleChange}
                required
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="이메일 주소"
                name="emailAddress"
                onChange={handleChange}
                required
                value={values.emailAddress}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                fullWidth
                label="생일"
                name="birthDay"
                onChange={handleChange}
                required
                type="date"
                value={values.birthDay}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            저장하기
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default MypageProfileDetails;
