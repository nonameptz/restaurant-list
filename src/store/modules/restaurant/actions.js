import getRestaurantData from '../../../api/restraurant.js';

export async function fetchRestaurantData({ commit, state }) {
  commit('resetRestaurant');
  commit('setRestaurantLoading', { loading: true });
  try {
    const restaurantData = await getRestaurantData();
    if (restaurantData?.data?.search) {
      commit('setRestaurant', { ...restaurantData.data.search });
    }
  } finally {
    commit('setRestaurantLoading', { loading: false });
  }
}
export async function setCurrentRestaurant({ commit, state }, id) {
    commit('setCurrentRestaurant', id);
}
