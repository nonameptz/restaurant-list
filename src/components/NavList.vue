<template>
  <div class="d-flex nav-list" :style="{maxHeight: navListHeight + 'px'}">
    <div v-if="restaurant.total > 0" class="top-item d-sm-none">{{restaurant.total}} Restaurants</div>
    <div class="d-flex nav-items nav-list-scroll">
      <div
        v-for="[key, item] in restaurant.list"
        :key="item.id"
        @click="selectRestaurant(item.id)"
        class="nav-item"
        :class="{'active': restaurant.currentRestaurant === item.id}"
      >
        <h3 class="nav-item-title">{{ item.name }}</h3>
        <Location
          class="d-sm-none"
          v-if="item.location"
          :location="item.location"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Location from "./Location.vue";

export default {
  name: "NavList",
  components: {Location},
  data() {
    return {
      navListHeight: 500,
    }
  },
  created() {
    this.navListHeight = window.innerHeight - 78;
    window.addEventListener("resize", this.setNavListHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.setNavListHeight);
  },
  computed: {
    ...mapState(['restaurant']),
  },
  methods: {
    setNavListHeight(e) {
      this.navListHeight = e.target.innerHeight - 78;
    },
    selectRestaurant(id) {
      if (id === this.restaurant.currentRestaurant) {
        return;
      }
      this.$router.push(`/restaurant/${id}`)
    },
  }
}
</script>

<style scoped>
  .nav-list, .nav-items {
    flex-direction: column;
  }
  .nav-list-scroll {
    height: 100%;
    overflow-y: scroll;
  }
  .top-item, .nav-item {
    padding: 20px 40px;
  }
  .top-item {
    background-color: #d1d1d1;
    color: var(--nav-header-color);
    font-weight: 700;
    font-size: 19px;
  }
  .nav-item {
    border-top: 1px solid #d1d1d1;
    cursor: pointer;
  }
  .nav-item:hover {
    background-color: var(--nav-hover-item) !important;
  }
  .nav-item.active {
    background-color: var(--nav-active-item);
  }
  .nav-item-title {
    margin: 0 0 5px;
  }
  @media (max-width: 700px) {
    .nav-item {
      display: flex;
      padding: 10px 20px;
      align-items: center;
    }
    .nav-list, .nav-items {
      flex-direction: row;
    }
    .nav-list-scroll {
      overflow-y: unset;
      overflow-x: scroll;
    }
  }
</style>
