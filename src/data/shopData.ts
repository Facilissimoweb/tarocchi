export interface ShopProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'Strumenti di Divinazione' | 'Ritualistica Tradizionale' | 'Erboristeria & Profumi' | 'Consulenze Speciali';
  filterTags: ('Strumenti' | 'Erbe' | 'Consacrati' | 'Rituali' | 'Tarocchi')[];
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  description: string;
  ritualUse: string;
  features: string[];
  inStock: boolean;
  shippingInfo: string;
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'pendolo-ptah-ottone',
    title: 'Pendolo PTAH in Ottone Dorato con Sigillo',
    subtitle: 'Strumento radionico a onde di forma per radiestesia avanzata, rilevazione e trasmutazione delle energie sottili.',
    category: 'Strumenti di Divinazione',
    filterTags: ['Strumenti', 'Consacrati'],
    price: 45.0,
    badge: 'Consacrato in Studio',
    image: '/assets/images/tarocchi-macerata.png',
    description: 'Progettato secondo le proporzioni sacre egizie della divinità demiurgica PTAH. Realizzato in ottone massiccio tornito a mano con peso calibrato e catena dorata ad anelli fini. Non assorbe le energie con cui entra in contatto, garantendo neutralità diagnostica sia in fase ricettiva che attiva.',
    ritualUse: 'Ideale per la bonifica energetica di ambienti, il test sui chakra, l’interrogazione radiestesica di cristalli e oggetti antichi, e la purificazione dei mazzi di tarocchi prima dei consulti.',
    features: [
      'Ottone pieno anallergico con finitura dorata specchiata',
      'Geometria radionica a dischi sovrapposti egizia',
      'Fornito con sacchetto in velluto nero con logo Tarot Italia impresso',
      'Testato ed equilibrato individualmente da Teresa prima della spedizione'
    ],
    inStock: true,
    shippingInfo: 'Spedizione rapida in 24/48h con corriere tracciato o ritiro diretto in Studio a Macerata.'
  },
  {
    id: 'kit-purificazione-marchigiano',
    title: 'Kit Rituale di Purificazione con Erbe dei Sibillini & Resine Pure',
    subtitle: 'Composizione botanica raccolta a mano e consacrata secondo i cicli lunari dell’Appennino Marchigiano.',
    category: 'Ritualistica Tradizionale',
    filterTags: ['Erbe', 'Rituali', 'Consacrati'],
    price: 36.0,
    originalPrice: 42.0,
    badge: 'Raccolta Etica 2026',
    image: '/assets/images/tarocchi-macerata.png',
    description: 'Un kit cerimoniale completo per lo scarico di fardelli emotivi, dissapori domestici e congestioni dell’aura. Contiene una matassa selvatica (smudge) di alloro e lavanda dei monti Sibillini, grani di resina di Copale dorato e Franchincenso, carboncini naturali e una conchiglia abalone da bruciatura.',
    ritualUse: 'Accendere durante il cambio di luna, all’ingresso in una nuova casa o al termine di giornate di pesantezza emotiva, diffondendo il fumo nelle quattro direzioni.',
    features: [
      'Erbe spontanee marchigiane essiccate all’ombra naturale',
      'Resine pure prive di aromi sintetici o collanti chimici',
      'Include guida cartacea al rito dei 4 Angoli della Casa redatta da Maura',
      'Conchiglia abalone naturale per appoggio sicuro dei carboncini'
    ],
    inStock: true,
    shippingInfo: 'Disponibile per spedizione immediata o consegna in sede.'
  },
  {
    id: 'mazzo-rws-studio-tarot',
    title: 'Mazzo Tarocchi Rider Waite Smith Edizione Studio + Panno Velluto',
    subtitle: 'Le 78 Lame con colorazione archetipica fedele restaurata, accompagnate dal panno cerimoniale ricamato.',
    category: 'Strumenti di Divinazione',
    filterTags: ['Strumenti', 'Tarocchi'],
    price: 42.0,
    badge: 'Edizione Consigliata',
    image: '/assets/images/tarocchi-macerata.png',
    description: 'Il mazzo prescelto da Teresa per l’insegnamento e i consulti professionali. Fedele riproduzione con resa cromatica calda, vellum touch antiscivolo di alta grammatura (350 gsm) e bordi sagomati di precisione. Include il panno di stesa quadrato in velluto nero bordato in filigrana oro.',
    ritualUse: 'Strumento d’elezione per stesure quotidiane, meditazione sugli Arcani Maggiori e decodifica intuitiva dei blocchi personali.',
    features: [
      '78 Carte complete (22 Arcani Maggiori e 56 Minori) in italiano/inglese',
      'Carta rigida professionale anti-riflesso per una mescolanza fluida',
      'Panno 55x55 cm in velluto di cotone con sigillo dorato ricamato',
      'Libretto introduttivo alle stesure archetipiche con la firma di Tarot Italia'
    ],
    inStock: true,
    shippingInfo: 'Confezionato con sigillo in ceralacca personalizzato.'
  },
  {
    id: 'candele-cera-api-maura',
    title: 'Set 3 Candele Rituali in Cera d’Api Vergine di Maura (Riconciliazione)',
    subtitle: 'Candele arrotolate a mano immerse in essenza di rosa damascena, mirra e cera biologica marchigiana.',
    category: 'Ritualistica Tradizionale',
    filterTags: ['Rituali', 'Consacrati'],
    price: 28.0,
    badge: 'Creazione di Maura',
    image: '/assets/images/tarocchi-macerata.png',
    description: 'Create e caricate ritualmente dalla nostra ritualista Maura secondo l’antica ricetta popolare dell’entroterra marchigiano. La pura cera vergine d’api arde emanando un aroma caldo di miele e sottobosco, purificando i canali affettivi ed evocando pace interiore.',
    ritualUse: 'Accendere durante momenti di dialogo difficile con la persona amata, meditazioni per il superamento di incomprensioni o preghiere d’armonia familiare.',
    features: [
      '100% Pura cera d’api biologica da apicoltori del maceratese',
      'Stoppino naturale in canapa non sbiancata',
      'Tempo di combustione: circa 7 ore per ciascuna candela',
      'Accompagnate dal testo della preghiera tradizionale marchigiana di riconciliazione'
    ],
    inStock: true,
    shippingInfo: 'Spedite in scatola rigida ecologica foderata in carta pergamena.'
  },
  {
    id: 'tisana-meditativa-studio',
    title: 'Tisana Meditativa dello Studio Macerata (Miscela Officinale 100g)',
    subtitle: 'La tisana d’accoglienza servita prima di ogni consulto dal vivo: calma nervosa e risveglio intuitivo.',
    category: 'Erboristeria & Profumi',
    filterTags: ['Erbe'],
    price: 16.0,
    badge: 'Formula dello Studio',
    image: '/assets/images/tarocchi-macerata.png',
    description: 'La preparazione botanica segreta che accoglie i consultanti nella quiete di Via delle Fonti. A base di sommità fiorite di melissa, passiflora biologica, scorza d’arancio amaro essiccata al sole, fiori di tiglio montano e una nota di cannella regina.',
    ritualUse: 'Da sorseggiare 15 minuti prima di una lettura dei tarocchi o della meditazione serale per placare il lavorio mentale e sintonizzare il cuore.',
    features: [
      'Erbe da coltivazione biologica certificata e raccolte spontanee',
      'Senza aromi artificiali, senza teina, adatta a tutte le ore',
      'Sacchetto salvafreschezza richiudibile con chiusura ermetica in pergamena',
      'Dosi per circa 30 infusioni rilassanti'
    ],
    inStock: true,
    shippingInfo: 'Disponibile singolarmente o abbinata a kit e consulti.'
  },
  {
    id: 'mappa-archetipica-annuale',
    title: 'Mappa Archetipica Annuale Calligrafata a Mano su Pergamena',
    subtitle: 'Studio numerologico e divinatorio personalizzato con l’Arcano Guida dei 12 mesi a venire.',
    category: 'Consulenze Speciali',
    filterTags: ['Consacrati', 'Tarocchi'],
    price: 65.0,
    badge: 'Opera Unica Su Misura',
    image: '/assets/images/tarocchi-macerata.png',
    description: 'Un’opera artigianale e divinatoria redatta da Teresa in base al tuo nome di battesimo e alla tua data di nascita. Calcola l’Arcano Maestro dell’anno, i transiti dei 4 Elementi (Fuoco, Acqua, Aria, Terra) e le finestre temporali di sblocco e raccoglimento.',
    ritualUse: 'Da custodire sul proprio altare o scrivania come bussola di meditazione per l’intero anno solare.',
    features: [
      'Foglio pergamena pesante lavorato a bordi sfrangiati artigianalmente',
      'Testo scritto e annotato a mano con inchiostro ferrogallico e dettagli in foglia d’oro',
      'Sigillo in cera lacca con il timbro di Tarot Italia',
      'Include un file audio esplicativo di 15 minuti inviato privatamente via WhatsApp'
    ],
    inStock: true,
    shippingInfo: 'Realizzazione artigianale su commissione: consegna in 4-6 giorni lavorativi.'
  }
];
