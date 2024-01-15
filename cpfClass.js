// 705.484.450-52 070.987.720-03
/*

7x 0x 5x 4x 8x 4x 4x 5x 0x
10 9  8  7  6  5  4  3  2
70 0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro digito)
Se o dígito for maior que 9, consideramos 0!

7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10 9  8  7  6  5  4  3  2
77  0 45 32 56 24 20 20 0  10 = 284


11 - (284 % 11) = 2 (Primeiro digito)
Se o dígito for maior que 9, consideramos 0!
*/
// Classe para validação de CPF
class ValidaCPF {
    // Construtor da classe
    constructor(cpfEnviado, valida, criaDigito, isSequencia) {
        // Atributos da instância
        this.valida = valida;
        this.criaDigito = criaDigito;
        this.isSequencia = isSequencia;

        // Define uma propriedade "cpfLimpo" somente para leitura, removendo caracteres não numéricos
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: true,
            get: function() {
                return cpfEnviado.replace(/\D+/g, '');
            }
        });

        // Método para validar o CPF
        this.valida = function() {
            // Verifica o tipo do cpf, se é Number ou String
            if (typeof this.cpfLimpo === 'undefined') return false;
            // Verifica o Tamanho do CPF
            if (this.cpfLimpo.length !== 11) return false;
            // Verifica se o CPF está em sequência
            if (this.isSequencia()) return false;

            // Obtém a parte inicial do CPF (sem os dois últimos dígitos)
            const cpfParcial = this.cpfLimpo.slice(0, -2);

            // Calcula o primeiro dígito
            const digito1 = this.criaDigito(cpfParcial);

            // Calcula o segundo dígito
            const digito2 = this.criaDigito(cpfParcial + digito1);

            // Combina a parte inicial com os dígitos calculados
            const novoCPF = cpfParcial + digito1 + digito2;

            // Verifica se o CPF válido é igual ao CPF fornecido
            return novoCPF === this.cpfLimpo;
        }

        // Método para criar um dígito verificador
        this.criaDigito = function(cpfParcial) {
            const cpfArray = Array.from(cpfParcial);
            // cpfArray é o vetor de caracteres = String
            let regressivo = cpfArray.length + 1;
            let total = cpfArray.reduce((cont, val) => {
                cont += (regressivo * Number(val));
                regressivo--;
                return cont;
            }, 0);

            // Calcula o dígito
            const digito = 11 - (total % 11);

            // Se o dígito for maior que 9, consideramos 0
            return digito > 9 ? '0' : String(digito);
        }

        // Método para verificar se o CPF está em sequência
        this.isSequencia = function() {
            // Verifica se o CPF não tem número em sequência
            const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
            return sequencia === this.cpfLimpo;
        }
    }
}

// Exemplo de uso da classe ValidaCPF
const cpf = new ValidaCPF('122-177-337-22');
console.log(cpf.valida());

if (cpf.valida()) {
    console.log('CPF Válido');
} else {
    console.log('CPF Inválido');
}