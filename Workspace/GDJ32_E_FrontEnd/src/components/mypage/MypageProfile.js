import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const userid = cookies.get("id");

const userImage = {
  image: '/static/images/avatars/nouser.png'
}

if (userid === null) {
  userImage.image = '/static/images/avatars/nouser.png'
} else {
  userImage.image = `/static/images/avatars/${cookies.get("id")}.png`
}

const user = {
  avatar: userImage.image,
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: decodeURI(cookies.get("name")),
  timezone: 'GTM-7'
};

const MypageProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 150,
            width: 150
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')} ${user.timezone}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        사진 변경하기
      </Button>
    </CardActions>
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        비밀번호 변경하기
      </Button>
    </CardActions>
  </Card>
);

export default MypageProfile;
