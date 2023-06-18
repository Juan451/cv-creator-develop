import { html } from 'lit';
import '../src/cv-creator.js';

export default {
  title: 'CvCreator',
  component: 'cv-creator',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <cv-creator
      style="--cv-creator-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </cv-creator>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
