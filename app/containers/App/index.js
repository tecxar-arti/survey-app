/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import Router from '../../Router';
import '../../components/extras/rippleButton/RippleButton';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

export default function App() {
  return <Router />;
}
