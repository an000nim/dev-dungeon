import React from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Button, Paper, TextField, Typography, useTheme } from '@mui/material';

import { useLoginMutation } from '../../../../app/api/authApi';

export const LoginPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [login] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await login({
        email: data.get('email') as string,
        password: data.get('password') as string,
      }).unwrap();
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('auth.login.title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('auth.login.email')}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('auth.login.password')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('auth.login.submit')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
