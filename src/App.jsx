import { useState, useEffect } from 'react'
import Question from './Question'
function App() {
  const [questions, setQuestions] = useState([])
// const [randomValue, setRandomValue] = useState(0)
const [rawApiData, setRawApiData] = useState([])
const [randomArrayChecker, setRandomArrayChecker] =useState([0,1,2])
const [questionsComponent, setQuestionsComponent] =useState([])
const [questionNumber, setQuestionNumber] = useState(0)
const [displayAnswer, setDisplayAnswer] = useState(false)
// const 
const [mark, setMark] = useState(0)
// let questionsComp

function displayNext(){
  if(questionNumber == questions.length - 1){
    console.log('ndabe nfor mbutuku na me for dos ')
    return setDisplayAnswer(true)
  }
  console.log('displaying next question')
  console.log("question number is ", questionNumber)
   return setQuestionNumber(questionNumber + 1)
  //  console.log(questions)
  
}

function checkFunction(id){
  setQuestions(oldQuestions => oldQuestions.map(question=>{
    return question.id == id ?  { ...question, isChecked:true}: question
  }))
}

useEffect(()=>{
setQuestions(oldQuestions => oldQuestions.map(question=>{
    return { ...question, currentlyOnId: questionNumber}
  }))
},[questionNumber])

function incrementMark(){
  setMark(mark + 1)
  console.log(mark)
}
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function randomNumber(){
    let num  =  Math.floor(Math.random() * 250)
    if(randomArrayChecker.includes(num)){
      return randomNumber(randomArrayChecker)
    }else{
      randomArrayChecker.push(num)
      console.log(randomArrayChecker)

      return num
    }
  }

  function toggleButtonOn(id){
    // console.log(question.id == id)
    setQuestions(oldQuestions => oldQuestions.map(question=>{
      console.log("Ids are thesame  ", question.id == id)
      return question.id === id ? {...question, checked:true}: question
    }))
    console.log("running button toggle")
    console.log(questions)
    //  cc  = questions.map(question=>{
    //   return <Question question={question} showButton = {true} toggleButtonOn = {toggleButtonOn} />
    // })
  }


  function shuffleAndSendQuestions(data){
    const shuffledArray  = shuffleArray(data)
  const questionObject = (number, array, questionType) =>
  
  {
    if(questionType == 'flag'){

      return {
        id:number,
        questionToAsk: `Which country does this flag belong to`,
        country: array[number].name,
        answer: array[number]['name'],
        wrongAnswers: [array[randomNumber()]['name'],
        array[randomNumber()]['name'],
        array[randomNumber()]['name'],
      ],
        flag:array[number].flags.png,
        type: questionType,
        checked:false,
        currentlyOnId:questionNumber,
        isChecked:false
      
      }
    }else if(questionType == 'capital'){
      return {
        id:number,
        questionToAsk: `${array[number].capital} is the capital of`,
        country: array[number].name,
        answer: array[number]['name'],
        wrongAnswers: [array[randomNumber()]['name'],
        array[randomNumber()]['name'],
        array[randomNumber()]['name']
        ],    
        type: questionType,
        checked:false,
        currentlyOnId:questionNumber,
        isChecked:false
      
      }
    }else{
      return {
        id:number,
        questionToAsk: `The population of ${array[number].name} is`,
        country: array[number].name,
        answer: array[number][`${questionType}`],
        wrongAnswers: [array[randomNumber()][`${questionType}`],
        array[randomNumber()][`${questionType}`],
        array[randomNumber()][`${questionType}`]
        ],
        type: questionType,
        checked:false,
        currentlyOnId:questionNumber,
        isChecked:false
      
      }
    }
  }
  let questionsArray = []
  questionsArray.push(questionObject(0,shuffledArray,'flag'))
  questionsArray.push(questionObject(1,shuffledArray,'capital'))
  questionsArray.push(questionObject(2,shuffledArray,'population'))

  questionsArray  = questionsArray.map(question =>{
    return {
      ...question,
      answerList:  question.type == 'flag' ?shuffleArray([question.country, ...question.wrongAnswers]) :shuffleArray([question.answer, ...question.wrongAnswers])
    }
  })
  return questionsArray
  }

  function restartGame(data){
    setQuestionNumber(0)
    setDisplayAnswer(false)
    setMark(0)
    let questionsArray  =shuffleAndSendQuestions(data)
    return setQuestions(questionsArray)
  }

 useEffect( () => {
  console.log('use effect running')
fetch('https://restcountries.com/v2/all')
.then(res=>res.json())
.then(result=>{
  console.log(result)
  restartGame(result)
  setRawApiData(result)
})

}, []);

console.log(rawApiData)

  let cc  = questions.map(question=>{
    return <Question question={question} checkFunction = {checkFunction} incrementMark  ={incrementMark} showButton = {question.checked} displayNext = {displayNext} toggleButtonOn = {toggleButtonOn} />
  })
console.log(cc.length)

  // setQuestionsComponent(cc)
  return (
    <div className="App flex-col">
    <h1>COUNTRY QUIZ</h1>
        <div className="container">
       {displayAnswer && <img className='app_img' src="/undraw_adventure_4hum 1.svg" alt="" />}
        
        {displayAnswer ?( 
          <div className='result flex-col'>
            <img className='result_img' src = '/undraw_winners_ao2o 2.svg' /> 
           <div>
           <h1>Results</h1>
            <p>You got <span>{mark}</span> correct answers</p>

            <button onClick={()=>restartGame(rawApiData)} className="endButton">Try again</button>
           </div>
          </div>)
        : 
        (<div className="questions"> {cc} </div> )}
        </div>

    </div>
  )
}

export default App
