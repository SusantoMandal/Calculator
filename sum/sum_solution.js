/*
* calculator function which uses eval()
* to calculate the values
*/
let calculator = function(a,b)
{   
    if(symbol=='X'){
        return eval(a+'*'+b)
    }
    return eval(a+symbol+b);
};

let answer = document.querySelector('#field');
let bd = document.querySelector('.calc');
let symbol = '?';
let temp = '0' ;
let afterCalulation = false;
let afterSymbol = false;
let bodmassValue = '0';
let bodmassSymbol = '?';

bd.addEventListener('click',(e)=>{

    let event = e.target;

    /*
    * event to input the values from 0-9[.]
    */
    if(event.className=='num digit')
    {   
        if(answer.value=='0' || afterSymbol){
            answer.value=event.value;
        }
        else if(answer.value!='0' && afterCalulation && symbol=='?'){
            answer.value=event.value;
            afterCalulation = false;
        }
        else if(!answer.value.includes('.') || event.value!='.'){
            answer.value=answer.value+event.value;
        }
        afterSymbol = false;
    }

    /*
    * event to implement 
    * 1. AC all clear function
    * 2. C function to delete one charcater
    * 3. % perectnage formula
    */
    else if(event.className=='num letter'){

        if(event.id=='AC'){
            answer.value='0';
            symbol='?';
            temp = 0;
            afterCalulation = false;
        }
        else if(event.id=='clear'){
            if(answer.value.length==1){
                answer.value='0';
            }
            else{
                answer.value = answer.value.slice(0,answer.value.length-1);
            }
        }
        else if(event.id=='per'){
            answer.value = answer.value/100;
        }
    }

    /*
    * event to handle operations like
    * addition,subtract,multiply,divide
    */
    else if(event.className=='num symbol' && event.id!='equal')
    {   
        if(symbol == '?' && answer.value == '0'){
            answer.value = '0';
        }
        else if(bodmassSymbol != '?' && (event.id=='plus' || event.id=='minus')){
            temp = eval(bodmassValue + bodmassSymbol + calculator(Number(temp),Number(answer.value)));
            answer.value = temp;
            symbol = event.value;
            bodmassValue = '0';
            bodmassSymbol = '?';
        }
        // else if(bodmassSymbol != '?' && (event.id=='div' || event.id=='mul')){
        //     temp = calculator(Number(temp),Number(answer.value));
        //     answer.value = '0';
        //     symbol = event.value;
        // }
        else if((symbol=='+' || symbol=='-') && (event.id=='mul' || event.id=='div')){
            bodmassValue = temp;
            bodmassSymbol = symbol;
            temp = answer.value;
            symbol = event.value;
            // answer.value = '0';
        }
        else if(symbol!='?' || (bodmassSymbol != '?' && (event.id=='div' || event.id=='mul'))){
            temp = calculator(Number(temp),Number(answer.value));
            answer.value = temp;
            symbol = event.value;
        }
        else{
            temp =  answer.value;
            // answer.value = '0';
            symbol = event.value;
        }
        afterSymbol = true;
    }

    /*
    * event for equal operation
    */
    else if(event.id=='equal')
    {
        if(bodmassSymbol != '?' ){
            answer.value = eval(bodmassValue + bodmassSymbol + calculator(Number(temp),Number(answer.value)));
            symbol='?';
            afterCalulation = true;
            bodmassValue = '0';
            bodmassSymbol = '?';
        }
        else{
            answer.value=calculator(Number(temp),Number(answer.value));
            symbol='?';
            afterCalulation = true;
        }
    }
});





