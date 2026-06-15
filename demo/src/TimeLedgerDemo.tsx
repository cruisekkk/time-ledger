import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

const BG = '#FAF9F5';
const INK = '#23221E';
const MUTED = '#76746C';
const TEAL = '#1D9E75';
const TEAL_BG = '#E1F5EE';
const TEAL_INK = '#0F6E56';
const GRAY = '#9A988F';
const AMBER = '#BA7517';
const AMBER_BG = '#FAEEDA';
const AMBER_INK = '#854F0B';
const CARD = '#FFFFFF';
const BORDER = 'rgba(0,0,0,0.09)';
const FONT =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", sans-serif';

const SENTENCE = 'read ML system design for two hours, gym for one, did a leetcode';

const ROWS = [
  {act: 'Reading', detail: 'ML system design', min: '120min', tag: 'compounding', tagBg: TEAL_BG, tagInk: TEAL_INK, dot: TEAL},
  {act: 'Fitness', detail: 'gym', min: '60min', tag: null as string | null, tagBg: '', tagInk: '', dot: TEAL},
  {act: 'Practice', detail: 'LeetCode', min: '~20min', tag: 'to-confirm', tagBg: AMBER_BG, tagInk: AMBER_INK, dot: AMBER},
];

const WEEK = [
  {label: 'Life', h: 6.5, color: GRAY},
  {label: 'Reading', h: 5.0, color: TEAL},
  {label: 'Fitness', h: 2.7, color: TEAL},
  {label: 'Coding', h: 1.8, color: TEAL},
];

const easeIn = (frame: number, fps: number, delay: number) =>
  spring({frame: frame - delay, fps, config: {damping: 200}});

export const TimeLedgerDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sceneA = interpolate(frame, [410, 448], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sceneB = interpolate(frame, [420, 458], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: BG, fontFamily: FONT}}>
      {sceneA > 0.01 ? <SceneChat frame={frame} fps={fps} opacity={sceneA} /> : null}
      {sceneB > 0.01 ? <SceneWeek frame={frame} fps={fps} opacity={sceneB} /> : null}
    </AbsoluteFill>
  );
};

const Header: React.FC = () => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28}}>
    <div style={{width: 26, height: 26, borderRadius: 13, border: `3px solid ${TEAL}`, position: 'relative'}}>
      <div style={{position: 'absolute', left: 10, top: 4, width: 2.5, height: 9, background: TEAL, borderRadius: 2}} />
      <div style={{position: 'absolute', left: 11, top: 11, width: 6, height: 2.5, background: TEAL, borderRadius: 2}} />
    </div>
    <div style={{fontSize: 26, fontWeight: 600, color: INK, letterSpacing: -0.3}}>time-ledger</div>
  </div>
);

const SceneChat: React.FC<{frame: number; fps: number; opacity: number}> = ({frame, fps, opacity}) => {
  const headerIn = interpolate(frame, [0, 14], [0, 1], {extrapolateRight: 'clamp'});

  const typeStart = 20;
  const perChar = 1.4;
  const nChars = Math.max(0, Math.min(SENTENCE.length, Math.floor((frame - typeStart) / perChar)));
  const typed = SENTENCE.slice(0, nChars);
  const typing = nChars < SENTENCE.length && frame > typeStart;
  const caret = typing && Math.floor(frame / 8) % 2 === 0;
  const userBubbleIn = interpolate(frame, [typeStart - 6, typeStart + 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const replyStart = 150;
  const headerReply = easeIn(frame, fps, replyStart);
  const showDots = frame > 118 && frame < replyStart;

  return (
    <AbsoluteFill style={{opacity, padding: '64px 0', alignItems: 'center'}}>
      <div style={{width: 900, opacity: headerIn}}>
        <Header />

        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 22}}>
          <div
            style={{
              maxWidth: 640,
              background: INK,
              color: '#F5F4EF',
              fontSize: 27,
              lineHeight: 1.5,
              padding: '18px 24px',
              borderRadius: 22,
              borderBottomRightRadius: 6,
              opacity: userBubbleIn,
              transform: `translateY(${interpolate(userBubbleIn, [0, 1], [12, 0])}px)`,
            }}
          >
            {typed}
            {caret ? <span style={{opacity: 0.7}}>▋</span> : null}
          </div>
        </div>

        {showDots ? (
          <div style={{display: 'flex', alignItems: 'center', gap: 8, color: MUTED, fontSize: 22, marginBottom: 10}}>
            <span style={{color: TEAL, fontWeight: 600}}>time-ledger</span>
            <Dots frame={frame} />
          </div>
        ) : null}

        {headerReply > 0.02 ? (
          <div
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 22,
              borderBottomLeftRadius: 6,
              padding: '22px 26px',
              maxWidth: 720,
              opacity: headerReply,
              transform: `translateY(${interpolate(headerReply, [0, 1], [14, 0])}px)`,
              boxShadow: '0 1px 0 rgba(0,0,0,0.03)',
            }}
          >
            <div style={{fontSize: 25, fontWeight: 600, color: INK, marginBottom: 18}}>Logged 3 entries ✅</div>
            {ROWS.map((r, i) => (
              <Row key={i} r={r} frame={frame} fps={fps} delay={replyStart + 26 + i * 24} />
            ))}
            <Confirm frame={frame} />
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const Dots: React.FC<{frame: number}> = ({frame}) => {
  const o = (i: number) => 0.3 + 0.7 * Math.abs(Math.sin((frame - i * 4) / 6));
  return (
    <span style={{display: 'inline-flex', gap: 5}}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{width: 7, height: 7, borderRadius: 4, background: MUTED, opacity: o(i), display: 'inline-block'}} />
      ))}
    </span>
  );
};

const Row: React.FC<{r: typeof ROWS[number]; frame: number; fps: number; delay: number}> = ({r, frame, fps, delay}) => {
  const s = easeIn(frame, fps, delay);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '11px 0',
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-18, 0])}px)`,
      }}
    >
      <div style={{width: 10, height: 10, borderRadius: 5, background: r.dot, flexShrink: 0}} />
      <div style={{fontSize: 23, fontWeight: 600, color: INK, width: 130}}>{r.act}</div>
      <div style={{fontSize: 23, color: MUTED, flex: 1}}>{r.detail}</div>
      <div style={{fontSize: 22, color: INK, width: 92, textAlign: 'right'}}>{r.min}</div>
      <div style={{width: 150, textAlign: 'right'}}>
        {r.tag ? (
          <span style={{fontSize: 18, background: r.tagBg, color: r.tagInk, padding: '4px 12px', borderRadius: 999}}>{r.tag}</span>
        ) : null}
      </div>
    </div>
  );
};

const Confirm: React.FC<{frame: number}> = ({frame}) => {
  const start = 252;
  const o = interpolate(frame, [start, start + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = 1 + 0.04 * Math.max(0, Math.sin((frame - start) / 7));
  if (o < 0.02) return null;
  return (
    <div
      style={{
        marginTop: 16,
        marginLeft: 24,
        background: AMBER_BG,
        border: `1px solid rgba(186,117,23,0.35)`,
        borderRadius: 14,
        padding: '14px 18px',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        maxWidth: 600,
        opacity: o,
        transform: `scale(${interpolate(o, [0, 1], [0.96, 1]) * (frame < start + 30 ? pulse : 1)})`,
        transformOrigin: 'left center',
      }}
    >
      <div style={{fontSize: 22}}>❓</div>
      <div style={{fontSize: 21, lineHeight: 1.45, color: AMBER_INK}}>
        <span style={{fontWeight: 600}}>to-confirm:</span> you didn't say how long — I guessed 20min, right?
      </div>
    </div>
  );
};

const SceneWeek: React.FC<{frame: number; fps: number; opacity: number}> = ({frame, fps, opacity}) => {
  const maxH = 6.5;
  const titleIn = interpolate(frame, [430, 456], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const taglineIn = interpolate(frame, [500, 532], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const urlIn = interpolate(frame, [540, 566], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{opacity, alignItems: 'center', justifyContent: 'center', padding: '0 0'}}>
      <div style={{width: 820}}>
        <div style={{fontSize: 22, color: MUTED, marginBottom: 26, opacity: titleIn}}>so where did the week go?</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 44}}>
          {WEEK.map((b, i) => {
            const s = easeIn(frame, fps, 452 + i * 12);
            const w = (b.h / maxH) * 620 * s;
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <div style={{width: 110, fontSize: 24, color: INK, fontWeight: 600}}>{b.label}</div>
                <div style={{flex: 1, height: 26, position: 'relative'}}>
                  <div style={{height: 26, width: 620, background: 'rgba(0,0,0,0.05)', borderRadius: 999, position: 'absolute'}} />
                  <div style={{height: 26, width: w, background: b.color, borderRadius: 999, position: 'absolute'}} />
                </div>
                <div style={{width: 70, textAlign: 'right', fontSize: 22, color: MUTED, opacity: s}}>{b.h}h</div>
              </div>
            );
          })}
        </div>
        <div style={{fontSize: 32, fontWeight: 600, color: INK, lineHeight: 1.4, opacity: taglineIn, transform: `translateY(${interpolate(taglineIn, [0, 1], [10, 0])}px)`}}>
          Track your time in one sentence.
          <br />
          <span style={{color: TEAL}}>When it's unsure, it asks</span> — it doesn't guess.
        </div>
        <div style={{fontSize: 22, color: MUTED, marginTop: 22, opacity: urlIn}}>github.com/cruisekkk/time-ledger</div>
      </div>
    </AbsoluteFill>
  );
};
