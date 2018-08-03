<template>

  <div>
    <ul class="ucb-progress-bar">
      <li v-for="(question, index) in lesson.questions">
        <div v-if="currentQuestion >= index" class="completed"></div>
      </li>
    </ul>
    <h5>{{ lesson.intro.title }}</h5>
    <div v-for="(question, index) in lesson.questions">

      <div v-if="currentQuestion === index && question.type === 'radio'">
        <radio-question :singleQuestion="question" />
      </div>

      <div v-if="currentQuestion === index && question.type === 'true-false'">
        <true-false-question :singleQuestion="question" />
      </div>

       <div v-if="currentQuestion === index && question.type === 'complete'">
        <complete-question :singleQuestion="question" />
      </div>

      <div v-if="currentQuestion === index && question.type === 'content'">
        <content-component :singleQuestion="question" />
      </div>

      <div ></div>

    </div>

  </div>

</template>

<script>

import RadioQuestion from './RadioQuestion.vue'
import TrueFalseQuestion from './TrueFalseQuestion.vue'
import CompleteQuestion from './CompleteQuestion.vue'
import ContentComponent from './ContentComponent.vue'

export default {
  props: ['singleLesson'],
  name: 'Questions',
  data () {
    return {
      lesson: this.singleLesson,
      currentQuestion: 0,
      questionAnswer: null,
      checkAnswer: true,
      totalRightAnswers: 0
    }
  },
  components: {
    'radio-question': RadioQuestion,
    'true-false-question': TrueFalseQuestion,
    'complete-question': CompleteQuestion,
    'content-component': ContentComponent
  },
  computed: {
    progressBarClass: function () {
      return (this.index === this.currentQuestion) ? 'completed' : ''
    }
  },
  created: function () {
    let self = this

    this.$root.$on('continue-lesson', function () {
      if (self.currentQuestion !== self.lesson.questions.length - 1) {
        self.currentQuestion++
      } else if (self.currentQuestion === self.lesson.questions.length - 1) {
        self.$emit('finish-lesson')
      }
    })

    this.$root.$on('answer-correct', function () {
      self.totalRightAnswers++
      this.$root.$emit('correct-answer-counter', self.totalRightAnswers)
    })
  }
}
</script>
