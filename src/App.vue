<template>
  <v-app>
    <div id="nav">
      <router-link :to="{ name: 'calculator' }" title="Calculator">
        <v-icon>{{ mdiCalculatorVariant }}</v-icon>
      </router-link>
      <router-link :to="{ name: 'convert' }" title="Convert">
        <v-icon>{{ mdiEqualBox }}</v-icon>
      </router-link>
    </div>
    <router-view />
  </v-app>
</template>

<script>
import { mdiCalculatorVariant, mdiEqualBox } from "@mdi/js";
export default {
  data() {
    return {
      mdiCalculatorVariant,
      mdiEqualBox
    };
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
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fff;
  border: 1px solid #eee;
}

#nav {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

#nav a {
  display: inline-block;
  padding: 10px;
  color: #2c3e50;
  font-weight: bold;
  text-decoration: none;
}

#nav a + a {
  margin-left: 20px;
}

#nav a.router-link-exact-active,
#nav a:focus {
  border: none;
  outline: none;
}

#nav a.router-link-exact-active svg,
#nav a:focus svg {
  color: #42b983;
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
