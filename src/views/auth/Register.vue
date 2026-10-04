<template>
  <div class="auth-page">
    <div class="auth-brand">
      <RouterLink to="/" class="brand"><span class="brand-mark">C</span> Campus<span>Canteen</span></RouterLink>
    </div>

    <div class="auth-card">
      <span class="eyebrow">JOIN THE CAMPUS</span>
      <h1>Create your account.</h1>
      <p class="auth-subtitle">Order faster and keep track of your canteen orders.</p>

      <form novalidate @submit.prevent="handleSubmit">
        <label>Full name<input v-model="values.name" type="text" placeholder="eg., Clarke David Murcia" required @blur="validateField('name')" />
          <small v-if="errors.name" class="field-error">{{ errors.name }}</small>
        </label>
        <label>ID number<input v-model="values.idNumber" type="text" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="eg., 18101" autocomplete="username" required @input="onlyDigits" @blur="validateField('idNumber')" />
          <small v-if="errors.idNumber" class="field-error">{{ errors.idNumber }}</small>
        </label>
        <label>Password
          <span class="password-field">
            <input v-model="values.password" :type="showPassword ? 'text' : 'password'" placeholder="At least 6 characters" minlength="6" autocomplete="new-password" required />
            <button type="button" class="toggle-password" :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
              <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.9 5.2A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4.4-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /><path d="m2 2 20 20" /></svg>
            </button>
          </span>
          <small v-if="errors.password" class="field-error">{{ errors.password }}</small>
        </label>
        <p v-if="submitError" class="error-message">{{ submitError }}</p>
        <button class="btn btn-primary full-button" :disabled="submitting">{{ submitting ? 'Creating...' : 'Create account' }}</button>
      </form>

      <p class="auth-footer">Already have an account? <RouterLink to="/login">Log in</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { ID_NUMBER_PATTERN } from '../../data/users'
import { matches, minLength, required, useForm } from '../../composables/useForm'

const router = useRouter()
const auth = useAuthStore()
const showPassword = ref(false)

const { values, errors, submitError, submitting, validateField, handleSubmit } = useForm({
  initial: { name: '', idNumber: '', password: '' },
  rules: {
    name: [required('Please enter your full name.')],
    idNumber: [
      required('Please enter your ID number.'),
      matches(ID_NUMBER_PATTERN, 'ID number must be 5 digits (example: 18101).')
    ],
    password: [required('Please choose a password.'), minLength(6, 'Password must be at least 6 characters.')]
  },
  onSubmit: ({ name, idNumber, password }) => {
    auth.register(name, idNumber, password)
    router.push('/menu')
  }
})

function onlyDigits() {
  values.idNumber = values.idNumber.replace(/\D/g, '').slice(0, 5)
}
</script>