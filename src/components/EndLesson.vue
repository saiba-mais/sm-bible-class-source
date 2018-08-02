<template>
  <div class="end-lesson">

    <div class="lesson-conclusion-feedback">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="134" height="134" viewBox="0 0 134 134"><g fill="#71456D" fill-rule="evenodd"><path d="M67,134 C30.05352,134 0,103.94648 0,67 C0,30.05352 30.05352,0 67,0 C103.94648,0 134,30.05352 134,67 C134,103.94648 103.94648,134 67,134 Z M67,11.40608 C36.3408,11.40608 11.40608,36.3408 11.40608,67 C11.40608,97.6592 36.34616,122.59392 67,122.59392 C97.6592,122.59392 122.59392,97.65384 122.59392,67 C122.59392,36.3408 97.65384,11.40608 67,11.40608 Z"/><polygon stroke="#71456D" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" points="58.738 81.507 44.748 67.519 40 72.265 58.738 91 99 50.747 94.252 46"/></g></svg>
      </div>
      <div v-if="studentPerformance === 0">
        <h1>{{ $t('endlessonLowScoreTitle') }}</h1>
        <p>{{ $t('endlessonLowPerformance') }}</p>
        <a href="#" class="ucb-try-again" v-on:click="startAgain">{{ $t('endlessonTryAgain') }}</a>
      </div>
      <div v-if="studentPerformance === 1">
        <h1>{{ $t('endlessonLowScoreTitle') }}</h1>
        <p>{{ $t('endLessonRegularPerformancePrefix') }} {{ correctAnswerCounter }} {{ $t('endLessonPerformanceSuffixSingular') }}</p>
        <a href="#" class="ucb-try-again" v-on:click="startAgain">{{ $t('endlessonTryAgain') }}</a>
      </div>
      <div v-if="studentPerformance === 2">
        <h1>{{ $t('endlessonLowScoreTitle') }}</h1>
        <p>{{ $t('endLessonRegularPerformancePrefix') }} {{ correctAnswerCounter }} {{ $t('endLessonPerformanceSuffix') }}</p>
        <a href="#" class="ucb-try-again" v-on:click="startAgain">{{ $t('endlessonTryAgain') }}</a>
      </div>
      <div v-if="studentPerformance === 3">
        <h1>{{ $t('endlessonRegularScoreTitle') }}</h1>
        <p>{{ $t('endLessonRegularPerformancePrefix') }} {{ correctAnswerCounter }} {{ $t('endLessonPerformanceSuffix') }}</p>
        <a href="#" class="ucb-try-again" v-on:click="startAgain">{{ $t('endlessonTryAgain') }}</a>
      </div>
      <div v-if="studentPerformance === 4">
        <h1>{{ $t('endlessonHighScoreTitle') }}</h1>
        <p>{{ $t('endLessonHighPerformancePrefix') }}  {{ correctAnswerCounter }} {{ $t('endLessonPerformanceSuffix') }}</p>
        <a href="#" class="ucb-try-again" v-on:click="startAgain">{{ $t('endlessonTryAgain') }}</a>
      </div>
    </div>
    
    <div class="teste">

      <div v-if="formSuccess === false">
        <h2>{{ $t('endlessonFormLearnMore') }}</h2>
        <p>{{ $t('endlessonFormLearnMoreDescription') }}</p>

        <form v-on:submit.prevent="sendStudentDataAjax" method="post" name="ucb-subscribe-form" class="validate">
          <div class="mc-field-group">
            <input type="text" value="" v-model="fullName" name="NAME" class="required" v-bind:placeholder="$t('endlessonFormName')">
          </div>
          <div class="mc-field-group">
            <input type="email" value="" v-model="email" name="EMAIL" class="required email" v-bind:placeholder="$t('endlessonFormEmail')">
          </div>
          <div class="mc-field-group">
             <input type="tel" value="" v-model="telephone" name="TELEPHONE" class="required" v-bind:placeholder="$t('endlessonFormTelephone')">
          </div>
          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_fc30b6c698bf429070a81fa74_4506869833" tabindex="-1" value=""></div>
          <p v-if="errors.length" class="validation-feedback">
            <small>{{ $t('endlessonFormMandatoryFields') }}</small>
          </p>
          <div class="clear end-lesson-buttons">
            <a href="https://saibamais.org.br/cursos/" class="ucb-saiba-mais-lessons">{{ $t('endlessonAllLessonsButton') }}</a>
            <input v-on:click="checkForm" type="submit" v-bind:value="$t('endlessonFormSubmit')" name="subscribe" id="mc-embedded-subscribe" class="button end-lesson-button pull-right">
          </div>
        </form>
      </div>

      <div v-if="formSuccess === true">
        <h2>{{ $t('enlessonFeedbackTitle') }}</h2>
        <p>{{ $t('enlessonFeedbackDescription') }}</p>
        <div class="clear end-lesson-buttons">
          <a href="https://saibamais.org.br/cursos/" class="ucb-saiba-mais-lessons">{{ $t('endlessonAllLessonsButton') }}</a>
          <a class="saiba-mais-logo pull-right" href="https://saibamais.org.br">{{ $t('endlessonLearnMoreBrand') }}</a>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  props: ['singleLesson', 'correctAnswerCounter', 'currentLesson'],
  name: 'EndLesson',
  data () {
    return {
      totalAnswers: this.singleLesson.questions.length,
      correctAnswers: this.correctAnswerCounter,
      errors: [],
      fullName: null,
      telephone: null,
      email: null,
      formSuccess: false
    }
  },
  methods: {
    checkForm: function () {
      console.log('teste')
      this.errors = []
      if (!this.email) {
        this.errors.push('O campo de email é obrigatório.')
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Preencha com um email válido.')
      }
      if (!this.fullName) this.errors.push('O campo de nome é obrigatório.')
      if (!this.telephone) this.errors.push('O campo de telefone é obrigatório.')
      if (!this.errors.length) return true
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    sendStudentDataAjax: function () {
      let formInfo = {
        nome: this.fullName,
        email: this.email,
        telefone: this.telephone,
        lessonID: this.currentLesson,
        lessonUserAnswers: this.correctAnswerCounter
      }
      this.$http.post('https://saibamais.org.br/wp-json/saibamais/v2/progress', formInfo).then(response => {
        this.formSuccess = true
        console.log(response.body)
      }, response => {
        console.log(response.body)
      })
      // this.$http.post('http://localhost:3000/posts/1', formInfo).then(response => {
      //   console.log(response.body)
      // }, response => {
      //   this.formSuccess = true
      //   console.log(response.body)
      // })
    },
    startAgain: function () {
      this.$emit('start-again')
    }
  },
  computed: {
    studentPerformance: function () {
      if (this.correctAnswers === 0) {
        return 0
      } else if (this.correctAnswers === 1) {
        return 1
      } else if (this.correctAnswers > 1 && this.correctAnswers <= this.totalAnswers * 0.2) {
        return 2
      } else if (this.correctAnswers > this.totalAnswers * 0.2 && this.correctAnswers <= this.totalAnswers * 0.6) {
        return 3
      } else if (this.correctAnswers > this.totalAnswers * 0.6) {
        return 4
      }
    }
  }
}
</script>
