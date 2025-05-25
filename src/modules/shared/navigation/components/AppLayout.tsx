import React from 'react';

import { Outlet } from 'react-router-dom';

import { Box, useTheme } from '@mui/material';

import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AppLayout = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <TopBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
