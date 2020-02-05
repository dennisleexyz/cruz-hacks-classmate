<template>
  <div id="app">
    <header class="navbar m-2">
      <section class="navbar-section">
        <div class="navbar-brand mr-2"><h5 class="classmate">Classmate</h5></div>
        <a href="https://devpost.com/software/classmate-ygiz1a" class="btn btn-primary mr-2">About</a>
        <router-link to="/courses/fall" class="btn btn-primary">Courses</router-link>
      </section>
      <!-- <section class="navbar-section"> -->
        <!-- <div class="input-group input-inline">
          <input class="form-input" type="text" placeholder="search" />
          <button class="btn btn-primary input-group-btn">Search</button>
        </div> -->
      <!-- </section> -->
    </header>
    <div class="router-view-wrapper m-2">
      <keep-alive>
      <router-view></router-view>

      </keep-alive>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.classmate {
  position: relative;
  top: 4px;
}
</style>
