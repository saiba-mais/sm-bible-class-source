<template>
  <div id="app" class="ucb-modal">
    <div class="ucb-iframe-content">

      <div v-if="lesson">

        <div v-if="currentStep === 'intro'">
          <lesson-intro :singleLesson="lesson" :currentLesson="0" />
          <a class="start-lesson pull-right" href="#" v-on:click="currentStep = 'questions'">{{ $t('startLesson') }} <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><polygon fill="#FFFFFF" fill-rule="evenodd" points="213 29 210.347 31.653 220.819 42.125 198 42.125 198 45.875 220.819 45.875 210.347 56.347 213 59 228 44" transform="translate(-198 -29)"/></svg></a>
        </div>  

        <div v-else-if="currentStep === 'questions'">
          <questions :singleLesson="lesson" @finish-lesson="endLesson" />
        </div>

        <div v-else-if="currentStep === 'end'">
          <end-lesson  :singleLesson="lesson" :correctAnswerCounter="totalCorrectAnswers" :currentLesson="0" />
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import LessonIntro from './components/LessonIntro.vue'
import Questions from './components/Questions.vue'
import EndLesson from './components/EndLesson.vue'

export default {
  name: 'app',
  data () {
    return {
      lesson: null,
      currentStep: 'intro',
      outOfService: false,
      totalCorrectAnswers: 0
    }
  },
  components: {
    'lesson-intro': LessonIntro,
    'questions': Questions,
    'end-lesson': EndLesson
  },
  methods: {
    getLessonJsonDataAjax: function (response) {
      this.$http.get(this.jsonSrc).then(response => {
        this.lesson = response.body
      })
    },
    endLesson: function () {
      this.currentStep = 'end'
    }
  },
  computed: {
    jsonSrc: function () {
      // return window.location.search.match(/^.*lesson=([^&]+.json).*$/g)[1]
      return /^.*lesson=([^&]+.json).*$/g.exec(window.location.href)[1]
    }
  },
  created: function () {
    let self = this
    this.$root.$on('correct-answer-counter', function (totalRightAnswers) {
      self.totalCorrectAnswers = totalRightAnswers
    })
    this.getLessonJsonDataAjax()
  }
}
</script>
