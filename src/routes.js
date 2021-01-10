import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const User = React.lazy(() => import('./views/users/User'));
const Calculator = React.lazy(() => import('./views/calculator/Calculator'));
const Diary = React.lazy(() => import('./views/diary/Diary'));

const routes = [
  { path: '/', exact: true, name: '' },
  { path: '/dashboard', name: 'Strona główna', component: Dashboard },
  { path: '/calculator', exact: true,  name: 'Kalkulator', component: Calculator },
  { path: '/diary', exact: true,  name: 'Dziennik żywienia', component: Diary },
  { path: '/users/:id', exact: true, name: 'Profil pacjenta', component: User }
];

export default routes;
