'use client';

/**
 * LoginForm — Firebase login/signup entry point.
 */
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { FormEvent, useState } from 'react';
import { Activity, Lock, Mail, UserRound } from 'lucide-react';
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
  const { error, loading, login, signup } = useAuthStore();
  const [mode,       setMode]       = useState<'login' | 'signup'>('login');
  const [name,       setName]       = useState('Care Coordinator');
  const [email,      setEmail]      = useState('clinician@carewise.test');
  const [password,   setPassword]   = useState('carewise123');
  const [localError, setLocalError] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (!/^\S+@\S+\.\S+$/.test(email)) { setLocalError('Enter a valid work email.'); return; }
    if (password.length < 6) { setLocalError('Password must be at least 6 characters.'); return; }
    if (mode === 'signup' && !name.trim()) { setLocalError('Enter your name.'); return; }
    if (mode === 'signup') await signup(name.trim(), email, password);
    else await login(email, password);
  };

  const displayError = localError || error;

  return (
    <Card>
      <Stack component="form" spacing={2.5} onSubmit={onSubmit}>
        <LoginBrand />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {(['login', 'signup'] as const).map((item) => (
            <Button
              key={item}
              type="button"
              variant={mode === item ? 'primary' : 'outline'}
              onClick={() => setMode(item)}
            >
              {item === 'login' ? 'Login' : 'Sign up'}
            </Button>
          ))}
        </Box>

        {mode === 'signup' && (
          <Input
            fullWidth
            autoComplete="name"
            placeholder="Full name"
            startIcon={<UserRound size={16} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ 'aria-label': 'Full name' }}
          />
        )}

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
          {loading ? 'Working…' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </Button>
      </Stack>
    </Card>
  );
}
