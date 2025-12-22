const daily_planner_date = document.querySelector("#daily-planner-date");
const today_plan_btn = document.querySelector("#today-plan-btn");
const next_day_btn = document.querySelector("#next-day-btn");
const prev_day_btn = document.querySelector("#prev-day-btn");

const todayPlanFunc = () => {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  daily_planner_date.innerHTML =
    date.toString().padStart(2, "0") +
    "/" +
    month.toString().padStart(2, "0") +
    "/" +
    year.toString();
};

todayPlanFunc();

const new_plan_btn = document.querySelector("#new-plan-btn");
const plan_date = document.querySelector("#plan-date");
const plan_date_input = document.querySelector("#plan-input");
const new_plan_form = document.querySelector("#new-plan-form");
const plan_form_close_btn = document.querySelector("#close-plan");
const plan_form_cancle_btn = document.querySelector("#cancle-plan");
const task_add_btn = document.querySelector("#task-add-btn");
const plan_name = document.querySelector("#plan-name");
const plan_description = document.querySelector("#plan-description");
const today_plans_show = document.querySelector("#today-plans-show");

let plans = [];
let completePlans = [];
let plan_id = 0;
plan_date.style.transform = "translateX(120%)";

// functionality for add element
const addElementFunc = () => {
  new_plan_btn.addEventListener("click", () => {
    if (plan_date.style.transform === "translateX(0%)") {
      plan_date.style.transform = "translateX(120%)";
    } else {
      plan_date.style.transform = "translateX(0%)";
    }
  });

  plan_date_input.addEventListener("change", (e) => {
    if (e.target.value !== "") {
      plan_date.style.transform = "translateX(120%)";
      new_plan_form.style.display = "block";
    }
  });

  plan_form_close_btn.addEventListener("click", () => {
    new_plan_form.style.display = "none";
  });
  plan_form_cancle_btn.addEventListener("click", () => {
    new_plan_form.style.display = "none";
  });

  task_add_btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (plan_name.value !== "" && plan_description.value !== "") {
      plan_id += 1;
      const [planDate, planTime] = plan_date_input.value.split("T");
      plans.push({
        id: plan_id,
        planeName: plan_name.value,
        planDescription: plan_description.value,
        complete: false,
        planDate: planDate.split("-").reverse().join("/"),
        planTime: planTime,
      });
      plan_date_input.value = "";
      plan_name.value = "";
      plan_description.value = "";
      new_plan_form.style.display = "none";
    }
    renderElement(plans);
  });
};
addElementFunc();

// add active plan and complete plan functionality
const complete_plan_btn = document.querySelector("#complete-plan");
const active_plan_btn = document.querySelector("#active-plan");
const show_complete_plan = document.querySelector("#complete-plan-show");

// const removeFromCompleteRenderFunc = (complete_todos) => {
//   let totolTodos = "";
//   complete_todos.length > 0
//     ? complete_todos.map((todo) => {
//         totolTodos += ` <div id=${todo.id} class="px-4 text-[#FAF3E1] py-3 bg-[#5A7863] rounded-lg">
//           <div class="flex justify-between items-center gap-2">
//             <div class="flex items-center gap-2">
//               <input checked type="checkbox" class="h-[14px] todo-checkbox w-[14px]" />
//               <h1 id="todo-title" class="text-lg-center alan">
//                 ${todo.task_name_value}
//               </h1>
//             </div>
//             <div id="todo-menu"
//               onclick='removeFromComplete(${todo.id})'
//               class="hover:bg-[#faf3e1d3] relative todo-menu rounded-full px-1.5 py-[1.2px] hover:text-[#222222] cursor-pointer">
//               <div '><i class="fa-solid fa-trash-can"></i></div>

//             </div>
//           </div>
//           <p class="mt-4 font-mono tracking-tighter">
//             ${todo.todo_description_value}
//           </p>
//           <div class="flex items-center gap-2 mt-4 text-[15px] alan">
//             <p>${todo.todo_time_value}</p>
//             -
//             <p>12:00 PM</p>
//           </div>
//         </div> `;
//       })
//     : (totolTodos = `          <p class="text-center text-[#FAF3E1] text-lg alan w-full">No Todo Complete</p>
// `);
//   show_complete_todos.innerHTML = totolTodos;
// };
complete_plan_btn.addEventListener("click", (e) => {
  e.preventDefault();
  complete_plan_btn.style.backgroundColor = "#FF6D1F";
  active_plan_btn.style.backgroundColor = "transparent";
  show_complete_plan.style.display = "grid";
  today_plans_show.style.display = "none";

  removeFromCompleteRenderFunc(complete_todos);
});
active_plan_btn.addEventListener("click", (e) => {
  e.preventDefault();
  complete_plan_btn.style.backgroundColor = "transparent";
  active_plan_btn.style.backgroundColor = "#FF6D1F";
  show_complete_plan.style.display = "none";
  today_plans_show.style.display = "grid";
});

const renderElement = (afterRender) => {
  let totalData = "";
  if (afterRender.length !== 0) {
    afterRender.map((plan) => {
      totalData += `<div id='${plan.id}' class=" custom-shadow alan mt-4 rounded-lg overflow-x-hidden">
            <div
              class="flex sm:text-[19px] text-[17px] lg:text-[22px] text-[#FF6D1F] font-medium  px-3 py-2 items-center justify-between bg-[#FAF3E1] gap-2">
              <h1 class="">${plan.planeName}</h1>
              <p class="">${plan.planTime}</p>
              <p class=" ">${plan.planDate}</p>
              <div class="hover:bg-[#222222b9] text-xl transition duration-300 todo-menu rounded-full px-[5px] py-[0.5px] hover:text-[#faf3e1d3] cursor-pointer">
                <i class="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <div class="text-[#FF6D1F] mt-4 lg:text-base sm:text-[15px] text-[14px] px-7 py-4">
              <p>${plan.planDescription}

              </p>
            </div>
          </div>`;
    });
  }
  today_plans_show.innerHTML = totalData;
  console.log(afterRender);
};
