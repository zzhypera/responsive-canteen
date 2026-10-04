<template>
  <div class="auth-page">
    <div class="auth-brand">
      <RouterLink to="/" class="brand"><span class="brand-mark">CC</span> Campus<span>Canteen</span></RouterLink>
    </div>

    <div class="auth-card">
      <span class="eyebrow">WELCOME BACK</span>
      <h1>Log in to order.</h1>
      <p class="auth-subtitle">Use your ID number to continue.</p>

      <form novalidate @submit.prevent="handleSubmit">
        <label>ID number<input v-model="values.idNumber" type="text" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="e.g., 18101" autocomplete="username" required @input="onlyDigits" @blur="validateField('idNumber')" />
          <small v-if="errors.idNumber" class="field-error">{{ errors.idNumber }}</small>
        </label>
        <label>Password
          <span class="password-field">
            <input v-model="values.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" autocomplete="current-password" required />
            <button type="button" class="toggle-password" :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
              <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.9 5.2A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4.4-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /><path d="m2 2 20 20" /></svg>
            </button>
          </span>
          <small v-if="errors.password" class="field-error">{{ errors.password }}</small>
        </label>
        <p v-if="submitError" class="error-message">{{ submitError }}</p>
        <button class="btn btn-primary full-button" :disabled="submitting">{{ submitting ? 'Logging in...' : 'Login' }}</button>
      </form>

      <p class="auth-footer">Don't have an account? <RouterLink to="/register">Create one</RouterLink></p>
      <RouterLink to="/" class="back-link center-link">← Back to home</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { ID_NUMBER_PATTERN } from '../../data/users'
import { matches, required, useForm } from '../../composables/useForm'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const showPassword = ref(false)

// Form handling: values, validation rules and submit state live in one composable.
const { values, errors, submitError, submitting, validateField, handleSubmit } = useForm({
  initial: { idNumber: '', password: '' },
  rules: {
    idNumber: [
      required('Please enter your ID number.'),
      matches(ID_NUMBER_PATTERN, 'ID number must be 5 digits (example: 18101).')
    ],
    password: [required('Please enter your password.')]
  },
  onSubmit: ({ idNumber, password }) => {
    const user = auth.login(idNumber, password)
    const redirect = route.query.redirect
    // Admins can't be sent into student-only pages by accident, students can't open /admin
    if (typeof redirect === 'string' && redirect.startsWith('/') && (user.role === 'admin' || !redirect.startsWith('/admin'))) {
      router.push(redirect)
    } else {
      router.push(user.role === 'admin' ? '/admin' : '/menu')
    }
  }
})

function onlyDigits() {
  values.idNumber = values.idNumber.replace(/\D/g, '').slice(0, 5)
}
</script>