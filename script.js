const posts = [
  {cat:"Hobbies",image:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&h=600&q=80",alt:"Gaming setup with a computer and colorful lights",title:"Playing Online Games",
   short:"Teaming up, competing and unwinding with friends online.",
   more:"Online games are my way to relax and connect. Whether it’s a team match or just hanging out in a lobby, it’s where I laugh the most with friends."},
  {cat:"Hobbies",image:"https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&h=600&q=80",alt:"Hikers walking along a mountain trail",title:"Going on Hikes",
   short:"Fresh air, tired legs and a great view at the top.",
   more:"Nothing beats the feeling of reaching the summit after a long climb. Hiking clears my head and reminds me how beautiful nature is."},
  {cat:"Hobbies",image:"https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=900&h=600&q=80",alt:"Volleyball on a court",title:"Playing Volleyball",
   short:"Spikes, dives and lots of teamwork.",
   more:"Volleyball keeps me active and teaches me to trust my teammates. The best part is that perfect point after a long rally!"},
  {cat:"Hobbies",image:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&h=600&q=80",alt:"Rows of seats in a cinema",title:"Watching Sci-fi Movies",
   short:"Space, robots, time travel – I’m in.",
   more:"I love how sci-fi asks big “what if” questions and shows worlds that don’t exist yet. A good sci-fi movie night is the best kind of night."},
  {cat:"Hobbies",image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&h=600&q=80",alt:"A colorful meal served in a bowl",title:"Eating (Yes, It’s a Hobby!)",
   short:"Trying, enjoying and talking about food.",
   more:"Eating is more than a need for me – it’s joy, comfort and bonding with family and friends. Check out my favorite foods below!"},

  {cat:"Foods",image:"https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&h=600&q=80",alt:"A plate of pasta",title:"Spaghetti",
   short:"Sweet, saucy and always a party favorite.",
   more:"Filipino-style spaghetti with its sweet sauce and cheesy top is pure comfort food. I could eat a whole plate any day."},
  {cat:"Foods",image:"https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=900&h=600&q=80",alt:"Fresh mangoes",title:"Mango Float",
   short:"Creamy, cold and layered with sweet mangoes.",
   more:"Graham crackers, cream and ripe mangoes chilled until perfect. It’s the dessert I look forward to the most."},
  {cat:"Foods",image:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&h=600&q=80",alt:"A savory cooked meat dish",title:"Humba",
   short:"Filipino braised pork that’s sweet, savory and tender.",
   more:"Humba is slow-cooked pork in soy sauce, vinegar and sugar until it melts in your mouth. Serve it with hot rice and I’m happy."},
  {cat:"Foods",image:"https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=900&h=600&q=80",alt:"A scoop of ice cream",title:"Ice Cream",
   short:"Any flavor, any time of day.",
   more:"Hot day, sad day or happy day – ice cream fits every mood. I never say no to a second scoop."},
  {cat:"Foods",image:"https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&h=600&q=80",alt:"A glazed donut",title:"Donuts",
   short:"Soft, sweet and impossible to eat just one.",
   more:"Glazed, filled or chocolate-covered, donuts are my go-to treat with a cup of coffee or just on their own."},

  {cat:"Places",image:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&h=600&q=80",alt:"A traditional street in Japan",title:"Japan",
   short:"Dreaming of its rich and beautiful culture.",
   more:"From ancient temples to modern cities, Japan blends tradition and innovation. I want to experience the culture, the food and the scenery up close."},
  {cat:"Places",image:"https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=900&h=600&q=80",alt:"Toronto skyline in Canada",title:"Canada",
   short:"Family is there, and the work opportunities are great.",
   more:"I have relatives in Canada, and it’s known for good work and a great quality of life. Visiting would mean seeing family and exploring a new country."},
  {cat:"Places",image:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&h=600&q=80",alt:"The Eiffel Tower in Paris, France",title:"France",
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
    c.innerHTML = `<img class="icon" src="${p.image}" alt="${p.alt}" loading="lazy" decoding="async"><span class="tag">${p.cat}</span>
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