let lang = "en";

function toggleLang(){
  lang = lang === "en" ? "es" : "en";
  document.querySelectorAll("[data-en]").forEach(el=>{
    const value = el.getAttribute("data-" + lang);
    if(value) el.innerHTML = value;
  });
  if(typeof renderHabitat === "function") renderHabitat(currentHabitat);
}

const animalFacts = {
  eagle: {
    en:"The Harpy Eagle is one of Darién's most iconic birds. UNESCO notes a major population of this near-threatened species in the park.",
    es:"El águila harpía es una de las aves más emblemáticas de Darién. UNESCO señala que el parque alberga una población importante de esta especie."
  },
  jaguar:{
    en:"The jaguar is one of the large predators recorded in Darién National Park.",
    es:"El jaguar es uno de los grandes depredadores registrados en el Parque Nacional Darién."
  },
  tapir:{
    en:"The Central American Tapir is an endangered mammal found in Darién.",
    es:"El tapir centroamericano es un mamífero en peligro de extinción que se encuentra en Darién."
  },
  macaw:{
    en:"The Great Green Macaw is an endangered bird recorded in the park.",
    es:"La guacamaya verde es un ave en peligro de extinción registrada en el parque."
  }
};
function showAnimal(key){
  const box=document.getElementById("animalInfo");
  if(box) box.textContent=animalFacts[key][lang];
}

const habitats = [
  {en:"Darién includes a stretch of Pacific coast with sandy beaches and rocky shores.",es:"Darién incluye una parte de la costa del Pacífico con playas de arena y costas rocosas."},
  {en:"Mangroves are coastal ecosystems that provide shelter and food for many species.",es:"Los manglares son ecosistemas costeros que ofrecen refugio y alimento a muchas especies."},
  {en:"Wetlands, rivers and creeks form important freshwater habitats for wildlife.",es:"Los humedales, ríos y quebradas forman hábitats de agua dulce importantes para la fauna."},
  {en:"The park contains extensive lowland tropical rainforest and upland forests.",es:"El parque contiene extensos bosques tropicales de tierras bajas y bosques de tierras altas."},
  {en:"Mountain ecosystems rise toward Cerro Tacarcuna, reaching about 1,875 m.",es:"Los ecosistemas montañosos llegan hasta el Cerro Tacarcuna, con unos 1,875 m de altura."}
];
let currentHabitat=0;
function renderHabitat(i){
  const box=document.getElementById("habitatText");
  if(!box) return;
  box.textContent=habitats[i][lang];
  document.querySelectorAll(".tab").forEach((b,n)=>b.classList.toggle("active",n===i));
}
function habitat(i){currentHabitat=i;renderHabitat(i);}
renderHabitat(0);

const questions=[
 {en:"In which year was Darién National Park created?",es:"¿En qué año fue creado el Parque Nacional Darién?",answers:["1975","1980","1981","1990"],correct:1},
 {en:"Which organization recognizes Darién as a World Heritage Site?",es:"¿Qué organización reconoce a Darién como Patrimonio Mundial?",answers:["NASA","UNESCO","FIFA","WHO"],correct:1},
 {en:"Which bird is strongly associated with Darién?",es:"¿Qué ave está fuertemente asociada con Darién?",answers:["Harpy Eagle","Penguin","Flamingo","Ostrich"],correct:0},
 {en:"Which animal is an endangered mammal found in Darién?",es:"¿Qué animal es un mamífero en peligro de extinción que vive en Darién?",answers:["Central American Tapir","Polar Bear","Kangaroo","Camel"],correct:0},
 {en:"What makes Darién especially important?",es:"¿Qué hace especialmente importante a Darién?",answers:["Its biodiversity and connected ecosystems","Its skyscrapers","Its desert","Its ski resorts"],correct:0}
];
let q=0,score=0;
function startQuiz(){
  q=0;score=0;
  const qa=document.getElementById("quizArea"), res=document.getElementById("result");
  if(qa) qa.classList.remove("hidden");
  if(res) res.classList.add("hidden");
  showQuestion();
  window.scrollTo({top:document.getElementById("quizArea").offsetTop-30,behavior:"smooth"});
}
function showQuestion(){
  const item=questions[q];
  document.getElementById("questionNumber").textContent=`QUESTION ${q+1} / ${questions.length}`;
  document.getElementById("question").textContent=item[lang];
  const answers=document.getElementById("answers"); answers.innerHTML="";
  document.getElementById("feedback").textContent="";
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("progressBar").style.width=((q+1)/questions.length*100)+"%";
  item.answers.forEach((a,i)=>{
    const b=document.createElement("button");b.className="answer";b.textContent=a;
    b.onclick=()=>chooseAnswer(i,b);answers.appendChild(b);
  });
}
function chooseAnswer(i,btn){
  document.querySelectorAll(".answer").forEach(x=>x.classList.add("disabled"));
  const good=i===questions[q].correct;
  btn.classList.add(good?"correct":"wrong");
  if(good){score++;document.getElementById("feedback").textContent=lang==="en"?"Correct! Great job.":"¡Correcto! Muy bien.";}
  else{
    document.querySelectorAll(".answer")[questions[q].correct].classList.add("correct");
    document.getElementById("feedback").textContent=lang==="en"?"Not quite — look at the highlighted answer.":"No exactamente — mira la respuesta resaltada.";
  }
  document.getElementById("nextBtn").classList.remove("hidden");
}
function nextQuestion(){
  q++;
  if(q<questions.length) showQuestion();
  else finishQuiz();
}
function finishQuiz(){
  document.getElementById("quizArea").classList.add("hidden");
  const res=document.getElementById("result");res.classList.remove("hidden");
  const title=score===5?(lang==="en"?"DARIÉN EXPERT!":"¡EXPERTO EN DARIÉN!"):
    score>=3?(lang==="en"?"DARIÉN EXPLORER!":"¡EXPLORADOR DE DARIÉN!"):
    (lang==="en"?"KEEP EXPLORING!":"¡SIGUE EXPLORANDO!");
  document.getElementById("scoreTitle").textContent=`${title} ${score}/${questions.length}`;
  document.getElementById("scoreText").textContent=lang==="en"
    ? "Every fact you learn can help you understand why this place is worth protecting."
    : "Cada dato que aprendes ayuda a comprender por qué este lugar merece ser protegido.";
}
