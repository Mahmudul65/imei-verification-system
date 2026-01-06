// Validates IMEI using Luhn algorithm
export function isValidIMEI(imei) {
  if (typeof imei !== "string") return false;
  if (!/^\d{15}$/.test(imei)) return false;
  if (/^(\d)\1{14}$/.test(imei)) return false; // all digits same not allowed

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let num = Number(imei[i]);
    if (i % 2 === 1) { // double every 2nd digit (odd index in 0-based)
      num *= 2;
      if (num > 9) num -= 9;
    }
    sum += num;
  }

  return sum % 10 === 0;
}
