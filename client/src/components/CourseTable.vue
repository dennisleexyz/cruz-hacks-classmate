<template>
  <main>
    <keep-alive>
      <div v-if="!isLoaded" class="loading loading-lg"></div>
      <div v-else class="loaded">
        <div v-for="course in filteredCourses" :key="course.link">
          <h1 style="margin-bottom: 0; margin-top: 20px;">
            {{
              Object.entries(course)[0][0]
                .replace(/-/g, ' ')
                .replace(' ', ' - ')
            }}
          </h1>
          <div>
            <!-- {{ foo }} -->
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Course #</th>
                  <th>Course Title</th>
                  <th>Course Level</th>
                  <th>Units</th>
                  <th>Instructor</th>
                  <th>Requirements</th>
                  <th>General Education Code</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="foo in Object.entries(course)[0][1]"
                  :key="foo.link + foo.longName"
                >
                  <template v-if="foo.quartersOffered[currentQuarter]">
                    <!-- {{ foo }} -->
                    <td><a :href="foo.link" :title="Object.entries(course)[0][0].replace(/-/g, ' ').replace(' ', ' - ')" target="__blank">{{ foo.departmentName }}</a></td>
                <td><a :href="foo.link" :title="foo.shortName" target="__blank">{{ foo.courseNumber }}</a></td>
                <td><span :title=foo.descriptionTest>{{ foo.longName }}</span></td>
                <td>{{ courseLevel(foo.courseNumber) }}</td>
                <td>{{ foo.credits }}</td>
                <td>{{ foo.professors.toString().replace(/,/g, ', ') }}</td>
                <td>{{ foo.prereqs }}</td>
                <td>{{ foo.generalEducationCode }}</td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Department</th>
            <th>Course Number</th>
            <th>Course Title</th>
            <th>Description</th>
            <th>Credits</th>
            <th>Instructor</th>
            <th>Prereqs</th>
            <th>GeneralEd</th>
            <th>Offered During</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(course, i) in filteredCourses"
            :key="course.link"
            :class="{ active: i % 2 === 0 }"
          >
            <td>{{ course.link }}</td>
            <td>{{ course.shortName }}</td>
            <td>{{ course.longName }}</td>
            <td>{{ course.departmentName }}</td>
            <td>{{ course.courseNumber }}</td>
            <td>{{ course.descriptionTest }}</td>
            <td>{{ course.prereqs }}</td>
            <td>{{ course.generalEd }}</td>
            <td>{{ course.offeredDuring }}</td>
          </tr>
        </tbody>
      </table> -->
      </div>
    </keep-alive>
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
    const data = await fetch('/api/finalData.json', {
      method: 'GET'
    });
    const json = await data.json();
    // console.log(json.data)
    this.courses = json.data;
    this.isLoaded = true;
  },
  computed: {
    filteredCourses() {
      // return this.courses.filter(
      //   course => course.offeredDuring[this.currentQuarter]
      // );
      return this.courses;
    }
  },
  methods: {
    kappafoo(course, foo) {
      return Object.entries(course)[0][1].filter(objs => {
        console.log(objs);
        return foo[this.currentQuarter];
      });
    },
    courseLevel(code) {
      let num = code.replace(/[A-Z]*/g, '')
      if(num < 100) {
	return("Lower Division")
      }
      else if(num < 200) {
	return("Upper Division")
      }
      else {
	return("Graduate")
      }
    }
  }
};
</script>

<style lang="scss">
</style>
