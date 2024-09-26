<template>
  <v-app>
   
    <v-container fluid>
      
      <Navbar />
      <v-main>
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
