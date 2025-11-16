export const mockServices = [
  {
    id: 1,
    name: 'Klasická relaxační masáž',
    slug: 'klasicka-relaxacni',
    description: 'Klasická relaxační masáž je ideální volbou pro odstranění stresu a napětí. Pomocí jemných a plynulých pohybů uvolníme svaly celého těla, zlepšíme krevní oběh a podpoříme lymfatický systém. Tato masáž je vhodná pro každého, kdo hledá chvíli klidu a regenerace.\n\nBěhem masáže používám kvalitní masážní oleje s příjemnou vůní, které napomáhají hlubokému uvolnění. Masáž přizpůsobuji individuálním potřebám každého klienta - od jemné relaxace až po intenzivnější práci s napjatými svaly.\n\nPo masáži se budete cítit znovuzrozeni, vaše tělo bude lehčí a mysl klidnější.',
    benefits: [
      'Uvolnění svalového napětí',
      'Zlepšení krevního oběhu',
      'Redukce stresu a úzkosti',
      'Podpora imunitního systému',
      'Zlepšení kvality spánku',
      'Celková relaxace těla i mysli'
    ],
    contraindications: [
      'Akutní zánětlivá onemocnění',
      'Horečka',
      'Kožní infekce',
      'Čerstvé zlomeniny',
      'Trombóza'
    ],
    image: '/images/services/relaxacni.jpg',
    variants: [
      { duration: 60, price: 800 },
      { duration: 90, price: 1100 }
    ],
    color: '#D4A574',
    active: true,
    forWhom: 'Vhodná pro všechny věkové kategorie, ideální pro lidi trpící stresem, úzkostí nebo chronickou únavou.'
  },
  {
    id: 2,
    name: 'Sportovní masáž',
    slug: 'sportovni',
    description: 'Sportovní masáž je zaměřená na prevenci a regeneraci po sportovním výkonu. Kombinuje hluboké techniky s protažením a mobilizací kloubů. Ideální pro aktivní sportovce i rekreační cvičence.\n\nPomáhá urychlit regeneraci, zlepšit výkon a předcházet zraněním. Masáž je intenzivnější než klasická relaxační masáž a zaměřuje se na konkrétní problémové oblasti.\n\nVhodná jak před sportovním výkonem (přípravná masáž), tak po něm (regenerační masáž).',
    benefits: [
      'Rychlejší regenerace po výkonu',
      'Prevence zranění',
      'Zvýšení flexibility',
      'Uvolnění svalových spazmů',
      'Zlepšení sportovního výkonu',
      'Odstranění metabolických odpadů'
    ],
    contraindications: [
      'Akutní zranění',
      'Zánět svalů',
      'Čerstvé operace',
      'Akutní bolest'
    ],
    image: '/images/services/sportovni.jpg',
    variants: [
      { duration: 60, price: 900 },
      { duration: 90, price: 1200 }
    ],
    color: '#8BA888',
    active: true,
    forWhom: 'Pro sportovce, aktivní lidi, osoby s bolestmi pohybového aparátu.'
  },
  {
    id: 3,
    name: 'Reflexní masáž chodidel',
    slug: 'reflexni-chodidla',
    description: 'Reflexní masáž vychází z poznatků, že na chodidlech se nacházejí reflexní body spojené s orgány a systémy celého těla. Stimulací těchto bodů podporujeme samoléčebné procesy organismu.\n\nMasáž je prováděna speciálními technikami s použitím palců a prstů. Je relaxační a zároveň terapeutická.\n\nPo masáži se můžete cítit unavení - to je přirozená reakce těla na detoxikaci.',
    benefits: [
      'Celková harmonizace organismu',
      'Podpora detoxikace',
      'Zlepšení funkce orgánů',
      'Posílení imunity',
      'Hluboká relaxace',
      'Zlepšení spánku'
    ],
    contraindications: [
      'Těhotenství (první trimestr)',
      'Infekce chodidel',
      'Čerstvé zlomeniny nohou',
      'Akutní zánět žil'
    ],
    image: '/images/services/reflexni.jpg',
    variants: [
      { duration: 45, price: 650 }
    ],
    color: '#B8865A',
    active: true,
    forWhom: 'Pro každého, kdo hledá holistický přístup k zdraví a relaxaci.'
  },
  {
    id: 4,
    name: 'Lymfatická masáž',
    slug: 'lymfaticka',
    description: 'Lymfatická masáž je jemná technika podporující odtok lymfy a detoxikaci organismu. Používám speciální jemné pohyby, které stimulují lymfatický systém.\n\nTato masáž je obzvláště účinná při otoků, celulitidě, po operacích nebo při pocitu těžkých nohou.\n\nMasáž je velmi relaxační a zanechává pocit lehkosti v těle.',
    benefits: [
      'Redukce otoků',
      'Detoxikace organismu',
      'Zlepšení imunitního systému',
      'Redukce celulitidy',
      'Podpora hojení po operacích',
      'Zlepšení kožního tónu'
    ],
    contraindications: [
      'Akutní infekce',
      'Nádorová onemocnění',
      'Srdeční selhání',
      'Trombóza',
      'Akutní zánět'
    ],
    image: '/images/services/lymfaticka.jpg',
    variants: [
      { duration: 75, price: 1000 }
    ],
    color: '#E8D4B8',
    active: true,
    forWhom: 'Pro osoby s otoky, po operacích, s celulitidou nebo potřebující detoxikaci.'
  },
  {
    id: 5,
    name: 'Masáž lávovými kameny',
    slug: 'lavove-kameny',
    description: 'Masáž horkými lávovými kameny kombinuje účinky tepla s masážními technikami. Zahřáté vulkanické kameny pomáhají hlubokému uvolnění svalů a celkové relaxaci.\n\nTeplo kamenů pronikne hluboko do tkání, uvolní napětí a zlepší prokrvení. Kombinace tepla, tlaku a masážních technik vytváří jedinečný relaxační zážitek.\n\nToto je jedna z nejluxusnějších a nejoblíbenějších masáží.',
    benefits: [
      'Hluboké svalové uvolnění',
      'Zlepšení krevního oběhu',
      'Úleva od chronických bolestí',
      'Detoxikace organismu',
      'Intenzivní relaxace',
      'Harmonizace energie'
    ],
    contraindications: [
      'Kožní onemocnění',
      'Vysoký krevní tlak',
      'Srdeční problémy',
      'Těhotenství',
      'Diabetická neuropatie'
    ],
    image: '/images/services/lavove-kameny.jpg',
    variants: [
      { duration: 90, price: 1300 }
    ],
    color: '#6B8A6A',
    active: true,
    forWhom: 'Pro milovníky luxusních masáží, osoby s chronickými bolestmi a napětím.'
  },
  {
    id: 6,
    name: 'Těhotenská masáž',
    slug: 'tehotenska',
    description: 'Speciálně upravená masáž pro těhotné ženy od druhého trimestru. Používám bezpečné techniky a polohy, které jsou pro těhotné pohodlné a bezpečné.\n\nMasáž pomáhá zmírnit běžné těhotenské obtíže jako jsou bolesti zad, otoky nohou nebo únava. Podporuje celkovou pohodu a relaxaci budoucí maminky.\n\nVšechny techniky jsou šetrné a bezpečné pro maminku i miminko.',
    benefits: [
      'Úleva od bolestí zad',
      'Redukce otoků',
      'Zlepšení spánku',
      'Snížení stresu',
      'Podpora celkové pohody',
      'Zmírnění svalového napětí'
    ],
    contraindications: [
      'První trimestr těhotenství',
      'Rizikové těhotenství',
      'Předčasné kontrakce',
      'Závažné otoky',
      'Preeklampsie'
    ],
    image: '/images/services/tehotenska.jpg',
    variants: [
      { duration: 60, price: 850 }
    ],
    color: '#D4A574',
    active: true,
    forWhom: 'Pro těhotné ženy od 2. trimestru s nekomplikovaným těhotenstvím.'
  },
  {
    id: 7,
    name: 'Aromaterapeutická masáž',
    slug: 'aromaterapeuticka',
    description: 'Kombinace klasické masáže s léčivými účinky esenciálních olejů. Oleje vybírám podle aktuálních potřeb klienta - relaxace, energie, detox nebo harmonizace.\n\nEsenciální oleje působí nejen přes kůži, ale i prostřednictvím vůně na náš limbický systém v mozku, který ovlivňuje emoce a náladu.\n\nToto je holistická masáž, která působí na tělo, mysl i duši.',
    benefits: [
      'Hluboká relaxace',
      'Harmonizace emocí',
      'Posílení imunity',
      'Zlepšení nálady',
      'Detoxikace',
      'Vyživení pokožky'
    ],
    contraindications: [
      'Alergie na esenciální oleje',
      'Astma (některé oleje)',
      'Těhotenství (některé oleje)',
      'Epilepsie (některé oleje)'
    ],
    image: '/images/services/aromaterapeuticka.jpg',
    variants: [
      { duration: 75, price: 1100 }
    ],
    color: '#8BA888',
    active: true,
    forWhom: 'Pro milovníky aromaterapie, osoby hledající holistický přístup.'
  }
]

export const mockTestimonials = [
  {
    id: 1,
    name: 'Petra N.',
    rating: 5,
    text: 'Absolutně nejlepší masáž, jakou jsem kdy zažila. Profesionální přístup a kouzelná atmosféra. Po masáži jsem se cítila jako nový člověk.',
    date: '2025-10-15',
    service: 'Lymfatická masáž'
  },
  {
    id: 2,
    name: 'Martin K.',
    rating: 5,
    text: 'Po sportovní masáži jsem se cítil jako znovuzrozený. Určitě doporučuji všem, kteří trpí bolestmi svalů po cvičení!',
    date: '2025-10-20',
    service: 'Sportovní masáž'
  },
  {
    id: 3,
    name: 'Jana S.',
    rating: 5,
    text: 'Konečně někdo, kdo rozumí problémům s lymfatickým systémem. Mé otoky se výrazně zmenšily. Děkuji!',
    date: '2025-10-25',
    service: 'Lymfatická masáž'
  },
  {
    id: 4,
    name: 'Tomáš V.',
    rating: 5,
    text: 'Masáž lávovými kameny byla úžasný zážitek. Naprosté uvolnění a relaxace. Rád se vrátím.',
    date: '2025-11-01',
    service: 'Masáž lávovými kameny'
  },
  {
    id: 5,
    name: 'Lucie M.',
    rating: 5,
    text: 'Jako těhotná jsem ocenila profesionální a šetrný přístup. Masáž mi pomohla s bolestmi zad.',
    date: '2025-11-05',
    service: 'Těhotenská masáž'
  }
]

export const mockReservations = [
  {
    id: 1,
    clientName: 'Jana Nováková',
    clientEmail: 'jana@email.cz',
    clientPhone: '+420 123 456 789',
    date: '2025-06-20',
    time: '10:00',
    serviceId: 1,
    serviceName: 'Klasická relaxační masáž',
    duration: 60,
    price: 800,
    status: 'confirmed',
    notes: '',
    createdAt: '2025-06-15T14:30:00',
    confirmedAt: '2025-06-15T15:00:00',
    cancelledAt: null,
    cancelReason: null
  },
  {
    id: 2,
    clientName: 'Petr Svoboda',
    clientEmail: 'petr@email.cz',
    clientPhone: '+420 987 654 321',
    date: '2025-06-20',
    time: '14:00',
    serviceId: 2,
    serviceName: 'Sportovní masáž',
    duration: 90,
    price: 1200,
    status: 'pending',
    notes: 'Problémy s ramenem',
    createdAt: '2025-06-18T10:20:00',
    confirmedAt: null,
    cancelledAt: null,
    cancelReason: null
  },
  {
    id: 3,
    clientName: 'Marie Dvořáková',
    clientEmail: 'marie@email.cz',
    clientPhone: '+420 111 222 333',
    date: '2025-06-21',
    time: '09:00',
    serviceId: 4,
    serviceName: 'Lymfatická masáž',
    duration: 75,
    price: 1000,
    status: 'confirmed',
    notes: '',
    createdAt: '2025-06-16T09:15:00',
    confirmedAt: '2025-06-16T10:00:00',
    cancelledAt: null,
    cancelReason: null
  }
]

export const mockBlockedDates = [
  {
    id: 1,
    from: '2025-12-24',
    to: '2025-12-26',
    reason: 'Vánoční svátky'
  },
  {
    id: 2,
    from: '2025-08-01',
    to: '2025-08-14',
    reason: 'Letní dovolená'
  }
]
