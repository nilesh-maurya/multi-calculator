<template>
  <v-app>
    <!-- <div id="app"> -->
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'convert' }">Convert</router-link>
    </div>
    <router-view />
    <!-- </div> -->
  </v-app>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef;
}

#app {
  width: 404px;
  min-height: 620px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fff;
  border: 1px solid #eee;
}

#nav {
  padding: 10px 0 10px 0;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding-left: 10px;
}

#nav a.router-link-exact-active,
#nav a:focus {
  color: #42b983;
  border: none;
  outline: none;
}

@media screen and (max-width: 400px) {
  body {
    max-width: 400px;
    min-height: 86.5vh;
  }
}
</style>
