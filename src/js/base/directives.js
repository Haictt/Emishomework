/**
 * Custom directive xử lý sự kiện click ra ngoài element được chọn
 */
const clickoutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (
        !(
          el === event.target ||
          el.contains(event.target) ||
          el.previousElementSibling?.contains(event.target)
        )
      ) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  beforeUnmount: (el) => {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
export default clickoutside;
