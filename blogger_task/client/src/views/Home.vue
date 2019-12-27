<template>
  <div class="home">
    <h1>Блог</h1>
    <div class="home-post" v-for="post in posts" :key="post._id">
      <h3><router-link :to="'/' + post._id">{{ post.title }}</router-link></h3>
      <h4>{{ post.categories }}</h4>
      <p>{{ post.content }}</p>
    </div>
     <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  props: {
    ref: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      posts: []
    }
  }, 
  created: async function () {
    const posts = await fetch(this.ref).then(data => data.json());  
    if (posts.error) alert(posts.error);
    else this.posts = posts;
  }
}
</script> 

<style scoped>

.home-post {
  border-radius: 1px;
  background-color: #f2f2f2;
  padding: 2% 5%;
  margin-bottom: 2%;
}

h3 {
  border: 3px black;
  text-align: center;
}
</style>
