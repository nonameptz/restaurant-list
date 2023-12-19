import data from './data.json';
export default async function getRestaurantData() {
  return new Promise((res) => setTimeout(() => res(data), 300)); //todo change to 3-5s
}
