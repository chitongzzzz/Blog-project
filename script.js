const posts = [
  {cat:"Hobbies",icon:"🎮",title:"Playing Online Games",
   short:"Teaming up, competing and unwinding with friends online.",
   more:"Online games are my way to relax and connect. Whether it’s a team match or just hanging out in a lobby, it’s where I laugh the most with friends."},
  {cat:"Hobbies",icon:"🥾",title:"Going on Hikes",
   short:"Fresh air, tired legs and a great view at the top.",
   more:"Nothing beats the feeling of reaching the summit after a long climb. Hiking clears my head and reminds me how beautiful nature is."},
  {cat:"Hobbies",icon:"🏐",title:"Playing Volleyball",
   short:"Spikes, dives and lots of teamwork.",
   more:"Volleyball keeps me active and teaches me to trust my teammates. The best part is that perfect point after a long rally!"},
  {cat:"Hobbies",icon:"🎬",title:"Watching Sci-fi Movies",
   short:"Space, robots, time travel – I’m in.",
   more:"I love how sci-fi asks big “what if” questions and shows worlds that don’t exist yet. A good sci-fi movie night is the best kind of night."},
  {cat:"Hobbies",icon:"🍽️",title:"Eating (Yes, It’s a Hobby!)",
   short:"Trying, enjoying and talking about food.",
   more:"Eating is more than a need for me – it’s joy, comfort and bonding with family and friends. Check out my favorite foods below!"},

  {cat:"Foods",icon:"🍝",title:"Spaghetti",
   short:"Sweet, saucy and always a party favorite.",
   more:"Filipino-style spaghetti with its sweet sauce and cheesy top is pure comfort food. I could eat a whole plate any day."},
  {cat:"Foods",icon:"🥭",title:"Mango Float",
   short:"Creamy, cold and layered with sweet mangoes.",
   more:"Graham crackers, cream and ripe mangoes chilled until perfect. It’s the dessert I look forward to the most."},
  {cat:"Foods",icon:"🍖",title:"Humba",
   short:"Filipino braised pork that’s sweet, savory and tender.",
   more:"Humba is slow-cooked pork in soy sauce, vinegar and sugar until it melts in your mouth. Serve it with hot rice and I’m happy."},
  {cat:"Foods",icon:"🍨",title:"Ice Cream",
   short:"Any flavor, any time of day.",
   more:"Hot day, sad day or happy day – ice cream fits every mood. I never say no to a second scoop."},
  {cat:"Foods",icon:"🍩",title:"Donuts",
   short:"Soft, sweet and impossible to eat just one.",
   more:"Glazed, filled or chocolate-covered, donuts are my go-to treat with a cup of coffee or just on their own."},

  {cat:"Places",icon:"🗾",title:"Japan",
   short:"Dreaming of its rich and beautiful culture.",
   more:"From ancient temples to modern cities, Japan blends tradition and innovation. I want to experience the culture, the food and the scenery up close."},
  {cat:"Places",icon:"🍁",title:"Canada",
   short:"Family is there, and the work opportunities are great.",
   more:"I have relatives in Canada, and it’s known for good work and a great quality of life. Visiting would mean seeing family and exploring a new country."},
  {cat:"Places",icon:"🗼",title:"France",
   short:"Seen it in dramas and it looks super nice.",
   more:"After watching so many dramas set in France, I want to see the streets, the architecture and the sights in real life."}
];

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
let filter = "all";

function render(){
  const q = search.value.trim().toLowerCase();
  const list = posts.filter(p =>
    (filter === "all" || p.cat === filter) &&
    (p.title + " " + p.short + " " + p.more).toLowerCase().includes(q));
  grid.innerHTML = "";
  list.forEach(p => {
    const c = document.createElement("article");
    c.className = "card";
    c.innerHTML = `<div class="icon">${p.icon}</div><span class="tag">${p.cat}</span>
      <h3>${p.title}</h3><p>${p.short}</p><p class="more">${p.more}</p>
      <button class="read">Read more →</button>`;
    c.querySelector(".read").onclick = e => {
      c.classList.toggle("open");
      e.target.textContent = c.classList.contains("open") ? "Show less ↑" : "Read more →";
    };
    grid.appendChild(c);
  });
  empty.classList.toggle("hidden", list.length > 0);
}

document.getElementById("filters").addEventListener("click", e => {
  if(!e.target.dataset.f) return;
  filter = e.target.dataset.f;
  document.querySelectorAll("#filters button").forEach(b => b.classList.toggle("active", b === e.target));
  render();
});
search.addEventListener("input", render);

const themeBtn = document.getElementById("theme");
function isDark(){
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
}
function setTheme(t){
  document.documentElement.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  try{ localStorage.setItem("theme", t); }catch(e){}
}
try{ const saved = localStorage.getItem("theme"); if(saved) document.documentElement.dataset.theme = saved; }catch(e){}
themeBtn.textContent = isDark() ? "☀️" : "🌙";
themeBtn.onclick = () => setTheme(isDark() ? "light" : "dark");

document.getElementById("year").textContent = new Date().getFullYear();
render();