'use client';
import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import './booking.css';

const CAL_NAMESPACE = 'free-ai-growth-strategy-call';
const CAL_LINK = 'buzzaphq/free-ai-growth-strategy-call';

export default function BookingPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        theme: 'dark',
        cssVarsPerTheme: { dark: { 'cal-brand': '#2563eb' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <main className="booking-viewport">
      <div className="booking-glow" />

      <div className="booking-wrapper">
        <div className="booking-header">
          <span className="booking-badge">Free Strategy Call</span>
          <h1 className="booking-title">
            Book your call with <span className="booking-title-accent">Buzzap</span>
          </h1>
          <p className="booking-subtitle">
            30 minutes. We&apos;ll audit your current systems and show you exactly where your
            growth is stalling — and how to fix it.
          </p>
        </div>

        <Cal
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINK}
          className="booking-cal-embed"
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
        />

        <p className="booking-trust">
          Your information is kept private. No spam, no pressure.
        </p>
      </div>
    </main>
  );
}
