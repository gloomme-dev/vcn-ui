<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      fmc: '',
      users: 'yoyoma',
      agent: ''
    }
  },
  mounted() {
  }
}
</script>
