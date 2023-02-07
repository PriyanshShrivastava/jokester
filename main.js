// Custom radio btn
const customRadioEl = document.getElementById("custom-category");

// Any radio btn
const anyRadioEl = document.getElementById("any-category");

//Joke form and heading

const jokeFormEl = document.getElementById("joke-form");
const formHeadEl = document.getElementById("form-heading");

//Input values

const programCheckEl = document.getElementById("programming");
const darkCheckEl = document.getElementById("dark");
const punCheckEl = document.getElementById("pun");

//Joke Box
const jokeBoxEL = document.getElementById("joke-box");

// Grabbing btn
const formBtnEl = document.getElementById("form-btn");

//Get back button

const getbackBtn = document.getElementById("get-back");

//Main code

let customRadioElSelected = false;
let anyRadioElSelected = false;

const checkboxToggler = function (isDisabled) {
  programCheckEl.disabled = isDisabled;
  darkCheckEl.disabled = isDisabled;
  punCheckEl.disabled = isDisabled;
};

const isCheckedFunc = function (isChecked) {
  programCheckEl.checked = isChecked;
  darkCheckEl.checked = isChecked;
  punCheckEl.checked = isChecked;
};

customRadioEl.addEventListener("click", function () {
  if (customRadioElSelected) {
    customRadioEl.checked = false;
    checkboxToggler(true);
    isCheckedFunc(false);
    customRadioElSelected = false;
  } else {
    if (customRadioEl.checked) {
      checkboxToggler(false);
      customRadioElSelected = true;
    }
  }
});
anyRadioEl.addEventListener("click", function () {
  if (anyRadioElSelected) {
    anyRadioEl.checked = false;
    anyRadioElSelected = false;
  } else {
    if (anyRadioEl.checked) {
      checkboxToggler(true);
      programCheckEl.checked = false;
      darkCheckEl.checked = false;
      punCheckEl.checked = false;
    }
    anyRadioElSelected = true;
  }
});

//Event listener
jokeFormEl.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  console.log(formData);
  const formProps = Object.fromEntries(formData);

  console.log(formProps);

  const {
    amount,
    category,
    blacklistNsfw: nsfw = "",
    blacklistRacist: racist = "",
    blacklistReligious: religious = "",
    blacklistSexist: sexist = "",
    CustomDark: Dark = "",
    CustomPun: Pun = "",
    CustomPro: Programming = "",
  } = formProps;

  const blackList = [nsfw, racist, religious, sexist];
  const customJoke = [Dark, Pun, Programming];
  const result = blackList.filter((curr) => {
    if (curr) {
      return curr;
    }
  });

  console.log(result);
  if (amount > 5) {
    jokeBoxEL.innerHTML = `Bro! Amount should be less than 5!! 🙎`;
    jokeBoxHiddenRemove();
    jokeFormEl.reset();
    checkboxToggler(true);
    customRadioElSelected = false;
  } else {
    if (category === "Any") {
      jokes(category, amount);
    } else if (category === "Custom") {
      jokes(category, amount, blackList, customJoke);
    }
  }
}

const allJokes = async function (jokesArr) {
  jokesArr.forEach((currJoke, index) => {
    if (currJoke.type == "single") {
      jokeBoxEL.innerHTML += `<div class="flex flex-wrap items-start text-md"> <div> <span class="text-md font-semibold text-brand">${
        index + 1
      } :</span>   ${currJoke.joke} </div> </div>`;
    } else {
      jokeBoxEL.innerHTML += `<div class="flex flex-wrap items-start text-md"> <div> <span class="text-md font-semibold text-brand" >${
        index + 1
      } :</span>   ${currJoke.setup} , ${currJoke.delivery} </div> </div>`;
    }
  });
};

const singleJoke = async function (FinalJoke, numberOfJoke) {
  if (FinalJoke.type == "single") {
    jokeBoxEL.innerHTML += `<div class="flex flex-wrap items-start text-md"> <div> <span class="text-md font-semibold text-brand">${
      numberOfJoke + 1
    } :</span>   ${FinalJoke.joke} </div> </div>`;
    numberOfJoke++;
  } else {
    jokeBoxEL.innerHTML += `<div class="flex flex-wrap items-start text-md"> <div> <span class="text-md font-semibold text-brand" >${
      numberOfJoke + 1
    } :</span>   ${FinalJoke.setup} , ${FinalJoke.delivery} </div> </div>`;
    numberOfJoke++;
  }
};

//Jokes function
const jokes = async function (category, amount, blackList, customJoke) {
  try {
    if (category === "Any") {
      let joke;
      let finalResult;
      let numberOfJoke = 0;

      if (amount > 1) {
        joke = await fetch(
          `https://v2.jokeapi.dev/joke/${category}?amount=${amount}`
        );
        finalResult = await joke.json();
        allJokes(finalResult.jokes);
      } else {
        console.log("1 vala");
        joke = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
        finalResult = await joke.json();
        singleJoke(finalResult, numberOfJoke);
      }
      console.log(joke);

      console.log(finalResult);

      formHeadEl.innerHTML = `Here are your <span class="text-brand"> Joke/s: </span>`;
      jokeBoxHiddenRemove();
      jokeBoxEL.classList.add("flex", "flex-col", "item-start", "gap-4");
      formHidden();
      getbackBtn.classList.remove("hidden");
    } else {
      let joke;
      let finalResult;
      let numberOfJoke = 0;

      const blaklistFlagresult = blackList.filter((curr) => {
        if (curr) {
          return curr;
        }
      });
      const customJokeResult = customJoke.filter((curr) => {
        if (curr) {
          return curr;
        }
      });

      if (amount > 1) {
        joke = await fetch(
          `https://v2.jokeapi.dev/joke/${customJokeResult.toString()}?blacklistFlags=${blaklistFlagresult.toString()}&amount=${amount}`
        );
        finalResult = await joke.json();
        allJokes(finalResult.jokes);
      } else {
        joke = await fetch(
          `https://v2.jokeapi.dev/joke/${customJokeResult.toString()}?blacklistFlags=${blaklistFlagresult.toString()}`
        );
        finalResult = await joke.json();
        singleJoke(finalResult, numberOfJoke);
      }

      formHeadEl.innerHTML = `Here are your <span class="text-brand"> Joke/s: </span>`;
      jokeBoxHiddenRemove();
      jokeBoxEL.classList.add("flex", "flex-col", "item-start", "gap-4");
      formHidden();
      getbackBtn.classList.remove("hidden");
    }
  } catch (err) {
    console.error(err);
  }
};

const formHidden = function () {
  jokeFormEl.classList.add("hidden");
};
const jokeBoxHiddenRemove = function () {
  jokeBoxEL.classList.remove("hidden");
};

//Get back Button Event listener

getbackBtn.addEventListener("click", function () {
  jokeBoxEL.classList.toggle("hidden");
  getbackBtn.classList.toggle("hidden");
  formBtnEl.classList.remove("hidden");
  jokeFormEl.reset();
  jokeFormEl.classList.toggle("hidden");
  jokeBoxEL.innerHTML = ``;
  checkboxToggler(true);
  customRadioElSelected = false;
});
