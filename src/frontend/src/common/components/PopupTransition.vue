<template>
  <transition name="fly" @enter="enter" @leave="leave" :css="false">
    <slot />
  </transition>
</template>

<script>
import {
  ENTER_ANIMATION_DURATION,
  LEAVE_ANIMATION_DURATION,
} from "@/common/constants";

const clearAnimations = (el, done) => {
  el.addEventListener("animationend", () => {
    el.style = "";
    done();
  });
};

export default {
  name: "PopupTransition",
  methods: {
    enter(el, done) {
      clearAnimations(el, done);
      el.style.animation = `fly ${ENTER_ANIMATION_DURATION}ms ease`;
    },
    leave(el, done) {
      clearAnimations(el, done);
      el.style.animation = `fly ${LEAVE_ANIMATION_DURATION}ms ease reverse`;
    },
  },
};
</script>

<style>
@keyframes fly {
  0% {
    opacity: 0;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
