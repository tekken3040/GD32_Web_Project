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
import ApiService from 'src/ApiService';

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

  const userInfoUpdate = (event) => {
    event.preventDefault();
    const user = {
      id: values.id,
      name: values.name,
      zipcode: values.zipcode,
      address: values.address,
      address_detail: values.addressDetail,
      phone: values.phone,
      email: values.emailAddress,
      birthday: values.birthDay
    }
    console.log(user)
    ApiService.UpdateUser(user)
      .then(res => {
        console.log("update 전송")
        console.log(res.data)
        cookies.set("memberIndex", encodeURIComponent(res.data.memberIndex));
        cookies.set("id", encodeURIComponent(res.data.id));
        cookies.set("name", encodeURIComponent(res.data.name));
        cookies.set("phone", encodeURIComponent(res.data.phone));
        cookies.set("zipcode", encodeURIComponent(res.data.zipcode));
        cookies.set("address", encodeURIComponent(res.data.address));
        cookies.set("addressDetail", encodeURIComponent(res.data.address_detail));
        cookies.set("birthday", encodeURIComponent(res.data.birthday));
        cookies.set("email", (res.data.email), "UTF-8");

        alert("회원정보 수정을 성공했습니다.")
        window.location.replace("/app/mypage")
      })
      .catch(err => {
        console.log("update 전송실패")
        console.log(err)
      })
  }

  return (
    <form
      autoComplete="off"
      validationschema={
        Yup.object().shape({
          id: Yup.string().max(255).required('ID is required'),
          name: Yup.string().max(255).required('Name is required'),
          zipcode: Yup.string().max(255).required('Zipode is required'),
          address: Yup.string().max(255).required('Address is required'),
          addressDetail: Yup.string().max(255).required('Address detail is required'),
          phone: Yup.string().max(255).required('Phone is required'),
          emailAddress: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
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
                name="address"
                onChange={handleChange}
                required
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
            onClick={userInfoUpdate}
          >
            저장하기
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default MypageProfileDetails;
