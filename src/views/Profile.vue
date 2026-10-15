<template>
  <section class="page-section narrow-page">
    <div class="page-heading simple">
      <div>
        <span class="eyebrow">ACCOUNT</span>
        <h1>My profile</h1>
      </div>
    </div>

    <div class="profile-card">
      <div class="avatar">{{ auth.user?.name?.charAt(0) || '?' }}</div>
      <div>
        <h2>{{ auth.user?.name }}</h2>
        <p>ID No. {{ auth.user?.idNumber }} · {{ auth.isAdmin ? 'Admin' : 'Student' }}</p>
      </div>
    </div>

    <div class="profile-actions">
      <button class="btn btn-light">Edit profile</button>
      <button class="btn btn-light">Change password</button>
      <button class="btn btn-dark" @click="logout">Logout</button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>