<template>
  <section>
    <ul class="tab">
      <li class="tab-item" :class="{ active: selected === 'fall' }">
        <router-link to="/courses/fall">Fall</router-link>
      </li>
      <li class="tab-item" :class="{ active: selected === 'winter' }">
        <router-link to="/courses/winter">Winter</router-link>
      </li>
      <li class="tab-item" :class="{ active: selected === 'spring' }">
        <router-link to="/courses/spring">Spring</router-link>
      </li>
      <li class="tab-item" :class="{ active: selected === 'summer' }">
        <router-link to="/courses/summer">Summer</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'QuarterTabs',
  data() {
    return {
      selected: 'fall'
    };
  },

  watch: {
    $route() {
      this.selected = this.$route.name;
    }
  },
  // TODO; remove click handlers and add on route change and perform same ops
  created() {
    this.selected = this.$route.name;
  }
};
</script>

<style lang="scss">
</style>
