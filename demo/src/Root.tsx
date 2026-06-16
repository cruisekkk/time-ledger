import React from 'react';
import {Composition} from 'remotion';
import {TimeLedgerDemo} from './TimeLedgerDemo';
import {TimeLedgerTerminal} from './TimeLedgerTerminal';
import {SkillGuide} from './SkillGuide';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="SkillGuide" component={SkillGuide} durationInFrames={1} fps={30} width={1160} height={742} />
      <Composition
        id="TimeLedgerDemo"
        component={TimeLedgerDemo}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="TimeLedgerTerminal"
        component={TimeLedgerTerminal}
        durationInFrames={420}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
