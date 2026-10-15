<template>
  <section class="page-section">
    <div class="empty-state">
      <div class="empty-icon">?</div>
      <h2>Page not found</h2>
      <p>We couldn't find <code>{{ $route.fullPath }}</code>.</p>
      <RouterLink to="/menu" class="btn btn-primary">Back to menu</RouterLink>
    </div>
  </section>
</template>
