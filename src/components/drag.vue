<template>
  <div>
    <h1>{{ question.questionTitle }}</h1>

    <span v-for='(item, index) in repeatDropZone'>
      <drop class="drop" @drop="handleDrop(item, ...arguments)">
        <drag v-show="answArra[index] != null" class="drag" @drag="handleDrag(answArra[index], ...arguments)" :transfer-data="{ answer: answArra[index] }">
            {{answArra[index]}}
        </drag>
      </drop>
    {{ item }}
    </span>
    {{answArra}}
    <ul>
      <li v-for='answer in question.answers'>
        <drop class="drop">
          <drag v-if="!answer.moved" class="drag" :transfer-data="{ answer }">{{ answer.word }}</drag>
        </drop>
      </li>
    </ul>
    <!--<span v-for='(item, index) in repeatDropZone'>
      <drop v-for='answer in question.answers' class="drop" @drop="handleDrop(answer, ...arguments)">
        <drag v-if="answer.moved" class="drag" :transfer-data="{ answer }">{{ answer.word }}</drag>
      </drop>{{ answer }}
    </span>-->

    <button :class="hideVerifyButton" :disabled="!allAnswerChecked" v-on:click="verifyAnswer">Verificar</button>
    <div :class="feedbackStyleClass">
      <button  v-on:click="showNextQuestion">Continuar</button>
    </div> 
  </div>
</template>

<script>

export default {
  props: ['singleQuestion'],
  name: 'CompleteQuestion',
  data () {
    return {
      question: this.singleQuestion,
      trueFalseAnswer: [],
      feedback: null,
      selected: 'vazio',
      answArra: []
    }
  },
  computed: {
    repeatDropZone: function () {
      var arrayQuest = this.question.answerDescription.split(/{{.*?}}/g)
      arrayQuest = arrayQuest.filter(function(e){return e});
      for(var i=0; i<=arrayQuest.length; i++){
        //this.answArra.push({i: ''})
      }
      return arrayQuest
    },
    feedbackStyleClass: function () {
      return (this.feedback === null) ? 'hide' : (this.feedback) ? 'right' : 'wrong'
    },

    hideVerifyButton: function () {
      return (this.feedbackStyleClass !== 'hide') ? 'hide' : ''
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
    handleDrop ( index, data ) {
      self=this
      this.question.answers.map(function(ele){
        if(data.answer.word == ele.word){
          ele.moved = true
          self.answArra.push({word: ele.word})
        }
      })


      //console.log(this.answArra)
    },
    handleDrag ( index, data ) {
      self = this
      this.question.answers.map(function(ele){
        if(data.answer.word == ele.word){
          ele.moved = false
          self.answArra.filter(function(e){
            if(e.word == ele.word)
              console.log(ele.word)
              return false
          });
        }
      })

      console.log(self.answArra)
    },
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
    }
  }
}
</script>

<style lang='css'>
  .drag,
.drop {
  font-family: sans-serif;
  display: inline-block;
  border-radius: 10px;
  background: #ccc;
  position: relative;
  padding: 30px;
  text-align: center;
  vertical-align: top;
}

.drag {
  color: #fff;
  cursor: move;
  background: #777;
  border-right: 2px solid #555;
  border-bottom: 2px solid #555;
}

.drop {
  background: #eee;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ccc;
}
</style>