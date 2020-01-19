<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <QuarterTabs />
    <router-view></router-view>
  </div>
</template>

<script>
import QuarterTabs from '@/components/QuarterTabs'
import CourseTable from '@/components/CourseTable';

export default {
  name: 'Dashboard',
  components: {
    QuarterTabs,
    CourseTable
  },
  data() {
    return {
      isLoaded: false,
      classes: []
    };
  },
  async created() {
    // const data = await fetch('/api/finalData', {
    //   method: 'GET'
    // });
    // const json = await data.json();
    // this.classes = json.data;
    // this.isLoaded = true;
  }
};
</script>

<style lang="scss">
.loading {
  margin-top: 50px;
}
</style>
