<template>
  <div class="home">
    <h1>Блог</h1>
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <router-link :to="'/' + post._id">{{ post.title }}</router-link>
      </li>
    </ul>
     <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
      posts: []
    }
  }, 
  created: async function () {
    const posts = await fetch('http://localhost:3000/api/posts').then(data => data.json());  
    if (posts.error) alert(posts.error);
    else this.posts = posts;
  }
}
</script>
