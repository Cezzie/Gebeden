/*
 * Kruisweg van de H. Alfonsus Maria de Liguori (1761), in veertien staties.
 * Per statie: versikel, overweging, gebed, akte van liefde, Onze Vader enz.,
 * slotversikel en een strofe van het Stabat Mater.
 *
 * Bronnen (zie ook de persoonlijke bronnenpagina):
 *   nl — "Korte kruisweg volgens den H. Alfonsus Maria" ('s-Hertogenbosch 1939, Delpher);
 *        statietitels en versikels van de Nationale Raad voor Liturgie (rkliturgie.nl)
 *   en — Institute of Christ the King, New Brighton (icksp.org.uk); Stabat Mater van E. Caswall
 *   pt — overwegingen en lied: padrepauloricardo.org (Braziliaans); titels, versikels en
 *        Stabat Mater: Devocionário Móvel van het Opus Dei Portugal
 *   la — statietitels: Preces Latinae; versikels: ICKSP; Stabat Mater: Devocionário Móvel
 * Het Latijn staat alleen waar een authentieke Latijnse tekst bestaat.
 */

import { SEED } from "./seed.js";

/* Kruisteken uit de gebedenverzameling. */
const kruisteken = SEED.prayers.find((p) => p.key === "signum_crucis");

export const KRUISWEG = {
  title_nl: "Kruisweg",
  title_en: "Way of the Cross",
  title_pt: "Via-Sacra",
  title_la: "Via Crucis",
  subtitle_nl: "Volgens de H. Alfonsus Maria de Liguori",
  subtitle_en: "According to St Alphonsus Liguori",
  subtitle_pt: "Segundo Santo Afonso Maria de Ligório",
  intro_nl:
    "De kruisweg van de H. Alfonsus Maria de Liguori (1761). Bij elke statie overweegt u het lijden van Jezus, " +
    "bidt u het gebed en de akte van liefde, en het Onze Vader en Wees gegroet. Tussen de staties klinkt telkens " +
    "een strofe van het Stabat Mater.",
  intro_en:
    "The Way of the Cross of St Alphonsus Liguori (1761). At each station you consider the suffering of Jesus " +
    "and pray the prayer, the act of love, the Our Father, Hail Mary and Glory Be. Between the stations a verse " +
    "of the Stabat Mater is sung or said.",
  intro_pt:
    "A Via-Sacra de Santo Afonso Maria de Ligório (1761). Em cada estação contempla-se o sofrimento de Jesus " +
    "e reza-se a oração, o ato de amor, o Pai-nosso, a Ave-Maria e o Glória. Entre as estações canta-se ou " +
    "reza-se uma estrofe.",
};

/* Vaste versikels. */
const VERSIKEL = {
  nl: "V. Wij aanbidden U, Christus, en wij loven U.\nA. Omdat Gij door uw heilig kruis de wereld hebt verlost.",
  en: "V. We adore thee, O Christ, and we bless thee.\nR. Because by thy holy Cross thou hast redeemed the world.",
  pt: "V. Nós Vos adoramos, ó Jesus, e Vos bendizemos.\nR. Porque pela vossa Santa Cruz redimistes o mundo.",
  la: "V. Adorámus te, Christe, et benedícimus tibi:\nR. Quia per sanctam Crucem tuam redemísti mundum.",
};

const SLOTVERSIKEL = {
  nl: "V. Ontferm U over ons, Heer, ontferm U over ons.\nA. God, wees ons zondaars genadig.",
  en: "V. Have mercy on us, O Lord.\nR. Have mercy on us.",
  pt: "V. Senhor tende piedade de nós.\nR. Tende piedade de nós.",
  la: "V. Miserére nostri, Dómine.\nR. Miserére nostri.",
};

const NA_ELKE_STATIE = {
  nl: "Onze Vader, enz. — Wees gegroet, enz.",
  en: "Our Father… Hail Mary… Glory be…",
  pt: "Pai-nosso, Ave-Maria, Glória.",
  la: "Pater noster… Ave María… Glória Patri…",
};

const VOORBEREIDING = {
  title_nl: "Gebed van voorbereiding",
  title_en: "Preparatory Prayer",
  title_pt: "Oração inicial",
  text_nl: "Heer Jezus Christus, met zoveel liefde hebt Gij deze weg van smarten aanvaard om voor mij te sterven. En ik, ik heb U zo dikwijls de rug toegekeerd. Maar nu bemin ik U uit geheel mijn ziel. En omdat ik U bemin, spijt het mij uit geheel mijn hart, dat ik U beledigd heb. Schenk mij vergiffenis en sta mij toe U op uw Kruisweg te vergezellen. Gij gaat sterven uit liefde tot mij; ik volg U om te sterven uit liefde tot U, mijn beminde Verlosser. Mijn Jezus, ik wil leven en sterven, altijd met U verenigd. Amen.",
  text_en: "Jesus Christ, my Lord, with what great love didst thou pass over the painful road which led thee to death; and I, how often have I abandoned thee! But now I love thee with my whole soul, and because I love thee I am sincerely sorry for having offended thee. My Jesus pardon me, and permit me to accompany thee in this journey. Thou art going to die for love of me, and it is my wish also, my dearest redeemer, to die for love of thee. My Jesus, in thy love I wish to live. In thy love I wish to die.",
  text_pt: "Senhor Jesus Cristo, vós com tanto amor entrastes nesta via para morrerdes por mim; eu porém tantas vezes vos desprezei! Agora, de toda a minha alma vos amo e, porque vos amo, arrependo-me do fundo do coração de ter-vos ofendido. Perdoai-me e permiti que vos acompanhe nesta via. Vós, por amor a mim, caminhais para o lugar em que por mim haveis de morrer, e eu também, por amor a vós, desejo acompanhar-vos para convosco morrer, amantíssimo Redentor. Ó meu Jesus, desejo convosco viver e morrer!",
  strofe_nl: "Naast het kruis met wenende ogen,\nStond de Moeder diep bewogen,\nToen haar Zoon te sterven hing.",
  strofe_en: "At the Cross her station keeping,\nstood the mournful Mother weeping,\nclose to Jesus to the last.",
  strofe_pt: "Estava a Mãe dolorosa,\njunto da cruz, lacrimosa,\nenquanto Jesus sofria.",
  strofe_la: "Stabat Mater dolorósa\niuxta Crucem lacrimósa,\ndum pendébat Fílius.",
};

/* Slot: strofen 16–20 van het Stabat Mater; het Portugese boek sluit met twee gebeden. */
const SLOT = {
  title_nl: "Slot van het Stabat Mater",
  title_en: "Conclusion of the Stabat Mater",
  title_pt: "Oração final a Jesus crucificado · A Nossa Senhora das Dores",
  title_la: "Stabat Mater",
  text_nl: "Doe mij Jezus’ dood gedenken,\nWil mij deel in ’t lijden schenken,\nGeef, dat ik zijn wonden eer.\n\nPrent die wonden in mijn harte.\nMaak mij dronken van de smarte\nEn het bloed van uwen Zoon.\n\nMoge ik in het vuur niet branden.\nNeem, o Maagd, mijn zaak in handen\nIn het oordeel voor Gods troon.\n\nChristus, als ik hier moet scheiden,\nLaat uw Moeder mij geleiden\nTot de zegepalm en -prijs.\n\nEn als ’t lichaam dan zal sterven,\nDoe mijn ziel de glorie erven\nVan het hemels paradijs.",
  text_en: "Let me, to my latest breath,\nin my body bear the death\nof that dying Son of thine.\n\nWounded with His every wound,\nsteep my soul till it hath swooned,\nin His very Blood away;\n\nBe to me, O Virgin, nigh,\nlest in flames I burn and die,\nin His awful Judgment Day.\n\nChrist, when Thou shalt call me hence,\nby Thy Mother my defence,\nby Thy Cross my victory;\n\nWhile my body here decays,\nMay my soul Thy goodness praise,\nSafe in paradise with Thee. Amen.",
  text_pt: "Eis-me aqui, ó meu bom e dulcíssimo Jesus! Humildemente prostrado de joelhos em vossa presença, peço e suplico-vos, com todo o fervor de minha alma, que vos digneis gravar em meu coração os mais vivos sentimentos de fé, esperança e caridade, de verdadeiro arrependimento de meus pecados, e um firme propósito de emendar-me, enquanto vou considerando, com vivo afeto e dor, as vossas cinco chagas, tendo presentes as palavras que já o profeta Davi punha em vossa boca, ó bom Jesus: “Transpassaram minhas mãos e os meus pés e contaram todos os meus ossos” (Sl 21, 17).\n\nÓ Mãe das Dores, Rainha dos mártires, que tanto chorastes vosso Filho, morto para me salvar, alcançai-me uma verdadeira contrição dos meus pecados e uma sincera mudança de vida. Mãe, pela dor que experimentastes quando vosso divino Filho, no meio de tantos tormentos, inclinando a cabeça expirou à vossa vista sobre a cruz, eu vos suplico que me alcanceis uma boa morte. Por piedade, ó advogada dos pecadores, não deixeis de amparar a minha alma na aflição e no combate da terrível passagem desta vida à eternidade. E, como é possível que, neste momento, a palavra e a voz me faltem para pronunciar o vosso nome e o de Jesus, rogo-vos, desde já, a vós e a vosso divino Filho, que me socorrais nessa hora extrema, e assim direi: Jesus e Maria, entrego-vos a minha alma. Amém.",
  text_la: "Fac, ut portem Christi mortem,\npassiónis fac consórtem,\net plagas recólere.\n\nFac me plagis vulnerári,\nfac me Cruce inebriári,\net cruóre Fílii.\n\nFlammis ne urar succénsus,\nper te, Virgo, sim defénsus\nin die iudícii.\n\nChriste, cum sit hinc exíre,\nda per Matrem me veníre\nad palmam victóriæ.\n\nQuando corpus moriétur,\nfac, ut ánimæ donétur\nparadísi glória. Amen.",
};

export const STATIONS = [
  {
    n: 1,
    title_nl: "Jezus wordt ter dood veroordeeld",
    title_en: "Jesus condemned to Death",
    title_pt: "Jesus é condenado à morte",
    title_la: "Iesus condemnatur ad mortem",
    overweging_nl: "Overweeg, hoe Jezus, na gegeseld en met doornen gekroond te zijn, door Pilatus onrechtvaardig tot de kruisdood werd veroordeeld.",
    overweging_en: "Consider how Jesus, after having been scourged and crowned with thorns, was unjustly condemned by Pilate to die on the Cross.",
    overweging_pt: "Contemplemos como Jesus Cristo, já flagelado e coroado de espinhos, foi por fim injustamente condenado à morte por Pilatos.",
    gebed_nl: "Mijn aanbiddelijke Jezus, neen, het was niet Pilatus, maar het waren mijn zonden, die U ter dood veroordeelden. Ik bid U, om de verdiensten van deze smartvolle tocht: sta mijn ziel bij op de reis, die zij maakt naar de eeuwigheid.",
    gebed_en: "My loving Jesus, it was not Pilate, no, it was my sins that condemned Thee to die. I beseech Thee, by the merits of this sorrowful journey, to assist my soul in its journey towards eternity.",
    gebed_pt: "Ó Jesus adorável, não foi Pilatos, mas minha vida iníqua que vos condenou à morte. Pelo mérito deste tão penoso itinerário, no qual entrais rumo ao monte Calvário, peço-vos que benignamente me acompanheis no caminho pelo qual minha alma se dirige à eternidade.",
    liefde_nl: "Jezus, mijn liefde — ik bemin U meer dan mij zelf. — Het spijt mij uit geheel mijn hart, dat ik U beledigd heb. — Laat niet toe, dat ik mij nog ooit van U scheide. — Geef, dat ik U altijd bemin — en doe verder met mij wat Gij wilt. — Ik aanvaard alles wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos, ó Jesus, meu Amor, mais do que a mim mesmo, e do fundo do coração me arrependo de ter-vos ofendido. Não permitais que eu novamente me separe de vós. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes. O que vos for agradável também o será para mim.",
    strofe_nl: "Door haar droef en zuchtend harte\nVol van wee en lijdenssmarte\nBoorde ’t zwaard van marteling.",
    strofe_en: "Through her heart, His sorrow sharing,\nall His bitter anguish bearing,\nnow at length the sword has passed.",
    strofe_pt: "A morrer crucificado,\nTeu Jesus é condenado\nPor teus crimes, pecador.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Cuius ánimam geméntem,\ncontristátam et doléntem\npertransívit gládius.",
  },
  {
    n: 2,
    title_nl: "Jezus neemt het kruis op zijn schouders",
    title_en: "Jesus receives His Cross",
    title_pt: "Jesus toma a Sua cruz",
    title_la: "Iesus oneratur ligno crucis",
    overweging_nl: "Overweeg, hoe Jezus aan u dacht, toen Hij met het kruis op zijn schouders deze weg bewandelde, en hoe Hij de dood, die Hij ging lijden, voor u aan God opdroeg.",
    overweging_en: "Consider that Jesus, in making this journey with the cross on His shoulders, thought of us and offered for us to His Father the death that He was about to undergo.",
    overweging_pt: "Contemplemos como Jesus Cristo, levando a Cruz aos ombros, lembrava-se no caminho de oferecer por nós ao Pai eterno a morte que havia de sofrer.",
    gebed_nl: "Mijn allerbeminnelijkste Jezus, ik omhels alle beproevingen, die Gij voor mij hebt bestemd tot aan mijn dood. Ik bid U om de verdiensten van de smart, door U geleden bij het dragen van uw kruis, help mij om met een volkomen overgeving en geduld het mijne te dragen.",
    gebed_en: "My most beloved Jesus, I embrace all the tribulations that Thou hast destined for me until death. I beseech Thee, by the merits of the pain Thou didst suffer in carrying Thy cross, to give me the necessary help to carry mine with perfect patience and resignation.",
    gebed_pt: "Ó amabilíssimo Jesus, abraço todas as adversidades que, por vossa vontade, hei de tolerar até a morte e, pelo duro sofrimento que suportastes carregando a Cruz, peço-vos que me deis forças para que também eu possa carregar, com ânimo forte e paciente, minha própria cruz.",
    liefde_nl: "Ik bemin U, o Jezus, mijn liefde. — Het spijt mij U beledigd te hebben. — Laat niet toe, dat ik mij nog ooit van U scheide. — Geef dat ik U altijd bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos, ó Jesus, meu Amor, e arrependo-me de ter-vos ofendido. Não permitais que novamente me separe de ti. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Hoe bedrukt, met smart beladen\nWas die Maagd zo vol genaden,\nMoeder van Gods een’gen Zoon!",
    strofe_en: "O how sad and sore distressed\nwas that Mother, highly blest,\nof the sole-begotten One.",
    strofe_pt: "Com a Cruz é carregado,\nE do peso acabrunhado,\nVai morrer por teu amor.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "O quam tristis et afflícta\nfuit illa benedícta,\nmater Unigéniti!",
  },
  {
    n: 3,
    title_nl: "Jezus valt voor de eerste maal onder het kruis",
    title_en: "Jesus falls under the weight of the Cross the first time",
    title_pt: "Jesus cai pela primeira vez",
    title_la: "Iesus procumbit primum sub onere crucis",
    overweging_nl: "Overweeg deze eerste val van Jezus onder het kruis. Zijn vlees was geheel verscheurd door de geselslagen. Zijn hoofd was met doornen gekroond. Hij had veel bloed verloren. Hij was zo zwak, dat Hij nauwelijks kon gaan. Toch droeg Hij de zware last van het kruis op zijn schouders. De soldaten dreven Hem voort en meermalen viel Hij op deze tocht ter aarde neer.",
    overweging_en: "Consider this first fall of Jesus under His cross. His flesh was torn by the scourges, His head crowned with thorns, and He had lost a great quantity of blood. He was so weakened that He could scarcely walk, and yet He had to carry this great load upon His shoulders. The soldiers struck Him rudely, and thus He fell several times.",
    overweging_pt: "Contemplemos a primeira queda de Jesus sob o peso da Cruz. Tinha Ele a carne, por causa da cruenta flagelação, ferida de muitos modos e a cabeça coroada de espinhos; derramara ainda tanto sangue, que mal podia mover os pés por falta de forças. E porque era oprimido pelo grave peso da Cruz e açulado sem clemência pelos soldados, por isso aconteceu-lhe de cair muitas vezes por terra ao longo do caminho.",
    gebed_nl: "Mijn beminde Jezus, niet het gewicht van het kruis, maar het gewicht van mijn zonden deed U zoveel smart lijden. Ach, om de verdiensten van deze val van U, help mij om toch niet in doodzonde te vallen.",
    gebed_en: "My beloved Jesus, it is not the weight of the cross but of my sins which have made Thee suffer so much pain. Ah, by the merits of this first fall, deliver me from the misfortune of falling into mortal sin.",
    gebed_pt: "Ó meu Jesus, não é o peso da Cruz, mas o dos meus pecados que de tantas dores vos cobre. Rogo-vos, por esta vossa primeira queda, que me protejais de toda queda em pecado.",
    liefde_nl: "Mijn Jezus, ik bemin U. — Uit geheel mijn hart spijt het mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef dat ik U altijd bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos, ó Jesus, de todo o meu coração; arrependo-me de ter-vos ofendido. Não me permitais novamente cair em pecado. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Hoe die lieve Moeder snikte,\nAls ze op naar Jezus blikte,\nZwaar gewond door kruis en kroon.",
    strofe_en: "Christ above in torment hangs,\nshe beneath beholds the pangs\nof her dying glorious Son.",
    strofe_pt: "Pela Cruz tão oprimido,\nCai Jesus, desfalecido,\nPela tua salvação.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Quæ mærébat et dolébat,\npia Mater, dum vidébat\nnati pœnas íncliti.",
  },
  {
    n: 4,
    title_nl: "Jezus ontmoet zijn bedroefde moeder",
    title_en: "Jesus meets His afflicted Mother",
    title_pt: "Jesus encontra a Sua Mãe Santíssima",
    title_la: "Iesus fit perdolenti Matri obvius",
    overweging_nl: "Overweeg de ontmoeting van den Zoon en zijn Moeder. Jezus en Maria zagen elkander aan, maar hun blikken werden als zovele pijlen, waardoor hun liefdevolle harten werden gewond.",
    overweging_en: "Consider the meeting of the Son and the Mother, which took place on this journey. Jesus and Mary looked at each other, and their looks became as so many arrows to wound those hearts which loved each other so tenderly.",
    overweging_pt: "Contemplemos como deve ter sido o encontro, neste caminho, do Filho e da Mãe. Jesus e Maria se olharam entre si, e os olhares mudos que trocaram foram outras tantas setas a atravessar o coração amante de ambos.",
    gebed_nl: "Mijn allerbeminnelijkste Jezus, om de smart die Gij leedt bij deze ontmoeting, schenk mij de genade een waar dienaar te zijn van uw allerheiligste Moeder. En Gij, smartvolle Koningin, verwerf mij door uw voorspraak, dat ik altijd en vol liefde denk aan het lijden van uw Zoon.",
    gebed_en: "My most loving Jesus, by the sorrow Thou didst experience in this meeting, grant me the grace of a truly devoted love for Thy most holy Mother. And thou, my Queen, who wast overwhelmed with sorrow, obtain for me by thy intercession a continual and tender remembrance of the Passion of thy Son.",
    gebed_pt: "Ó amantíssimo Jesus, pela dor acerba que experimentastes neste encontro, tornai-me, eu vos peço, verdadeiramente devoto de vossa Mãe santíssima. E vós, ó minha dolorosa Rainha, intercedei por mim e alcançai-me uma tal memória dos suplícios de vosso Filho, que minha mente esteja para sempre detida na piedosa contemplação deles.",
    liefde_nl: "Jezus, mijn liefde, ik bemin U. — Ik heb berouw U beledigd te hebben. — Laat niet toe, dat ik U nog ooit beledig. — Geef, dat ik U bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos, ó Jesus, meu Amor; arrependo-me de ter-vos ofendido. Não me permitais novamente pecar contra vós. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Wie toch zou er zonder rouwen\nChristus’ Moeder hier aanschouwen,\nDragend zulk een foltering?",
    strofe_en: "Is there one who would not weep,\nwhelmed in miseries so deep,\nChrist’s dear Mother to behold?",
    strofe_pt: "De Maria lacrimosa,\nNo encontro lastimosa,\nVê a imensa compaixão.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Quis est homo qui non fleret,\nmatrem Christi si vidéret\nin tanto supplício?",
  },
  {
    n: 5,
    title_nl: "Simon van Cyrene helpt Jezus het kruis dragen",
    title_en: "Simon of Cyrene carries the Cross",
    title_pt: "Simão Cireneu ajuda Jesus a levar a cruz",
    title_la: "Iesus in baiulanda cruce a Cyrenaeo adiuvatur",
    overweging_nl: "Overweeg, hoe Jezus tengevolge van zijn zwakheid bij elke schrede bijna de geest gaf. Als de joden dit bemerkten, vreesden zij, dat Hij wellicht onderweg zou bezwijken, terwijl ze zozeer verlangden Hem de schandelijke kruisdood te zien sterven. Daarom dwongen zij Simon van Cyrene het kruis achter Jezus te dragen.",
    overweging_en: "Consider that the Jews, seeing that at each step Jesus, from weakness, was on the point of expiring and fearing that He would die on the way, when they wished Him to die the ignominious death of the cross, constrained Simon of Cyrene to carry the cross behind Our Lord.",
    overweging_pt: "Contemplemos como os judeus obrigaram Simão de Cirene a carregar a Cruz atrás do Senhor, vendo Jesus quase expirar a cada passo devido ao cansaço e temendo, por outra parte, que morresse no caminho aquele que queriam ver pregado à Cruz.",
    gebed_nl: "Mijn allerzoetste Jezus, ik wil niet zoals de Cyrener het kruis weigeren; ik omhels het en neem het aan. Ik neem in het bijzonder de dood aan, die Gij voor mij bestemd hebt met alle pijnen, die hem zullen vergezellen. Ik draag hem U op in vereniging met de uwe. Gij zijt gestorven uit liefde tot mij; ik wil sterven uit liefde tot U en om U genoegen te geven. Kom mij te hulp met uw genade.",
    gebed_en: "My most sweet Jesus, I will not refuse the cross as the Cyrenian did: I accept it, I embrace it. I accept in particular the death that Thou hast destined for me with all the pains which may accompany it. I unite it to Thy death and I offer it to Thee. Thou hast died for love of me; I will die for love of Thee and to please Thee. Help me by Thy grace.",
    gebed_pt: "Ó dulcíssimo Jesus, não quero, como o Cirineu, repudiar a Cruz. De bom grado a abraço e tomo sobre mim; abraço especialmente a morte que para mim estabelecestes, com todas as dores que ela trará consigo. Uno minha morte à vossa e, assim unida, ofereço-a a vós em sacrifício. Vós morrestes por amor a mim; quero também eu morrer por amor a vós, com a intenção de vos agradar. Vós, porém, ajudai-me com a vossa graça.",
    liefde_nl: "Jezus, mijn liefde, ik bemin U. — Het berouwt mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef dat ik U bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos, ó Jesus, meu Amor, e arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Wie toch zou niet medesnikken,\nDie Maria aan zou blikken,\nLijdend met haar Lieveling?",
    strofe_en: "Can the human heart refrain\nfrom partaking in her pain,\nin that Mother’s pain untold?",
    strofe_pt: "Em extremo desmaiado,\nTeve auxílio, tão cansado,\nRecebendo o Cireneu.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Quis non posset contristári\nChristi Matrem contemplári\ndoléntem cum Fílio?",
  },
  {
    n: 6,
    title_nl: "Veronica droogt het aanschijn van Jezus af",
    title_en: "Veronica wipes the Face of Jesus",
    title_pt: "Uma piedosa mulher enxuga a face de Jesus",
    title_la: "Iesus Veronicae sudario abstergitur",
    overweging_nl: "Overweeg, hoe de heilige vrouw Veronica Jezus uitgeput zag. Zijn gelaat was met zweet en bloed overdekt. Zij bood Hem een doek aan. Jezus droogde Zich daarmee af en liet er de trekken van zijn heilig Aanschijn in afgedrukt.",
    overweging_en: "Consider that the holy woman named Veronica, seeing Jesus so afflicted and His face bathed in sweat and blood, presented Him with a towel, with which He wiped His adorable face, leaving on it the impression of His holy countenance.",
    overweging_pt: "Contemplemos como aquela santa mulher Verônica, vendo Jesus abatido pelas dores, com o rosto banhado em suor e sangue, estendeu-lhe um pano em que, purificada a face, Ele deixou impressa sua imagem.",
    gebed_nl: "Mijn beminde Jezus, uw gelaat was vroeger schoon, maar nu op de kruisweg is het niet schoon meer, het is geheel misvormd door wonden en bloed.",
    gebed_en: "My most beloved Jesus, Thy face was beautiful before, but in this journey it has lost all its beauty, and wounds and blood have disfigured it. Alas, my soul also was once beautiful, when it received Thy grace in Baptism; but I have disfigured it since with my sins. Thou alone, my Redeemer, canst restore it to its former beauty. Do this by Thy Passion, and then do with me what Thou wilt.",
    gebed_pt: "Ó meu Jesus, formosa era antes a vossa face; mas agora não aparece assim, tão deformada está por feridas e sangue! Ai de mim, como era formosa também minha alma, quando recebi a vossa graça pelo Batismo: mas, pecando, tornei-a disforme. Vós somente, meu Redentor, lhe podeis restituir a antiga beleza. Para que o façais, rogo-vos pelo mérito de vossa Paixão.",
    liefde_nl: "Helaas, ook mijn ziel was eenmaal schoon, — toen zij uw genade ontving in ’t H. Doopsel. — Maar ik heb haar daarna misvormd door mijn zonden. — Gij alleen, mijn Verlosser, — kunt haar de vroegere schoonheid teruggeven; — doe het om wille van uw lijden. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos, ó Jesus, meu Amor; arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Voor des mensen euveldaden\nZag zij Hem met smart beladen,\nEn verscheurd door geseling.",
    strofe_en: "Bruised, derided, cursed, defiled,\nshe beheld her tender Child\nAll with bloody scourges rent:",
    strofe_pt: "O seu rosto ensanguentado,\nPor Verônica enxugado,\nEis, no pano, apareceu.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Pro peccátis suæ gentis\nvidit Iesum in torméntis,\net flagéllis súbditum.",
  },
  {
    n: 7,
    title_nl: "Jezus valt voor de tweede maal onder het kruis",
    title_en: "Jesus falls a second time",
    title_pt: "Jesus cai pela segunda vez",
    title_la: "Iesus procumbit iterum sub onere crucis",
    overweging_nl: "Overweeg de tweede val van Jezus onder het kruis. Al de wonden van zijn eerbiedwaardig hoofd en van al zijn andere heilige ledematen deden den bedroefden Meester daarbij opnieuw pijn.",
    overweging_en: "Consider the second fall of Jesus under the cross, a fall which renews the pains of all the wounds of the head and members of our afflicted Lord.",
    overweging_pt: "Contemplemos a segunda queda de Jesus sob o peso da Cruz, na qual se lhe aprofundam todas as chagas da venerável cabeça e de todo o corpo, e se renovam todas as angústias do doloroso Senhor.",
    gebed_nl: "Mijn allerzachtmoedigste Jezus, hoeveel malen hebt Gij mij vergiffenis geschonken, en hoe dikwijls ben ik hervallen en heb U opnieuw beledigd! Och, om de verdiensten van deze nieuwe val, help mij om tot aan mijn dood toe in uw genade te volharden. Geef, dat ik in alle bekoringen, die mij zullen overvallen, steeds tot U mijn toevlucht neem.",
    gebed_en: "My most gentle Jesus, how many times Thou hast pardoned me, and how many times I have fallen again and begun again to offend Thee! Oh, by the merits of this new fall, give me the necessary helps to persevere in Thy grace until death. Grant, that in all temptations which assail me, I may always commend myself to Thee.",
    gebed_pt: "Ó mansíssimo Jesus, quantas vezes me concedestes o perdão! Eu, porém, recaí nos mesmos pecados e renovei minhas ofensas contra vós. Pelo mérito desta vossa nova queda, ajudai-me a perseverar em vossa graça até a morte. Fazei, em todas as tentações que avançarão contra mim, que em vós sempre me refugie.",
    liefde_nl: "O Jezus, mijn liefde — ik bemin U uit geheel mijn hart. — Het spijt mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef, dat ik U altijd bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos de todo o meu coração, ó Jesus, meu Amor; arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Zag zij ’t Kind haars harten stervend,\nGans verlaten, alles dervend,\nToen zijn ziele henenging.",
    strofe_en: "For the sins of His own nation,\nsaw Him hang in desolation,\nTill His spirit forth He sent.",
    strofe_pt: "Outra vez desfalecido,\nPelas dores abatido,\nCai por terra o Salvador.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Vidit suum dulcem Natum\nmoriéndo desolátum,\ndum emísit spíritum.",
  },
  {
    n: 8,
    title_nl: "Jezus troost de wenende vrouwen",
    title_en: "Jesus speaks to the daughters of Jerusalem",
    title_pt: "Jesus consola as filhas de Jerusalém",
    title_la: "Iesus plorantes mulieres alloquitur",
    overweging_nl: "Overweeg hoe de vrouwen uit medelijden weenden, als zij zagen hoe Jezus zozeer leed en hoe Hij de weg besproeide met zijn bloed. Maar Jezus sprak tot haar: „Weent niet over Mij, maar over u zelf en uw kinderen”.",
    overweging_en: "Consider that those women wept with compassion at seeing Jesus in so pitiable a state, streaming with blood, as He walked along. But Jesus said to them, “Weep not for Me, but for your children.”",
    overweging_pt: "Contemplemos como estas mulheres, vendo Jesus morto de cansaço e coberto de sangue, são tocadas de comiseração e choram copiosamente. Mas, voltando-se a elas, Ele diz: “Não choreis por mim; antes, chorai por vós mesmas e por vossos filhos”.",
    gebed_nl: "Mijn smartvolle Jezus, ik beween de beledigingen, die ik U heb aangedaan; niet alleen om de straffen, die ik daardoor heb verdiend, maar ook en nog meer om het misnoegen, dat ik daardoor heb veroorzaakt aan U, die mij zo vurig hebt bemind. Niet zozeer de hel, als wel uw liefde doet mij mijn zonden bewenen.",
    gebed_en: "My Jesus, laden with sorrows, I weep for the offenses that I have committed against Thee, because of the pains which they have deserved, and still more, because of the displeasure which they have caused Thee, Who hast loved me so much. It is Thy love, more than the fear of hell, which causes me to weep for my sins.",
    gebed_pt: "Ó doloroso Jesus, choro os pecados que cometi contra vós, não só pelas penas de que me fizeram digno, mas sobretudo pela tristeza que vos causaram a vós, que tanto me amastes. Ao choro me move menos o inferno que o amor a vós.",
    liefde_nl: "Mijn Jezus, ik bemin U meer dan mij zelf. — Het spijt mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef dat ik U altijd bemin — en doe dan maar met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Ó meu Jesus, amo-vos mais do que a mim mesmo; arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Ach dan, Moeder, bron van liefde,\nDoe mij voelen, wat u griefde,\nDoe mij treuren zo als gij.",
    strofe_en: "O thou Mother! fount of love!\nTouch my spirit from above,\nmake my heart with thine accord:",
    strofe_pt: "Das mulheres piedosas,\nDe Sião filhas chorosas,\nÉ Jesus consolador.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Éia, Mater, fons amóris\nme sentíre vim dolóris\nfac, ut tecum lúgeam.",
  },
  {
    n: 9,
    title_nl: "Jezus valt voor de derde maal onder het kruis",
    title_en: "Jesus falls the third time",
    title_pt: "Jesus cai pela terceira vez",
    title_la: "Iesus procumbit tertium sub onere crucis",
    overweging_nl: "Overweeg de derde val van Jezus. Al te groot was Jezus’ uitputting. Al te groot was ook de wreedheid van de beulen. Zij eisten, dat Hij vlugger voortging, ofschoon Hij nauwelijks de kracht had om te gaan.",
    overweging_en: "Consider the third fall of Jesus Christ. His weakness was extreme, and the cruelty of His executioners excessive, who tried to hasten His steps when He had scarcely strength to move.",
    overweging_pt: "Contemplemos a terceira queda de Cristo sob o peso da Cruz. Caiu porque era demasiada a sua fraqueza e excessiva a crueldade dos algozes, que lhe queriam acelerar a marcha, embora Ele mal pudesse dar um passo.",
    gebed_nl: "Mijn versmade Jezus, om de verdiensten van de zwakheid, die Gij hebt willen lijden op uw tocht naar Calvarië, ach, geef mij de nodige kracht om alle menselijk opzicht en al mijn kwade neigingen te overwinnen. Deze zijn de oorzaak geweest, dat ik vroeger uw vriendschap heb veracht.",
    gebed_en: "Ah, my outraged Jesus, by the merits of the weakness that Thou didst suffer in going to Calvary, give me strength sufficient to conquer all human respect and all my wicked passions, which have led me to despise Thy friendship.",
    gebed_pt: "Ó Jesus tão maltratado, pelo mérito desta falta de forças que quisestes padecer no caminho do Calvário, confortai-me, eu vos peço, com tanto vigor, que já não tenha respeito algum às opiniões dos homens e domine minha natureza viciosa: porque ambas as coisas foram a causa por que desprezei outrora a vossa amizade.",
    liefde_nl: "O Jezus, mijn liefde, — ik bemin U uit geheel mijn hart. — Het spijt mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef dat ik U altijd bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos, ó Jesus, meu Amor, de todo o meu coração; arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Ja, ontsteek mijn hart van binnen,\nLeer mij Jezus Christus minnen,\nDat ik Hem behaaglijk zij.",
    strofe_en: "Make me feel as thou hast felt;\nmake my soul to glow and melt\nwith the love of Christ my Lord.",
    strofe_pt: "Cai, terceira vez, prostrado,\nPelo peso redobrado\nDos pecados e da Cruz.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Fac, ut árdeat cor meum\nin amándo Christum Deum\nut sibi compláceam.",
  },
  {
    n: 10,
    title_nl: "Jezus wordt van zijn kleren beroofd",
    title_en: "Jesus is stripped of His Garments",
    title_pt: "Jesus é despojado das suas vestes",
    title_la: "Iesus vestibus spoliatur",
    overweging_nl: "Overweeg, hoe Jezus door de beulen op ruwe wijze werd ontkleed. De klederen hadden zich vastgehecht aan het vlees, door de gesels verscheurd; en zo trok men tegelijk met de klederen ook het vel van Jezus’ lichaam. Heb medelijden met uw Meester en zeg tot Hem:",
    overweging_en: "Consider the violence with which the executioners stripped Jesus. His inner garments adhered to His torn flesh, and they dragged them off so roughly that the skin came with them. Compassionate your Savior thus cruelly treated.",
    overweging_pt: "Contemplemos com que violência arrancaram as vestes a Cristo. Como o traje interior estivesse muito pegado à carne, aberta pelos flagelos, os carnífices, ao puxarem-lha, rasgaram-lhe também a pele. Tenhamos compaixão de Nosso Senhor e lhe falemos assim:",
    gebed_nl: "Mijn onschuldige Jezus, om de smart, die Gij toen hebt gevoeld, help mij me zelf te ontdoen van alle genegenheden voor de dingen van deze wereld, opdat ik al mijn liefde schenke aan U alleen. Gij verdient immers bovenmate, dat men U bemint.",
    gebed_en: "My innocent Jesus, by the merits of the torment which Thou hast felt, help me to strip myself of all affection to things of earth, in order that I may place all my love in Thee, Who art so worthy of my love.",
    gebed_pt: "Ó inocentíssimo Jesus, pelo mérito da dor que padecestes nesta espoliação, ajudai-me, eu vos peço, a despir-me de todo afeto às coisas criadas e, com toda a inclinação de minha vontade, converter-me somente a vós, que sois tão digno do meu amor.",
    liefde_nl: "Ik bemin U uit geheel mijn hart. — Ik heb er berouw over, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef dat ik U bemin — en handel vervolgens met mij zoals U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos de todo o meu coração; arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Heil’ge Moeder, hoor mijn beden,\nDruk de wonden van zijn leden\nOnuitwisbaar in mijn hart.",
    strofe_en: "Holy Mother! pierce me through,\nin my heart each wound renew\nof my Saviour crucified:",
    strofe_pt: "Dos vestidos despojado,\nPor algozes maltratado,\nEu vos vejo, meu Jesus.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Sancta Mater, istud agas,\ncrucifíxi fige plagas\ncordi meo válide.",
  },
  {
    n: 11,
    title_nl: "Jezus wordt aan het kruis genageld",
    title_en: "Jesus is nailed to the Cross",
    title_pt: "Jesus é pregado na cruz",
    title_la: "Iesus clavis affigitur cruci",
    overweging_nl: "Overweeg, hoe Jezus wordt neergeworpen op het kruis. Hij strekt zijn handen uit en draagt het offer van zijn leven voor onze zaligheid op aan den eeuwigen Vader. De wreedaards nagelen Hem vast, heffen vervolgens het kruis omhoog en laten Jezus aan dit eerloos hout sterven van smart.",
    overweging_en: "Consider that Jesus, after being thrown on the cross, extended His hands and offered to His eternal Father the sacrifice of His life for our salvation. These barbarians fastened Him with nails, and then, raising the cross, left Him to die in anguish on this infamous gibbet.",
    overweging_pt: "Contemplemos como Jesus é arremessado sobre a Cruz e, de braços estendidos, oferece sua vida ao Pai eterno em sacrifício pela nossa salvação. Os carnífices o pregam à Cruz e, depois de erguerem esta, deixam-no levantado num infame patíbulo, abandonado a uma morte cruel.",
    gebed_nl: "Mijn verachte Jezus, nagel mijn hart aan uw voeten, opdat het daar altijd blijve om U te beminnen en U nooit meer verlate.",
    gebed_en: "My Jesus, loaded with contempt, nail my heart to Thy feet, that it may ever remain there to love Thee and never more to leave Thee.",
    gebed_pt: "Ó Jesus tão desprezado, pregai meu coração aos vossos pés, para que, com vínculo de amor, eu permaneça sempre a vós ligado e jamais seja de vós separado.",
    liefde_nl: "Ik bemin U meer dan mij zelf. — Het spijt mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef dat ik U altijd bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos mais do que a mim mesmo, arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Ach, uw Zoon liet om mijn zonden\nZich onmens’lijk wreed verwonden.\nDoe mij delen in zijn smart.",
    strofe_en: "Let me share with thee His pain,\nwho for all my sins was slain,\nwho for me in torments died.",
    strofe_pt: "Sois por mim na Cruz pregado,\nInsultado, blasfemado,\nCom cegueira e com furor.\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Tui Nati vulneráti,\ntam dignáti pro me pati,\npœnas mecum dívide.",
  },
  {
    n: 12,
    title_nl: "Jezus sterft aan het Kruis",
    title_en: "Jesus dies upon the Cross",
    title_pt: "Jesus morre na cruz",
    title_la: "Iesus moritur in cruce",
    overweging_nl: "Overweeg, hoe uw Jezus na een doodsstrijd van drie uren aan het kruis tenslotte geheel is verteerd door smart. Vol overgeving geeft Hij zijn lichaam prijs aan de dood. Hij buigt het hoofd en sterft.",
    overweging_en: "Consider how Jesus, after three hours’ agony on the cross, consumed at length with anguish, abandoned Himself to the weight of His body, bowed His head and died.",
    overweging_pt: "Contemplemos Jesus preso à nossa Cruz. Após três horas de luta, consumido enfim pelas dores, Ele deu o corpo à morte e, de cabeça inclinada, entregou o espírito.",
    gebed_nl: "O mijn gestorven Jezus, ik kus met ontroering dat kruis, waaraan Gij voor mij geleden hebt. Om mijn zonden had ik verdiend een rampzalige dood te sterven. Maar uw dood is mijn hoop. Ach, om de verdiensten van uw dood, schenk mij de genade van te sterven in de omhelzing van uw voeten en brandend van liefde voor U. In uw handen beveel ik mijn ziel.",
    gebed_en: "O my dying Jesus, I kiss devoutly the cross on which Thou didst die for love of me. I have merited by my sins to die a miserable death, but Thy death is my hope. Ah, by the merits of Thy death, give me grace to die, embracing Thy feet and burning with love for Thee. I commit my soul into Thy hands.",
    gebed_pt: "Ó Jesus morto, movido por íntimos afetos de piedade, beijo esta Cruz em que vós, por minha causa, cumpristes o curso de vossa vida. Pelos pecados cometidos, mereci uma morte infeliz; mas vossa morte é minha esperança. Pelos méritos de vossa morte, concedei-me, peço-vos, que, abraçado aos vossos pés e abrasado de amor por vós, eu entregue um dia meu espírito.",
    liefde_nl: "Ik bemin U uit geheel mijn hart. — Het spijt mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef dat ik U altijd bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos de todo o meu coração; arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Laat mij innig met u wenen,\nMet zijn lijden mij verenen,\nTot mijn leven einden zal.",
    strofe_en: "Let me mingle tears with thee,\nmourning Him who mourned for me,\nall the days that I may live:",
    strofe_pt: "Por meus crimes padecestes,\nMeu Jesus, por mim morrestes,\nOh, quão grande é minha dor!\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Fac me tecum píe flere,\ncrucifíxo condolére,\ndonec ego víxero.",
  },
  {
    n: 13,
    title_nl: "Jezus wordt van het kruis genomen",
    title_en: "Jesus is taken down from the cross",
    title_pt: "Jesus é descido da cruz e entregue à Sua Mãe",
    title_la: "Iesus deponitur de cruce",
    overweging_nl: "Overweeg, hoe na Jezus’ dood twee van zijn leerlingen, Jozef en Nicodemus, Hem van het kruis namen. Zij legden Hem neer in de armen van zijn bedroefde Moeder. Maria ontving Hem met tederheid en drukte Hem aan haar hart.",
    overweging_en: "Consider that, Our Lord having expired, two of His disciples, Joseph and Nicodemus, took Him down from the cross and placed Him in the arms of His afflicted Mother, who received Him with unutterable tenderness and pressed Him to her bosom.",
    overweging_pt: "Contemplemos como dois dos discípulos de Jesus, José e Nicodemos, o tiram exânime da Cruz e o colocam nos braços de sua Mãe dolorosa, que recebe o Filho morto com grande amor e o abraça ternamente.",
    gebed_nl: "O Moeder van Smarten, ter liefde van uw Zoon, neem mij aan voor uw dienaar en bid Jezus voor mij. En Gij, mijn Verlosser, omdat Gij voor mij hebt willen sterven, help mij U te beminnen. Ik wil niets anders dan U alleen.",
    gebed_en: "O Mother of Sorrow, for the love of this Son, accept me for thy servant, and pray to Him for me. And Thou, my Redeemer, since Thou hast died for me, permit me to love Thee; for I wish but Thee, and nothing more.",
    gebed_pt: "Ó Mãe das Dores, pelo amor com que amais o vosso Filho, recebei-me como servo vosso e rogai a Ele por mim. E vós, ó meu Redentor, porque por mim morrestes, fazei, benignamente, com que eu vos ame; a vós somente desejo nem quero nada fora de vós.",
    liefde_nl: "Ik bemin U, mijn Jezus. — Het spijt mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef, dat ik U altijd bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos, ó Jesus, meu Amor, e arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Met u naast het kruis te toeven,\nMet u ’t bitter leed te proeven\nIs mijn hartewens vooral.",
    strofe_en: "By the Cross with thee to stay,\nthere with thee to weep and pray,\nis all I ask of thee to give.",
    strofe_pt: "Do madeiro vos tiraram\nE à Mãe vos entregaram\nCom que dor e compaixão!\nPela Virgem dolorosa,\nVossa Mãe tão piedosa,\nPerdoai-me, meu Jesus.",
    strofe_la: "Iuxta Crucem tecum stare,\net me tibi sociáre\nin planctu desídero.",
  },
  {
    n: 14,
    title_nl: "Jezus wordt in het graf gelegd",
    title_en: "Jesus is placed in the tomb",
    title_pt: "Jesus é colocado no sepulcro",
    title_la: "Iesus sepulcro conditur",
    overweging_nl: "Overweeg, hoe de leerlingen den gestorven Jezus naar het graf droegen. Ook zijn Moeder vergezelde Hem en legde Hem eigenhandig in het graf. Daarop werd het graf gesloten en allen gingen heen.",
    overweging_en: "Consider that the disciples carried the body of Jesus to bury it, accompanied by His holy Mother, who arranged it in the sepulcher with her own hands. They then closed the tomb, and all withdrew.",
    overweging_pt: "Contemplemos como os discípulos levam Jesus exânime ao lugar da sepultura. Triste, a Mãe os acompanha e com as próprias mãos acomoda o corpo do Filho à sepultura. Fecha-se este, enfim, e todos vão-se embora.",
    gebed_nl: "Ach mijn begraven Jezus, ik kus de steen, die uw graf sluit. Maar binnen drie dagen zijt Gij daaruit verrezen. Ik bid U om wille van uw verrijzenis, doe ook mij op de laatste dag glorievol met U verrijzen, om voor altijd met U verenigd U eeuwig te loven en te beminnen in de hemel.",
    gebed_en: "Ah, my buried Jesus, I kiss the stone that encloses Thee. But Thou didst rise again on the third day. I beseech Thee, by Thy resurrection, make me rise glorious with Thee at the Last Day, to be always united with Thee in Heaven, to praise Thee and love Thee forever.",
    gebed_pt: "Ó Jesus sepultado, beijo esta pedra que vos acolheu; mas, após três dias, haveis de ressurgir! Por vossa ressurreição, fazei-me, eu vos peço, ressurgir glorioso convosco no último dia e ir para o Céu, onde, unido a vós para sempre, vos hei de louvar e amar por toda a eternidade.",
    liefde_nl: "Ik bemin U, mijn Jezus. — Het spijt mij, dat ik U beledigd heb. — Laat niet toe, dat ik U nog ooit beledig. — Geef, dat ik U altijd bemin — en doe verder met mij wat U behaagt. Amen.",
    liefde_en: "I love thee, Jesus, my love above all things. I repent with my whole heart for having offended thee. Never permit me to separate myself from thee again. Grant that I may love thee always, then do with me what thou wilt.",
    liefde_pt: "Amo-vos e arrependo-me de ter-vos ofendido. Não permitais que eu novamente vos ofenda. Dai-me amor perpétuo a vós e fazei de mim o que quiserdes.",
    strofe_nl: "Maagd der maagden, rijk aan zegen,\nWees mij toch niet ongenegen,\nDat ik met u treuren leer.",
    strofe_en: "Virgin of all virgins blest!\nListen to my fond request:\nlet me share thy grief divine;",
    strofe_pt: "No sepulcro vos deixaram,\nSepultado, vos choraram,\nMagoado o coração.\nMeu Jesus, por vossos passos,\nRecebei em vossos braços\nA mim, pobre pecador.",
    strofe_la: "Virgo vírginum præclara,\nmihi iam non sis amára,\nfac me tecum plángere.",
  }
];

const K = {
  begin: { nl: "Begin", en: "Beginning", pt: "Início" },
  voorbereiding: { nl: "Voorbereiding", en: "Preparation", pt: "Preparação" },
  statie: {
    nl: (n) => `Statie ${n} van 14`,
    en: (n) => `Station ${n} of 14`,
    pt: (n) => `Estação ${n} de 14`,
  },
  slot: { nl: "Slot", en: "Conclusion", pt: "Conclusão" },
};

const delen = (...stukken) => stukken.filter(Boolean).join("\n\n");
/* Zelfde blokken als de volkstaal, met lege blokken waar geen Latijn bestaat (voor de uitlijning). */
const delenLa = (...stukken) => stukken.map((s) => s || "").join("\n\n");

/*
 * Bouwt de stappen van de kruisweg met stapkoppen in de gekozen taal.
 * Elke stap draagt de teksten in alle talen; `station` telt de stipjes.
 */
export function buildKruiswegSteps(lang = "nl") {
  const steps = [];

  steps.push({
    kicker: K.begin[lang],
    title_nl: kruisteken.title_nl,
    title_en: kruisteken.title_en,
    title_pt: kruisteken.title_pt,
    title_la: kruisteken.title_la,
    text_nl: kruisteken.text_nl,
    text_en: kruisteken.text_en,
    text_pt: kruisteken.text_pt,
    text_la: kruisteken.text_la,
  });

  steps.push({
    kicker: K.voorbereiding[lang],
    title_nl: VOORBEREIDING.title_nl,
    title_en: VOORBEREIDING.title_en,
    title_pt: VOORBEREIDING.title_pt,
    text_nl: delen(VOORBEREIDING.text_nl, VOORBEREIDING.strofe_nl),
    text_en: delen(VOORBEREIDING.text_en, VOORBEREIDING.strofe_en),
    text_pt: delen(VOORBEREIDING.text_pt, VOORBEREIDING.strofe_pt),
    text_la: delenLa("", VOORBEREIDING.strofe_la),
  });

  for (const s of STATIONS) {
    const step = { kicker: K.statie[lang](s.n), station: s.n, title_la: s.title_la };
    for (const l of ["nl", "en", "pt"]) {
      step[`title_${l}`] = s[`title_${l}`];
      step[`text_${l}`] = delen(
        VERSIKEL[l],
        s[`overweging_${l}`],
        s[`gebed_${l}`],
        s[`liefde_${l}`],
        NA_ELKE_STATIE[l],
        SLOTVERSIKEL[l],
        s[`strofe_${l}`]
      );
    }
    step.text_la = delenLa(VERSIKEL.la, "", "", "", NA_ELKE_STATIE.la, SLOTVERSIKEL.la, s.strofe_la);
    steps.push(step);
  }

  steps.push({
    kicker: K.slot[lang],
    title_nl: SLOT.title_nl,
    title_en: SLOT.title_en,
    title_pt: SLOT.title_pt,
    title_la: SLOT.title_la,
    text_nl: SLOT.text_nl,
    text_en: SLOT.text_en,
    text_pt: SLOT.text_pt,
    text_la: SLOT.text_la,
  });

  steps.push({
    kicker: K.slot[lang],
    title_nl: kruisteken.title_nl,
    title_en: kruisteken.title_en,
    title_pt: kruisteken.title_pt,
    title_la: kruisteken.title_la,
    text_nl: kruisteken.text_nl,
    text_en: kruisteken.text_en,
    text_pt: kruisteken.text_pt,
    text_la: kruisteken.text_la,
  });

  return steps;
}
