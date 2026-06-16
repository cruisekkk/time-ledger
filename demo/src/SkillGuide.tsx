import React from 'react';
import {AbsoluteFill} from 'remotion';

const BG = '#F5F4EE';
const INK = '#2A2A27';
const MUTED = '#76746C';
const CORAL = '#D97757';
const GPT = '#0A8A6F';
const RED = '#E5484D';
const CARD = '#FFFFFF';
const BORDER = 'rgba(0,0,0,0.10)';
const HI = '#F7E9E2';
const HI_INK = '#9B4A2E';
const MONO = '"SF Mono", Menlo, monospace';
const FONT = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif';

const Spark: React.FC<{size: number; color?: string}> = ({size, color = CORAL}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{display: 'block'}}>
    {Array.from({length: 12}).map((_, i) => {
      const a = (i * 30 * Math.PI) / 180;
      return <line key={i} x1={50 + Math.cos(a) * 15} y1={50 + Math.sin(a) * 15} x2={50 + Math.cos(a) * 47} y2={50 + Math.sin(a) * 47} stroke={color} strokeWidth={7} strokeLinecap="round" />;
    })}
  </svg>
);

const RedBox: React.FC<{style: React.CSSProperties}> = ({style}) => (
  <div style={{position: 'absolute', border: `3px solid ${RED}`, borderRadius: 8, boxShadow: `0 0 0 3px rgba(229,72,77,0.20)`, ...style}} />
);

const N: React.FC<{n: number; c?: string; bg?: string}> = ({n, c = HI_INK, bg = HI}) => (
  <div style={{flex: 'none', width: 30, height: 30, borderRadius: 999, background: bg, color: c, fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
);

const Cap: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{fontSize: 17, color: INK, lineHeight: 1.45}}>{children}</div>
);

const B: React.FC<{children: React.ReactNode}> = ({children}) => <b style={{fontWeight: 600}}>{children}</b>;
const Mono: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{fontFamily: MONO, fontSize: 14, background: '#ECEAE0', padding: '1px 6px', borderRadius: 5}}>{children}</span>;

export const SkillGuide: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: BG, fontFamily: FONT, padding: '36px 44px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26}}>
        <Spark size={24} />
        <div style={{fontSize: 25, fontWeight: 600, color: INK}}>Where to click</div>
      </div>

      <div style={{display: 'flex', gap: 44}}>
        {/* ---------- Claude.ai ---------- */}
        <div style={{flex: 1}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18}}>
            <Spark size={18} />
            <div style={{fontSize: 19, fontWeight: 600, color: INK}}>Claude.ai</div>
          </div>

          <div style={{display: 'flex', gap: 13, marginBottom: 18}}>
            <N n={1} />
            <div style={{flex: 1}}>
              <Cap><B>Skills</B> → click the <B>+</B></Cap>
              <div style={{position: 'relative', marginTop: 8, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: 17, fontWeight: 600, color: INK}}>Skills</span>
                <span style={{fontSize: 22, color: MUTED, lineHeight: 1}}>+</span>
                <RedBox style={{right: 11, top: 8, width: 30, height: 30}} />
              </div>
            </div>
          </div>

          <div style={{display: 'flex', gap: 13, marginBottom: 18}}>
            <N n={2} />
            <div style={{flex: 1}}>
              <Cap>Create skill → <B>Write skill instructions</B></Cap>
              <div style={{position: 'relative', marginTop: 8, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 6, boxShadow: '0 5px 18px rgba(0,0,0,0.07)'}}>
                {['Create with Claude', 'Write skill instructions', 'Upload a skill'].map((t, i) => (
                  <div key={i} style={{fontSize: 16, color: i === 1 ? HI_INK : INK, padding: '9px 11px', borderRadius: 7, background: i === 1 ? HI : 'transparent'}}>{t}</div>
                ))}
                <RedBox style={{left: 4, top: 40, right: 4, height: 36}} />
              </div>
            </div>
          </div>

          <div style={{display: 'flex', gap: 13}}>
            <N n={3} />
            <div style={{flex: 1}}>
              <Cap>Paste from <Mono>SKILL.md</Mono>, click Create</Cap>
              <div style={{position: 'relative', marginTop: 8, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '13px 15px'}}>
                <F label="Skill name" value="time-ledger" mono />
                <F label="Description" value="the description: line" />
                <F label="Instructions" value="everything below the ---" tall />
                <RedBox style={{left: 9, top: 9, right: 9, bottom: 9, borderRadius: 9}} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- ChatGPT ---------- */}
        <div style={{flex: 1}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18}}>
            <div style={{fontSize: 19, fontWeight: 600, color: INK}}>ChatGPT</div>
            <span style={{fontSize: 13, color: GPT, background: '#E3F2EC', padding: '2px 9px', borderRadius: 999}}>🔒 needs Plus</span>
          </div>

          <Step n={1}><B>New Project</B> — ChatGPT → Projects → New project</Step>
          <div style={{display: 'flex', gap: 13, marginBottom: 18}}>
            <N n={2} c={GPT} bg="#E3F2EC" />
            <div style={{flex: 1}}>
              <Cap>Paste <Mono>SKILL.md</Mono> into the project's <B>Instructions</B></Cap>
              <div style={{position: 'relative', marginTop: 8, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '13px 15px'}}>
                <F label="Instructions" value="paste the skill here" tall />
                <RedBox style={{left: 9, top: 9, right: 9, bottom: 9, borderRadius: 9}} />
              </div>
            </div>
          </div>
          <Step n={3}><B>Connect Notion</B> — add the Notion connector, grant your DB</Step>
          <Step n={4} last>Chat in the project: <i>“log it: read papers 2h.”</i></Step>

          <div style={{marginTop: 18, marginLeft: 43, fontSize: 13.5, color: MUTED, lineHeight: 1.5, fontStyle: 'italic'}}>
            Same idea as Claude — a connector + instructions, just inside a Project.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Step: React.FC<{n: number; children: React.ReactNode; last?: boolean}> = ({n, children, last}) => (
  <div style={{display: 'flex', gap: 13, marginBottom: last ? 0 : 18, alignItems: 'flex-start'}}>
    <N n={n} c={GPT} bg="#E3F2EC" />
    <div style={{flex: 1, paddingTop: 3}}><Cap>{children}</Cap></div>
  </div>
);

const F: React.FC<{label: string; value: string; mono?: boolean; tall?: boolean}> = ({label, value, mono, tall}) => (
  <div style={{marginBottom: 10}}>
    <div style={{fontSize: 13, color: MUTED, marginBottom: 4}}>{label}</div>
    <div style={{border: `1px solid ${BORDER}`, borderRadius: 7, padding: tall ? '10px 12px 26px' : '10px 12px', fontSize: 15, color: mono ? INK : MUTED, fontFamily: mono ? MONO : FONT, background: '#FCFBF8'}}>{value}</div>
  </div>
);
