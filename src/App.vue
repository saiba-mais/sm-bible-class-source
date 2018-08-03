<template>
  <div id="app" class="ucb-modal">
    <v-style>
      .start-lesson,
      .end-lesson form input.end-lesson-button,
      .end-lesson form .ucb-saiba-mais-lessons:hover,
      .ucb-progress-bar li .completed {
        background-color: {{ this.$root.$data.primaryColor }};
      }

      .end-lesson form .ucb-saiba-mais-lessons:hover,
      .radio-question .ucb-answers li .question-answer:checked + label:before {
        border-color: {{ this.$root.$data.primaryColor }};
      }

      h1,
      .lesson-intro span,
      .radio-question .ucb-answers li .question-answer:checked + label:before,
      .true-false-question .ucb-answers li .question-answer-group span.toggle-button:before {
        color: {{ this.$root.$data.primaryColor }};
      }

      .lesson-intro .lesson-info div {
        color: {{ this.$root.$data.secondaryColor }};
      }

      .ucb-bible-versicle .dismiss-versicles {
        background-color: {{ this.$root.$data.lightAlphaContainerBg }};
      }

      .contact-teacher span,
      .contact-teacher-overlay,
      .true-false-question .ucb-answers li .question-answer-group span.toggle-button:before,
      .complete-question .dragArea div {
        background-color: {{ this.$root.$data.lightestContainerBg }};
      }

      .end-lesson .teste,
      .verify-answer,
      .true-false-question .ucb-answers li .question-answer-group {
        background-color: {{ this.$root.$data.lightContainerBg }};
      }

      /* border color */
      .end-lesson .teste:before { 
        border-bottom-color: {{ this.$root.$data.lightContainerBg }};
      }

      /* mq */
      @media (max-width: 991px) {
        .end-lesson .teste:before {
          border-bottom-color: {{ this.$root.$data.lightContainerBg }};
        }
      }

      .normal,
      .ucb-modal,
      .end-lesson .teste:before {
        background-color: {{ this.$root.$data.containerBg }};
      }

      .complete-question .answer-box {
        background-color: {{ this.$root.$data.darkAlphaContainerBg }};
      }

      .ucb-bible-versicle {
        background-color: {{ this.$root.$data.calloutBg }};
      }

      .ucb-answers li,
      .complete-question .drag,
      .complete-question .answer-box {
        border-color: {{ this.$root.$data.borderColor }};
      }

      .wrong button,
      .right button,
      .btn-continue-lesson,
      .contact-teacher ul li a,
      .start-lesson,
      .start-lesson:hover,
      .end-lesson form input.end-lesson-button,
      .end-lesson form input.end-lesson-button:hover,
      .end-lesson form .ucb-saiba-mais-lessons:hover,
      .verify-answer .verify-btn {
        color: {{ this.$root.$data.lightestTextColor }};
      }

      .ucb-bible-versicle .dismiss-versicles:hover {
        background-color: {{ this.$root.$data.lightTextColor }};
      }

      .ucb-modal h5 {
        color: {{ this.$root.$data.lightTextColor }};
      }

      .end-lesson form input,
      .end-lesson form .ucb-saiba-mais-lessons,
      .verify-answer .verify-btn:disabled,
      .radio-question .ucb-answers li label:before,
      .true-false-question .ucb-answers li .question-answer-group {
        border-color: {{ this.$root.$data.textColor }};
      }

      .end-lesson form .ucb-saiba-mais-lessons,
      .ucb-try-again,
      .verify-answer .verify-btn:disabled,
      .true-false-question .ucb-answers li .question-answer-group:before,
      .true-false-question .ucb-answers li .question-answer-group:after,
      .complete-question .answer-box p {
        color: {{ this.$root.$data.textColor }};
      }

      .ucb-bible-versicle,
      .end-lesson .lesson-conclusion-feedback p,
      .ucb-try-again:hover {
        color: {{ this.$root.$data.darkTextColor }};
      }

      h2,
      a,
      a:hover,
      .ucb-modal {
        color: {{ this.$root.$data.darkestTextColor }};
      }

      .feedback-right .answer-feedback,
      .right.verify-answer {
        background-color: {{ this.$root.$data.successBg }};
      }

      .right button,
      .verify-answer .verify-btn {
        background-color: {{ this.$root.$data.success }};
      }

      /* border color */
      .ucb-answers li.correct-answer,
      .complete-question .drag.border__valid,
      .complete-question .drag.correct-answer {
        border-color: {{ this.$root.$data.success }};
      }

      /* color */
      .feedback-right .answer-feedback,
      .feedback-right .answer-feedback h5 {
        color: {{ this.$root.$data.success }};
      }

      .feedback-wrong .answer-feedback,
      .verify-answer.wrong {
        background-color: {{ this.$root.$data.errorBg }};
      }

      /* 
        * $error: #e22d2d; // red
        * 6 matches
      */

      /* bg color */
      .wrong button {
        background-color: {{ this.$root.$data.error }};
      }

      /* border color */
      .ucb-answers li.wrong-answer,
      .complete-question .drag.border__invalid,
      .complete-question .drag.wrong-answer {
        border-color: {{ this.$root.$data.error }};
      }

      /* color */
      .feedback-wrong .answer-feedback, 
      .feedback-wrong .answer-feedback h5 {
        color: {{ this.$root.$data.error }};
      }
    </v-style>
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
      lesson: this.lesson,
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
      console.log(this.$root.$data)
      this.$http.get(this.$root.$data.lesson).then(response => {
        this.lesson = response.body
      })
    },
    endLesson: function () {
      this.currentStep = 'end'
    }
  },
  // computed: {
  //   jsonSrc: function () {
  //     return /^.*lesson=([^&]+.json).*$/g.exec(window.location.href)[1]
  //   }
  // },
  created: function () {
    let self = this
    this.$root.$on('correct-answer-counter', function (totalRightAnswers) {
      self.totalCorrectAnswers = totalRightAnswers
    })
    this.getLessonJsonDataAjax()
  }
}
</script>
