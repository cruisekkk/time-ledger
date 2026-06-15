import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

const BG = '#FAF9F5';
const TERM = '#1C1C19';
const TERMBORDER = 'rgba(255,255,255,0.08)';
const OFFWHITE = '#EDEAE2';
const DIM = '#8A887F';
const GREEN = '#5DCAA5';
const TEAL = '#2BB98C';
const AMBER = '#EFA13A';
const COMMENT = '#6E6C64';
const MONO = '"SF Mono", "JetBrains Mono", Menlo, Monaco, "Courier New", monospace';

const CMD = 'claude -p "log it: read ML system design 2h, gym 1h, a leetcode"';

const Dot: React.FC<{c: string}> = ({c}) => (
  <div style={{width: 13, height: 13, borderRadius: 7, background: c}} />
);

const Row: React.FC<{o: number; act: string; det: string; min: string; tag: string; tagc: string}> = ({o, act, det, min, tag, tagc}) => (
  <div style={{display: 'flex', opacity: o, whiteSpace: 'pre'}}>
    <span style={{color: '#CFCCC3', width: 150, display: 'inline-block'}}>{'  ' + act}</span>
    <span style={{color: DIM, width: 280, display: 'inline-block'}}>{det}</span>
    <span style={{color: OFFWHITE, width: 110, display: 'inline-block'}}>{min}</span>
    {tag ? <span style={{color: tagc}}>{tag}</span> : null}
  </div>
);

export const TimeLedgerTerminal: React.FC = () => {
  const frame = useCurrentFrame();
  const win = interpolate(frame, [0, 14], [0, 1], {extrapolateRight: 'clamp'});

  const tStart = 18;
  const perChar = 1.25;
  const nChars = Math.max(0, Math.min(CMD.length, Math.floor((frame - tStart) / perChar)));
  const cmd = CMD.slice(0, nChars);
  const typing = frame > tStart && nChars < CMD.length;
  const caretCmd = typing && Math.floor(frame / 8) % 2 === 0;

  const enterFrame = tStart + CMD.length * perChar + 8;
  const running = frame > enterFrame && frame < enterFrame + 30;
  const out = (delay: number) =>
    interpolate(frame, [enterFrame + delay, enterFrame + delay + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const promptFrame = enterFrame + 150;
  const promptShow = frame > promptFrame;
  const caretPrompt = promptShow && Math.floor(frame / 14) % 2 === 0;

  return (
    <AbsoluteFill style={{backgroundColor: BG, justifyContent: 'center', alignItems: 'center', fontFamily: MONO}}>
      <div
        style={{
          width: 1040,
          background: TERM,
          border: `1px solid ${TERMBORDER}`,
          borderRadius: 14,
          opacity: win,
          transform: `translateY(${interpolate(win, [0, 1], [12, 0])}px)`,
          overflow: 'hidden',
          boxShadow: '0 24px 70px rgba(0,0,0,0.20)',
        }}
      >
        <div style={{height: 42, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 9, borderBottom: `1px solid ${TERMBORDER}`}}>
          <Dot c="#FF5F57" />
          <Dot c="#FEBC2E" />
          <Dot c="#28C840" />
          <div style={{flex: 1, textAlign: 'center', color: DIM, fontSize: 15}}>time-ledger — zsh</div>
        </div>

        <div style={{padding: '24px 28px', fontSize: 21, lineHeight: 1.72, minHeight: 392}}>
          <div>
            <span style={{color: GREEN}}>~/notes</span> <span style={{color: DIM}}>$</span>{' '}
            <span style={{color: OFFWHITE}}>{cmd}</span>
            {caretCmd ? <span style={{color: OFFWHITE}}>▋</span> : null}
          </div>

          {running ? (
            <div style={{color: DIM, marginTop: 8}}>
              ● running <span style={{color: TEAL}}>time-ledger</span> skill…
            </div>
          ) : null}

          {frame > enterFrame + 28 ? (
            <div style={{marginTop: 8}}>
              <div style={{color: TEAL, opacity: out(30)}}>✓ Logged 3 entries → Notion</div>
              <Row o={out(48)} act="Reading" det="ML system design" min="120min" tag="compounding" tagc={TEAL} />
              <Row o={out(66)} act="Fitness" det="gym" min="60min" tag="" tagc="" />
              <Row o={out(84)} act="Practice" det="LeetCode" min="~20min" tag="to-confirm" tagc={AMBER} />
              <div style={{color: AMBER, opacity: out(110), marginTop: 10}}>
                ⚠ to-confirm: LeetCode time unstated — logged ~20min, rerun to correct
              </div>
              <div style={{color: COMMENT, opacity: out(132), marginTop: 8}}>
                # no id to paste — found your ledger by title
              </div>
            </div>
          ) : null}

          {promptShow ? (
            <div style={{marginTop: 12}}>
              <span style={{color: GREEN}}>~/notes</span> <span style={{color: DIM}}>$</span>{' '}
              {caretPrompt ? <span style={{color: OFFWHITE}}>▋</span> : null}
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};
