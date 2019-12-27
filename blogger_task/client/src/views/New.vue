<template>
  <div class="form-post">
    <form @submit.prevent="onSubmit">
      <input v-model="title" type="text" placeholder="Добавьте название" min="3" required><br>
      <input v-model="categories" type="text" placeholder="Добавьте категории" min="3" required><br>
      <textarea v-model="content" placeholder="Добавьте контент" min="3" required></textarea><br>
      <button>Добавить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'new',
  props: {
    ref: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      title: null,
      categories: null,
      content: null
    }
  }, 
  methods: {
    onSubmit: async function () {
      const titleCheck = this.title.length > 2 && this.title.length < 41;
      const categoriesCheck = this.categories.length > 2 && this.categories.length < 41;
      const contentCheck = this.content.length > 2 && this.content.length < 121;
      if (titleCheck && categoriesCheck && contentCheck) {
        const post = {
          title: this.title,
          categories: this.categories,
          content: this.content
        };
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
        }; 
        const addPost = await fetch(this.ref, options).then(data => data.json());
        if (addPost.error) alert(addPost.error);
        else this.$router.push('/');
      } else alert(`Not right: ${(!titleCheck) ? 'title': ((!categoriesCheck) ? 'categories' : 'content')}`);
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