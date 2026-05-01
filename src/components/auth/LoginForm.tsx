'use client';

/**
 * LoginForm — Authentication Entry Point
 *
 * Modular component: reads from useAuthStore.
 * Self-contained login card — delegates auth to the store.
 * All styling comes from the design system primitives (Card, Input, Button, Alert).
 *
 * Note: useAuthStore is a mock. Replace login() with a real API call in production.
 * Used in: app/login/page.tsx
 */
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { FormEvent, useState } from 'react';
import { Activity, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Card, Input, Button } from '@/components/ui';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

function LoginBrand() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '14px', mb: 0.5 }}>
      <Activity size={30} color={t.brand} style={{ flexShrink: 0, marginTop: 2 }} />
      <Box>
        <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          CareWise Cloud
        </Box>
        <Box sx={{ color: t.text.primary, fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', mt: '2px' }}>
          Clinical operations login
        </Box>
      </Box>
    </Box>
  );
}

export function LoginForm() {
  const { error, loading, login } = useAuthStore();
  const [email,      setEmail]      = useState('clinician@carewise.test');
  const [password,   setPassword]   = useState('carewise123');
  const [localError, setLocalError] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (!/^\S+@\S+\.\S+$/.test(email)) { setLocalError('Enter a valid work email.'); return; }
    await login(email, password);
  };

  const displayError = localError || error;

  return (
    <Card>
      <Stack component="form" spacing={2.5} onSubmit={onSubmit}>
        <LoginBrand />

        <Input
          fullWidth
          type="email"
          autoComplete="email"
          placeholder="Email"
          startIcon={<Mail size={16} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{ 'aria-label': 'Email' }}
        />

        <Input
          fullWidth
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          startIcon={<Lock size={16} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{ 'aria-label': 'Password' }}
          sx={{ height: 42 }}
        />

        {displayError && (
          <Alert severity="error" icon={false}>{displayError}</Alert>
        )}

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </Stack>
    </Card>
  );
}
