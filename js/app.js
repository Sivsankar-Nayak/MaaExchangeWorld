// Updated base URL
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
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
};
const sendwhatsapp = async () => {
  var phonenumber = "+917992889688";
  let orderDetailsHeading = "ORDER DETAILS";
  let orderno = Math.floor(Math.random() * 1000000 + 1);
  let amount = document.querySelector(".amount input").value;
  let fromCurr = document.querySelector(".from select").value;
  let toCurr = document.querySelector(".to select").value;
  let msg = document.querySelector(".msg").textContent;
  var name = document.querySelector(".name input").value;
  var email = document.querySelector(".email input").value;

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
  sendwhatsapp();
});
window.onload = getAllCountriesValue();
