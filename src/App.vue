<template>
  <v-app>
    <div id="nav">
      <router-link class="btn-back" :to="{ name: 'home' }">Home</router-link>
      <router-link class="btn-back" :to="{ name: 'convert' }">
        Convert
      </router-link>
    </div>
    <router-view />
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
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
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

button.btn-back:focus,
a.btn-focus:focus {
  outline: 2px dotted #09b464;
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
  background-color: rgb(18, 193, 111);
  border-radius: 3px;
}

.v-menu__content {
  scrollbar-color: rgb(18, 193, 111) white;
  scrollbar-width: thin;
}

@media screen and (max-width: 400px) {
  body {
    max-width: 400px;
    min-height: 86.5vh;
  }
}
</style>
