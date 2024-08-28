import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idinarupees'
})
export class IdinarupeesPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return '';
    }

    // Convert the number to a string and split it into integer and decimal parts
    const parts = value.toFixed(2).split('.');

    // Format the integer part with commas
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the integer and decimal parts, and add the Indian Rupee symbol
    var  formattedNumber = '₹' + integerPart;
    //var  formattedNumber = integerPart;
    if (parts.length > 1) {
      formattedNumber += '.' + parts[1];
    }

    return formattedNumber;
  }

}
