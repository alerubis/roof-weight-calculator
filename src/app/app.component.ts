import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { slideInUpOnEnterAnimation } from 'angular-animations';
import packageJson from '../../package.json';
import { CalcoloPrecedente, Materiale, elencoLavorazioni, elencoMateriali } from './app.data';
import { CalcoliPrecedentiDialogComponent } from './calcoli-precendenti-dialog/calcoli-precedenti-dialog.component';
import { SalvaCalcoloDialogComponent } from './salva-calcolo-dialog/salva-calcolo-dialog.component';

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
    ) {

    }

    aggiungiSpessore(materiale: Materiale): void {
        if (!materiale.spessore) {
            materiale.spessore = 0;
        }
        materiale.spessore = parseFloat((materiale.spessore + 0.01).toFixed(2));
    }

    togliSpessore(materiale: Materiale): void {
        if (!materiale.spessore) {
            materiale.spessore = 0;
        }
        if (materiale.spessore >= 0.01) {
            materiale.spessore = parseFloat((materiale.spessore - 0.01).toFixed(2));
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
        this._matDialog.open(SalvaCalcoloDialogComponent, {
            height: 'auto',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '640px',
            data: {
                elencoMateriali: this.elencoMateriali,
                elencoLavorazioni: this.elencoLavorazioni,
                totale: this.getTotale(),
            }
        });
    }

}
