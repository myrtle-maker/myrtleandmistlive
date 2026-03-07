import type { Metadata } from 'next';
import ComingSoonPage from '../../views/ComingSoonPage';

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Page() {
  return <ComingSoonPage />;
}
