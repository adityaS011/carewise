import { ProgressBar } from '@/components/ui/ProgressBar';

export function RiskBar({ value }: { value: number }) {
  return <ProgressBar value={value} height={4} aria-label={`Risk ${value}%`} />;
}
