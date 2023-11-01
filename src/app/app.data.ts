export class Materiale {
    id!: number;
    descrizione!: string;
    valore!: number;
    spessore?: number;
}

export class Lavorazione {
    id!: number;
    descrizione!: string;
    valore!: number;
    selezionato?: boolean;
}

export const elencoMateriali: Materiale[] = [
    { id: 1,  descrizione: 'Perline',             valore: 450 },
    { id: 2,  descrizione: 'Tavolato abete',      valore: 450 },
    { id: 3,  descrizione: 'Pannello osb',        valore: 650 },
    { id: 4,  descrizione: 'Secondo tavolato',    valore: 450 },
    { id: 5,  descrizione: 'Lana di roccia',      valore: 150 },
    { id: 6,  descrizione: 'Lana di vetro',       valore: 20  },
    { id: 7,  descrizione: 'Fibra di legno',      valore: 210 },
    { id: 8,  descrizione: 'Sughero',             valore: 260 },
    { id: 9,  descrizione: 'Polistirene espanso', valore: 40  },
    { id: 10, descrizione: 'Fibra di cellulosa',  valore: 30  },
];

export const elencoLavorazioni: Lavorazione[] = [
    { id: 1,   descrizione: 'Manto impermeabilizzante di asfalto o simile',       valore: 30 },
    { id: 2,   descrizione: 'Teli di polietilene per impermeabilizzazione',       valore: 1  },
    { id: 3,   descrizione: 'Cartonfeltri bitumati',                              valore: 3  },
    { id: 4,   descrizione: 'Coppi',                                              valore: 80 },
    { id: 5,   descrizione: 'Tegole maritate (embrici e coppi',                   valore: 60 },
    { id: 6,   descrizione: 'Tegoloni flessibili tipo canadese',                  valore: 14 },
    { id: 7,   descrizione: 'Embrici marsigliesi',                                valore: 40 },
    { id: 8,   descrizione: 'Sottotegole in tabelloni forati (spessore 3 - 4 cm', valore: 35 },
    { id: 9,   descrizione: 'Lamiere ondulate o manti traslucidi',                valore: 10 },
    { id: 10,  descrizione: 'Lastre ondulate di materiale plastico',              valore: 6  },
    { id: 11,  descrizione: 'Lastre metalliche di acciaio zincato da 10/10 mm',   valore: 10 },
    { id: 12,  descrizione: 'Tegole cemento',                                     valore: 50 },
    { id: 13,  descrizione: 'Scandole in legno',                                  valore: 30 },
    { id: 14,  descrizione: 'Tegola in pvc',                                      valore: 5  },
    { id: 15,  descrizione: 'Tegola pietra naturale',                             valore: 90 },
    { id: 16,  descrizione: 'Ardesia',                                            valore: 75 },
    { id: 17,  descrizione: 'Lose',                                               valore: 90 },
    { id: 18,  descrizione: 'Aggiunta listelli portategole e per ventilazione',   valore: 5  },
];
