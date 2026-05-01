import styled from 'styled-components';
import { LoginForm } from '@/components/auth/LoginForm';
import { tokens } from '@/theme/tokens';

const Page = styled.main`
  align-items: stretch;
  background: ${tokens.colors.bg.page};
  display: grid;
  gap: 24px;
  grid-template-columns: 1.1fr minmax(360px, 460px);
  min-height: 100vh;
  padding: 24px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;

const Visual = styled.section`
  background:
    linear-gradient(160deg, rgba(6,9,20,0.75) 0%, rgba(6,9,20,0.4) 100%),
    url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80')
    center / cover no-repeat;
  border: 1px solid ${tokens.colors.border};
  border-radius: ${tokens.radius.xl};
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px;

  @media (max-width: 860px) {
    min-height: 38vh;
    padding: 28px;
  }
`;

const VisualEyebrow = styled.span`
  color: ${tokens.colors.brand};
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

const VisualHeadline = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.06;
  margin: 0;
  max-width: 600px;
`;

const FormWrap = styled.div`
  align-self: center;
`;

export default function LoginPage() {
  return (
    <Page>
      <Visual>
        <VisualEyebrow>Hospital network command center</VisualEyebrow>
        <VisualHeadline>
          Monitor patient risk, team load, and care continuity in one place.
        </VisualHeadline>
      </Visual>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Page>
  );
}
