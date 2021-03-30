import React, { HTMLProps, ReactElement } from 'react';

interface GeneralProps extends HTMLProps<HTMLSpanElement> {
    icon: string;
}

type Props = GeneralProps &
    ({ solid: true; regular?: false } | { solid?: false; regular: true });

export default function Icon({
    icon,
    regular,
    solid,
    className,
    // @ts-expect-error: Active is not an HTML prop, but gets passed in by emotion.
    active: _,
    ...rest
}: Props): ReactElement {
    const classes = ['react-chayns-icon', icon, className];

    if (solid) {
        classes.push('fas');
    }
    if (regular) {
        classes.push('far');
    }

    return <i className={classes.filter(Boolean).join(' ')} {...rest} />;
}
