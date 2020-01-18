<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <main>
      <div v-if="!isLoaded" class="loading loading-lg"></div>
      <div v-else class="loaded">
        <div v-for="clas in classes" :key=clas.courseTitle>
          <p>{{ clas }}</p>
        </div>
        <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>name</th>
            <th>genre</th>
            <th>release date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="clas in classes" :key=clas.courseTitle class="active" >
            <td>{{ clas.department }}</td>
            <td>{{ clas.departmentNumber }}</td>
            <td>{{ clas.credits }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      isLoaded: false,
      classes: []
    }
  },
  async created() {
    const data = await fetch('/api/classes', {
      method: 'GET'
    })
    const json = await data.json()
    this.classes = json.data
    this.isLoaded = true
  }
}
</script>

<style lang="scss">
.loading {
  margin-top: 50px;
}
</style>
