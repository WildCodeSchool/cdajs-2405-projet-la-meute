import type { Preview, Decorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const withRouter: Decorator = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;