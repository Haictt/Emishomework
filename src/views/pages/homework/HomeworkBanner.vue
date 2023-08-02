<template>
  <div class="background-banner w-full">
    <div class="w-full h-full">
      <div class="w-full h-full relative">
        <img
          src="https://sisapapp.misacdn.net/lms/img/Backgroud_Positive.e10ee7f3.png"
          alt=""
          class="w-full h-full"
          width="998"
          style="opacity: 0.7"
        />
        <div class="current-troppy flex-column absolute">
          <div class="title-teacher hard-working">
            <h4 style="line-height: 1.75rem">
              {{ exerciseResource.Banner.Achievement }}
            </h4>
          </div>
          <img
            class="hard-working"
            src="https://sisapapp.misacdn.net/lms/img/Layer_Category_3.e59f16ba.png"
            alt=""
          />
        </div>
        <div class="total-exercise absolute hard-working">
          <div class="flex-center">
            <div class="item mr-12">
              <img
                width="193"
                height="155"
                src="https://sisapapp.misacdn.net/lms/img/Subtraction_Arrow.89f2c584.png"
                alt=""
              />
              <div class="absolute item-text">
                <h1 class="text-count">{{ exerciseResource.Banner.Total }}</h1>
                <label for="text-content">{{
                  exerciseResource.Banner.Composed
                }}</label>
              </div>
            </div>
            <div class="item mr-12">
              <img
                width="193"
                height="155"
                src="https://sisapapp.misacdn.net/lms/img/Subtraction_Arrow.89f2c584.png"
                alt=""
              />
              <div class="absolute item-text">
                <h1 class="text-count">{{ exerciseResource.Banner.Total }}</h1>
                <label for="text-content">{{
                  exerciseResource.Banner.Composed
                }}</label>
              </div>
            </div>
            <div class="item">
              <img
                width="193"
                height="155"
                src="https://sisapapp.misacdn.net/lms/img/Subtraction_Arrow.89f2c584.png"
                alt=""
              />
              <div class="absolute item-text">
                <h1 class="text-count">{{ exerciseResource.Banner.Total }}</h1>
                <label for="text-content">{{
                  exerciseResource.Banner.Composed
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="total-share absolute hard-working">
          <div style="font-size: 20px">
            <span
              >{{ exerciseResource.Banner.ShareMore }}
              <b>{{ exerciseResource.Banner.Number }}</b>
              {{ exerciseResource.Banner.To }}
              <b>{{ exerciseResource.Banner.Greater }}</b></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseResource from "../../../js/base/locale/VN/homework/exercise.js";
export default {
  name: "homework-banner",
  data() {
    return {
      exerciseResource: ExerciseResource,
    };
  },
};
</script>

<style scoped>
.background-banner {
  padding: 0.5rem;
}
.current-troppy {
  z-index: 9;
  width: 174px;
  height: 300px;
  background-image: url(https://sisapapp.misacdn.net/lms/img/Subtraction_Big.96f1c8cf.png);
  align-items: center;
  left: 3.5rem;
  top: 0;
}
.title-teacher {
  font-size: 20px;
  text-align: center;
  width: 136px;
  margin-bottom: 1rem;
  margin-top: 2.5rem;
}
.hard-working {
  color: rgb(89, 164, 239);
}
.total-exercise {
  left: 272px;
  top: 0;
}
.item-text {
  text-align: center;
  padding-left: 36px;
  padding-top: 36px;
  top: 0;
}
.text-count {
  font-size: 39px;
}
.text-content {
  font-size: 15px;
}
.total-share {
  left: 100px;
  top: 210px;
  width: 100%;
  text-align: center;
}
</style>
