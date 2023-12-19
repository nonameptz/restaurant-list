<template>
  <div id="app" class="d-flex flex-column" :class="{'dark': isDark}">
      <header>
        Restaurant finder
        <ToggleButton @change="onChangeThemeToggle" color="#fcbc1b" :value="!isDark" />
      </header>
      <div class="d-flex wrapper" v-if="isLoaded">
        <NavList class="left-column" />
        <Restaurant />
      </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import Restaurant from "./components/Restaurant.vue";
import NavList from "./components/NavList.vue";
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  components: {NavList, Restaurant, ToggleButton},
  async created() {
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    this.isDark = currentTheme === 'dark';
    document.documentElement.setAttribute('data-theme',  this.isDark ? 'dark' : 'light');

    await this.fetchRestaurantData();
    this.isLoaded = true;
  },
  data() {
    return {
      isLoaded: false,
      isDark: false,
    }
  },
  methods: {
    ...mapActions('restaurant', [
      'fetchRestaurantData',
    ]),
    onChangeThemeToggle({value}) {
      console.log(value);
      this.isDark = value;
      localStorage.setItem('theme', !value ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme',  !value ? 'dark' : 'light');
    }
  }
}
</script>

<style scoped>
header{
  background-color: #282c34;
  color: #ffffff;
  flex: 0 0 100%;
  justify-content: space-between;
  font-size: 32px;
  font-weight: 800;
  padding: 20px 30px;
  display: flex;
  align-items: center;
}
.left-column {
  width: 20%;
}
.wrapper {
  flex-direction: row;
}
@media (max-width: 700px) {
  .wrapper {
    flex-direction: column;
  }
  .left-column {
    width: 100%;
  }
}
</style>
