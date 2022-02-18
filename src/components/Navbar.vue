<template>
  <div>
    <nav>
      <!-- for logged in users -->
      <div v-if="user">
        <button @click="handleClick">Logout</button>
      </div>

      <!-- for logged out users -->
      <div v-if="!user">
        <router-link to="/login">Login</router-link>
        <router-link to="/">Home</router-link>
      </div>
    </nav>

    <!-- show user email -->
    <div v-if="user">logged in as {{ user.email }}</div>
  </div>
</template>

<script>
import getUser from '../composables/getUser'

//firebase imports
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

export default {
  setup() {
    const { user } = getUser()

    const handleClick = () => {
      signOut(auth)
    }

    return { handleClick, user }
  },
}
</script>

<style>
nav {
  margin-top: 0;
  padding-bottom: 30px;
}
nav a {
  float: right;
  color: var(--primary);
  margin-left: 16px;
}
nav a.router-link-exact-active {
  color: var(--secondary);
}
nav button {
  float: right;
  width: 150px;
  height: 30px;
  border: 1px solid var(--primary);
  border-radius: 6px;
  margin-left: 16px;
  line-height: 30px;
  color: var(--primary);
  font-weight: bold;
  cursor: pointer;
  background: white;
}
nav button:hover {
  background: var(--primary);
  color: white;
}
</style>
