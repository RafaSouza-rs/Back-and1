//1 -> Escreva na tela todos os números pares de 0 a 100

console.log("Os numeros pares sao: ")
for(let i = 0; i <= 100; i++){
    if(i % 2 == 0){
        console.log(i);
    }
}


//2 -> Criar um algoritmo que percorre um array de números 
//qualquer e retorna a soma total desses números
//ex: [2, 4, 6, 8] -> Soma: 2 + 4 + 6 + 8 = 20

function calcular(array){
    let soma = 0;
    for(let i = 0; i < array.length; i++){
        soma =+ array[i];
    }
    return soma;
}
const arrayNum = [2, 4, 6, 8];
const total = calcular(arrayNum);
console.log("Soma Total: ", total);

//3 -> Crie uma função que remova todos os números negativos de um array
//ex: [-1, 1, -2, 2, -3, 3] -> [1, 2, 3]

function remover(array){
    return array.filter((num) => num >= 0);
}
const numeros = [-1, 1, -2, 2, -3, 3];
const positivos = remover(numeros);
console.log("Os numeros positivos sao: ", positivos);



