const primary = $(".primary");
primary.hide();
const secondary = $(".secondary");
secondary.hide();

let numbers = 1;

//primary values
const primary_head = document.querySelector(".primary_head");
const tags = document.querySelector(".scroll ul");

//secondary values
const secondary_head1 = document.querySelector(".secondary_head1");
const secondary_head2 = document.querySelector(".secondary_head2");
let choosen = document.getElementById("#importance");

let items = document.querySelector(".items");
let container = $(".items");

const open_head = $(".bi-plus-circle-fill");
open_head.click(function () {
  secondary.slideUp();
  primary.slideToggle();
});

var lists = $(".append");
let tag,
  i = 0,
  change = $(".list");

let tag_selected = 0;

lists.click(function (e) {
  if (e.target && e.target.nodeName == "LI") {
    if (i === 0) {
      change.removeClass("selected");
    } else {
      $(`#${tag}`).removeClass("selected");
    }
    i++;
    let list_clicked = e.target.id;
    tag_selected = parseInt(e.target.id);
    tag = list_clicked;
    renderLeads();
    $(`#${list_clicked}`).addClass("selected");
  }
});

const add = $(".add_last");
add.click(function () {
  primary.slideUp();
  secondary.slideToggle();
  renderLeads();
});

// heading function to add heading
let count = $("list").length + 1;
function heading(text) {
  text = text.toLowerCase();
  let tag = document.createElement("LI");
  tag.classList.add("list");
  tag.id = `${count}`;
  count++;
  tag.innerText = `${text}`;
  tags.appendChild(tag);
  primary_head.value = "";
  add_to_back2(text);
}

// when people enter text in primary section to make heading sections

primary_head.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    const text = primary_head.value;
    if (text === "") {
      alert("Please enter Heading 🙂");
    } else {
      heading(text);
    }
  }
});

//Second heading function to add in list
function second_heading(text1, text2) {
  let set = $("#importance").find(":selected").text();
  set = set.toLowerCase();
  add_to_back(text1, text2, set);
  renderLeads();
}

// when text entered in secondary section to make heading and url inputs
secondary_head2.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    const text1 = secondary_head1.value;
    const text2 = secondary_head2.value;
    if (text1 === "" && text2 === "") {
      alert("Please enter Heading and link🙂");
    } else {
      second_heading(text1, text2);
      secondary_head1.value = "";
      secondary_head2.value = "";
    }
  }
});

// whole accesing and adding code into box

let myLeads = [];
let myLeads2 = [];

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}

let leadsFromLocalStorage2 = JSON.parse(localStorage.getItem("myLeads2"));
if (leadsFromLocalStorage2) {
  myLeads2 = leadsFromLocalStorage2;
  renderLeads2();
}

// Edit functionality after clicking edit button on items

let edit = document.querySelector(".bi-pen-fill");
let deletes = document.querySelector(".bi-trash-fill");

container.click(function (e) {
  const a = e.target;
  if (e.target.classList.contains("bi-pen-fill")) {
    let change1 = a.parentElement.children[0].innerText;
    let modify = a.parentElement.parentElement.id;
    let change2 =
      a.parentElement.parentElement.children[1].children[0].children[0].href;
    primary.slideUp();
    secondary.slideDown();
    secondary_head1.value = "";
    secondary_head2.value = "";
    secondary_head2.value = change2;
    secondary_head1.value = change1;
    let change3 = a.parentElement.parentElement;
    change3.classList.add("hide");
    myLeads[tag_selected].splice(modify, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  }
  if (e.target.classList.contains("bi-trash-fill")) {
    let change1 = a.parentElement.parentElement;
    let modify = a.parentElement.parentElement.id;
    change1.classList.add("hide");
    myLeads[tag_selected].splice(modify, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  }
});

// to clead whole localstorage

// localStorage.clear();
// myLeads2 = [];
// myLeads = [];

// to show data structures

function renderLeads2() {
  for (let i = 0; i < myLeads2.length; i++) {
    let tag = document.createElement("LI");
    tag.classList.add("list");
    tag.id = `${count}`;
    count++;
    tag.innerText = `${myLeads2[i]}`;
    tags.appendChild(tag);
    primary_head.value = "";
  }
}
function add_to_back2(text) {
  myLeads2.push(text);
  localStorage.setItem("myLeads2", JSON.stringify(myLeads2));
  let array = [
    {
      heading: "hello",
      link: "set",
      color: "green",
    },
  ];
  myLeads.push(array);
}

// to show items in every data structure

function renderLeads() {
  items.innerHTML = "";
  numbers = 1;
  for (let i = 1; i < myLeads[tag_selected].length; i++) {
    let cont = document.createElement("div");
    cont.classList.add("container");
    cont.id = `${numbers}`;
    numbers++;
    let first = document.createElement("div");
    first.classList.add("first_box");
    let p = document.createElement("p");
    p.classList.add("heading");
    p.innerText = `${myLeads[tag_selected][i].heading}`;
    first.appendChild(p);
    let i1 = document.createElement("i");
    i1.classList.add("bi");
    i1.classList.add("bi-pen-fill");
    first.appendChild(i1);
    let i2 = document.createElement("i");
    i2.classList.add("bi");
    i2.classList.add("bi-trash-fill");
    first.appendChild(i2);

    cont.appendChild(first);

    let second = document.createElement("div");
    second.classList.add("second_box");
    let p2 = document.createElement("p");
    p2.classList.add("link");
    let a = document.createElement("a");
    a.href = `${myLeads[tag_selected][i].link}`;
    a.innerText = "Link of website";
    a.target = "_blank";
    p2.appendChild(a);
    second.appendChild(p2);
    let i3 = document.createElement("i");
    i3.classList.add("bi");
    i3.classList.add("bi-exclamation-circle-fill");
    i3.classList.add(`${myLeads[tag_selected][i].color}`);
    second.appendChild(i3);
    cont.appendChild(second);
    items.prepend(cont);
  }
}

// to add items to backend
let array = [
  {
    heading: "hello",
    link: "set",
    color: "green",
  },
];
myLeads.push(array);
function add_to_back(text1, text2, set) {
  myLeads[tag_selected].push({
    heading: `${text1}`,
    link: `${text2}`,
    color: `${set}`,
  });
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
}

// filter modifications

secondary_head1.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    const text1 = secondary_head1.value;
    if (text1 === "") {
      let set = $("#importance").find(":selected").text();
      set = set.toLowerCase();
      items.innerHTML = "";
      for (let i = 1; i < myLeads[tag_selected].length; i++) {
        if (myLeads[tag_selected][i].color == set) {
          let cont = document.createElement("div");
          cont.classList.add("container");
          let first = document.createElement("div");
          first.classList.add("first_box");
          let p = document.createElement("p");
          p.classList.add("heading");
          p.innerText = `${myLeads[tag_selected][i].heading}`;
          first.appendChild(p);
          cont.appendChild(first);

          let second = document.createElement("div");
          second.classList.add("second_box");
          let p2 = document.createElement("p");
          p2.classList.add("link");
          let a = document.createElement("a");
          a.href = `${myLeads[tag_selected][i].link}`;
          a.innerText = "Link of website";
          a.target = "_blank";
          p2.appendChild(a);
          second.appendChild(p2);
          let i3 = document.createElement("i");
          i3.classList.add("bi");
          i3.classList.add("bi-exclamation-circle-fill");
          i3.classList.add(`${myLeads[tag_selected][i].color}`);
          second.appendChild(i3);
          cont.appendChild(second);
          items.prepend(cont);
        }
      }
    } else {
    }
  }
});
