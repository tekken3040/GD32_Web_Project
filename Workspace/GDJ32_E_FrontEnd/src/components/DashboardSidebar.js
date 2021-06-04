import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  IconButton
} from '@material-ui/core';
import {
  // AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  // Settings as SettingsIcon,
  // ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  // Users as UsersIcon
} from 'react-feather';
import { BiClipboard, BiBriefcaseAlt, BiChalkboard } from 'react-icons/bi';
import InputIcon from '@material-ui/icons/Input';
import NavItem from './NavItem';

const user = {
  href: '/app/mypage',
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'

};

const items = [
  {
    href: '/app/home',
    icon: BarChartIcon,
    title: '홈'
  },
  {
    href: '/app/mypage',
    icon: UserIcon,
    title: '마이페이지'
  },
  {
    href: '/app/timemanagement',
    icon: BiBriefcaseAlt,
    title: '근태관리'
  },
  {
    href: '/app/board',
    icon: BiChalkboard,
    title: '게시판'
  },
  {
    href: '/app/products',
    icon: BiClipboard,
    title: '전자결재'
  },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  {
    href: '/login',
    icon: LockIcon,
    title: '로그인'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: '회원가입'
  },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        m: 1
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          m: 1
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/mypage"
        />
        <Typography
          color="textPrimary"
          variant="h5"
          sx={{
            cursor: 'pointer',
            p: 1
          }}
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
        <Button
          sx={{
            cursor: 'pointer',
            width: 150,
            height: 40,
            m: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            출근
        </Button>
        <Button
          sx={{
            cursor: 'pointer',
            width: 150,
            height: 40
          }}
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            퇴근
        </Button>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      {/* <Box sx={{ flexGrow: 1 }} />  */}
      <Box
         sx={{
          backgroundColor: '#fff',
          cursor : 'pointer',
          p: 2,
          pt : 40,
         }}
      >
        <IconButton >
            <InputIcon />
        </IconButton>
        {/* <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography> */}
        {/* <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography> */}
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box> */}
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
       <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
