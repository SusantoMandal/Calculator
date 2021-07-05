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

// let oneField = document.querySelector('#a');
// let twoField= document.querySelector('#b');
// let threeField = document.querySelector('#c');
// let sym = document.querySelector('.symbol');

// oneField.addEventListener('change',(e)=>{
//     threeField.value=sum(Number(oneField.value))(Number(twoField.value));
// });
// twoField.addEventListener('change',(e)=>{
//     threeField.value=sum(Number(oneField.value))(Number(twoField.value));
// }); 

// calc.addEventListener('click', (e)=>{
//     let temp=e.target;
//     oneField.value = oneField.value+temp.value;
//     console.log(temp.value);
// });


let answer = document.querySelector('#field');
let bd = document.querySelector('.calc');
let symbol = '?';
let temp = '0' ;
let afterCalulation = false;

bd.addEventListener('click',(e)=>{

    let event = e.target;

    /*
    * event to input the values from 0-9[.]
    */
    if(event.className=='num digit')
    {   
        if(answer.value=='0'){
            answer.value=event.value;
        }
        else if(answer.value!='0' && afterCalulation && symbol=='?'){
            answer.value=event.value;
            afterCalulation = false;
        }
        else if(!answer.value.includes('.') || event.value!='.'){
            answer.value=answer.value+event.value;
        }
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
        if(symbol!='?'){
            temp = calculator(Number(temp),Number(answer.value));
            symbol = event.value;
        }
        else{
            temp =  answer.value;
            answer.value = '0';
            symbol = event.value;
        }
    }

    /*
    * event for equal operation
    */
    else if(event.id=='equal')
    {
        answer.value=calculator(Number(temp),Number(answer.value));
        symbol='?';
        afterCalulation = true;
    }


    // else if(e.target.id=='clear')
    // {
    //     oneField.value="";
    //     twoField.value="";
    //     threeField.value="";
    //     sym.inneranswer.value="?";
    // }
    // else if(document.querySelector(".symbol").inneranswer.value == '?')
    // {
    //         let temp=e.target;
    //         oneField.value = oneField.value+temp.value;
    // }
    // else
    // {
    //         let temp=e.target;
    //         twoField.value = twoField.value+temp.value;
    // }

});





