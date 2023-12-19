<template>
  <div class="d-flex align-items-end">
    <span>
      <img src="./icons/marker-icon.svg" alt="marker-icon" />{{ locationLabel }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Location",
  props: {
    location: {
      type: Object,
      required: true,
    },
    isFormated: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    locationLabel() {
      return this.isFormated
        ? this.location.formatted_address
        : `${this.location.address1} ${this.location.city}`;
    }
  }
}
</script>

<style scoped>
img {
  margin-bottom: -3px;
}
</style>
