<template>
  <button
    v-bind="$attrs"
    :class="[
      'el-button',
      'relative',
      'button',
      'button-' + Type,
      'button-single',
      '' + Additional,
      'button-' + Color,
    ]"
  >
    <span :class="['flex-center', 'button-text', 'button-text-' + Type]">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "MISAButton",
  props: ["Type", "Color", "Additional"],
  data() {
    return {};
  },
  inheritAttrs: false,
};
</script>

<style scoped>
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #b6b9ce;
  border-color: #b6b9ce;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 10px;
}
.button {
  min-width: 113px;
  padding: 0 12px;
  margin-left: 0 !important;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
}
.button-gradient {
  border: none;
  background-color: #8a6bf6;
  color: #fff;
}
.button-default {
  background-color: #f1f2f7;
  border-color: #b6b9ce;
}
.button-icon {
  min-width: unset !important;
  width: 40px !important;
}
.button-primary:not(:disabled):focus,
.button-primary:not(:disabled):hover {
  opacity: 0.8;
}
.button-gradient:not(:disabled):active {
  transform: translateY(4px);
  box-shadow: inset 1px 1px 4px #34495e;
  transition: all 0.1s ease;
}
.button-default:not(:disabled):active {
  transform: translateY(4px);
  box-shadow: inset 1px 1px 4px #c9c8c7;
  transition: all 0.1s ease;
  outline: none;
}
.button-third {
  border: none !important;
}
.button-purple {
  background-color: #ece7fe !important;
  color: #8a6bf6 !important;
}
.button-green {
  color: #00c542;
  background-color: rgba(0, 197, 66, 0.2);
}
.button-third:not(:disabled):active {
  transform: translateY(4px);
  box-shadow: inset 1px 1px 4px #c9c8c7;
  transition: all 0.1s ease;
}
.button-third:not(:disabled):focus,
.button-third:not(:disabled):hover {
  opacity: 0.8;
}
</style>
