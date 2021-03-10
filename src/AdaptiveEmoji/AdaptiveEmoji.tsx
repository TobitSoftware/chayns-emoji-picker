import React, { ReactElement } from 'react';
import { parse } from 'twemoji-parser';

interface Props {
    emoji: string;
}

export function AdaptiveEmoji({ emoji }: Props): ReactElement {
    let shouldUseTwemoji = false;

    if (typeof window !== 'undefined') {
        const isWindows = /win/i.test(navigator.platform);

        shouldUseTwemoji = isWindows;
    }

    const style = shouldUseTwemoji
        ? {
              backgroundImage: `url(${parse(emoji)[0].url})`,
              backgroundRepeat: 'no-repeat',
              backgroundFit: 'contain',
              display: 'block',
              height: '100%',
          }
        : {};

    return (
        <span className="emoji" style={style}>
            <span
                style={{
                    color: shouldUseTwemoji ? 'transparent' : 'inherit',
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                }}
            >
                {emoji}
            </span>
        </span>
    );
}
