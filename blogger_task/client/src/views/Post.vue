<template>
  <div class="form-post">
    <form @submit.prevent="updatePost">
      <input v-model="title" type="text" placeholder="Измените название" min="3" required><br>
      <input v-model="categories" type="text" placeholder="Измените категории" min="3" required><br>
      <textarea v-model="content" placeholder="Измените контент" min="3" required></textarea><br>
      <button>Изменить</button>
      <button @click="deletePost" type="button">Удалить</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'showPost',
  data () {
    return {
      title: null,
      categories: null,
      content: null
    }
  }, 
  methods: {
    deletePost: async function () {
      const options = {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
      } 
      const post = await fetch('http://localhost:3000/api/posts/' + this.$route.params.id, options)
        .then(data => data.json());

      if (post.error) alert(post.error);
      else this.$router.push('/');
    },
    updatePost: async function () {
      const post = {
        title: this.title,
        categories: this.categories,
        content: this.content
      };

      const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(post), // тип данных в body должен соответвовать значен    ию заголовка "Content-Type"
      } 

      const updPost = 
        await fetch('http://localhost:3000/api/posts/' + this.$route.params.id, options)
          .then(data => data.json());

      if (updPost.error) alert(updPost.error);
      else this.$router.push('/posts');
    }
  },
  created: async function () {
    const post = 
      await fetch('http://localhost:3000/api/posts/' + this.$route.params.id)
        .then(data => data.json()); 
    if (post.error) alert(post.error);
    else {
      this.title = post.title;
      this.categories = post.categories;
      this.content = post.content;
    }  
  }
}
</script>

<style>
button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  width: 50%;
}

button:hover {
  background-color: #6bbf6e;
}

button:focus {
  background-color: #2d692f;
}

.form-post {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.form-post input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-post textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none; 
  height: 120px;
}
</style>