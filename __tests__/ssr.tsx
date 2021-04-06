/**
 * @jest-environment node
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { EmojiPicker } from '../src/index';

test('should render on the server', () => {
    ReactDOMServer.renderToString(<EmojiPicker show onHide={() => {}} />);
});
