const btn = document.getElementById('btn')
const int = document.getElementById('input')
const span_text = document.getElementById('input_text_span');
const err = document.getElementById('error')

const input_problem = document.getElementById('input_problem')
let problem_arr;
let left_max;
let right_max ;
let output_arr = [];


function createProblemSetUp() {
    for(let i=0; i<10; i++) {
        let div = document.createElement('div')
        div.id = `${i}`

        for(let j=0; j<10; j++) {
            let child_div = document.createElement('div')
            child_div.id = `${i},${j}`
            child_div.classList.add('simple')
            div.append(child_div)
        }
        input_problem.append(div)
    }
}

createProblemSetUp()


btn.addEventListener('click', getInput)

function getInput() {
    problem_arr = int.value.split(' ');
    let flag = false;
    


    problem_arr.forEach(element => {
        if(element <0 || element >10 || element === ''){
            flag = true;
            err.innerHTML = "All element should be less 10 or greater than -1"
            int.value = ""
            return;
        }
    });

    if(!flag){
        err.innerHTML = ""
        span_text.innerHTML = `[${problem_arr}]`
        let ans = -1;
        left_max = problem_arr.map((ele,ind) =>{
            ans = Math.max(ans,ele)
            return ans;
        })

        let r_max = 0;
        right_max = [...problem_arr]

        for(let i=problem_arr.length-1; i>=0; i--){
            r_max = Math.max(r_max, problem_arr[i])
            right_max[i] = r_max
        }

        output_arr = [];

        problem_arr.forEach((ele,ind) =>{
            let temp = Math.min(left_max[ind],right_max[ind]) - ele
            output_arr.push(temp)
        })

        console.log(output_arr);

    }
}