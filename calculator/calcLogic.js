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
    * eventHandler to input the values from 0-9[.]
    */
    if(event.className=='num digit')
    {   
        /* 1st condition: if input field is empty or   
         * 2nd condition: if any symbol was pressed before
         * 3rd condition: if equal was pressed
         * change input field  to the digit was pressed
         */
        if(answer.value=='0' || afterSymbol || afterCalulation){
            answer.value=event.value;
        }
        
        /* 1st condition: if input doesn't contain '.' pr 
         * 2nd condition: if '.' button is not pressed
         * update input field to pressed button
         */
        else if(!answer.value.includes('.') || event.value!='.'){
            answer.value=answer.value+event.value;
        }
        afterSymbol = false;
        afterCalulation = false;
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
        /* if no input then symbol won't effect it 
        */
        if(symbol == '?' && answer.value == '0'){
            answer.value = '0';
        }

        /* Apply BODMASS 
        */
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
        /* Apply BODMASS 
        */
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





