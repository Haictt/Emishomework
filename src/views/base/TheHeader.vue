<template>
  <div class="header-container flex-center" id="nav">
    <div class="header-left flex-center">
      <div class="navigation flex-center">
        <template v-for="item in items" :key="item">
          <router-link
            :to="item.Page"
            :class="[
              'menu-item',
              { 'router-link-active': $route.path === item.Page },
            ]"
          >
            <img :src="item.Img" alt="" />
            <div class="item-text">{{ item.Text }}</div>
          </router-link>
        </template>
      </div>
    </div>
    <div class="header-right flex-center">
      <Combobox
        Additional="mr-3"
        :Content="comboboxYears"
        Width="185px"
        :Placeholder="comboboxYears[0]"
        v-model="chosenYear"
      >
      </Combobox>
      <div v-for="help in helps" :key="help" class="help-container">
        <img :src="help.Img" alt="" width="24" height="24" />
      </div>
      <div class="notify-container">
        <img
          src="https://sisapapp.misacdn.net/lms/img/ic_Noti_24.9f8729e8.svg"
          alt=""
          class="icon outline-none"
        />
      </div>
      <div class="user-container header-user">
        <div class="header-avatar">
          <div class="popover-container flex-row">
            <div class="hello-message">
              <span class="hello">Xin chào, </span>
              <span class="full-name">Anh</span>
            </div>
            <img
              src="https://id.misa.vn/image/getavatar?userId=d40a861b-4249-4d17-b546-0e62b7e0f059"
              alt=""
              class="image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      items: {
        Dashboard: {
          Page: "dashboard",
          Icon: "icon-dashboard",
          Text: "Tổng quan",
          Img: "https://sisapapp.misacdn.net/lms/img/ic_chart.870683b6.svg",
        },
        Classroom: {
          Page: "classroom",
          Icon: "icon-movement",
          Text: "Lớp học",
          Img: "https://sisapapp.misacdn.net/lms/img/ic_home.47a0479b.svg",
        },
        Homework: {
          Page: "homework",
          Icon: "icon-reward",
          Text: "Học liệu",
          Img: "https://sisapapp.misacdn.net/lms/img/ic_multi.7d8b269c.svg",
        },
        Training: {
          Page: "training",
          Icon: "icon-decision",
          Text: "Đào tạo MISA EMIS",
          Img: "https://sisapapp.misacdn.net/lms/img/ic_multi.7d8b269c.svg",
        },
      },
      helps: {
        More: {
          Icon: "header-more",
          Img: "https://sisapapp.misacdn.net/lms/img/ic_Material.0dcea9c1.svg",
        },
        Setting: {
          Icon: "header-setting",
          Img: "https://sisapapp.misacdn.net/lms/img/ic_Setting_24.425ce083.svg",
        },
        Guide: {
          Icon: "header-guide",
          Img: "https://sisapapp.misacdn.net/lms/img/ic_Help_20.fbed8b0e.svg",
        },
      },
      comboboxYears: ["Năm học 2021 - 2022", "Năm học 2022 - 2023"],
      chosenYear: "Năm học 2021 - 2022",
    };
  },
  methods: {},
};
</script>

<style scoped>
.header-container {
  scrollbar-width: thin;
  width: 100%;
  height: 64px;
  min-height: 64px;
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
  z-index: 999;
  position: sticky;
  top: 0;
  justify-content: space-between;
  background-color: #fff;
}
.header-left,
.header-right,
.navigation {
  height: 100%;
  width: auto;
}
.menu-item {
  height: 100%;
  padding: 0 12px;
  margin: 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4e5b6a;
  text-decoration: none;
}
.menu-item.router-link-active {
  border-bottom: 2px solid #8a6bf6;
  font-weight: 700;
  color: #8a6bf6;
}
.menu-item.router-link-active img {
  filter: invert(69%) sepia(72%) saturate(6261%) hue-rotate(227deg)
    brightness(99%) contrast(94%);
}
.menu-item img {
  margin-right: 8px;
  filter: invert(32%) sepia(26%) saturate(344%) hue-rotate(171deg)
    brightness(100%) contrast(91%);
}
.menu-item .item-text {
  min-width: -moz-fit-content;
  min-width: fit-content;
  font-size: 16px;
}
.help-container {
  height: 40px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.notify-container {
  right: 79px;
  width: auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 8px;
  cursor: pointer;
}
.user-container {
  display: flex;
  height: 100%;
  align-items: center;
  color: #4e5b6a;
}
.header-avatar {
  top: 0;
  right: 0;
  height: 100%;
  width: auto;
  padding-right: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.header-avatar .popover-container .hello-message {
  margin: auto 16px auto 8px;
}
.header-avatar .popover-container .hello-message .full-name {
  font-weight: 700;
}
.header-avatar .popover-container .image {
  height: 47px;
  width: 47px;
  background-size: 100%;
  background-repeat: none;
  background-color: #f1f2f7;
  border: 1px solid #f1f2f7;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
}
</style>
