<template>
  <div class="dashboard">
    <h1>Courses</h1>
    <QuarterTabs />
    <keep-alive>
          <router-view></router-view>

    </keep-alive>
  </div>
</template>

<script>
import QuarterTabs from '@/components/QuarterTabs'
import CourseTable from '@/components/CourseTable';

export default {
  name: 'Courses',
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
