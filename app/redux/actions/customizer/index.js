export const changeMode = mode => dispatch =>
  dispatch({ type: 'CHANGE_MODE', mode });

export const collapseSidebar = value => dispatch =>
  dispatch({ type: 'COLLAPSE_SIDEBAR', value });

export const changeNavbarColor = color => dispatch =>
  dispatch({ type: 'CHANGE_NAVBAR_COLOR', color });

export const changeNavbarType = style => dispatch =>
  dispatch({ type: 'CHANGE_NAVBAR_TYPE', style });

export const changeFooterType = style => dispatch =>
  dispatch({ type: 'CHANGE_FOOTER_TYPE', style });

export const changeMenuColor = style => dispatch =>
  dispatch({ type: 'CHANGE_MENU_COLOR', style });

export const hideScrollToTop = value => dispatch =>
  dispatch({ type: 'HIDE_SCROLL_TO_TOP', value });
