<template>
  <template v-if="$route.name != 'create' && $route.name != 'update'">
    <TheHeader></TheHeader>
  </template>
  <TheMain></TheMain>
</template>

<script>
import TheHeader from "./views/base/TheHeader.vue";
import TheMain from "./views/base/TheMain.vue";
import HomeworkCreate from "./views/pages/homework/HomeworkCreate.vue";
export default {
  name: "App",
  components: { TheHeader, TheMain, HomeworkCreate },
  updated() {
    console.log(this.$route);
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
