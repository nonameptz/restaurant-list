<template>
  <div class="d-flex restaurant-wrapper">
    <div class="d-flex flex-column" v-if="!notSelectedError">
      <div class="d-flex restaurant-header">
        <div class="header-left">
          <h2>
            <a :href="restaurantData.url">{{restaurantData.name}}</a>
          </h2>
          <div>
            <b>Rating:</b> {{restaurantData.rating}}
            <Location
              v-if="restaurantData.location"
              class="left-header-row"
              :location="restaurantData.location"
              :is-formated="true"
            />
            <div class="d-flex left-header-row" v-if="restaurantData.display_phone">
              <img src="./icons/phone-icon.svg" alt="marker-icon" class="icon" />{{ restaurantData.display_phone }}
            </div>
          </div>
        </div>
        <div class="d-flex header-right" >
          <img :src="imageUrl"
               alt="logo"
               class="restaurant-logo"
               @error="imageUrlAlt"
          />
        </div>
      </div>
      <div v-if="restaurantData.reviews.length">
        <h3>Reviews</h3>
        <ul>
          <li v-for="item in restaurantData.reviews">
            <p><b>Rating:</b> {{ item.rating }}</p>
            <p>{{item.text}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="no-restaurant d-flex">
      Please select a Restaurant!
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import Location from "./Location.vue";
import NoPhoto from './icons/no-photo.png';
export default {
  name: "Restaurant",
  components: {Location},
  data() {
    return {
      restaurantData: {},
      notSelectedError: false
    }
  },
  created() {
    this.initRestaurantData(this.$route.params.id);
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(id) {
        this.initRestaurantData(id);
        this.setCurrentRestaurant(id)
      }
    }
  },
  computed: {
    ...mapState(['restaurant']),
    imageUrl() {
      return this.restaurantData?.photos[0] || null;
    }
  },
  methods: {
    ...mapActions('restaurant', ['setCurrentRestaurant']),
    initRestaurantData(id) {
      if (!id) {
        this.notSelectedError = true;
        return;
      }
      this.restaurantData = this.restaurant.list.get(id)
      this.notSelectedError = false;
    },
    imageUrlAlt(event) {
      event.target.src = NoPhoto;
    }
  }
}
</script>

<style scoped>
.restaurant-wrapper {
  padding: 10px 30px;
}
.no-restaurant {
  justify-items: center;
  align-items: center;
  margin: 0 auto;
}
.restaurant-header {
  justify-content: space-between;
  flex-direction: row;
}
.header-left {
  width: 70%;
}
.header-left h2 a {
  color: var(--link-color);
}
.header-right {
  width: 30%;
  justify-content: flex-end;
}
.left-header-row {
  margin-top: 20px;
}
.icon {
  margin-bottom: -3px;
}
.restaurant-logo {
  max-height: 225px;
  max-width: 100%;
}
@media (max-width: 700px) {
  .header-left, .header-right {
    width: 50%;
  }
}
@media (max-width: 500px) {
  .restaurant-header {
    flex-direction: column;
  }
  .header-left, .header-right {
    width: 100%;
  }
  .restaurant-header .header-left { order: 2; }
  .restaurant-header .header-right { order: 1; }
  .restaurant-logo {
    max-height: unset;
  }
}
</style>
