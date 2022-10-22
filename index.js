const request = require("request");
const ask = require("prompts");
var logs;
var gerados = 0;
const fs = require("fs");
function gerarLetras(params) {
    let tam = Math.floor(Math.random()*8 + 8);
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?@#$%&*()[]{}\|/+-_';

    if (params) {
        chars = '';
        tam = (params.tamanho > 0) ? params.tamanho : 8;
        chars += (typeof params.numeros === 'undefined' || params.numeros) ? '0123456789' : '';
        chars += (typeof params.simbolos === 'undefined' || params.simbolos) ? '!?@#$%&*()[]{}\|/+-_' : '';
        chars += (typeof params.maisculo === 'undefined' || params.maisculo) ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
        chars += (typeof params.minusculo === 'undefined' || params.minusculo) ? 'abcdefghijklmnopqrstuvwxyz' : '';
        const nao = (typeof params.naoIncluir !== 'undefined' && params.naoIncluir.length > 0) ? params.naoIncluir : '';

        [...nao].forEach(n => chars = chars.split(n).join(''));
    }

    return Array(tam).fill(chars).map(x => { return x[Math.floor(Math.random()*chars.length)] } ).join(''); 
}
const clearLastLine = () => {
  process.stdout.moveCursor(0, -1)
  process.stdout.clearLine(1)
}
const banner = () => {
    const data = fs.readFileSync(".banner", "utf-8");
    console.log(data);
}
(async () => {
    banner();
	logs = await ask({
		type: "confirm",
		name: "log",
		message: "Ativar logs? "
	});
	clearLastLine();
	
	await gerarNitros()
})();
async function gerarNitros(){
    var i = 0;
    var valInv = "Calma";
    clearLastLine();
    console.log('\n...');
    while(i == 0){
    gerados++;
    const nitro = gerarLetras({tamanho: 16, numeros: true, minusculo: true, maiusculo: true, simbolos: false});
    request("https://discord.com/api/v9/entitlements/gift-codes/" + nitro, function(err, response, body){
    if(body.message == "Unknown Gift Code") valInv = "Valido";
    else valInv = "Invalido";
	if(logs.log) console.log(valInv + "|| https://discord.gift/" + nitro);
	else {
	    clearLastLine();
		console.log("Nitros gerados: " + gerados);
	}
	});
	}
}
