import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Mypage from 'src/pages/Mypage';
import Board from 'src/pages/Board';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Logout from 'src/pages/logout';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import TimeManagement from 'src/pages/TimeManagement';
import Calendar from 'src/pages/Calendar';
import ReadBoardComponent from './components/board/ReadBoardComponent';
import CreateBoardComponent from './components/board/CreateBoardComponent';
// import ListBoardComponent from './components/board/ListBoardComponent';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'mypage', element: <Mypage /> },
      {
        path: 'board/:idx',
        element: <Board />
        // element: <ListBoardComponent/>,
      },
      { path: 'home', element: <Home /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'timemanagement', element: <TimeManagement /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/read-board/:idx', element: <ReadBoardComponent /> },
      { path: '/create-board/:idx', element: <CreateBoardComponent /> },
      { path: 'calendar', element: <Calendar /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'logout', element: <Logout /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
