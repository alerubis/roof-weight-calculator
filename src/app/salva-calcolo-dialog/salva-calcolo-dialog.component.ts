import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalcoloPrecedente, Lavorazione, Materiale } from '../app.data';

@Component({
    selector: 'app-salva-calcolo-dialog',
    templateUrl: './salva-calcolo-dialog.component.html',
})
export class SalvaCalcoloDialogComponent {

    descrizione: string = '';
    elencoMateriali: Materiale[] = [];
    elencoLavorazioni: Lavorazione[] = [];
    totale: number = 0;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<SalvaCalcoloDialogComponent>,
        private _matSnackBar: MatSnackBar,
    ) {
        this.elencoMateriali = this.data.elencoMateriali;
        this.elencoLavorazioni = this.data.elencoLavorazioni;
        this.totale = this.data.totale;
    }

    salvaCalcolo(): void {
        try {
            let calcoliPrecedenti: CalcoloPrecedente[] = [];
            const calcoliPrecedentiFromLocalStorage = localStorage.getItem('roof-weight-calculator.calcoli-precedenti');
            if (calcoliPrecedentiFromLocalStorage) {
                calcoliPrecedenti = JSON.parse(calcoliPrecedentiFromLocalStorage) || [];
            }
            const calcolo = new CalcoloPrecedente();
            calcolo.id = calcoliPrecedenti.length + 1;
            calcolo.descrizione = this.descrizione;
            calcolo.materiali = this.elencoMateriali;
            calcolo.lavorazioni = this.elencoLavorazioni;
            calcolo.countMateriali = this.elencoMateriali.filter(x => x.spessore).length;
            calcolo.countLavorazioni = this.elencoLavorazioni.filter(x => x.selezionato).length;
            calcolo.totale = this.totale;
            calcoliPrecedenti.unshift(calcolo);
            localStorage.setItem('roof-weight-calculator.calcoli-precedenti', JSON.stringify(calcoliPrecedenti));
            this._matSnackBar.open('Calcolo salvato con successo.', 'Ok');
            this.matDialogRef.close();
        } catch (error) {

        }
    }

}
