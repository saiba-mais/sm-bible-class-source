<template>
  <div>
    <div v-if="currentVersicle !== null"  class="show ucb-bible-versicle" :class="[currentVersicle.appendixType, showVersiclesClass]">
      <button class="dismiss-versicles" v-on:click="hideVersicles"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path fill="#000000" fill-opacity=".158" fill-rule="evenodd" d="M1402,17 C1390.95,17 1382,25.95 1382,37 C1382,48.05 1390.95,57 1402,57 C1413.05,57 1422,48.05 1422,37 C1422,25.95 1413.05,17 1402,17 Z M1412,44.17 L1409.17,47 L1402,39.83 L1394.83,47 L1392,44.17 L1399.17,37 L1392,29.83 L1394.83,27 L1402,34.17 L1409.17,27 L1412,29.83 L1404.83,37 L1412,44.17 Z" style="mix-blend-mode:multiply" transform="translate(-1382 -17)"/></svg></button>
      <div>
          <strong v-if="currentVersicle.appendixTitle">{{ currentVersicle.appendixTitle }}</strong>
          <div class="ucb-bible-versicle-content" v-html="currentVersicle.appendixContent"></div>
      </div>
    </div>

    <div class="ucb-question radio-question">
      <h2>{{ question.questionTitle }}</h2>
      <p class="versicles-trigger" v-html="question.questionAppendix"></p>
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

    <div v-if="(fbMessengerAssistent !== null || whatsappAssistent !== null)" class="contact-teacher">
      <ul v-bind:class="showTeacherAssistent">
        <li v-if="fbMessengerAssistent" class="facebook-teacher">
          <a v-bind:href="fbMessengerAssistent" target="_blank">
            <svg width="29px" height="29px" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs></defs>
              <g id="Widget/Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Widget/Desktop/Chat" transform="translate(-839.000000, -895.000000)" fill-rule="nonzero">
                      <g id="Group-3" transform="translate(720.000000, 0.000000)">
                          <g id="Group-2-Copy" transform="translate(100.000000, 887.000000)">
                              <g id="003-messenger" transform="translate(19.000000, 8.000000)">
                                  <path d="M14.5,0.00281978138 C6.66348633,-0.151680819 0.178927734,6.06209774 0,13.8972831 C0.0204472656,17.885698 1.78667187,21.6651859 4.83331445,24.2395918 L4.83331445,28.3958732 C4.83331445,28.7295107 5.10383008,29 5.4375,29 C5.55072461,29 5.66168359,28.9681711 5.75768945,28.9081945 L9.12531445,26.8047096 C10.8410723,27.460884 12.6630312,27.7954843 14.5,27.791803 C22.3365137,27.9463036 28.8210723,21.7325251 29,13.8973397 C28.8210723,6.06209774 22.3365137,-0.151680819 14.5,0.00281978138 Z" id="Shape" fill="#FFFFFF"></path>
                                  <path d="M24.0448357,9.91649469 C23.86506,9.66867947 23.5354713,9.59452132 23.2715284,9.74248809 L16.9882726,13.2657285 L13.0793696,9.81827737 C12.8396687,9.60692955 12.4821564,9.62096892 12.2589378,9.8506087 L5.00900537,17.3072021 C4.77377905,17.55059 4.77491185,17.9440418 5.01161081,18.1859733 C5.20084538,18.379437 5.49101259,18.4223124 5.72555923,18.2914725 L12.0088151,14.7682321 L15.9213431,18.2169065 C16.161044,18.4282544 16.5185562,18.414215 16.7417749,18.1845752 L23.9917073,10.7279818 C24.2029748,10.5086531 24.2256309,10.1630283 24.0448357,9.91649469 Z" id="Shape" fill="#2196F3"></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
            </svg>
            {{ $t('facebookTeacher') }}
          </a>
        </li>
        <li v-if="whatsappAssistent" class="whatsapp-teacher">
          <a v-on:click="whatsappMessage" href="#">
            <svg width="29px" height="29px" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs></defs>
              <g id="Widget/Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Widget/Desktop/Chat" transform="translate(-841.000000, -839.000000)" fill="#FFFFFF" fill-rule="nonzero">
                      <g id="Group-3" transform="translate(720.000000, 0.000000)">
                          <g id="Group-2" transform="translate(100.000000, 831.000000)">
                              <g id="whatsapp" transform="translate(21.000000, 8.000000)">
                                  <path d="M13.7910914,0.0167710234 C6.06981558,0.381442617 -0.0233561367,6.75979709 6.73064319e-05,14.4273329 C0.00719922045,16.7626737 0.575584799,18.9669325 1.57824801,20.9145756 L0.0388033884,28.3268136 C-0.0444721958,28.7277582 0.320094468,29.0788361 0.721649195,28.9845125 L8.04395735,27.2637314 C9.92517447,28.1932348 12.0381788,28.7301163 14.2744534,28.7639618 C22.1663358,28.8835308 28.746785,22.6678151 28.9927661,14.8426341 C29.2564372,6.45456322 22.2770902,-0.384104179 13.7910914,0.0167710234 Z M22.5281755,22.346144 C20.3837768,24.47321 17.5326193,25.6446256 14.5000176,25.6446256 C12.7243109,25.6446256 11.0242584,25.2494376 9.44691671,24.470089 L8.42719285,23.9662208 L3.93786273,25.0212577 L4.88284134,20.4710468 L4.38046093,19.4952139 C3.56161931,17.9045438 3.14643004,16.1844563 3.14643004,14.3828066 C3.14643004,11.3746474 4.3273911,8.54660467 6.47178983,6.4194693 C8.59703029,4.31140671 11.494685,3.12091833 14.5002274,3.12091833 C17.5328291,3.12098768 20.3838467,4.29240328 22.5282454,6.41939994 C24.6726442,8.54646596 25.8536052,11.3745087 25.8536751,14.3825986 C25.8536052,17.3639172 24.653416,20.2381507 22.5281755,22.346144 Z" id="Shape"></path>
                                  <path d="M21.2469569,18.1011883 L18.4571088,17.2973245 C18.0903287,17.1916667 17.6953509,17.29607 17.4280966,17.5693447 L16.7458621,18.2668537 C16.4581888,18.5609672 16.0216781,18.6554739 15.6409381,18.50089 C14.3211966,17.9649343 11.5450307,15.4879688 10.8360569,14.2489981 C10.6315185,13.8916014 10.665342,13.4447858 10.9164832,13.1186822 L11.5121101,12.3454145 C11.7454714,12.0424497 11.7947134,11.6355695 11.6403894,11.2853513 L10.4666376,8.62139369 C10.1854928,7.98333461 9.37296494,7.79759704 8.84213745,8.24810648 C8.06350251,8.90895587 7.13964183,9.91319326 7.02733671,11.0257369 C6.82932687,12.9872372 7.66762175,15.4598816 10.8376543,18.4288949 C14.4998986,21.8589416 17.432611,22.3120995 19.3420759,21.8479298 C20.4251223,21.5846912 21.2906427,20.5293673 21.8368887,19.6652869 C22.2092944,19.0761538 21.9152314,18.293756 21.2469569,18.1011883 Z" id="Shape"></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
            </svg>
            {{ $t('whatsappTeacher') }}
          </a>
        </li>
      </ul>
      <span v-on:click="toggleTeacherAssistent">
        <svg width="55px" height="55px" viewBox="0 0 55 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs></defs>
          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Chat-Button-Desktop" fill="#F43067" fill-rule="nonzero">
                  <g id="002-speech-bubble">
                      <path d="M27.5,55 C12.3121694,55 0,42.6878306 0,27.5 C0,12.3121694 12.3121694,0 27.5,0 C42.6878306,0 55,12.3121694 55,27.5 C55,42.6878306 42.6878306,55 27.5,55 Z M17.293687,37.9144374 C19.3794529,39.2343507 21.8492909,40.0006612 24.5004135,39.9999996 C31.955414,39.9999996 38,33.9551939 38,26.4998344 C38,19.0444748 31.955414,13 24.5004135,13 C17.0440898,13 11,19.0444748 11,26.4998344 C11,28.972108 11.6684044,31.2877452 12.8278984,33.2808473 L11.1445646,39.5616825 L17.293687,37.9144374 Z M43.8687569,41.6067416 L42.3491956,35.9820876 C43.3966762,34.1968735 44,32.1232698 44,29.9092982 C44,25.8085002 41.9388763,22.1864517 38.7880574,20 C39.6515677,21.8848722 40.1376105,23.974597 40.1376105,26.1758671 C40.1376105,33.7723498 34.402174,40.0623677 27,41.0231233 C28.4745543,41.6511969 30.0975989,42 31.8042514,42 C34.1979999,42 36.4286391,41.313304 38.3138412,40.1315747 L43.8687569,41.6067416 Z" id="Combined-Shape"></path>
                  </g>
              </g>
          </g>
        </svg>
      </span>
      <div class="arrow" v-bind:class="showTeacherAssistent">
        <svg width="34px" height="34px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs></defs>
          <g id="Widget/Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Widget/Desktop/Chat" transform="translate(-844.000000, -956.000000)" fill="#E22D2D" fill-rule="nonzero">
                  <g id="Group-3" transform="translate(720.000000, 0.000000)">
                      <g id="share" transform="translate(141.340931, 973.340931) rotate(-180.000000) translate(-141.340931, -973.340931) translate(124.840931, 956.840931)">
                          <path d="M32.6837825,8.34952681 L32.6848138,8.34849556 C32.685845,8.34694868 32.6868763,8.34540181 32.6879075,8.34333931 C32.7765959,8.24279248 32.8415653,8.12162066 32.8936439,7.99374572 C32.910144,7.95455824 32.9209723,7.91743325 32.9328317,7.87773015 C32.9627383,7.77924582 32.981301,7.67715211 32.9874885,7.57041779 C32.9905823,7.5312303 32.9967699,7.49410532 32.9957386,7.45388659 C32.9957386,7.4332616 33.0008949,7.41469911 32.9998636,7.39458974 C32.9926448,7.27135542 32.9678946,7.1522461 32.929738,7.04035553 C32.9266442,7.02849616 32.9183941,7.01921491 32.9142691,7.00735554 C32.8688936,6.88412122 32.8039243,6.77480877 32.7270954,6.67477757 C32.7162672,6.6608557 32.7126578,6.64229321 32.7013139,6.62837134 L27.3846539,0.365592931 C26.9778219,-0.113938101 26.3100811,-0.123219347 25.8924209,0.346514815 C25.4757919,0.815733352 25.4680575,1.5850455 25.8759207,2.06560778 L28.7417918,5.44243438 C24.5543613,4.88762213 20.4380877,5.76882485 20.2436952,5.81213733 C7.53548031,8.11543316 -1.45762103,19.8510528 0.196004109,31.9728755 C0.277989265,32.5730627 0.726071661,33 1.23706091,33 C1.29171768,33 1.34637445,32.9953594 1.40206248,32.9860781 C1.97750546,32.8814063 2.37041546,32.2595628 2.28069585,31.5959538 C0.807541187,20.7987712 9.01276002,10.3099322 20.6046361,8.20824562 C20.657746,8.19587063 24.9106615,7.28321479 28.9150435,7.91227701 L24.4924857,10.5383539 C23.9742776,10.8466976 23.7716351,11.579916 24.0382157,12.1764938 C24.3042808,12.7741029 24.9395368,13.0056184 25.4592918,12.7008842 L32.4306082,8.56144859 C32.5249685,8.50421424 32.6095318,8.4325424 32.6837825,8.34952681 Z" id="Shape" transform="translate(16.500000, 16.500000) scale(-1, 1) rotate(-270.000000) translate(-16.500000, -16.500000) "></path>
                      </g>
                  </g>
              </g>
          </g>
        </svg>
      </div>
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
      showVersiclesClass: null,
      feedbackAnswer: null,
      descriptionVersicleTrigger: '',
      appendixId: null,
      borderFeedback: [],
      showTeacherAssistent: 'hide',
      fbMessengerAssistent: (this.$root.$data.messenger) ? 'https://m.me/' + this.$root.$data.messenger : null,
      whatsappAssistent: (this.$root.$data.whatsapp) ? this.$root.$data.whatsapp : null
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

    for (let i = 0; i < this.question.appendix.length; i++) {
      if (this.question.appendix[i].autoOpen === true) {
        this.currentVersicle = this.question.appendix[i]
        this.showVersiclesClass = 'showAppendix'
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
      this.showVersiclesClass = 'hideAppendix'
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
      let appendixId = e.target.getAttribute('data-versicle')
      for (let index = 0; index < this.question.appendix.length; ++index) {
        if (this.question.appendix[index].appendixId === appendixId) {
          this.currentVersicle = this.question.appendix[index]
          this.showVersiclesClass = 'showAppendix'
        }
      }
    },
    whatsappMessage: function () {
      window.open('https://api.whatsapp.com/send?phone=' + this.whatsappAssistent)
    }
  }
}
</script>
