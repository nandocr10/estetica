import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return 'R$ 0,00'; // Retorna um valor padrão se o valor for nulo ou indefinido
    }
    if (isNaN(value)) {
      return 'R$ 0,00'; // Retorna um valor padrão se o valor não for um número válido
    }

    // Formata o número com duas casas decimais e troca o ponto por vírgula
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }
}
