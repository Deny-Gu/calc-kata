// Функция перевода римских цифр в арабские
function roman2arabic (s) {
    const map = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
    return [...s].reduce((r,c,i,s) => map[s[i+1]] > map[c] ? r-map[c] : r+map[c], 0);
  };

// Функция перевода арабских цифр в римские
function arabic2roman(num) {
    let r = [["I","V"],["X","L"],["C","D"],["M",""]];
    let f = [[],[[0,1,0]],[[0,2,0]],[[0,3,0]],[[0,1,1],[0,1,0]],[[0,1,1]],
            [[0,1,0],[0,1,1]],[[0,2,0],[0,1,1]],[[0,3,0],[0,1,1]],[[1,1,0],[0,1,0]]];
    let rim = "";
  
    String(num).split("").reverse().forEach((element, i) =>  
          f[element].forEach((d) => 
                 rim = rim.concat (r[i+d[0]][d[2]].repeat(d[1]))));
        
    return rim.split("").reverse().join("");
  };

// Функция калькулятор с арабскими и римскими цифрами
function calculator (str) {

    // Регулярные выражения для арабских и римских цифр
    let regExpA = /^[0-9]{1,2} [\+\-\*\/] [0-9]{1,2}$/;
    let regExpR = /^[A-Z]{1,4} [\+\-\*\/] [A-Z]{1,4}$/;

    // Проверяем строку на корректные данные по паттерну и разбиваем строку на массив по разделителю
    if (regExpA.test(str)) {
        arrNum = str.split(' ');
    } else if (regExpR.test(str)) {
        arrNum = str.split(' ');
    } else {
      throw Error("Вы ввели некорректные данные");
    }

    // Проверяем, чтобы операнды не были больше 10
    if ( Number(arrNum[0]) > 10 || Number(arrNum[2]) > 10) {
      throw Error("Вы ввели некорректные данные");
    }

    // Проверяем операнды, римские или арабские,  получаем результат выражения
    if ( ( /[^0-9]/.test(arrNum[0])) && (/[^0-9]/.test(arrNum[2]) )
        && ( (roman2arabic(arrNum[0]) <= 10) && (roman2arabic(arrNum[2]) <= 10) ) ) {

            rimToArab = eval(roman2arabic(arrNum[0]) + arrNum[1] + roman2arabic(arrNum[2]));

            if (rimToArab < 1) {
                return '';
            } else {
                return arabic2roman(Math.floor(rimToArab));
            }
    } else {
      // Проверяем, чтобы арабские операнды не были равны 0, получаем результат выражения
             if ((arrNum[0] != 0) && (arrNum[2] != 0)) {
                 rimToArab = eval(arrNum[0] + arrNum[1] + arrNum[2]);
                return String(Math.floor(rimToArab)); 
            } else {
                 throw Error("Вы ввели некорректные данные");
            }
    }
};
