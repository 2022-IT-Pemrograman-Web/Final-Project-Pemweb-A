<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap"
    rel="stylesheet"
  />
  <div class="app-container row justify-content-center mt-3">
    <div class="col-md-10 border">
      <router-view />
    </div>
  </div>
</template>

<script>
import './index.css';
import { useApp } from "./stores";
// import { useStore } from "vuex";

export default {
  setup() {
    const app = useApp();
    return {
      app,
    };
  },
  };
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #131820;
}

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body {
  font-family: "Roboto Condensed", sans-serif;
}
</style>
