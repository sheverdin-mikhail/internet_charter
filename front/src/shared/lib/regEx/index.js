

export const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
export const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*[\]{}().\-_])(?=.*[a-z]).{8,}$/g
// export const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
export const fioRegEx = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})\s([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/gm