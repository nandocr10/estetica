import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageFormat'
})
export class PercentageFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) {
      return '0,00'; // Valor padrão se o valor for nulo ou indefinido
    }
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numberValue)) {
      return '0,00'; // Valor padrão se o valor não for um número válido
    }
    // Formata o número com duas casas decimais e substitui o ponto por vírgula
    return numberValue.toFixed(2).replace('.', ',');
  }
}
