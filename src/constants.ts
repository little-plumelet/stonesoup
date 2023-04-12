export const BASE_URL = 'https://api.spoonacular.com';
export const API_KEY = import.meta.env.VITE_SPINACULAR_API_KEY;

export const THEME = {
  colorPrimary: '#ff642f',
  colorInfo: '#ff642f',
  colorError: '#ff1b1f',
};

export const SIDER_INGREDIENTS_WITH = 250;

export enum ETags {
  'servings' = 'servings',
  'preptime' = 'prep time',
  'likes' = 'likes',
}
