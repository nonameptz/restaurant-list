export const initState = Object.freeze({
  list: new Map(),
  currentRestaurant: '',
  total: 0,
  loading: false,
});

export default () => ({ ...initState });
