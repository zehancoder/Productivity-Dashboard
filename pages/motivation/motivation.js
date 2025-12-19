const fetchData = async (callBack) => {
  const data = await fetch("https://dummyjson.com/quotes?limit=200");
  const res = await data.json();
  callBack(res.quotes);
};

let quote = document.querySelector(".quote-Text");
let author = document.querySelector(".author-name");
let button = document.querySelector(".btn");

fetchData(function (res) {
  if (res.length > 0) {
    let autoReloadGenerator = () => {
      let random = Math.floor(Math.random() * res.length);
      quote.innerHTML = "`" + res[random].quote;
      author.innerHTML = res[random].author;
    };

    autoReloadGenerator();

    let quoteChanger = () => {
      button.addEventListener("click", () => {
        let random = Math.floor(Math.random() * res.length);
        quote.innerHTML = "`" + res[random].quote;
        author.innerHTML = res[random].author;
      });
    };

    quoteChanger();
  }
});
