import React from 'react';
import {AbsoluteFill} from 'remotion';

const BG = '#F5F4EE';
const INK = '#2A2A27';
const MUTED = '#76746C';
const CORAL = '#D97757';
const RED = '#E5484D';
const CARD = '#FFFFFF';
const BORDER = 'rgba(0,0,0,0.10)';
const HI = '#F7E9E2';
const HI_INK = '#9B4A2E';
const MONO = '"SF Mono", Menlo, monospace';
const FONT = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif';

const Spark: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{display: 'block'}}>
    {Array.from({length: 12}).map((_, i) => {
      const a = (i * 30 * Math.PI) / 180;
      return <line key={i} x1={50 + Math.cos(a) * 15} y1={50 + Math.sin(a) * 15} x2={50 + Math.cos(a) * 47} y2={50 + Math.sin(a) * 47} stroke={CORAL} strokeWidth={7} strokeLinecap="round" />;
    })}
  </svg>
);

const RedBox: React.FC<{style: React.CSSProperties}> = ({style}) => (
  <div style={{position: 'absolute', border: `3px solid ${RED}`, borderRadius: 9, boxShadow: `0 0 0 3px rgba(229,72,77,0.22)`, ...style}} />
);

const StepNum: React.FC<{n: number}> = ({n}) => (
  <div style={{flex: 'none', width: 38, height: 38, borderRadius: 999, background: HI, color: HI_INK, fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
);

export const SkillGuide: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: BG, fontFamily: FONT, padding: '40px 48px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 11, marginBottom: 30}}>
        <Spark size={26} />
        <div style={{fontSize: 27, fontWeight: 600, color: INK}}>Load the skill on Claude.ai</div>
      </div>

      {/* Step 1 */}
      <div style={{display: 'flex', gap: 18, marginBottom: 26, alignItems: 'flex-start'}}>
        <StepNum n={1} />
        <div style={{flex: 1}}>
          <div style={{fontSize: 21, color: INK, marginBottom: 12}}>Open <b style={{fontWeight: 600}}>Customize → Skills</b>, click the <b style={{fontWeight: 600}}>+</b>.</div>
          <div style={{position: 'relative', background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontSize: 21, fontWeight: 600, color: INK}}>Skills</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 18, color: MUTED, fontSize: 22}}>
              <span>⌕</span>
              <span style={{position: 'relative', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, lineHeight: 1}}>+</span>
            </div>
            <RedBox style={{right: 16, top: 11, width: 36, height: 36}} />
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{display: 'flex', gap: 18, marginBottom: 26, alignItems: 'flex-start'}}>
        <StepNum n={2} />
        <div style={{flex: 1}}>
          <div style={{fontSize: 21, color: INK, marginBottom: 12}}><b style={{fontWeight: 600}}>Create skill</b> → <b style={{fontWeight: 600}}>Write skill instructions</b>.</div>
          <div style={{position: 'relative', background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '8px', width: 360, boxShadow: '0 6px 24px rgba(0,0,0,0.08)'}}>
            {['Create with Claude', 'Write skill instructions', 'Upload a skill'].map((t, i) => (
              <div key={i} style={{fontSize: 19, color: i === 1 ? HI_INK : INK, padding: '11px 14px', borderRadius: 8, background: i === 1 ? HI : 'transparent'}}>{t}</div>
            ))}
            <RedBox style={{left: 6, top: 50, width: 348, height: 42}} />
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div style={{display: 'flex', gap: 18, alignItems: 'flex-start'}}>
        <StepNum n={3} />
        <div style={{flex: 1}}>
          <div style={{fontSize: 21, color: INK, marginBottom: 12}}>Paste from <span style={{fontFamily: MONO, fontSize: 18, background: '#ECEAE0', padding: '2px 7px', borderRadius: 5}}>SKILL.md</span> — and click Create.</div>
          <div style={{position: 'relative', background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '18px 20px'}}>
            <Field label="Skill name" value="time-ledger" mono />
            <Field label="Description" value="the description: line" />
            <Field label="Instructions" value="everything below the ---" tall />
            <RedBox style={{left: 12, top: 12, right: 12, bottom: 12, borderRadius: 10}} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Field: React.FC<{label: string; value: string; mono?: boolean; tall?: boolean}> = ({label, value, mono, tall}) => (
  <div style={{marginBottom: 12}}>
    <div style={{fontSize: 15, color: MUTED, marginBottom: 5}}>{label}</div>
    <div style={{border: `1px solid ${BORDER}`, borderRadius: 8, padding: tall ? '12px 14px 34px' : '12px 14px', fontSize: 18, color: mono ? INK : MUTED, fontFamily: mono ? MONO : FONT, background: '#FCFBF8'}}>{value}</div>
  </div>
);
