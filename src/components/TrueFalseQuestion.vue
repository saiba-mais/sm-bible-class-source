<template>
  <div>

    <div v-if="currentVersicle !== null"  class="show ucb-bible-versicle">
      <button class="dismiss-versicles" v-on:click="hideVersicles"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path fill="#000000" fill-opacity=".158" fill-rule="evenodd" d="M1402,17 C1390.95,17 1382,25.95 1382,37 C1382,48.05 1390.95,57 1402,57 C1413.05,57 1422,48.05 1422,37 C1422,25.95 1413.05,17 1402,17 Z M1412,44.17 L1409.17,47 L1402,39.83 L1394.83,47 L1392,44.17 L1399.17,37 L1392,29.83 L1394.83,27 L1402,34.17 L1409.17,27 L1412,29.83 L1404.83,37 L1412,44.17 Z" style="mix-blend-mode:multiply" transform="translate(-1382 -17)"/></svg></button>
      <div>
          <strong v-if="currentVersicle.bibleVersicle">{{ currentVersicle.bibleVersicle }}</strong>
          <div class="ucb-bible-versicle-content" v-html="currentVersicle.versicleText"></div>
      </div>
    </div>

    <div class="ucb-question true-false-question">
      <h2>{{ question.questionTitle }}</h2>
      <p class="versicles-trigger" v-html="question.questionVersicles"></p>
      <ul class="ucb-answers">
        <li v-for="(answer, index) in question.answers" v-bind:class="borderFeedback[index]">
          <div class="question-answer-group">
            <label v-bind:for="index + '-true-answer'"></label>
            <label v-bind:for="index + '-false-answer'"></label>
            <input v-bind:id="index + '-true-answer'" class="question-answer true-answer" type="radio" v-model="trueFalseAnswer[index]" :name="index" value="true" />
            <input v-bind:id="index + '-false-answer'" class="question-answer false-answer" type="radio" v-model="trueFalseAnswer[index]" :name="index" value="false" />
            <span v-on:click="changeSelectedInput(index)" class="toggle-button"></span>
          </div>
          <div>{{ answer.text }}</div>
        </li>
      </ul>
      <p v-html="question.description"></p>
    </div>
    <div class="verify-answer" :class="verifyStyleClass">
      <button :class="hideVerifyButton" class="verify-btn pull-right" :disabled="!allAnswerChecked" v-on:click="verifyAnswer">{{ $t('questionButtonVerify') }}</button>
      <div :class="feedbackStyleClass">
        <div class="answer-feedback">
          <h5>{{ (feedbackStyleClass === 'feedback-right') ? $t('questionFeedbackTitleCorrect') : $t('questionFeedbackTitleWrong') }}</h5>
          <p>{{ (feedbackStyleClass === 'feedback-wrong') ? wrongAnswerCounter : $t('questionFeedbackDescriptionCorrect') }}</p>
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
  name: 'TrueFalseQuestion',
  data () {
    return {
      currentVersicle: null,
      question: this.singleQuestion,
      trueFalseAnswer: [],
      feedback: null,
      showVersiclesClass: 'hide',
      descriptionVersicleTrigger: '',
      versicleId: null,
      borderFeedback: [],
      wrongAnswerCounter: 0,
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
    },

    allAnswerChecked: function () {
      if (this.trueFalseAnswer.length !== this.question.answers.length) {
        return false
      }

      for (let i = 0; i < this.trueFalseAnswer.length; i++) {
        if (!this.trueFalseAnswer[i]) {
          return false
        }
      }

      return true
    }
  },
  methods: {
    showNextQuestion: function () {
      this.$root.$emit('continue-lesson')
    },

    verifyAnswer: function () {
      let feedback = true
      for (var i = 0; i < this.trueFalseAnswer.length; ++i) {
        if (this.trueFalseAnswer[i] !== this.question.answers[i].value) {
          feedback = false
          break
        }
      }

      this.feedback = feedback

      for (let index = 0; index < this.trueFalseAnswer.length; ++index) {
        if (this.trueFalseAnswer[index] === this.question.answers[index].value) {
          this.borderFeedback[index] = 'correct-answer'
        } else {
          this.borderFeedback[index] = 'wrong-answer'
          this.wrongAnswerCounter++
        }
      }

      if (this.wrongAnswerCounter > 1) {
        this.wrongAnswerCounter = this.wrongAnswerCounter + ' ' + this.$t('questionFeedbackPerformancePlural')
      } else {
        this.wrongAnswerCounter = this.wrongAnswerCounter + ' ' + this.$t('questionFeedbackPerformanceSingular')
      }

      if (this.feedbackStyleClass === 'right') {
        this.$root.$emit('answer-correct')
      }
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
    changeSelectedInput: function (index) {
      let trueAnswerRadio = document.getElementById(index + '-true-answer')
      let falseAnswerRadio = document.getElementById(index + '-false-answer')

      trueAnswerRadio.dispatchEvent(new Event('change'))

      if (trueAnswerRadio.checked) {
        falseAnswerRadio.dispatchEvent(new Event('change'))
      } else {
        trueAnswerRadio.dispatchEvent(new Event('change'))
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
  },
  watch: {
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
  }
}
</script>
