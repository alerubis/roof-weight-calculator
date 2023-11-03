import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { slideInUpOnEnterAnimation } from 'angular-animations';
import packageJson from '../../package.json';
import { CalcoloPrecedente, Materiale, elencoLavorazioni, elencoMateriali } from './app.data';
import { CalcoliPrecedentiDialogComponent } from './calcoli-precendenti-dialog/calcoli-precedenti-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        slideInUpOnEnterAnimation({ anchor: 'slideInUpOnEnter', duration: 200, delay: 500 }),
    ]
})
export class AppComponent {

    elencoMateriali = elencoMateriali;
    elencoLavorazioni = elencoLavorazioni;

    mostraValori: boolean = false;

    version = packageJson.version;

    constructor(
        private _matDialog: MatDialog,
        private _matSnackBar: MatSnackBar,
    ) {

    }

    aggiungiSpessore(materiale: Materiale): void {
        if (!materiale.spessore) {
            materiale.spessore = 0;
        }
        materiale.spessore += 1;
    }

    togliSpessore(materiale: Materiale): void {
        if (!materiale.spessore) {
            materiale.spessore = 0;
        }
        if (materiale.spessore > 0) {
            materiale.spessore -= 1;
        }
    }

    getTotale(): number {
        let totale = 0;
        for (const materiale of this.elencoMateriali) {
            if (materiale.spessore) {
                totale += materiale.spessore * materiale.valore;
            }
        }
        for (const lavorazione of this.elencoLavorazioni) {
            if (lavorazione.selezionato) {
                totale += lavorazione.valore;
            }
        }
        return totale;
    }

    reset(): void {
        for (const materiale of this.elencoMateriali) {
            if (materiale.spessore) {
                materiale.spessore = undefined;
            }
        }
        for (const lavorazione of this.elencoLavorazioni) {
            if (lavorazione.selezionato) {
                lavorazione.selezionato = false;
            }
        }
    }

    calcoliPrecedenti(): void {
        this._matDialog.open(CalcoliPrecedentiDialogComponent, {
            height: '80%',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '640px',
        }).afterClosed().subscribe((r: CalcoloPrecedente) => {
            if (r) {
                this.reset();
                for (const materiale of r.materiali) {
                    const m = this.elencoMateriali.find(x => x.id === materiale.id);
                    if (m) {
                        m.spessore = materiale.spessore;
                    }
                }
                for (const materiale of r.lavorazioni) {
                    const m = this.elencoLavorazioni.find(x => x.id === materiale.id);
                    if (m) {
                        m.selezionato = materiale.selezionato;
                    }
                }
            }
        });
    }

    saveCalcolo(): void {
        try {
            let calcoliPrecedenti: CalcoloPrecedente[] = [];
            const calcoliPrecedentiFromLocalStorage = localStorage.getItem('roof-weight-calculator.calcoli-precedenti');
            if (calcoliPrecedentiFromLocalStorage) {
                calcoliPrecedenti = JSON.parse(calcoliPrecedentiFromLocalStorage) || [];
            }
            const calcolo = new CalcoloPrecedente();
            calcolo.id = calcoliPrecedenti.length + 1;
            calcolo.materiali = this.elencoMateriali;
            calcolo.lavorazioni = this.elencoLavorazioni;
            calcolo.countMateriali = this.elencoMateriali.filter(x => x.spessore).length;
            calcolo.countLavorazioni = this.elencoLavorazioni.filter(x => x.selezionato).length;
            calcolo.totale = this.getTotale();
            calcoliPrecedenti.unshift(calcolo);
            localStorage.setItem('roof-weight-calculator.calcoli-precedenti', JSON.stringify(calcoliPrecedenti));
            this._matSnackBar.open('Calcolo salvato con successo.', 'Ok');
        } catch (error) {

        }
    }

}
