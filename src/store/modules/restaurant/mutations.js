import { initState } from './state';

export function setRestaurant(state, value) {
  const { business, total } = value;
  state.total = total;
  if (business.length) {
    business.forEach((item) => {
      if (item.id && !state.list.has(item.id)) {
        state.list.set(item.id, item)
      }
    });
  }
}

export function setRestaurantLoading(state, { loading }) {
  state.loading = loading;
}

export function setCurrentRestaurant(state, id) {
  state.currentRestaurant = id;
}

export function resetRestaurant(state) {
  state.list = initState.list;
  state.total = initState.total;
  state.loading = initState.loading;
  state.currentRestaurant = initState.currentRestaurant;
}
