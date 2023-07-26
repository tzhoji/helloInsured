let menu_icon = document.querySelector(".menu-icon");
let nav_list = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".navigation-item");
const navLinks = document.querySelectorAll(".navigation a");
const pathpage = document.querySelector(".mypath-page");
const pinimage = document.querySelector(".pinimage");
// const pinimageA = document.querySelector(".pinimageA");
// const pinimageB = document.querySelector(".pinimageB");
// const pinimageC = document.querySelector(".pinimageC");
// const pinimageD = document.querySelector(".pinimageD");

const pinimages = document.querySelectorAll(".pinimage");
const messageBox = document.getElementById("messageBox");
const closeButton = document.getElementById("closeButton");

// To shrink the navigation bar
menu_icon.onclick = function () {
  menu_icon.classList.toggle("active");
  nav_list.classList.toggle("active");
  pathpage.classList.toggle("active");
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

const activepinimage = "./Active Pin Icon.png";
const nonactivepinimage = "./Pin Icon.png";

pinimages.forEach((pinimage) => {
  pinimage.addEventListener("mouseover", function () {
    pinimage.src = activepinimage;
    pinimage.style.transform = "translateY(-20px)";
  });

  pinimage.addEventListener("mouseout", function () {
    pinimage.src = nonactivepinimage;
    pinimage.style.transform = "none";
  });
});

// Put the image, paragraph, title
const pinData = [
  {
    title: "Young Professionals (Aged 20-35)",
    image: "./young_pie.png",
    description:
      "Invest in a mix of stocks and bonds for growth and stability, while having cash reserves for emergencies. Get essential insurance such as health insurance, renter/homeowner insurance, and possibly term life insurance if dependents are present for protection.",
  },
  {
    title: "Established Career (Aged 35-50)",
    image: "./establish_pie.png",
    description:
      "Maintain a balanced portfolio with reduced stock exposure as responsibilities increase. Prioritize insurance coverage for health insurance, homeowner insurance, term life insurance (if dependents), disability insurance, and possibly long-term care insurance.",
  },

  {
    title: "Pre-Retirement (Aged 50-65)",
    image: "./preretirement_pie.png",
    description:
      "Increase cash and bond allocation for added safety and income generation. Diversify investments and secure comprehensive insurance coverage, including health insurance, homeowner insurance, term life insurance (if dependents), disability insurance, long-term care insurance, and potentially annuities for guaranteed income during retirement.",
  },

  {
    title: "Retirement (Aged 65+)",
    image: "./retirement_pie.png",
    description:
      "Hold more cash and bonds for stability, while still having some exposure to equities. Focus on insurance for Health (Medicare and Supplemental Plans), Life (for estate planning/legacy purposes) and any annuities purchased earlier for retirement income.",
  },
];

pinimages.forEach((pinimage, index) => {
  pinimage.addEventListener("click", function () {
    const data = pinData[index];
    document.querySelector(".message-content h2").textContent = data.title;
    document.querySelector(".message-content img").src = data.image;
    document.querySelector(".message-content p").textContent = data.description;

    messageBox.style.display = "block";
  });
});

closeButton.addEventListener("click", function () {
  messageBox.style.display = "none";
});

// pinimageB.addEventListener("mouseover", function () {
//   pinimageB.src = activepinimage;
//   pinimageB.style.transform = "translateY(-20px)";
// });

// pinimageB.addEventListener("mouseout", function () {
//   pinimageB.src = nonactivepinimage;
//   pinimageB.style.transform = "none";
// });

// pinimageC.addEventListener("mouseover", function () {
//   pinimageC.src = activepinimage;
//   pinimageC.style.transform = "translateY(-20px)";
// });

// pinimageC.addEventListener("mouseout", function () {
//   pinimageC.src = nonactivepinimage;
//   pinimageC.style.transform = "none";
// });

// pinimageD.addEventListener("mouseover", function () {
//   pinimageD.src = activepinimage;
//   pinimageD.style.transform = "translateY(-20px)";
// });

// pinimageD.addEventListener("mouseout", function () {
//   pinimageD.src = nonactivepinimage;
//   pinimageD.style.transform = "none";
// });
