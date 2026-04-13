import { CheckoutPageView } from '@/components/checkout/checkout-page-view';

type CheckoutPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function CheckoutSessionPage({ params }: CheckoutPageProps) {
  const resolvedParams = await params;
  return <CheckoutPageView sessionId={resolvedParams.sessionId} />;
}
