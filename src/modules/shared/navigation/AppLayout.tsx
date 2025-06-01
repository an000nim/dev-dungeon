import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

const FlexBox = styled(Box)({
  display: 'flex',
  height: '100vh',
});

const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const MainBox = styled(Box)({
  flexGrow: 1,
  padding: 24,
});

const AppLayout = () => {
  return (
    <FlexBox>
      <Sidebar />
      <ContentBox>
        <TopBar />
        <MainBox component="main">
          <Outlet />
        </MainBox>
      </ContentBox>
    </FlexBox>
  );
};

export default AppLayout;
