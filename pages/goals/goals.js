const show_goals = document.querySelector("#goals-show");

const goals = [
  {
    id: 1,
    goal: "Master Frontend",
    des: "Learn HTML, CSS, JavaScript, and modern frameworks to create interactive and responsive user interfaces.",
  },
  {
    id: 2,
    goal: "Learn Backend",
    des: "Understand Node.js, Express, databases, and APIs to handle server-side logic effectively.",
  },
  {
    id: 3,
    goal: "Build Projects",
    des: "Develop full-stack applications to apply knowledge and solve real-world problems.",
  },
  {
    id: 4,
    goal: "Deploy & Improve",
    des: "Launch projects online, use version control, and continuously refine skills to grow as a full-stack developer.",
  },
];

const showingGoal = () => {
  let totalItem = "";
  goals.map(({ id, goal, des }) => {
    totalItem += ` <div class="mt-4 md:px-20 flex gap-2 px-6 sm:px-10 lg:px-24 py-6 bg-[#ff6d1fd2] rounded-lg custom-clip-path">
                        <h1 class=" md:text-8xl text-8xl lg:text-8xl xl:text-7xl font-bold text-[#FAF3E1]">${id}</h1>
                        <div class="ml-5">
                            <h2 class="text-xl md:text-2xl text-[#FAF3E1] alan font-medium">${goal}</h2>
                            <p class="text-[13px] md:text-[14px] font-medium alan text-[#FAF3E1]">${des}</p>
                        </div>
                    </div>`;
  });
  show_goals.innerHTML = totalItem;
};
showingGoal();
