import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name: 'speedrunTimer'
})
export class SpeedrunTimerPipe implements PipeTransform {
    transform(value: number): string {
        if (value === undefined) return "N/A";
        const hours = Math.floor(value / 3600);
        const rem = value % 3600;
        const minutes = Math.floor(rem / 60);
        const seconds = Math.floor(rem % 60);
        return hours.toString().padStart(2, '0') +':'
        + minutes.toString().padStart(2, '0')  + ':'
        + seconds.toString().padStart(2, '0')
    }

}