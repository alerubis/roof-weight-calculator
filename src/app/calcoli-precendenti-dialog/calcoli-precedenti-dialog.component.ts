import { Component, OnInit } from '@angular/core';
import { CalcoloPrecedente } from '../app.data';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'calcoli-precedenti-dialog-root',
    templateUrl: './calcoli-precedenti-dialog.component.html',
})
export class CalcoliPrecedentiDialogComponent implements OnInit {

    calcoliPrecedenti: CalcoloPrecedente[] = [];

    constructor(
        public matDialogRef: MatDialogRef<CalcoliPrecedentiDialogComponent>,
  ) {}

    ngOnInit(): void {
        const calcoliPrecedenti = localStorage.getItem('roof-weight-calculator.calcoli-precedenti');
        if (calcoliPrecedenti) {
            this.calcoliPrecedenti = JSON.parse(calcoliPrecedenti) || [];
        }
    }

    visualizzaCalcolo(calcolo: CalcoloPrecedente): void {
        this.matDialogRef.close(calcolo);
    }

    eliminaCalcolo(calcolo: CalcoloPrecedente): void {
        this.calcoliPrecedenti = this.calcoliPrecedenti.filter(x => x.id !== calcolo.id);
        localStorage.setItem('roof-weight-calculator.calcoli-precedenti', JSON.stringify(this.calcoliPrecedenti));
    }

}
