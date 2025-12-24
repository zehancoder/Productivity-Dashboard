const daily_planner_date = document.querySelector("#daily-planner-date");
const today_plan_btn = document.querySelector("#today-plan-btn");
const next_day_btn = document.querySelector("#next-day-btn");
const prev_day_btn = document.querySelector("#prev-day-btn");

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
      document.querySelector("#overlay").style.display = "block";
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
    document.querySelector("#overlay").style.display = "none";

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
// if no plans active
if (plans.length === 0) {
  today_plans_show.innerHTML = `<p class="text-lg font-medium text-[#FAF3E1] md:ml-20">No Active plan</p>`;
}
// render completing items
const renderCompletedItem = (completedPlans) => {
  let totalComplete = "";
  completedPlans.length > 0
    ? completedPlans.map((plan) => {
        totalComplete += `<div id='${plan.id}' class=" brightness-75 custom-shadow alan mt-4 rounded-lg ">
            <div
              class="flex sm:text-[19px] text-[17px] lg:text-[22px] text-[#FF6D1F] font-medium  px-3 py-2 rounded-t-lg items-center justify-between bg-[#FAF3E1] gap-2">
              <h1 class="">${plan.planeName}</h1>
              <p class="">${plan.planTime}</p>
              <p class=" ">${plan.planDate}</p>
              <div
                class="hover:bg-[#222222b9] relative text-xl transition duration-300 todo-menu rounded-full px-[5px] py-[0.5px] hover:text-[#faf3e1d3] cursor-pointer">
                <div onclick='removeFromCompleteFunc(${plan.id})'>
                  <i class="fa-solid fa-trash-can"></i>                
                </div>

                
              </div>
            </div>
            <div class="text-[#FF6D1F] mt-4 lg:text-base sm:text-[15px] text-[14px] px-7 py-4">
              <p>${plan.planDescription}</p>
            </div>
          </div>`;
      })
    : (totalComplete = `<p class="text-center text-[#FAF3E1] text-lg alan w-full">No Plan Complete</p>
`);
  show_complete_plan.innerHTML = totalComplete;

  if (completePlans.length > 0) {
    document.querySelector(
      "#complete-plan-count"
    ).innerHTML = `(${completePlans.length})`;
  } else {
    document.querySelector("#complete-plan-count").innerHTML = `(0)`;
  }
};
// remove plans from completed
const removeFromCompleteFunc = (removePlan) => {
  completePlans = completePlans.filter((plan) => {
    return plan.id !== removePlan;
  });

  renderCompletedItem(completePlans);
};
complete_plan_btn.addEventListener("click", (e) => {
  e.preventDefault();
  complete_plan_btn.style.backgroundColor = "#FF6D1F";
  active_plan_btn.style.backgroundColor = "transparent";
  show_complete_plan.style.display = "grid";
  today_plans_show.style.display = "none";

  renderCompletedItem(completePlans);
});
active_plan_btn.addEventListener("click", (e) => {
  e.preventDefault();
  complete_plan_btn.style.backgroundColor = "transparent";
  active_plan_btn.style.backgroundColor = "#FF6D1F";
  show_complete_plan.style.display = "none";
  today_plans_show.style.display = "grid";
});

// plans menuu
const onPlanMenuFunc = (planId, planMenuId) => {
  if (planMenuId.style.display === "none") {
    planMenuId.style.display = "block";
  } else {
    planMenuId.style.display = "none";
  }
};
// remove plans
const removePlanFunc = (removeElement) => {
  plans = plans.filter((plan) => {
    return plan.id !== removeElement;
  });
  renderElement(plans);
};
// edit plans
const editPlanFunc = (editElement) => {
  plans = plans.filter((plan, fullPlan) => {
    if (editElement === plan.id) {
      new_plan_form.style.display = "block";
      plan_name.value = plan.planeName;
      plan_description.value = plan.planDescription;

      plan_date_input.value =
        plan.planDate.split("/").reverse().join("-") + "T" + plan.planTime;
    }

    return plan.id !== editElement;
  });

  renderElement(plans);
};
// complete plans
const completePlanFunc = (completedItem) => {
  plans = plans.filter((plan) => {
    if (plan.id === completedItem) {
      plan.complete = true;
      completePlans.push(plan);
    }
    return plan.id !== completedItem;
  });
  renderElement(plans);
};
// remove all plans active and complete
const removeAllPlanFunc = () => {
  plans = [];
  completePlans = [];
  renderElement(plans);
  renderCompletedItem(completePlans);
};

// add searching functionality
const search_input = document.querySelector("#search-plan");
search_input.addEventListener("change", (e) => {
  searchResult = plans.filter((plan) => {
    return plan.planDate.startsWith(e.target.value)
  })
  search_input.value !== '' && renderElement(searchResult)
  if(search_input.value === ''){
    renderElement(plans)
  }
});

// render active element
const renderElement = (afterRender) => {
  let totalData = "";
  if (afterRender.length !== 0) {
    afterRender.map((plan) => {
      totalData += `<div id='${
        plan.id
      }' class=" custom-shadow alan mt-4 rounded-lg ">
            <div
              class="flex sm:text-[19px] text-[17px] lg:text-[22px] text-[#FF6D1F] font-medium  px-3 py-2 rounded-t-lg items-center justify-between bg-[#FAF3E1] gap-2">
              <h1 class="">${plan.planeName}</h1>
              <p class="">${plan.planTime}</p>
              <p class=" ">${plan.planDate}</p>
              <div
                class="hover:bg-[#222222b9] relative text-xl transition duration-300 todo-menu rounded-full px-[5px] py-[0.5px] hover:text-[#faf3e1d3] cursor-pointer">
                <div onclick='onPlanMenuFunc(${plan.id}, ${
        "plan_menu_id" + plan.id
      })''>
                  <i class="fa-solid fa-ellipsis"></i>
                </div>

                <div
                  id='${"plan_menu_id" + plan.id}'
                  class="absolute hidden md:text-[14px] w-80 text-[15px] top-[105%] -right-0 z-40 px-4 py-3 text-[#222222] bg-[#FAF3E1] rounded-b-lg">
                  <div class="grid grid-cols-2">
                    <li id='remove_plan_id${plan.id}'
                    onclick='removePlanFunc(${plan.id})'
                    class="list-none hover:bg-[#FF6D1F] px-3 md:px-3 flex items-center gap-2 justify-between py-1 md:py-1.5 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
                    Delete Plan <i class="fa-solid fa-trash-can"></i>
                  </li>
                  <li id='edit_plan_id${plan.id}'
                    onclick='editPlanFunc(${plan.id})'
                    class="list-none hover:bg-[#FF6D1F] px-3 md:px-3 py-1 flex items-center justify-between gap-2 md:py-1.5 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
                    Edit Plan <i class="fa-regular fa-pen-to-square"></i>
                  </li>
                  <li id='complete_plan_id${plan.id}'
                    onclick='completePlanFunc(${plan.id})'
                    class="list-none hover:bg-[#FF6D1F] px-3 md:px-3 py-1 flex items-center justify-between gap-2 md:py-1.5 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
                    Complete ${
                      plan.complete ? ' <i class="fa-solid fa-check"></i> ' : ""
                    }
                  </li>
                  <li onclick='removeAllPlanFunc()' id="remove-all-plan"
                    class="list-none hover:bg-[#FF6D1F] px-3 md:px-3 py-1 md:py-1.5 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
                    Remove All Plan
                  </li>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-[#FF6D1F] mt-4 lg:text-base sm:text-[15px] text-[14px] px-7 py-4">
              <p>${plan.planDescription}</p>
            </div>
          </div>`;
    });
  }
  today_plans_show.innerHTML = totalData;
  document.querySelector(
    "#active-plan-count"
  ).innerHTML = `(${afterRender.length})`;
  if (completePlans.length > 0) {
    document.querySelector(
      "#complete-plan-count"
    ).innerHTML = `(${completePlans.length})`;
  }
  if (plans.length === 0) {
    today_plans_show.innerHTML = `<p class="text-lg font-medium text-[#FAF3E1] md:ml-20">No Complete plan</p>`;
  }
};
