<template>
  <v-app>
    <div id="nav">
      <router-link :to="{ name: 'calculator' }" title="Calculator">
        Calculator
      </router-link>
      <router-link :to="{ name: 'convert' }" title="Convert">
        Convert
      </router-link>
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --blackish-blue: #2c3e50;
  --white: #ffffff;
  --grey-lighten-1: #bdbdbd;
  --grey-lighten-3: #eee;
  --primary-color: ;
}

body {
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--grey-lighten-3);
}

#app {
  width: 404px;
  min-height: 620px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--blackish-blue);
  background-color: var(--white);
  border: 1px solid var(--grey-lighten-3);
}

#app .v-application--wrap {
  min-height: 100%;
}

#nav {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

#nav a {
  display: inline-block;
  margin: 10px 20px;
  color: #757575;
  font-weight: bold;
  text-decoration: none;
}

#nav a + a {
  margin-left: 20px;
}

#nav a.router-link-exact-active,
#nav a:active {
  color: var(--blackish-blue);
  border-bottom: 2px solid #09b464;
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Scroll bar color and width styling */
.v-menu__content::-webkit-scrollbar {
  width: 6px;
}
.v-menu__content::-webkit-scrollbar-track {
  background: white;
}
.v-menu__content::-webkit-scrollbar-thumb {
  background-color: #12c16f;
  border-radius: 3px;
}

.v-menu__content {
  scrollbar-color: #12c16f white;
  scrollbar-width: thin;
}

@media screen and (max-width: 400px) {
  body {
    max-width: 400px;
    min-height: 86.5vh;
  }
}
</style>
