export default function Question({question,showButton,toggleButtonOn, incrementMark, displayNext, checkFunction}){
  console.log('question running')
    console.log(question)

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5);
      }

      function handleClick(e){
      if(question.isChecked == false){
        let element = e.target
        if(element.tagName.toLowerCase() == 'span'){
            // <e className="target pa"></e>
            element = element.parentElement
            console.log(element)
        }

        console.log(e.target)
        console.log(question.answer)
       
        element.style.background = '#F9A826';
        element.style.border = 'none';
        element.style.color = 'white';

        console.log(element.tagName)
        
        console.log('same answer')
        setTimeout(function() {
            if(element.textContent == question.answer){
                
                element.style.backgroundColor  = '#60BF88'
                element.style.border = 'none'
                element.style.color = 'white';
                incrementMark()
            }else{
                element.style.backgroundColor  = '#EA8282'
                Array.from(document.querySelectorAll('ol li')).forEach(list=>{
                    if(list.textContent == question.answer){
                        list.style.backgroundColor = '#60BF88'
                        list.style.border = 'none'
                        list.style.color = 'white';
                        
                    }
                })
            }
            toggleButtonOn(question.id)
            
        }, 750)

        checkFunction(question.id)
      }else{
        return
      }
      }
           
        
        return (
            
            <div className={(question.currentlyOnId == question.id) ? 'question question--active' :' question'}>

            {question.type == 'flag' && <img className='question--image' src={question.flag} alt="flag" /> }

            <h2 className="question--title">
            {question.type == 'capital' && question.questionToAsk }
            {question.type == 'flag' && question.questionToAsk }
            {question.type == 'population' && question.questionToAsk }
                
                
                </h2>
            <ol className="answers">
              <li onClick={()=>handleClick(event)}><span>{question.answerList[0]}</span></li>
              <li onClick={()=>handleClick(event)}><span>{question.answerList[1]}</span></li>
              <li onClick={()=>handleClick(event)}><span>{question.answerList[2]}</span></li>
              <li onClick={()=>handleClick(event)}><span>{question.answerList[3]}</span></li>
            </ol>
                { showButton && <button onClick={displayNext} className='next'>Next</button>}
          </div>
        )
    
}