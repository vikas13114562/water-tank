const btn = document.getElementById("btn");
const int = document.getElementById("input");
const span_text = document.getElementById("input_text_span");
const op_text = document.getElementById("output_text");
const err = document.getElementById("error");

const output_div = document.getElementById("output");

const input_problem = document.getElementById("input_problem");
let problem_arr;
let left_max;
let right_max;
let output_arr = [];

function createProblemSetUp(container, class_key) {
  for (let i = 0; i < 10; i++) {
    let div = document.createElement("div");
    div.id = `${class_key}_${i}`;

    for (let j = 0; j < 10; j++) {
      let child_div = document.createElement("div");

      child_div.classList.add("simple");
      child_div.classList.add(`${class_key}row${i}`);
      div.append(child_div);
    }
    container.append(div);
  }
}

createProblemSetUp(input_problem, "first");

btn.addEventListener("click", getInput);

function getInput() {
  problem_arr = int.value.split(" ");
  let flag = false;
  if (problem_arr.length > 10) {
    flag = true;
    err.innerHTML = "Problem array length should be less or equal than 10.";
    int.value = "";
    return;
  }

  problem_arr.forEach((element) => {
    if (element < 0 || element > 10 || element === "") {
      flag = true;
      err.innerHTML = "All element should be less than 10 or greater than -1";
      int.value = "";
      return;
    }
  });

  if (!flag) {
    err.innerHTML = "";
    span_text.innerHTML = `[${problem_arr}]`;
    let ans = -1;
    left_max = problem_arr.map((ele, ind) => {
      ans = Math.max(ans, ele);
      return ans;
    });

    let r_max = 0;
    right_max = [...problem_arr];

    for (let i = problem_arr.length - 1; i >= 0; i--) {
      r_max = Math.max(r_max, problem_arr[i]);
      right_max[i] = r_max;
    }

    output_arr = [];
    let output_ans = 0;

    problem_arr.forEach((ele, ind) => {
      let temp = Math.min(left_max[ind], right_max[ind]) - ele;
      output_ans += Number(temp);
      output_arr.push(temp);
    });

    let unit = output_ans > 1 ? "Units" : "Unit";

    op_text.innerHTML = `${output_ans} ${unit}`;
    

    problemSetUp(problem_arr, output_arr, "first");
    outputSetUp(output_arr, output_div);
  }
}

function problemSetUp(problem_arr, solution_arr, class_key) {
  for (let i = 0; i < problem_arr.length; i++) {
    let tar_div = document.querySelectorAll(`.${class_key}row${i}`);

    tar_div.forEach((ele) => {
      if (ele.classList.contains("water")) ele.classList.remove("water");
      if (ele.classList.contains("tower")) ele.classList.remove("tower");
    });

    for (let j = 0; j < problem_arr[i]; j++) {
      tar_div[9 - j].classList.add("tower");
    }

    let cnt = solution_arr[i];
    let k = 0;

    while (cnt != 0) {
      if (!tar_div[9 - k].classList.contains("tower")) {
        tar_div[9 - k].classList.add("water");
        cnt--;
      }
      k++;
    }
  }
}

function outputSetUp(solution_arr, container) {
  container.innerHTML = "";
  createProblemSetUp(container, "second");

  for (let i = 0; i < solution_arr.length; i++) {
    let tar_div = document.querySelectorAll(`.secondrow${i}`);

    for (let j = 0; j < solution_arr[i]; j++) {
      tar_div[9 - j].classList.add("water");
    }
  }
}
