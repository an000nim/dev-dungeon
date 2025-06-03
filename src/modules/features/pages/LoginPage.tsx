import { useLoginMutation } from '@shared/auth/authApi';

import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import {
  Button,
  Container as MuiContainer,
  Paper as MuiPaper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const LoginPage = () => {
  const { t } = useTranslation();
  const [login] = useLoginMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
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
    },
    [login]
  );

  return (
    <StyledContainer>
      <StyledPaper
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
        <Typography component="h1" variant="h5" align="center">
          {t('auth.login.title')}
        </Typography>
        <MuiContainer component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
        </MuiContainer>
      </StyledPaper>
    </StyledContainer>
  );
};

const StyledContainer = styled(MuiContainer)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledPaper = styled(MuiPaper)({});

export default LoginPage;
