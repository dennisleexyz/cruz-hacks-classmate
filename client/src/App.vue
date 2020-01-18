<template>
  <div id="app">
    <header class="navbar m-2">
      <section class="navbar-section">
        <router-link to="/" class="navbar-brand mr-2"><h5 class="classmate">classmate</h5></router-link>
        <router-link to="/about" class="btn btn-primary mr-2">about</router-link>
        <router-link to="/dashboard" class="btn btn-primary">dashboard</router-link>
      </section>
      <section class="navbar-section">
        <div class="input-group input-inline">
          <input class="form-input" type="text" placeholder="search" />
          <button class="btn btn-primary input-group-btn">Search</button>
        </div>
      </section>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.classmate {
  position: relative;
  top: 4px;
}
</style>
