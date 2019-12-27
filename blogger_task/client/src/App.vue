<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Посты</router-link></li>
        <li><router-link to="/new">Добавить пост</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<style>
body {
  font-family: "Lucida Console", Monaco, monospace;
  width: 100%;
}

nav {
  margin: 1%;
}
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  background-color: #f3f3f3;
}
nav li {
  float: left;
}
nav a {
  display: block;
  color: #666;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

nav li a:hover:not(.router-link-exact-active) {
  background-color: #ddd;
}

nav a.router-link-exact-active {
  color: white;
  background-color: #4CAF50;
}

#app {
  width: 100%;
  margin: 0;
  padding: 0;
}

#app > div {
  margin: 5% 30%;
}
</style>
