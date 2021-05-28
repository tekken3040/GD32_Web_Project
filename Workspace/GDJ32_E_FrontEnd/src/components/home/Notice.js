import {
  // Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
// import { indigo } from '@material-ui/core/colors';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const Notice = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            공지사항
          </Typography>
          <Typography
            color="textPrimary"
            variant="p"
          >
            공지사항입니다공지사항입니다공지사항입니다
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default Notice;
