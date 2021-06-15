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
// import { BiClipboard, BiChalkboard, BiCalendar, BiBriefcaseAlt } from 'react-icons/bi';
import { BiChalkboard, BiCalendar, BiBriefcaseAlt } from 'react-icons/bi';
import InputIcon from '@material-ui/icons/Input';
import Cookies from 'universal-cookie';
import NavItem from './NavItem';


const cookies = new Cookies();

const islogin = {
  href: '',
  title: ''
}

if (cookies.get("accessToken") == null) {
  islogin.href = '/login';
  islogin.title = '로그인';
} else {
  islogin.href = '/logout';
  islogin.title = '로그아웃';
}


const user = {
  href: '/app/mypage',
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: "aaa"

};

const items = [
  {
    href: '/app/home',
    icon: BarChartIcon,
    title: '홈'
  },
  {
    // href: '/app/mypage',
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
    href: '/app/board/1',
    icon: BiChalkboard,
    title: '게시판'
  },
  {
    href: '/app/calendar',
    icon: BiCalendar,
    title: '캘린더'
  },
  // {
  //   href: '/app/products',
  //   icon: BiClipboard,
  //   title: '전자결재'
  // },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  {
    href: islogin.href,
    icon: LockIcon,
    title: islogin.title
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
          cursor: 'pointer',
          p: 2,
          pt: 20,
        }}
      >
        <IconButton >
          <InputIcon />
        </IconButton>
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
