<template>
  <main>
    <div v-if="!isLoaded" class="loading loading-lg"></div>
    <div v-else class="loaded">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Department</th>
            <th>Course Number</th>
            <th>Course Title</th>
            <th>Description</th>
            <th>Credits</th>
            <th>Instructor</th>
            <th>Requirements</th>
            <th>General Education Code</th>
            <!-- <th>Offered During</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(course, i) in filteredCourses"
            :key="course.courseTitle"
            :class="{ active: i % 2 === 0 }"
          >
            <td>{{ course.department }}</td>
            <td>{{ course.departmentNumber }}</td>
            <td>{{ course.courseTitle }}</td>
            <td>{{ course.description }}</td>
            <td>{{ course.credits }}</td>
            <td>{{ course.instructor }}</td>
            <td>{{ course.prereqs }}</td>
            <td>{{ course.generalEd }}</td>
            <!-- <td>{{ course.offeredDuring }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
export default {
  name: 'CourseTable',
  props: {
    currentQuarter: {
      type: String,
      default: () => 'fall'
    },
    course: {
      type: Object,
      default: () => ({
        department: 'default-departmentname',
        departmentNumber: 'default-departmentnumber',
        courseTitle: 'defualt-coursetitle',
        description: 'default-description',
        credits: 4,
        instructor: 'default-instructor',
        prereqs: [],
        generalEd: 'EN',
        offeredDuring: {
          fall: Math.random() < 0.5,
          winter: Math.random() < 0.5,
          spring: Math.random() < 0.5,
          summer: Math.random() < 0.5
        }
      })
    }
  },
  data() {
    return {
      isLoaded: false,
      courses: []
    };
  },
  async created() {
    const data = await fetch('/api/classes', {
      method: 'GET'
    });
    const json = await data.json();
    this.courses = json.data;
    this.isLoaded = true;
  },
  computed: {
    filteredCourses() {
      return this.courses.filter(
        course => course.offeredDuring[this.currentQuarter]
      );
    }
  }
};
</script>

<style lang="scss">
</style>
