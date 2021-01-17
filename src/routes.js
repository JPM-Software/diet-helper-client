import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Calculator = React.lazy(() => import('./views/calculator/Calculator'));
const Diary = React.lazy(() => import('./views/diary/Diary'));
const Contact = React.lazy(() => import('./views/contact/Contact'));

const routes = [
  { path: '/', exact: true, name: '' },
  { path: '/dashboard', name: 'Strona główna', component: Dashboard },
  { path: '/calculator', exact: true,  name: 'Kalkulator', component: Calculator },
  { path: '/diary', exact: true,  name: 'Dziennik żywienia', component: Diary },
  { path: '/contact', exact: true, name: 'Kontakt', component: Contact }
];

export default routes;
