<template>
  <form @submit.prevent="handleSubmit">
    <h2>Login</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required />

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required />

    <button>Login</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '../composables/useLogin'

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const { login, error } = useLogin()
    const router = useRouter()

    const handleSubmit = async () => {
      await login(email.value, password.value)

      if (!error.value) {
        router.push('/')
      }
    }
    return { email, password, handleSubmit, error }
  },
}
</script>

<style scoped>
h2 {
  color: var(--secondary);
}
form label,
form input {
  display: block;
  color: var(--secondary);
}
form input {
  padding: 4px;
  margin-top: 10px;
  margin-bottom: 20px;
}
button {
  width: 150px;
  height: 30px;
  border: 1px solid var(--primary);
  border-radius: 6px;
  line-height: 30px;
  color: var(--primary);
  font-weight: bold;
  cursor: pointer;
  background: white;
}
button:hover {
  background: var(--primary);
  color: white;
}
.error {
  color: var(--error);
  font-size: 14px;
}
</style>
