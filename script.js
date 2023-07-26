let menu_icon = document.querySelector(".menu-icon");
let nav_list = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".navigation-item");
const navLinks = document.querySelectorAll(".navigation a");
const wealthpage = document.querySelector(".mywealth-page");

// To shrink the navigation bar
menu_icon.onclick = function () {
  menu_icon.classList.toggle("active");
  nav_list.classList.toggle("active");
  wealthpage.classList.toggle("active");
};

// To hover different navigation link
const xIcons = [
  {
    element: document.querySelector(".x-icon1"),
    file: "./MyWealth White Icon.png",
  },
  {
    element: document.querySelector(".x-icon2"),
    file: "./MyCover White Icon.png",
  },
  {
    element: document.querySelector(".x-icon3"),
    file: "./MyPath White Icon.png",
  },
  {
    element: document.querySelector(".x-icon4"),
    file: "./MyCredit White Icon.png",
  },
];

const yIcons = [
  {
    element: document.querySelector(".x-icon1"),
    file: "./MyWealth Black Icon.png",
  },
  {
    element: document.querySelector(".x-icon2"),
    file: "./MyCover Black Icon.png",
  },
  {
    element: document.querySelector(".x-icon3"),
    file: "./MyPath Black Icon.png",
  },
  {
    element: document.querySelector(".x-icon4"),
    file: "./MyCredit Black Icon.png",
  },
];

for (let i = 0; i < navItems.length; i++) {
  const navItem = navItems[i];
  const xIcon = xIcons[i];
  const yIcon = yIcons[i];

  navItem.addEventListener("mouseover", function () {
    xIcon.element.src = yIcon.file;
    // navLinks[i].style.color = "rgb(0,0,0)";
  });

  navItem.addEventListener("mouseout", function () {
    xIcon.element.src = xIcon.file;
    // navLinks[i].style.color = "rgb(255,255,255)";
  });
}

// let header_icon=document.querySelector('.header-select');
// let index_list=document.querySelector('.index-select');
// header_icon.onclick=function(){
//   header_icon.classList.toggle("active")
// }

// index_icon.onclick=function(){
//   index_icon.classList.toggle("active")
// }

function drawLineChart(x_val, y_val, headername) {
  // Code to process the data and draw the line chart using Plotly.js
  // Example:
  const trace = {
    x: x_val,
    y: y_val,
    type: "line",
    line: {
      color: "rgb(21,0,128)",
    },
  };

  const layout = {
    title: `Selection: ${headername}`,
    xaxis: {
      title: "Month-Year",
      showline: true,
      linewidth: 2,
      linecolor: "black",
    },
    yaxis: {
      title: `${headername}`,
      showline: true,
      linewidth: 2,
      linecolor: "black",
    },
  };

  const config = {
    responsive: true,
  };

  const chartContainer = document.getElementById("line-chart-container");
  Plotly.newPlot(chartContainer, [trace], layout, config);
}

// Function to draw the pie chart using Plotly.js
function drawPieChart(x_val, y_val, selmonth) {
  // Code to process the data and draw the pie chart using Plotly.js
  // Example:
  const trace = {
    labels: x_val,
    values: y_val,
    type: "pie",
  };

  const layout = {
    title: `Asset Composition of ${selmonth}`,
    hovermode: "closest",
    width: 500,
    height: 300,
    // autosize: true,
    automargin: true,
    xanchor: "center",
    yanchor: "top",
    margin: {
      l: 150,
      b: 10,
      t: 40,
      r: 10,
    },
    showlegend: true,
    legend: {
      x: 1.0,
      y: 0.5,
      entrywidth: 50,
      entrywidthmode: "pixels",
    },
  };

  const config = {
    responsive: true,
    showEditInChartStudio: true,
    plotlyServerURL: "https://chart-studio.plotly.com",
  };

  const chartContainer = document.getElementById("pie-chart-container");
  Plotly.newPlot(chartContainer, [trace], layout, config);
}

// Function to draw the combination of line and bar chart using Plotly.js

function drawComboChart(index, y_dispincome, y_income, y_expenditure) {
  // Code to process the data and draw the combination chart using Plotly.js
  // Example:
  const trace1 = {
    x: index,
    y: y_dispincome,
    type: "bar",
    name: "Disposable Income",
    width: 0.6,
    marker: {
      color: "rgba(153,153,255,1)",
      line: { color: "transparent" },
    },
  };

  const trace2 = {
    x: index,
    y: y_income,
    type: "scatter",
    mode: "lines",
    name: "Income",
    line: {
      color: "rgb(25,255,64)",
    },
  };

  const trace3 = {
    x: index,
    y: y_expenditure,
    type: "scatter",
    mode: "lines",
    name: "Expenditure",
    line: {
      color: "rgb(255,0,85)",
    },
  };

  const layout = {
    // title: 'Disposable Income & Inflow Outflow',
    hovermode: "closest",
    width: 510,
    height: 285,
    // autosize: true,
    automargin: true,
    xanchor: "center",
    yanchor: "top",
    margin: {
      l: 50,
      b: 50,
      t: 0,
      r: 0,
    },
    showlegend: true,
    legend: {
      x: 0.5,
      y: -0.4,
      orientation: "h",
      xanchor: "center",
      entrywidth: 500,
      entrywidthmode: "pixels",
    },

    xaxis: {
      title: "Month-Year",
      showline: true,
      linewidth: 0.8,
      linecolor: "black",
      tickfont: {
        size: 10,
      },
    },
    yaxis: {
      showline: true,
      linewidth: 0.8,
      linecolor: "black",
      tickfont: {
        size: 10,
      },
    },
  };

  const config = {
    responsive: true,
  };

  const chartContainer = document.getElementById("combo-chart-container");
  Plotly.newPlot(chartContainer, [trace1, trace2, trace3], layout, config);
}

// Function to handle the file upload
function processExcelData(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet data to an array of objects
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Assuming the header is in the first row of the sheet
    const header = jsonData[0];
    // Remove the first row (header) from the data
    jsonData.splice(0, 1);

    // Extract the index (assuming it is the first column of the sheet)
    const index = jsonData.map((row) => row[0]);
    // Remove the index column from the data
    jsonData.forEach((row) => row.splice(0, 1));

    // Transpose the data to get columns as headers and rows as data
    const transposedData = header
      .slice(1)
      .map((col, i) => jsonData.map((row) => row[i]));

    //Filter the label that has 'Total Asset','Bond', 'Stock','Fixed Deposit','Liability','Cash',"Debt to Asset Ratio"
    labelAsset = [
      "Total Asset",
      "Bond",
      "Stock",
      "Fixed Deposit",
      "Liability",
      "Cash",
      "Debt to Asset Ratio",
    ];

    // Populate the dropdown lists with options
    const headerSelect = document.getElementById("header-select");
    labelAsset.forEach((item) => {
      const option = document.createElement("option");
      option.text = item;
      headerSelect.appendChild(option);
    });

    const indexSelect = document.getElementById("index-select");
    index.forEach((item) => {
      const option = document.createElement("option");
      option.text = item;
      indexSelect.appendChild(option);
    });

    // Add event listeners to handle selection changes
    headerSelect.addEventListener("change", () =>
      updateLineChart(header, index, transposedData)
    );
    indexSelect.addEventListener("change", () =>
      updateLineChart(header, index, transposedData)
    );

    // Call the initial chart update
    updateLineChart(header, index, transposedData);
  };

  reader.readAsArrayBuffer(file);
}

// Function to handle the file upload
document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    processExcelData(file);
  });

// Function to update the line chart based on the selected options
function updateLineChart(header, index, data) {
  // Get the selected header and index
  const selectedHeader = document.getElementById("header-select").value;
  const selectedIndex = document.getElementById("index-select").value;

  // Find the index of the selected header
  const headerIndex = header.indexOf(selectedHeader);
  // Filter the corresponding data for the selected header
  const selectedYData = data[headerIndex - 1];

  // Filter the corresponding data for the selected index
  const selectedIndexIndex = index.indexOf(selectedIndex);
  // const selectedXData = data.map(row => row[selectedIndexIndex]);
  const selectedXData = [];
  data.forEach((row) => selectedXData.push(row[selectedIndexIndex]));
  const xpie_val = header.slice(1);
  //Filter data that has Bond Cash Fixed Deposit Stock Liability

  const piechartlabels = [
    "Bond",
    "Stock",
    "Fixed Deposit",
    "Liability",
    "Cash",
  ];
  const labelIndices = {};
  header.slice(1).forEach((label, idx) => {
    if (piechartlabels.includes(label)) {
      labelIndices[label] = idx;
    }
    console.log(labelIndices);
  });
  // Extract the values for each label based on the mapping
  const selectedValuesForLabels = piechartlabels.map((label) => {
    const columnIndex = labelIndices[label];
    return selectedXData[columnIndex];
  });

  //Filter data that has disposable income, Income, Expenditure
  dispincomeindex = header.indexOf("Disposable Income");
  incomeindex = header.indexOf("Income");
  expindex = header.indexOf("Expenditure");
  const y_dispincome = data[dispincomeindex - 1];
  const y_income = data[incomeindex - 1];
  const y_expenditure = data[expindex - 1];
  // console.log(y_dispincome);

  // Draw the charts using Plotly.js
  drawLineChart(index, selectedYData, selectedHeader);
  drawPieChart(piechartlabels, selectedValuesForLabels, selectedIndex);
  drawComboChart(index, y_dispincome, y_income, y_expenditure);
}
