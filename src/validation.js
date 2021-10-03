// funkcije za validaciju unosa prilikom kreiranja novog proizvoda
export const isNotEmptyField = (str) => str.trim() !== "";
export const onlyDigits = (str) => !isNaN(Number(str)); //vraca true ako je isNaN false
export const positiveNumber = (str) => Number(str) > 0;