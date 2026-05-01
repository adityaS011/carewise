'use client';

import { Bell, BellOff } from 'lucide-react';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { usePatientStore } from '@/store/patientStore';
import { Button } from '@/components/ui/Button';

function getAlertPayload() {
  const { patients } = usePatientStore.getState();
  const top = [...patients].sort((a, b) => b.risk - a.risk)[0];
  if (!top) return { title: 'CareWise Clinical Alert', body: 'Review your patient worklist.' };
  return { title: `High-risk alert: ${top.name}`, body: `Risk score ${top.risk}% — ${top.notes}`, patientId: top.id };
}

export function NotificationButton() {
  const { enabled, notify } = useServiceWorker();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => notify(getAlertPayload())}
      sx={{ color: '#f59e0b', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', gap: '6px', '&:hover': { background: 'rgba(245,158,11,0.15)' } }}
      startIcon={enabled ? <Bell size={14} /> : <BellOff size={14} />}
    >
      {enabled ? 'Send care alert' : 'Enable alerts'}
    </Button>
  );
}
