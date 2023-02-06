import React from 'react';
import * as Icon from 'react-feather';
const navigationConfig = [
  {
    id: 'home',
    title: 'Dashboard',
    type: 'item',
    icon: <Icon.Home size={20} />,
    navLink: '/',
  },
  {
    type: 'groupHeader',
    groupTitle: 'Survey'
  },
  {
    id: 'surveyList',
    title: 'Survey Form',
    type: 'item',
    icon: <Icon.User size={20} />,
    navLink: '/survey',
  },
 
];

export default navigationConfig;
