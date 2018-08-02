<template>
  <div>
    <div v-if="currentVersicle !== null"  class="show ucb-bible-versicle">
      <button class="dismiss-versicles" v-on:click="hideVersicles"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path fill="#000000" fill-opacity=".158" fill-rule="evenodd" d="M1402,17 C1390.95,17 1382,25.95 1382,37 C1382,48.05 1390.95,57 1402,57 C1413.05,57 1422,48.05 1422,37 C1422,25.95 1413.05,17 1402,17 Z M1412,44.17 L1409.17,47 L1402,39.83 L1394.83,47 L1392,44.17 L1399.17,37 L1392,29.83 L1394.83,27 L1402,34.17 L1409.17,27 L1412,29.83 L1404.83,37 L1412,44.17 Z" style="mix-blend-mode:multiply" transform="translate(-1382 -17)"/></svg></button>
      <div>
          <strong v-if="currentVersicle.bibleVersicle">{{ currentVersicle.bibleVersicle }}</strong>
          <div class="ucb-bible-versicle-content" v-html="currentVersicle.versicleText"></div>
      </div>
    </div>

    <div class="ucb-question radio-question">
      <h2>{{ question.questionTitle }}</h2>
      <p class="versicles-trigger" v-html="question.questionVersicles"></p>
      <ul class="ucb-answers">
        <li v-for="answer, index in question.answers" v-bind:class="borderFeedback[index]" >
          <input v-bind:id="'question-answer-' + index" class="question-answer" type="radio" name="radio-answer" v-model="picked" :value="answer.value" /><label v-bind:for="'question-answer-' + index">{{ answer.text }}</label>
        </li>
      </ul>
      <p v-html="question.description"></p>
    </div>   
    <div class="verify-answer" :class="verifyStyleClass">
      <button :class="hideVerifyButton" class="verify-btn pull-right" :disabled="checkAnswer" v-on:click="verifyAnswer">{{ $t('questionButtonVerify') }}</button>
      <div :class="feedbackStyleClass">
        <div class="answer-feedback">
          <h5>{{ (feedbackStyleClass === 'feedback-right') ? $t('questionFeedbackTitleCorrect') : $t('questionFeedbackTitleWrong') }}</h5>
          <p>{{ (feedbackStyleClass === 'feedback-wrong') ?  $t('questionFeedbackDescriptionWrong') : $t('questionFeedbackDescriptionCorrect') }}</p>
        </div>
        <button class="btn-continue-lesson" :class="showAnswerButton" v-on:click="showNextQuestion">{{ $t('questionButtonContinue') }}</button>
      </div>
    </div>

    <div class="contact-teacher">
      <ul v-bind:class="showTeacherAssistent">
        <li class="facebook-teacher"><a href="https://m.me/adventistassp" target="_blank">{{ $t('facebookTeacher') }}</a></li>
        <li class="whatsapp-teacher"><a v-on:click="whatsappMessage" href="#">{{ $t('whatsappTeacher') }}</a></li>
      </ul>
      <span v-on:click="toggleTeacherAssistent"></span>
    </div>
    <div class="contact-teacher-overlay" v-bind:class="showTeacherAssistent"></div>

  </div>
</template>

<script>

export default {
  props: ['singleQuestion'],
  name: 'RadioQuestion',
  data () {
    return {
      currentVersicle: null,
      question: this.singleQuestion,
      picked: false,
      checkAnswer: true,
      feedback: null,
      showVersiclesClass: 'hide',
      feedbackAnswer: null,
      descriptionVersicleTrigger: '',
      versicleId: null,
      borderFeedback: [],
      showTeacherAssistent: 'hide'
    }
  },

  computed: {
    feedbackStyleClass: function () {
      return (this.feedback === null) ? 'hide' : (this.feedback) ? 'feedback-right' : 'feedback-wrong'
    },
    verifyStyleClass: function () {
      return (this.hideVerifyButton !== 'hide') ? '' : (this.feedback) ? 'right' : 'wrong'
    },
    hideVerifyButton: function () {
      return (this.feedbackStyleClass !== 'hide') ? 'hide' : ''
    },
    showAnswerButton: function () {
      return (this.feedback === null) ? 'hide' : (this.verifyStyleClass) ? 'show' : 'hide'
    }
  },

  watch: {
    picked: function (newPicked) {
      if (newPicked !== false) {
        this.checkAnswer = false
      }
    },
    descriptionVersicleTrigger: function () {
      let self = this
      let versicleTrigger = document.getElementsByClassName('versicle-trigger')
      for (let index = 0; index < versicleTrigger.length; ++index) {
        versicleTrigger[index].addEventListener('click', self.openVersicleContent)
      }
    }
  },
  created: function () {
    this.descriptionVersicleTrigger = this.versicleArea()

    for (let i = 0; i < this.question.versicles.length; i++) {
      if (this.question.versicles[i].autoOpen === true) {
        this.currentVersicle = this.question.versicles[i]
      }
    }
  },
  methods: {
    verifyAnswer: function () {
      if (this.picked === 'true') {
        this.$root.$emit('answer-correct')
        this.feedback = true
      } else {
        this.feedback = false
      }

      for (let index = 0; index < this.question.answers.length; ++index) {
        if (this.question.answers[index].value === 'true') {
          this.borderFeedback[index] = 'correct-answer'
        } else {
          this.borderFeedback[index] = 'wrong-answer'
        }
      }
    },
    showNextQuestion: function () {
      this.$root.$emit('continue-lesson')
    },
    showVersicles: function () {
      this.showVersiclesClass = 'show'
    },
    hideVersicles: function () {
      this.currentVersicle = null
    },
    toggleTeacherAssistent: function () {
      if (this.showTeacherAssistent === 'hide') {
        this.showTeacherAssistent = 'show'
      } else {
        this.showTeacherAssistent = 'hide'
      }
    },
    versicleArea: function () {},
    openVersicleContent: function (e) {
      let versicleId = e.target.getAttribute('data-versicle')
      for (let index = 0; index < this.question.versicles.length; ++index) {
        if (this.question.versicles[index].versicleId === versicleId) {
          this.currentVersicle = this.question.versicles[index]
        }
      }
    },
    whatsappMessage: function () {
      window.open('https://api.whatsapp.com/send?phone=554888080980')
    }
  }
}
</script>
