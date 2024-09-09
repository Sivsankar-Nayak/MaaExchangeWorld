// Updated base URL
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const countryList = {
  AED: "AE",
  INR: "IN",
  USD: "US",
};
const dropdowns = document.querySelectorAll(".dropdown select");
const btnGetrate = document.querySelector(".getrate button");
const sendOrderDetails = document.querySelector(".sendorderdetails button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
console.log("dropdowns", dropdowns);
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  console.log("currcode", currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
const getRateCurrency = async (currencycode, flag) => {
  let toCurrencyCode = "IND";
  if (flag === 1) {
    const tableURL = `${BASE_URL}/${currencycode.toLowerCase()}.json`;
    console.log("tableurl", tableURL);
    let tableResponse = await fetch(tableURL);
    let tableData = await tableResponse.json();
    let tableRate =
      tableData[currencycode.toLowerCase()][toCurrencyCode.toLowerCase()];
    return tableRate;
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  console.log("rate inside function", rate);
  return rate;
};
const getAllCountriesValue = async () => {
  let usRate = await getRateCurrency("USD", 1);
  console.log("us rate ", usRate);
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Updated URL structure
  let rate = await getRateCurrency();
  console.log("rate", rate, fromCurr.value, toCurr.value);
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${roundToTwo(finalAmount)} ${
    toCurr.value
  }`;
  console.log("final amount", finalAmount);
  return msg.innerText;
};
const sendwhatsapp = async () => {
  var phonenumber = "+916359096603";
  let orderDetailsHeading = "Order Details From Maa Exchange World :-";
  let orderno = Math.floor(Math.random() * 1000000 + 1);
  let amount = document.querySelector(".amount input").value;
  let fromCurr = document.querySelector(".from select").value;
  let toCurr = document.querySelector(".to select").value;
  let msg = await updateExchangeRate();
  var name = document.querySelector(".name input").value;
  var email = document.querySelector(".email input").value;
  var phoneno = document.querySelector(".mobileno input").value;

  var url =
    "https://wa.me/" +
    phonenumber +
    "?text=" +
    orderDetailsHeading +
    "%0a" +
    "Name : " +
    name +
    "%0a" +
    "Email : " +
    email +
    "%0a" +
    "Phone No : " +
    phoneno +
    "%0a" +
    "Amount: " +
    amount +
    "%0a" +
    "From : " +
    fromCurr +
    "%0a" +
    "To : " +
    toCurr +
    "%0a" +
    "Order ID : " +
    orderno +
    "%0a" +
    "Estimated Amount Value to be transferred   : " +
    msg +
    "%0a";

  window.open(url, "_blank").focus();
};
btnGetrate.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
sendOrderDetails.addEventListener("click", (evt) => {
  evt.preventDefault();
  sendwhatsapp();
});
window.addEventListener("load", () => {
  updateExchangeRate();
  getAllCountriesValue();
});
