const todo_default_date = document.querySelector("#todo-default-date");
const todo_dates = document.querySelector("#todo-dates");
const change_theme = document.querySelector("#change-theme");
const create_new_todo_btn = document.querySelector("#create-new-todo-btn");
const search_todo_btn = document.querySelector("#search-todo-btn");
const search_todo = document.querySelector("#search-todo");
const add_todo_form = document.querySelector("#todo-form");
const close_todo = document.querySelector("#close-todo");

// get creating todos items
const task_name = document.querySelector("#task-name");
const todo_form_date = document.querySelector("#todo-date");
const todo_form_time = document.querySelector("#todo-time");
const todo_description = document.querySelector("#todo-description");
const todo_add = document.querySelector("#add-todo-form-btn");
const cancle_todo = document.querySelector("#cancle-todo-form-btn");
const show_todos = document.querySelector("#show-todos");
const overlay_div = document.querySelector("#overlay");
const todos_menu_item = document.querySelector("#todos-menu-item");
let todos = [];
let complete_todos = [];
let todo_id = 0;

const todos_bg_color = [
  "3B4953",
  "5A7863",
  "90AB8B",
  "EBF4DD",
  "97A87A",
  "628141",
];

// add todo menu function
const todoMenuFunc = (todos_id, todo_box_id) => {
  console.log(todos_id);
  todo_box_id.style.display = "block";
};
const mouseLeaveFunc = (todo_box_id) => {
  console.log(todo_box_id);
  todo_box_id.style.display = "none";
};

// todo removeing functionality
const removeTodoFunc = (removeTodoId) => {
  todos = todos.filter((todo) => todo.id !== removeTodoId.id);

  renderTodos(todos);
};
// todo editing functionality
const editTodoFunc = (editTodoId) => {
  todos = todos.filter((todo) => {
    if (todo.id === editTodoId.id) {
      add_todo_form.style.display = "block";
      todo_add.value = "Save";
      task_name.value = todo.task_name_value;
      todo_form_date.value = todo.todo_date_value;
      todo_form_time.value = todo.todo_time_value;
      todo_description.value = todo.todo_description_value;
    }
    return todo.id !== editTodoId.id;
  });

  renderTodos(todos);
};
// todo complete functionality
const completeFunc = (completeItem) => {
  todos = todos.filter((todo) => {
    if (todo.id === completeItem.id) {
      todo.complete = true;
      complete_todos.push(todo);
    }
    return todo.id !== completeItem.id;
  });

  renderTodos(todos);
};

const removeAllTodoFunc = () => {
  todos = [];
  show_todos.innerHTML =
    show_todos.innerHTML = `<p class="text-center text-[#FAF3E1] text-lg alan w-full">No Todo Created</p>`;
};
// selection todos data func and filter them using dates
const selectTodoDateFunc = (selecting_todo) => {
  Aftertodos = todos.filter((todo) => {
    if (todo.id === selecting_todo.id) {
      todo_default_date.innerHTML = todo.todo_date_value;
      return todo;
    }
  });
  renderTodos(Aftertodos);
};
// move to all todo func
const moveToAllTodoFunc = () => {
  console.log(todos);

  todo_default_date.innerHTML = "All Todo";
  renderTodos(todos);
};

// render todos

const renderTodos = (AfterRendertodos) => {
  let totolTodos = "";
  let totalDates = ` <li onclick='moveToAllTodoFunc()' class="list-none hover:bg-[#FF6D1F] px-3 md:px-5 py-1.5 md:py-2 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
             All Todo
            </li>`;
  AfterRendertodos.length > 0
    ? AfterRendertodos.map((todo, idx) => {
      totolTodos += ` <div id=${todo.id
        } class="px-4 text-[#FAF3E1] py-3 bg-[#5A7863] rounded-lg">
          <div class="flex justify-between items-center gap-2">
            <div class="flex items-center gap-2">
              <input onchange='completeFunc(${todo.id})'   value=${todo.complete
        } type="checkbox" class="h-[14px] todo-checkbox w-[14px]" />
              <h1 id="todo-title" class="text-lg-center alan">
                ${todo.task_name_value}
              </h1>
            </div>
            <div id="todo-menu"
              class="hover:bg-[#faf3e1d3] relative todo-menu rounded-full px-1.5 py-[1.2px] hover:text-[#222222] cursor-pointer">
              <div  onclick='todoMenuFunc(${todo.id}, ${"todo_menu_id" + todo.id
        })'><i class="fa-solid fa-ellipsis"></i></div>
              <div onmouseleave='mouseLeaveFunc(${"todo_menu_id" + todo.id
        })' id=${"todo_menu_id" + todo.id}
                class="absolute hidden md:text-[15px] w-50 text-[15px] top-[105%] z-40 px-4 py-3 text-[#222222] bg-[#FAF3E1] rounded-b-lg">
                <li
                  id='remove_todo_id${todo.id}'
                  onclick='removeTodoFunc(${todo.id}, ${"todo_menu_id" + todo.id
        })'                  class="list-none hover:bg-[#FF6D1F] px-3 md:px-5 flex items-center gap-2 justify-between py-1.5 md:py-2 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
                  Delete Todo <i class="fa-solid fa-trash-can"></i>
                </li>
                <li
                  id='edit_todo_id${todo.id}'
                  onclick='editTodoFunc(${todo.id})'
                  class="list-none hover:bg-[#FF6D1F] px-3 md:px-5 py-1.5 flex items-center justify-between gap-2 md:py-2 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
                  Edit Todo <i class="fa-regular fa-pen-to-square"></i>
                </li>
                <li
                  id="remove-all-todo"
                  onclick='removeAllTodoFunc(${todo.id})'

                  class="list-none hover:bg-[#FF6D1F] px-3 md:px-5 py-1.5 md:py-2 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
                  Remove All Todo
                </li>
              </div>
            </div>
          </div>
          <p class="mt-4 font-mono tracking-tighter">
            ${todo.todo_description_value}
          </p>
          <div class="flex items-center gap-2 mt-4 text-[15px] alan">
            <p>${todo.todo_time_value}</p>
            -
            <p>12:00 PM</p>
          </div>
        </div> `;

      if (todos.length === 1) {
        todo_default_date.innerHTML = AfterRendertodos[0].todo_date_value;
      }
      if (todos.length === 0) {
        todo_default_date.innerHTML = "No Todos";
      }
      if (todos.length > 0) {
        totalDates += ` <li onclick='selectTodoDateFunc(${todo.id})' class="list-none hover:bg-[#FF6D1F] px-3 md:px-5 py-1.5 md:py-2 hover:text-[#FAF3E1] transition duration-300 rounded-lg font-medium alan cursor-pointer">
              ${todo.todo_date_value}
            </li>`;
      }
    })
    : (totolTodos = `<p class="text-center text-[#FAF3E1] text-lg alan w-full">No Todo Created</p>`);
  show_todos.innerHTML = totolTodos;
  todo_dates.innerHTML = totalDates;
};

const addNewTodo = () => {
  create_new_todo_btn.addEventListener("click", () => {
    add_todo_form.style.display = "block";
    todo_add.value = "Add";

    overlay_div.style.display = "block";
  });
  close_todo.addEventListener("click", () => {
    add_todo_form.style.display = "none";
    overlay_div.style.display = "none";
  });

  todo_add.addEventListener("click", (e) => {
    e.preventDefault();
    todo_id += 1;
    const task_name_value = task_name.value;
    const todo_date_value = todo_form_date.value;
    const todo_time_value = todo_form_time.value;
    const todo_description_value = todo_description.value;

    if (
      task_name_value !== "" &&
      todo_date_value !== "" &&
      todo_time_value !== "" &&
      todo_description_value !== ""
    ) {
      todos.push({
        id: "todo_" + todo_id,
        task_name_value,
        todo_date_value,
        todo_time_value,
        todo_description_value,
        complete: false,
      });

      renderTodos(todos);

      task_name.value = "";
      todo_form_date.value = "";
      todo_form_time.value = "";
      todo_description.value = "";
    }
    todos.length > 0 ? (todo_default_date.innerHTML = "All Todos") : "";
  });
};

addNewTodo();

const todoDates = () => {
  todo_default_date.addEventListener("click", () => {
    todo_dates.style.display = "block";
  });
  todo_dates.addEventListener("mouseleave", () => {
    todo_dates.style.display = "none";
  });
};
todoDates();

// add active task and complete task functionality
const complete_task_btn = document.querySelector("#complete-task");
const active_task_btn = document.querySelector("#active-task");
const show_complete_todos = document.querySelector("#show-complete-todos");

const removeFromCompleteRenderFunc = (complete_todos) => {
  let totolTodos = "";
  complete_todos.length > 0
    ? complete_todos.map((todo) => {
      totolTodos += ` <div id=${todo.id} class="px-4 text-[#FAF3E1] py-3 bg-[#5A7863] rounded-lg">
          <div class="flex justify-between items-center gap-2">
            <div class="flex items-center gap-2">
              <input checked type="checkbox" class="h-[14px] todo-checkbox w-[14px]" />
              <h1 id="todo-title" class="text-lg-center alan">
                ${todo.task_name_value}
              </h1>
            </div>
            <div id="todo-menu"
              onclick='removeFromComplete(${todo.id})'
              class="hover:bg-[#faf3e1d3] relative todo-menu rounded-full px-1.5 py-[1.2px] hover:text-[#222222] cursor-pointer">
              <div '><i class="fa-solid fa-trash-can"></i></div>
              
            </div>
          </div>
          <p class="mt-4 font-mono tracking-tighter">
            ${todo.todo_description_value}
          </p>
          <div class="flex items-center gap-2 mt-4 text-[15px] alan">
            <p>${todo.todo_time_value}</p>
            -
            <p>12:00 PM</p>
          </div>
        </div> `;
    })
    : (totolTodos = `          <p class="text-center text-[#FAF3E1] text-lg alan w-full">No Todo Complete</p>
`);
  show_complete_todos.innerHTML = totolTodos;
};
complete_task_btn.addEventListener("click", (e) => {
  e.preventDefault();
  complete_task_btn.style.backgroundColor = "#FF6D1F";
  active_task_btn.style.backgroundColor = "transparent";
  show_complete_todos.style.display = "grid";
  show_todos.style.display = "none";

  removeFromCompleteRenderFunc(complete_todos);
});
active_task_btn.addEventListener("click", (e) => {
  e.preventDefault();
  complete_task_btn.style.backgroundColor = "transparent";
  active_task_btn.style.backgroundColor = "#FF6D1F";
  show_complete_todos.style.display = "none";
  show_todos.style.display = "grid";
});

// add event for remove from complete
const removeFromComplete = (removeId) => {
  complete_todos = complete_todos.filter((todo) => {
    return todo.id !== removeId.id;
  });
  removeFromCompleteRenderFunc(complete_todos);
};

// cacle todo
cancle_todo.addEventListener("click", () => {
  add_todo_form.style.display = "none";

  overlay_div.style.display = "none";
});

// add searching functionality
search_todo_btn.addEventListener("click", () => {
  let searchResult = todos.filter((todo) => {
    return todo.task_name_value
      .toLowerCase()
      .startsWith(search_todo.value.toLowerCase());
  });
  search_todo.value !== "" && renderTodos(searchResult);
});

search_todo.addEventListener("keydown", () => {
  if (search_todo.value === "") {
    renderTodos(todos);
  }
});
