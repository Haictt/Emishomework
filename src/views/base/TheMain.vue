<template>
  <main class="main shownav" id="content">
    <router-view></router-view>
  </main>
  <teleport to="body">
    <div class="toast-container flex-column" v-if="toastArray.length">
      <Toast
        v-for="toast in toastArray"
        :key="toast.id"
        :Type="toast.type"
        @closeToast="deleteToast(toast.id)"
      >
      </Toast>
    </div>
  </teleport>
</template>

<script>
import Toast from "../../components/MISAToast.vue";
import { mapActions, mapState } from "pinia";
import { toastStore } from "../../js/base/toaststore.js";
export default {
  name: "The Main",
  components: { Toast },
  data() {
    return {};
  },
  computed: {
    ...mapState(toastStore, ["toastArray"]),
  },
  methods: {
    ...mapActions(toastStore, ["addToast", "deleteToast"]),
  },
};
</script>

<style scoped>
#content {
  height: 100%;
  position: relative;
}
#content.shownav {
  height: calc(100% - 64px);
  min-height: 100vh;
}
#content,
#nav {
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: thin;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
}
.toast-container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2200;
  row-gap: 10px;
}
</style>
