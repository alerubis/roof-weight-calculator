import { Component, OnInit } from '@angular/core';
import { slideInUpOnEnterAnimation } from 'angular-animations';
import { Lavorazione, Materiale, elencoLavorazioni, elencoMateriali } from './app.data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        slideInUpOnEnterAnimation({ anchor: 'slideInUpOnEnter', duration: 200, delay: 500 }),
    ]
})
export class AppComponent implements OnInit {

    elencoMateriali = elencoMateriali;
    elencoLavorazioni = elencoLavorazioni;

    mostraValori: boolean = false;

    ngOnInit(): void {
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
        materiale.spessore -= 1;
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

}
