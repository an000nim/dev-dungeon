import React from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Container, Paper, Typography } from '@mui/material';

export const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('home.title')}
          </Typography>
          <Typography variant="body1">{t('home.welcome')}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};
