import React from 'react';
import * as Icon from 'react-feather';

const horizontalMenuConfig = [
  {
    id: 'home',
    title: 'Dashboard',
    type: 'item',
    icon: <Icon.Home size={20} />,
    permissions: ['admin', 'distributor'],
    navLink: '/',
  },
];

export default horizontalMenuConfig;
