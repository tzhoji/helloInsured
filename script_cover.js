let menu_icon=document.querySelector('.menu-icon');
let nav_list=document.querySelector('.navigation');
const navItems = document.querySelectorAll('.navigation-item');
const navLinks = document.querySelectorAll('.navigation a');
const coverpage=document.querySelector('.mycover-page')

// To shrink the navigation bar
menu_icon.onclick=function(){
    menu_icon.classList.toggle("active")
    nav_list.classList.toggle("active")
    coverpage.classList.toggle("active")
}

// To hover different navigation link
const xIcons = [
    { element: document.querySelector('.x-icon1'), file: './MyWealth White Icon.png' },
    { element: document.querySelector('.x-icon2'), file: './MyCover White Icon.png' },
    { element: document.querySelector('.x-icon3'), file: './MyCredit White Icon.png' },
    { element: document.querySelector('.x-icon4'), file: './MyPath White Icon.png' }
  ];

const yIcons = [
    { element: document.querySelector('.x-icon1'), file: './MyWealth Black Icon.png' },
    { element: document.querySelector('.x-icon2'), file: './MyCover Black Icon.png' },
    { element: document.querySelector('.x-icon3'), file: './MyCredit Black Icon.png' },
    { element: document.querySelector('.x-icon4'), file: './MyPath Black Icon.png' }
  ];

for (let i=0;i<navItems.length;i++){
    const navItem=navItems[i]
    const xIcon=xIcons[i]
    const yIcon=yIcons[i]


    navItem.addEventListener('mouseover', function(){
    xIcon.element.src=yIcon.file;
    navLinks[i].style.color='rgb(0,0,0)'
    })

    navItem.addEventListener('mouseout',function(){
        xIcon.element.src=xIcon.file;
        navLinks[i].style.color='rgb(255,255,255)'
    })


}



const coverItem={
  'PRUShield':188,
  'PRUActive LinkGuard': 900,
  'PRUWealth Income':948,
  'PRUShield Plus':214
}

const healthItem={
  'PRUShield':188,
  'PRUShield Plus':214,
  'PRUPersonal Accident Plan D': 472,
  'PRUWMan Plan D':1053,
}

const lifeItem={
  'PRUVital Cover':560,
  'PRUActive LinkGuard':900,
  'PRUActive Life III': 778,
  'PRUActive Term':603,
}

function generateCustomiseItemHTML(item, price) {
  return `
    <div class="cover-item">
      <div class="itemitem">${item}</div>
      <div class="itemprice">$ ${price}</div>
      <h3>/year</h3>

      <button onclick="handleCustomiseItemClick('${item}', ${price})">+ </button>
    </div>
  `;
}

function generateHealthItemHTML(item, price) {
  return `
    <div class="cover-item">
      <div class="itemitem">${item}</div>
      <div class="itemprice">$ ${price}</div>
      <h3>/year</h3>

      <button onclick="handleHealthItemClick('${item}', ${price})">+ </button>
    </div>
  `;
}

function generateLifeItemHTML(item, price) {
  return `
    <div class="cover-item">
      <div class="itemitem">${item}</div>
      <div class="itemprice">$ ${price}</div>
      <h3>/year</h3>

      <button onclick="handleLifeItemClick('${item}', ${price})">+ </button>
    </div>
  `;
}


function handleCustomiseItemClick(item, price) {

  handleSummary(item, price, 'Customised Product');
}

function handleHealthItemClick(item, price) {

  handleSummary(item, price, 'Health Insurance');
}

function handleLifeItemClick(item, price) {

  handleSummary(item, price, 'Life Insurance');
}
// Show in customise content
function renderCustomiseItems() {
  const customisecontent = document.getElementById('customise-container');

  // Clear the content 
  customisecontent.innerHTML = '';

  // Loop through the coverItem 
  for (const [item, price] of Object.entries(coverItem)) {
    const itemHTML = generateCustomiseItemHTML(item, price);
    customisecontent.innerHTML += itemHTML;
  }
}

// Show in health content
function renderHealthItems() {
  const healthcontent = document.getElementById('health-container');
  // Clear the content 
  healthcontent.innerHTML = '';

  // Loop through the coverItem 
  for (const [item, price] of Object.entries(healthItem)) {
    const itemHTML = generateHealthItemHTML(item, price);
    healthcontent.innerHTML += itemHTML;
  }
}

function renderLifeItems() {
  const lifecontent = document.getElementById('life-container');
  // Clear the content 
  lifecontent.innerHTML = '';

  // Loop through the LifeItem 
  for (const [item, price] of Object.entries(lifeItem)) {
    const itemHTML = generateLifeItemHTML(item, price);
    lifecontent.innerHTML += itemHTML;
  }
}



// let totalPrice=0;
let totalCustomisedPrice = 0;
let totalHealthPrice = 0;
let totalLifePrice = 0;
//Show result in summary
function handleSummary(item,price,category){
  const coversummarycontent=document.querySelector('.coversummarycontent')
   // Create a new div for the clicked item
   
   const newItemDiv = document.createElement('div');
   newItemDiv.className = 'summary-item';
   newItemDiv.innerHTML = `
     <div class="item">${item}</div>
     <div class="category">${category}</div>
     <div class="price">$ ${price}</div>
     <div class="yeartext">/year</div>
     <button class="delete-button" onclick="handleDeleteSummaryItemClick(this)">X</button>
   `;
 
   // Append the new div to the coversummarycontent
   coversummarycontent.appendChild(newItemDiv);

  //  totalPrice += price;

   if (category === 'Customised Product') {
    totalCustomisedPrice = totalCustomisedPrice + price;
    // totalPrice+=totalCustomisedPrice
  } else if (category === 'Health Insurance') {
    totalHealthPrice =  totalHealthPrice + price;
    // totalPrice+= totalHealthPrice
  } else if (category === 'Life Insurance') {
    totalLifePrice = totalLifePrice + price;
    // totalPrice+= totalLifePrice
  }
  totalPrice = totalCustomisedPrice + totalHealthPrice + totalLifePrice;
   updateTotalPrice();
   drawPieChart();
 }

 function handleDeleteSummaryItemClick(button) {
  // Find the parent div (summary-item) and remove it from coversummarycontent
  const summaryItemDiv = button.parentNode;
  summaryItemDiv.parentNode.removeChild(summaryItemDiv);
  const deletedPrice = parseFloat(button.parentNode.querySelector('.price').textContent.slice(2));
  const category = button.parentNode.querySelector('.category').textContent;
  // totalPrice -= deletedPrice;

  if (category === 'Customised Product') {
    totalCustomisedPrice -= deletedPrice;
    // totalPrice+=totalCustomisedPrice
  } else if (category === 'Health Insurance') {
    totalHealthPrice -= deletedPrice;
    // totalPrice+=totalHealthPrice
  } else if (category === 'Life Insurance') {
    totalLifePrice -= deletedPrice;
    // totalPrice+=totalLifePrice
  }
  totalPrice = totalCustomisedPrice + totalHealthPrice + totalLifePrice;
  updateTotalPrice();
  drawPieChart();
}

function updateTotalPrice() {
  const totalsumvalue = document.querySelector('.totalsumvalue');
  totalsumvalue.textContent = totalPrice.toFixed(2); // Display the total price with 2 decimal places
}


renderCustomiseItems();
renderHealthItems();
renderLifeItems();



// Function to draw the pie chart 

function drawPieChart() {

 
  const trace = {
      labels: ['Customised Insurance','Health Insurance','Life Insurance'],
      values: [totalCustomisedPrice, totalHealthPrice, totalLifePrice],
      type: 'pie'
  };

  const layout = {
      title: `Cover Distribution`,
      hovermode:"closest",
      width:350,
      height:300,
      // autosize: true,
      // automargin: true,

      xanchor: 'center',
      yanchor: 'top',
      margin:{
        l:0,
        b:3,
        t:80,
        r:0,
       
      },
      plot_bgcolor:'#111111',
      showlegend: true,
      legend: {
        x:0.5,
        y:-0.2,
        orientation: "h",
        xanchor: "center",
        entrywidth:500,
        entrywidthmode:"pixels",
        font:{
          size:8
        }

      }

  
  };

  const config = {
      responsive: true,
      showEditInChartStudio: true,
    plotlyServerURL: "https://chart-studio.plotly.com"
  };

  const chartContainer = document.getElementById('distribution-container');
  Plotly.newPlot(chartContainer, [trace], layout, config);
}

