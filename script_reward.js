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
const depositConfirmButton = document.querySelector(".confirm-button");
const depositInput = document.querySelector(".amount-deposit");
const withdrawMessageBox = document.getElementById("withdrawmessageBox");
const withdrawCloseButton = document.getElementById("withdrawcloseButton");
const withdrawConfirmButton = document.querySelector(".confirm-button");
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
  const depositAmount = depositInput.value;

  hideDepositMessageBox();
});

withdrawCloseButton.addEventListener("click", function () {
  hideWithdrawMessageBox();
});

withdrawConfirmButton.addEventListener("click", function () {
  const withdrawAmount = withdrawInput.value;

  hideWithdrawMessageBox();
});
