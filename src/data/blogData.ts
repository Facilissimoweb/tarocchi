export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
    }[];
    quote: string;
    conclusion: string;
    keyTakeaways: string[];
  };
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'tarocchi-senza-fatalismo',
    slug: 'leggere-tarocchi-senza-fatalismo-introspezione-archetipica',
    title: 'Leggere i Tarocchi senza Fatalismo: la via dell’Introspezione Archetipica',
    subtitle: 'Come la comunicazione visiva e i simboli degli Arcani dialogano con l’inconscio, restituendo libertà e sovranità decisionale.',
    author: 'Teresa',
    authorRole: 'Tarologa & Laureata in Tecniche della Comunicazione Visiva (Accademia di Belle Arti di Macerata)',
    date: '20 Settembre 2024',
    readTime: '6 min',
    category: 'Tarologia & Archetipi',
    tags: ['Tarocchi', 'Introspezione', 'Psicologia Archetipica', 'Rider Waite Smith', 'Simbolismo'],
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoknsKwjQ5gMWL8eK1ObY_9BQ6Jk8KDgcWG1yZ87X3TLEMJfQjLDTzppcdq--GQPBLXre1C4PRFdqJ4MieRdx62up4qDZ07nPM5JI1Cyv1dSYzNqelbWZH01kAfItV_gDzSDbc8zjhdLU2ORvdUwFUimclSNQ6Ji0R7DRoQKIW2hanc9UUlFTeoatyi4ioQlXZjei6RL3trMkqD0EsLcaA-ztGTynT18R_-xNqJwTwstfvDx4rLbDU',
    excerpt: 'I Tarocchi non sono una sentenza inappellabile né una prigione per il futuro. Quando approcciati con rigore semiotico ed empatico, si rivelano uno specchio dell’anima capace di svelare gli schemi ricorrenti e risvegliare il discernimento autentico.',
    content: {
      intro: 'Nel sentire comune, la parola "tarocchi" viene spesso associata a una divinazione teatrale, dove un presunto destino già scritto cala dall’alto senza lasciare scampo alla volontà individuale. Dal 2012, all’interno dello studio di Tarot Italia a Macerata e nelle sessioni online, portiamo avanti una visione diametralmente opposta: i Tarocchi sono una grammatica visiva e un sistema di orientamento interiore.',
      sections: [
        {
          heading: '1. L’Immagine come Ponte verso il Profondo',
          paragraphs: [
            'Il mio percorso all’Accademia di Belle Arti di Macerata, focalizzato sulle tecniche della comunicazione visiva, mi ha insegnato che ogni segno grafico, ogni gradazione cromatica e ogni postura geometrica parlano a un livello che precede il linguaggio razionale. Gli Arcani Maggiori e Minori non inventano nulla di estraneo alla nostra vita: codificano l’esperienza umana universale.',
            'Quando una persona osserva una lama come l’Eremita o la Torre durante un consulto, non sta assistendo a un prodigio magico distaccato. Il suo occhio riconosce archetipi condivisi (il bisogno di raccoglimento, il crollo di strutture illusorie ormai insostenibili). Le carte diventano così un ponte tra la coscienza desta e ciò che nell’inconscio preme per essere compreso.'
          ]
        },
        {
          heading: '2. Il Rifiuto del Fatalismo Predittivo',
          paragraphs: [
            'La predizione passiva (“accadrà questo fra tre mesi”) genera dipendenza, ansia e paralisi. L’introspezione archetipica, al contrario, stimola il pensiero critico e la responsabilità personale. Se in una stesa emerge una figura di stallo come l’Appeso, la domanda non è “quando finirà la punizione?”, bensì: “qual è la prospettiva capovolta che finora mi sono rifiutato di accogliere?”.',
            'Durante i percorsi formativi con Dorian Bones e Mariangela Aggio, ho approfondito quanto la tradizione esoterica seria non sia mai stata fatalista: gli antichi ermetisti hanno sempre ribadito che “gli astri inclinano, ma non determinano”. Il libero arbitrio e la consapevolezza restano il vertice indiscusso di ogni lettura.'
          ]
        },
        {
          heading: '3. La Sessione di 60 Minuti come Spazio Protetto',
          paragraphs: [
            'Per questo motivo le nostre letture durano 60 minuti integrali. Non è possibile sbrigare un nodo esistenziale con risposte telegrafiche o frettolose. Serve silenzio, una tisana officinale, la contemplazione dei dettagli iconografici e soprattutto il tempo di nominare le emozioni sepolte.',
            'Uscire da una seduta di tarologia introspettiva non significa avere un calendario prefissato di eventi, ma possedere una bussola limpida, una mente rasserenata e la certezza di essere i soli autori del proprio cammino.'
          ]
        }
      ],
      quote: '“I Tarocchi non predicono un avvenire immutabile: illuminano i fili invisibili del presente affinché tu possa tessere il tuo domani con occhi aperti e cuore saldo.”',
      conclusion: 'Abbracciare gli Arcani come mappa evolutiva trasforma la paura del domani in curiosità feconda e presenza attiva. Che tu ti sieda nello studio di Macerata o dall’altro capo del mondo via schermo, il vero miracolo è riscoprire la tua voce più limpida.',
      keyTakeaways: [
        'I Tarocchi operano come specchio psicologico e linguaggio iconografico universale.',
        'Nessun destino è segnato: le stese evidenziano tendenze interiori e blocchi superabili.',
        'La consultazione etica rispetta sempre l’autonomia, il discernimento e la privacy della persona.'
      ]
    }
  },
  {
    id: 'pendolo-ptah-piramidologia',
    slug: 'pendolo-ptah-piramidologia-energie-sottili-ambienti',
    title: 'Il Pendolo PTAH e la Piramidologia: l’Arte di Riconoscere e Trasmutare le Energie Sottili',
    subtitle: 'Dalla geometria sacra egizia alla prassi olistica: come bonificare memorie stagnanti in case, oggetti e canali vitali.',
    author: 'Teresa',
    authorRole: 'Operatrice Olistica Certificata IPHM & Radiestesista (Formata con Emiliano Amici)',
    date: '23 Settembre 2024',
    readTime: '7 min',
    category: 'Radiestesia & Geometria Sacra',
    tags: ['Pendolo PTAH', 'Piramidologia', 'Radiestesia', 'Purificazione Spazi', 'Energie Sottili'],
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVI-E6mN8LzTkqaK2AlHhHt6J_m2ejErCGubg7rHJrgDEmvJqKqO85sxaWmczjg7E3WgCpY6zNmQgnuHqamyxdHVSurJFn1BoLM_I8PbnCmhlfCOwFMDoXRq4yQ91nikMqRSKVi1G7Os3bG8313n7aJDSi26Fh7yIRmENKSGdbZdAlYeUEw9khRjyfug6EeoTgBf6n9fc1lhGg2XKrKrm9CfFr3CXslAiN-TC2OBWtRVpwfWvO4wLx',
    excerpt: 'La radiestesia applicata con il Pendolo PTAH e la piramidologia permette di rilevare e drenare congestioni energetiche accumulate in ambienti domestici, luoghi di lavoro o oggetti antichi, ripristinando il flusso vitale originario.',
    content: {
      intro: 'Quante volte vi è capitato di entrare in una stanza, in una vecchia casa o di indossare un gioiello ereditato e percepire un’inspiegabile sensazione di pesantezza, spossatezza o irrequietezza? Gli spazi fisici e la materia conservano memorie emotive e vibrazionali. Nel mio percorso di approfondimento con l’operatore olistico Emiliano Amici, ho appreso l’uso del Pendolo PTAH e le proprietà risonanti della piramidologia per intervenire su queste dinamiche sottili.',
      sections: [
        {
          heading: '1. La Genesi del Pendolo PTAH',
          paragraphs: [
            'Il Pendolo PTAH prende il nome dall’antica divinità egizia demiurgo delle arti, dell’architettura e della materia ordinata. A differenza dei pendoli classici a goccia o in quarzo, il PTAH è un pendolo radionico a geometria fissa in ottone, progettato per non impregnarsi delle energie con cui entra in contatto.',
            'La sua specifica forma a dischi sovrapposti crea un fascio di onde di forma capaci non solo di captare (fase recettiva di diagnosi radiestesica), ma di emettere campi di neutralizzazione e ricarica (fase attiva di sblocco). Non si tratta di suggestione: è l’applicazione della fisica delle forme geometriche al riequilibrio della bio-energia.'
          ]
        },
        {
          heading: '2. Rilevare ed Elaborare Congestioni in Oggetti e Luoghi',
          paragraphs: [
            'Durante un trattamento o una consulenza sullo spazio abitativo, il pendolo viene impiegato per mappare i nodi di stress geopatico (faglie, reti telluriche di Hartmann e Curry) e le memorie storiche lasciate da forti dolori, liti prolungate o malattie all’interno delle mura.',
            'Allo stesso modo, strumenti di lavoro olistico (mazzi di tarocchi, quarzi, talismani) e gioielli con pietre naturali assorbono inevitabilmente la carica delle persone che li hanno maneggiati. Con il Pendolo PTAH è possibile "azzerare" la frequenza dissonante e riconnettere l’oggetto alla sua matrice neutra e luminosa.'
          ]
        },
        {
          heading: '3. La Sinergia con la Piramidologia',
          paragraphs: [
            'La piramidologia completa quest’opera di risanamento. Le piramidi costruite nel rispetto delle proporzioni auree di Cheope fungono da condensatori e accumulatori di energia orgonica pulita. Posizionare un testimone (foto, pianta, cristallo) o operare all’interno di una camera piramidale consente di amplificare la rigenerazione cellulare e mentale.',
            'Integro regolarmente questi principi prima e dopo le sessioni nello studio di Macerata, assicurando che lo spazio rimanga un rifugio schermato, dove chiunque varchi la soglia possa respirare leggerezza e pace sin dal primo istante.'
          ]
        }
      ],
      quote: '“La materia non è inerte: è luce coagulata che trattiene il passaggio delle anime. Purificarla significa restituirle il suo respiro originario.”',
      conclusion: 'Riconoscere l’invisibile che ci circonda non è magia astrusa, ma cura ecologica del nostro spazio vitale. Prestare attenzione all’igiene energetica dei luoghi in cui viviamo e lavoriamo è il primo passo per un benessere duraturo.',
      keyTakeaways: [
        'Il Pendolo PTAH non si impregna e consente sia la diagnosi radiestesica che la trasmutazione attiva.',
        'Piramidi e onde di forma aurea riarmonizzano ambienti e strumenti di divinazione.',
        'La bonifica delle memorie ambientali favorisce sonno ristoratore, concentrazione e quiete.'
      ]
    }
  },
  {
    id: 'ritualita-damore-folklore-marchigiano',
    slug: 'ritualita-damore-folklore-marchigiano-legami-sacralita',
    title: 'La Ritualità d’Amore nel Folklore Marchigiano: tra Devozione Popolare e Rispetto Sacro',
    subtitle: 'L’antica eredità dell’Appennino: erbe spontanee dei Sibillini, formule popolari e il vero significato dei legami spirituali.',
    author: 'Maura',
    authorRole: 'Operatrice & Ritualista Esoterica (Tradizione Marchigiana)',
    date: '25 Settembre 2024',
    readTime: '8 min',
    category: 'Folklore & Tradizione Popolare',
    tags: ['Folklore Marchigiano', 'Ritualistica d’Amore', 'Erboristeria Sacra', 'Riconciliazione', 'Etica'],
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQLOvwNy2W1qr7QRcKwUiWmnyVUFEoxNlt7DLfpGOCLYir-kvrtFwJNOgbzipwez5LeGNDF4wvoGX4oi0egnh8X2WaYOumhq_ODEQ1MYeJZUStryhrvnhHoLMfPRQnqXdN4jJjx8nuM1AyGl64qU-D6TyW8NEI6-8W7c3mCEl_vdfGf9L2RpMQIkc_ZUDnxv29z29bAKEWfGQFsvkKiNh9yKhSAQVy1bhBjrAFO-WfPKlDD_OiRS7N',
    excerpt: 'Nelle vallate e nei borghi marchigiani, la ritualistica di coppia è sempre stata un ponte d’ascolto tra cielo e terra. Scopriamo perché la vera magia d’amore non forza mai la volontà, ma risveglia la verità sopita e la devozione autentica.',
    content: {
      intro: 'Nelle Marche, terra di monti azzurri, boschi di querce e silenzi carichi di mistero, l’antico sapere rituale non è mai scomparso. Si è tramandato a mezza voce, tra nonne e nipoti, nei cascinali dell’entroterra maceratese e fermano. Come collaboratrice esterna di Tarot Italia e operatrice rituale, sento il dovere di fare chiarezza su cosa sia realmente la ritualistica d’amore nel folklore nostrano.',
      sections: [
        {
          heading: '1. Il Pregiudizio Commerciale vs La Tradizione Viva',
          paragraphs: [
            'Sul web e nella pubblicità commerciale, la ritualistica d’amore viene spesso dipinta come un atto di coercizione: filtri istantanei, costrizioni psicologiche o promesse irrealizzabili. Questa non è la nostra tradizione. Nel folklore marchigiano autentico, la persona che opera è anzitutto una mediatrice orante e consapevole.',
            'Non si può legare col rancore ciò che il destino o il rispetto reciproco hanno separato. La vera ritualità agisce invece come solvente delle nubi: allontana l’invidia esterna, scioglie le paure radicate e riaccende la scintilla originaria che due anime hanno condiviso, lasciando che la luce della verità trionfi.'
          ]
        },
        {
          heading: '2. I Quattro Pilastri del Cuore',
          paragraphs: [
            'Nelle nostre pratiche lavoriamo su quattro direttrici precise: l’Attrazione Luminosa (per ritrovare autostima e magnetismo), il Legamento d’Anima (per consolidare una devozione matura e protetta), la Riconciliazione (per favorire la parola e il perdono dopo dolorosi silenzi) e la Schermatura di Coppia (per preservare l’intimità familiare dalle ingerenze tossiche).',
            'Ciascuno di questi percorsi richiede prima di tutto un’analisi sincera. Se non vi sono le basi energetiche o se l’intenzione dell’uno è schiacciare l’altro, il rito non va compiuto. La sacralità della volontà è la nostra legge primaria.'
          ]
        },
        {
          heading: '3. Gli Elementi Naturali: Cera Vergine ed Erbe dei Sibillini',
          paragraphs: [
            'Non usiamo oggetti sintetici o artifici estranei. Ogni rituale fa perno su elementi vivi e nobili: pura cera d’api delle colline maceratesi, resine d’incenso consacrate, rami di alloro, fiori di elicriso e lavanda selvatica colti secondo i cicli lunari.',
            'La cera che arde lentamente porta con sé la richiesta, il fumo delle erbe pulisce l’aria del cuore e la preghiera pronunciata fissa l’intenzione nel mondo spirituale. È un lavoro di pazienza, rispetto e profonda compassione per la fragilità umana.'
          ]
        }
      ],
      quote: '“La mia arte si basa su una profonda comprensione delle energie e dei simboli d’amore, unita al rispetto per la sacralità delle relazioni e della volontà delle persone.”',
      conclusion: 'La ritualità non sostituisce il dialogo, la maturità o il lavoro su se stessi: li sostiene dall’invisibile, offrendo una terra fertile dove l’amore autentico possa tornare a fiorire libero da ombre e paure.',
      keyTakeaways: [
        'Il folklore marchigiano non contempla la coercizione: opera nell’armonia e nella verità.',
        'Si impiegano unicamente elementi naturali etici: cera d’api pura ed erbe spontanee.',
        'Ogni percorso è preceduto da una disamina etica per valutare la sincerità delle intenzioni.'
      ]
    }
  }
];
