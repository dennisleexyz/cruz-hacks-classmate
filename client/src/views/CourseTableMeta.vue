<template>
<keep-alive>
  <div>
    <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam in molestiae doloribus sed voluptates vero error sunt illo iste, quod officia quisquam soluta suscipit repellat cupiditate obcaecati consectetur cum sapiente!</p>
    <h2>{{ $route.name }}</h2> -->
    <!-- <label class="form-checkbox">
      <input type="checkbox" checked="" /><i class="form-icon"></i>
      form-checkbox
    </label>
    <label class="form-switch">
      <input type="checkbox" checked="" /><i class="form-icon"></i> form-switch
    </label>
    <label class="form-radio">
      <input type="radio" checked="" /><i class="form-icon"></i> form-radio
    </label> -->
    <keep-alive>
    <CourseTable :currentQuarter="$route.name" />

    </keep-alive>
  </div>
</keep-alive>

</template>

<script>
import CourseTable from '@/components/CourseTable';

export default {
  name: 'CourseTableMeta',
  components: {
    CourseTable
  },
  created() {
    // console.info(this.$route)
  }
};
</script>

<style lang="scss">
</style>
