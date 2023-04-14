export type RoutesKey =
  | 'home'
  | 'about'
  | 'contacts'
  | 'searchResult'
  | 'detailedRecipe'
  | 'other';

export const routes: { [K in RoutesKey]: { path: string; title: string } } = {
  home: {
    path: '/',
    title: 'Home',
  },
  about: {
    path: '/about',
    title: 'About Us',
  },
  contacts: {
    path: '/#',
    title: 'Contacts',
  },
  searchResult: {
    path: '/searchresult',
    title: 'Search Result',
  },
  detailedRecipe: {
    path: '/recipe/:id',
    title: '',
  },
  other: {
    path: '*',
    title: '',
  },
};
