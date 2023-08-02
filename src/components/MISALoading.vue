<template>
  <div class="loading-mask">
    <div class="loading-spinner">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
      </svg>
      <p class="loading-text">Đang tải...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISALoading",
};
</script>

<style scoped>
.loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: hsla(0, 0%, 100%, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
}
.loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}
.circular {
  height: 42px;
  width: 42px;
  animation: i 2s linear infinite;
}
.path {
  animation: h 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #8a6bf6;
  stroke-linecap: round;
}
.loading-text {
  color: #8a6bf6;
  margin: 3px 0;
  font-size: 14px;
}
@keyframes h {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes i {
  100% {
    transform: rotate(1turn);
  }
}
</style>
