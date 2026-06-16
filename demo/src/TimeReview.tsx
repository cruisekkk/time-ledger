import React from 'react';
import {AbsoluteFill} from 'remotion';

const BG = '#F5F4EE';
const INK = '#2A2A27';
const MUTED = '#76746C';
const CORAL = '#D97757';
const TEAL = '#1D9E75';
const TEAL_BG = '#E1F5EE';
const TEAL_INK = '#0F6E56';
const GRAY = '#A6A49B';
const AMBER_BG = '#FAEEDA';
const AMBER_INK = '#854F0B';
const USERBUBBLE = '#ECEAE0';
const CARD = '#FFFFFF';
const BORDER = 'rgba(0,0,0,0.10)';
const FONT = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif';

const Spark: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{display: 'block'}}>
    {Array.from({length: 12}).map((_, i) => {
      const a = (i * 30 * Math.PI) / 180;
      return <line key={i} x1={50 + Math.cos(a) * 15} y1={50 + Math.sin(a) * 15} x2={50 + Math.cos(a) * 47} y2={50 + Math.sin(a) * 47} stroke={CORAL} strokeWidth={7} strokeLinecap="round" />;
    })}
  </svg>
);

const WEEK = [
  {label: 'Life', h: 6.5, color: GRAY},
  {label: 'Reading', h: 5.0, color: TEAL},
  {label: 'Fitness', h: 2.7, color: TEAL},
  {label: 'Coding', h: 1.8, color: TEAL},
];

const Donut: React.FC = () => {
  const r = 56;
  const c = 2 * Math.PI * r;
  const pct = 0.62;
  return (
    <svg width="150" height="150" viewBox="0 0 150 150">
      <circle cx="75" cy="75" r={r} fill="none" stroke="#D8D5CB" strokeWidth="19" />
      <circle cx="75" cy="75" r={r} fill="none" stroke={TEAL} strokeWidth="19" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 75 75)" />
      <text x="75" y="70" textAnchor="middle" fontSize="30" fontWeight="600" fill={INK} fontFamily={FONT}>62%</text>
      <text x="75" y="92" textAnchor="middle" fontSize="14" fill={MUTED} fontFamily={FONT}>compounding</text>
    </svg>
  );
};

export const TimeReview: React.FC = () => {
  const maxH = 6.5;
  return (
    <AbsoluteFill style={{backgroundColor: BG, fontFamily: FONT, padding: '38px 46px'}}>
      {/* the ask */}
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 18}}>
        <div style={{background: USERBUBBLE, color: INK, fontSize: 21, padding: '12px 20px', borderRadius: 18}}>review my week — am I compounding?</div>
      </div>

      {/* AI-generated dashboard */}
      <div style={{display: 'flex', gap: 14}}>
        <div style={{marginTop: 4}}><Spark size={24} /></div>
        <div style={{flex: 1, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '22px 26px', boxShadow: '0 6px 26px rgba(0,0,0,0.05)'}}>
          <div style={{fontSize: 16, color: MUTED, marginBottom: 18}}>Your week · Jun 11–14 · <b style={{color: INK, fontWeight: 600}}>17.25h logged</b></div>

          <div style={{display: 'flex', gap: 40}}>
            {/* bars */}
            <div style={{flex: 1}}>
              {WEEK.map((b, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14}}>
                  <div style={{width: 78, fontSize: 18, color: INK, fontWeight: 500}}>{b.label}</div>
                  <div style={{flex: 1, height: 22, position: 'relative'}}>
                    <div style={{position: 'absolute', height: 22, width: '100%', background: 'rgba(0,0,0,0.045)', borderRadius: 999}} />
                    <div style={{position: 'absolute', height: 22, width: `${(b.h / maxH) * 100}%`, background: b.color, borderRadius: 999}} />
                  </div>
                  <div style={{width: 44, textAlign: 'right', fontSize: 17, color: MUTED}}>{b.h}h</div>
                </div>
              ))}
            </div>
            {/* donut */}
            <div style={{flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 4}}>
              <Donut />
              <div style={{display: 'flex', gap: 14, marginTop: 10, fontSize: 13.5, color: MUTED}}>
                <span><span style={{display: 'inline-block', width: 9, height: 9, borderRadius: 3, background: TEAL, marginRight: 5}} />compounding</span>
                <span><span style={{display: 'inline-block', width: 9, height: 9, borderRadius: 3, background: GRAY, marginRight: 5}} />neutral</span>
              </div>
            </div>
          </div>

          {/* insight callout */}
          <div style={{marginTop: 18, background: TEAL_BG, borderRadius: 12, padding: '13px 18px', fontSize: 18, color: TEAL_INK, lineHeight: 1.45}}>
            <b style={{fontWeight: 600}}>Reading : building ≈ 3 : 1</b> this week — way more balanced than the 30 : 1 week.
          </div>
        </div>
      </div>

      {/* generative framing */}
      <div style={{marginTop: 26, marginLeft: 38}}>
        <div style={{fontSize: 18, color: INK, marginBottom: 12}}>No fixed dashboard — your AI <b style={{fontWeight: 600}}>draws it on the spot.</b> Ask for anything:</div>
        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          {['a compounding donut', 'a streak heatmap', 'reading vs building over time', 'where did Tuesday go?', 'my deep-work hours'].map((t, i) => (
            <span key={i} style={{fontSize: 15.5, color: AMBER_INK, background: AMBER_BG, padding: '7px 14px', borderRadius: 999}}>{t}</span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
