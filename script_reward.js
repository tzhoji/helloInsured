let menu_icon = document.querySelector(".menu-icon");
let nav_list = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".navigation-item");
const navLinks = document.querySelectorAll(".navigation a");
const rewardpage = document.querySelector(".myreward-page");

// To shrink the navigation bar
menu_icon.onclick = function () {
  menu_icon.classList.toggle("active");
  nav_list.classList.toggle("active");
  rewardpage.classList.toggle("active");
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

const voucheritem = {
  "PRUShield Plus": 5,
  PRUVital: 5,
  PRUActive: 5,
};

function generatevoucherItemHTML(item, price) {
  return `
    <div class="voucher-item">
      <div class="voucheritem">${item}</div>
      <div class="voucherprice">$ ${price}</div>


      <button onclick="handlevoucherRedeemClick(this,'${item}')">10 points </button>
    </div>
  `;
}

function rendervoucherItems() {
  const vouchercontent = document.getElementById("redeem-container");

  // Clear the content
  vouchercontent.innerHTML = "";

  // Loop through the coverItem
  for (const [item, price] of Object.entries(voucheritem)) {
    const itemHTML = generatevoucherItemHTML(item, price);
    vouchercontent.innerHTML += itemHTML;
  }
}

rendervoucherItems();

// Claim voucher
function handlevoucherRedeemClick(button, item) {
  const pointvalue = document.querySelector(".rewardpointvalue");
  const voucherItemDiv = button.parentNode;
  const currentPoints = parseInt(pointvalue.textContent);
  voucherItemDiv.parentNode.removeChild(voucherItemDiv);
  pointvalue.textContent = currentPoints - 10;
  document.querySelector(".redeemcontent h2").textContent = "Redeemed";
  document.querySelector(".redeemcontent img").src = "./redeem-points.png";
  redeemmessageBox.style.display = "block";
}
redeemcloseButton.addEventListener("click", function () {
  redeemmessageBox.style.display = "none";
});

const depositButton = document.querySelector(".depositbutton");
const withdrawButton = document.querySelector(".withdrawbutton");
const depositMessageBox = document.getElementById("depositmessageBox");
const depositCloseButton = document.getElementById("depositcloseButton");
const depositConfirmButton = document.querySelector(".deposit-confirm-button");
const depositInput = document.querySelector(".amount-deposit");
const withdrawMessageBox = document.getElementById("withdrawmessageBox");
const withdrawCloseButton = document.getElementById("withdrawcloseButton");
const withdrawConfirmButton = document.querySelector(
  ".withdraw-confirm-button"
);
const withdrawInput = document.querySelector(".amount-withdraw");

function showDepositMessageBox() {
  depositMessageBox.style.display = "block";
}

function hideDepositMessageBox() {
  depositMessageBox.style.display = "none";
}

function showWithdrawMessageBox() {
  withdrawMessageBox.style.display = "block";
}

function hideWithdrawMessageBox() {
  withdrawMessageBox.style.display = "none";
}

depositButton.addEventListener("click", function () {
  showDepositMessageBox();
});

withdrawButton.addEventListener("click", function () {
  showWithdrawMessageBox();
});

depositCloseButton.addEventListener("click", function () {
  hideDepositMessageBox();
});

depositConfirmButton.addEventListener("click", function () {
  const depositAmount = parseFloat(depositInput.value);

  // Calculate the new amountwallet value for the current month
  const lastMonthValue = amountwallet[amountwallet.length - 1];
  const newAmountValue = lastMonthValue + depositAmount;

  // Add the current month's data to the dateList array
  const currentDate = new Date();
  const currentMonthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  dateList.push(currentMonthYear);

  // Add the new amountwallet value to the amountwallet array
  amountwallet.push(newAmountValue);

  // Redraw the line chart with the updated data
  drawLineChart(dateList, amountwallet);
  hideDepositMessageBox();
});

withdrawCloseButton.addEventListener("click", function () {
  hideWithdrawMessageBox();
});

withdrawConfirmButton.addEventListener("click", function () {
  const withdrawAmount = parseFloat(withdrawInput.value);

  // Calculate the new amountwallet value for the current month
  const lastMonthValue = amountwallet[amountwallet.length - 1];
  const newAmountValue = lastMonthValue - withdrawAmount;

  // Add the current month's data to the dateList array
  const currentDate = new Date();
  const currentMonthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  dateList.push(currentMonthYear);

  // Add the new amountwallet value to the amountwallet array
  amountwallet.push(newAmountValue);

  // Redraw the line chart with the updated data
  drawLineChart(dateList, amountwallet);

  hideWithdrawMessageBox();
});

function generateDateList() {
  const startDate = new Date(2022, 9); // October is month 9 (0-indexed)
  const endDate = new Date(2023, 5); // June is month 5 (0-indexed)
  const dateList = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString("default", { month: "long" });
    dateList.push(`${month} ${year}`);
    currentDate.setMonth(currentDate.getMonth() + 1); // Increment by one month
  }

  return dateList;
}

const dateList = generateDateList();
const amountwallet = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20];

function drawLineChart(x_val, y_val) {
  const trace = {
    x: x_val,
    y: y_val,
    type: "line",
    line: {
      color: "rgb(128,128,255)",
    },
  };

  const layout = {
    title: `Cash Wallet Amount`,
    xaxis: {
      // title: "Month-Year",
      // showline: true,
      zeroline: true,
      linewidth: 2,
      linecolor: "black",
      tickangle: 90,
      font: {
        size: 10,
      },
    },
    yaxis: {
      title: `Cash Wallet Amount ($)`,
      // showline: true,
      zeroline: true,
      rangemode: "tozero",
      linewidth: 2,
      linecolor: "black",
    },
    hovermode: "closest",
    width: 750,
    height: 420,
    autosize: true,
    automargin: true,
    xanchor: "center",
    yanchor: "center",
    margin: {
      l: 80,
      b: 120,
      t: 50,
      r: 120,
    },
  };

  const config = {
    responsive: true,
    showEditInChartStudio: true,
    plotlyServerURL: "https://chart-studio.plotly.com",
  };

  const chartContainer = document.getElementById("linechartcashwallet");
  Plotly.newPlot(chartContainer, [trace], layout, config);
}
drawLineChart(dateList, amountwallet);
