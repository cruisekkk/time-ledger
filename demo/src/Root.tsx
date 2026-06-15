import React from 'react';
import {Composition} from 'remotion';
import {TimeLedgerDemo} from './TimeLedgerDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TimeLedgerDemo"
      component={TimeLedgerDemo}
      durationInFrames={600}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
