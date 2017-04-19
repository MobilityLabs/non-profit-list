// Start Hack
// Don't know the right way to include browser only code here so doing this
let ReactGA = {
  initialize: function(){},
  set: function(){},
  pageview: function(){}
};
if (typeof document !== 'undefined') {
  ReactGA = require('react-ga');
}
// End hack

// Initialize GA
ReactGA.initialize('UA-00000000-1');

export default function logPageView() {
  //Adding hash so we can track additional actions
  ReactGA.set({ page: window.location.pathname + this.state.location.hash });
  ReactGA.pageview(window.location.pathname + this.state.location.hash);
}

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
}