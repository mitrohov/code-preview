export const useHelpers = () => {
  // Функция определяет сколько процентов, составляет число x от числа y
  const percentageOfOneNumberFromAnother = (x: number, y: number) => {
    return Math.round((x / y) * 100)
  }

  return {
    percentageOfOneNumberFromAnother,
  }
}
