import { SEED } from "./seed.js";

/* Vaste gebeden uit de bestaande verzameling hergebruiken, op sleutel. */
const byKey = Object.fromEntries(SEED.prayers.map((p) => [p.key, p]));

/*
 * Novenen. Elke noveen heeft een vaste startdatum (jaar, maand 1-12, dag),
 * negen daggebeden en een reeks vaste gebeden die elke dag terugkeren.
 * Deze noveen kent naast het Nederlands een Portugese (Portugal) vertaling.
 */

/*
 * Slot dat elk daggebed afsluit (naar praymorenovenas.com), zonder het
 * intentiemoment: dat zit in het vaste noveengebed, zodat het niet
 * dubbel voorkomt.
 */
const DAG_SLOT_NL =
  "Bid voor mij.\n\n" +
  "Hemelse Vader, verhoor de bede die uw dienaar Ignatius U voor mij voorlegt, als zij strekt tot uw eer. " +
  "Schenk mij dezelfde genade die Gij aan de heilige Ignatius hebt geschonken, opdat ik zijn vurige liefde voor Christus " +
  "en zijn ijver voor de opbouw van uw Rijk mag delen.\n\nHeilige Ignatius van Loyola, bid voor ons!";

const DAG_SLOT_PT =
  "Rogai por mim.\n\n" +
  "Pai celeste, escutai o pedido que o Vosso servo Inácio Vos apresenta por mim, se for para Vossa glória. " +
  "Concedei-me a mesma graça que destes a Santo Inácio, para que eu partilhe o seu ardente amor a Cristo " +
  "e o seu zelo pela edificação do Vosso Reino.\n\nSanto Inácio de Loiola, rogai por nós!";

export const NOVENAS = {
  theresia: {
    key: "theresia",
    archived: false,
    pt: false,
    label_nl: "H. Theresia van Lisieux",
    title_nl: "Noveen tot de heilige Theresia van Lisieux",
    subtitle_nl: "Tot de Kleine Bloem, 5 t/m 13 augustus 2026",
    intro_nl:
      "Deze noveen wordt gebeden van woensdag 5 tot en met donderdag 13 augustus 2026. De heilige Theresia van Lisieux " +
      "(1873–1897), de Kleine Bloem, beloofde haar hemel door te brengen met goed te doen op aarde en rozen te laten " +
      "regenen. Elke dag bestaat uit de overweging van de dag — met haar reeks schietgebeden, die elke dag met één " +
      "groeit — gevolgd door het roosgebed met uw intentie, en het Onze Vader, Wees gegroet en Eer aan de Vader.",
    voltooid_nl:
      "De noveen is voltooid — heilige Theresia van het Kind Jezus, bid voor ons!",
    start: [2026, 8, 5],
    days: [
      {
        theme_nl: "Vertrouwen op Gods goedheid",
        text_nl:
          "Liefdevolle God, Gij hebt de heilige Theresia gezegend met een groot vermogen tot liefde. " +
          "Help mij te geloven in uw onvoorwaardelijke liefde voor ieder van uw kinderen — ook voor mij.",
      },
      {
        theme_nl: "Overgave aan Gods voorzienigheid",
        text_nl:
          "Liefdevolle God, Gij hadt vreugde in het volkomen vertrouwen waarmee de heilige Theresia zich aan uw zorg " +
          "toevertrouwde. Help mij te steunen op uw voorzienige zorg in elke omstandigheid van mijn leven, " +
          "juist in de moeilijkste en zwaarste.",
      },
      {
        theme_nl: "God zien in het gewone",
        text_nl:
          "Liefdevolle God, Gij gaf de heilige Theresia de gave U te zien in de gewone gang van elke dag. " +
          "Help mij uw aanwezigheid op te merken in de alledaagse gebeurtenissen van mijn leven.",
      },
      {
        theme_nl: "De kleine weg van nederigheid en eenvoud",
        text_nl:
          "Liefdevolle God, Gij hebt de heilige Theresia geleerd U te vinden langs de ‘kleine weg’ van nederigheid " +
          "en eenvoud. Geef dat ik nooit de genade misloop die verborgen ligt in de nederige dienst aan anderen.",
      },
      {
        theme_nl: "Vergeving en verzoening",
        text_nl:
          "Liefdevolle God, Gij gaf de heilige Theresia de gave anderen te vergeven, ook wanneer zij zich gekwetst " +
          "en verraden voelde. Help mij hen te vergeven die mij hebben gewond — ook hen die ik nu in stilte " +
          "voor U noem…",
      },
      {
        theme_nl: "Elke dag ja zeggen tegen Gods wil",
        text_nl:
          "Liefdevolle God, de heilige Theresia ervoer elke dag als een geschenk uit uw hand — als tijd om U lief " +
          "te hebben in de mensen om haar heen. Mag ook ik elke dag zien als een kans om ja te zeggen tegen U.",
      },
      {
        theme_nl: "Kracht in zwakheid",
        text_nl:
          "Liefdevolle God, de heilige Theresia bood U haar zwakheid aan. " +
          "Help mij in mijn zwakheid een kans te zien om geheel op U te steunen.",
      },
      {
        theme_nl: "Bidden voor wie niet geloven",
        text_nl:
          "Liefdevolle God, Gij hebt de heilige Theresia met een machtige liefde bemind en haar tot een bron van " +
          "kracht gemaakt voor wie het geloof in U verloren hadden. Help mij met vertrouwen te bidden voor de mensen " +
          "in mijn leven die niet geloven dat zij bemind kunnen worden.",
      },
      {
        theme_nl: "Tot zegen zijn voor allen",
        text_nl:
          "Liefdevolle God, de heilige Theresia heeft er nooit aan getwijfeld dat haar leven betekenis had. " +
          "Help mij te zien hoe ik iedereen in mijn leven tot zegen kan zijn en kan liefhebben — ook hen " +
          "die ik nu in stilte voor U noem…",
      },
    ],
  },
  ignatius: {
    key: "ignatius",
    archived: true,
    pt: true,
    label_nl: "H. Ignatius van Loyola",
    label_pt: "Santo Inácio de Loiola",
    title_nl: "Noveen tot de heilige Ignatius van Loyola",
    title_pt: "Novena a Santo Inácio de Loiola",
    subtitle_nl: "Ter voorbereiding op zijn hoogfeest, 31 juli",
    subtitle_pt: "Em preparação para a sua solenidade, 31 de julho",
    voltooid_nl: "De noveen is voltooid — zalig hoogfeest van de heilige Ignatius!",
    voltooid_pt: "A novena está concluída — feliz solenidade de Santo Inácio!",
    intro_nl:
      "Deze noveen wordt gebeden van woensdag 22 tot en met donderdag 30 juli 2026, aan de vooravond van het hoogfeest " +
      "van de heilige Ignatius van Loyola (31 juli). Elke dag bestaat uit de vaste gebeden van de heilige Ignatius — " +
      "het Suscipe, het Anima Christi en het Gebed om edelmoedigheid — gevolgd door de overweging van de dag, " +
      "het noveengebed met uw intentie, en het Onze Vader, Wees gegroet en Eer aan de Vader.",
    intro_pt:
      "Esta novena reza-se de quarta-feira, 22, a quinta-feira, 30 de julho de 2026, na véspera da solenidade de " +
      "Santo Inácio de Loiola (31 de julho). Cada dia é composto pelas orações próprias de Santo Inácio — o Suscipe, " +
      "o Anima Christi e a Oração da Generosidade — seguidas da meditação do dia, da oração da novena com a sua " +
      "intenção, e do Pai Nosso, da Avé Maria e do Glória ao Pai.",
    start: [2026, 7, 22],
    days: [
      {
        theme_nl: "De bekering van een soldaat",
        theme_pt: "A conversão de um soldado",
        text_nl:
          "O edele heilige Ignatius, van kindsbeen af had u het hart van een ridderlijke strijder voor Christus. " +
          "U werd aangetrokken door verhalen van moed en dapperheid en voelde het verlangen naar grootse daden in uw eigen ziel. " +
          "Toen u herstelde van uw verwondingen, vond u de verhalen van de vurige liefde van Christus en van de heldhaftige daden " +
          "van hen die Hem volgden — en in die verhalen herkende u de waarheid.\n\n" +
          "Moge hetzelfde vuur dat in uw hart brandde, ook in het mijne ontbranden. Help mij tot een diepere bekering te komen " +
          "en dieper verliefd te worden op Christus. Versterk mijn trouw aan de waarheid en ga met mij mee, " +
          "opdat ik heel mijn leven de hemel voor ogen mag houden.",
        text_pt:
          "Ó nobre Santo Inácio, desde a infância tivestes o coração de um valente soldado de Cristo. " +
          "Sentíeis-vos atraído por histórias de coragem e bravura e pressentíeis na vossa alma o desejo de grandes feitos. " +
          "Ao recuperardes das vossas feridas, encontrastes as histórias do ardente amor de Cristo e dos atos heroicos " +
          "daqueles que O seguiram — e nelas reconhecestes a verdade.\n\n" +
          "Que o mesmo fogo que ardia no vosso coração arda também no meu. Ajudai-me a alcançar uma conversão mais profunda " +
          "e a apaixonar-me cada vez mais por Cristo. Fortalecei a minha fidelidade à verdade e caminhai comigo, " +
          "para que em toda a minha vida tenha o céu diante dos olhos.",
      },
      {
        theme_nl: "Onderscheiding van Gods wil",
        theme_pt: "O discernimento da vontade de Deus",
        text_nl:
          "Heilige Ignatius, u leerde dat de onderscheiding van de geesten de sleutel is om Gods wil te verstaan en te volgen. " +
          "In uw eigen leven was u opmerkzaam voor de bewegingen van uw hart en ziel, en u liet u erdoor leiden " +
          "in de richting die God u wees.\n\n" +
          "Help mij Gods stem te onderscheiden te midden van het rumoer van de wereld. Geef mij de wijsheid om zijn leiding " +
          "te herkennen en de moed om haar trouw te volgen. Behoed mij voor het eindeloze wikken en wegen dat verlamt, " +
          "en help mij met vertrouwen naar God toe te gaan. Open mijn hart voor de Heilige Geest, opdat Hij mijn verstand " +
          "en mijn hart verlicht en mij de weg toont die leidt naar een grotere dienst en liefde tot God.",
        text_pt:
          "Santo Inácio, ensinastes que o discernimento é a chave para compreender e seguir a vontade de Deus. " +
          "Na vossa própria vida estáveis atento às moções do coração e da alma, e por elas vos deixastes conduzir " +
          "na direção que Deus vos indicava.\n\n" +
          "Ajudai-me a discernir a voz de Deus no meio do ruído do mundo. Concedei-me a sabedoria de reconhecer " +
          "a Sua orientação e a coragem de a seguir fielmente. Livrai-me do excesso de deliberação que paralisa " +
          "e ajudai-me a caminhar para Deus com confiança. Abri o meu coração ao Espírito Santo, para que Ele ilumine " +
          "a minha mente e o meu coração, revelando o caminho que conduz a um maior serviço e amor de Deus.",
      },
      {
        theme_nl: "IJver voor de zielen",
        theme_pt: "Zelo pelas almas",
        text_nl:
          "O heilige Ignatius, uw leven werd getekend door een buitengewone ijver voor het heil van de zielen. " +
          "U voelde Gods roeping om ‘de zielen te helpen’ en om wat u geleerd had met anderen te delen, " +
          "opdat ook hun hart veranderd zou worden. Vermeerder in mijn hart de ijver voor de zielen.\n\n" +
          "Help mij te delen in uw hartstocht voor de verkondiging van het evangelie. Leer mij ieder mens te zien " +
          "als een geliefd kind van God, dat het waard is de Blijde Boodschap te horen. Beziel mij om een baken " +
          "van Christus’ liefde en waarheid te zijn in een wereld die daar zo dringend naar verlangt. " +
          "Geef mij de moed om in al mijn woorden en daden een geloofwaardige getuige te zijn van Gods goedheid.",
        text_pt:
          "Ó Santo Inácio, a vossa vida foi marcada por um zelo extraordinário pela salvação das almas. " +
          "Sentistes o chamamento de Deus para ‘ajudar as almas’ e para partilhar com os outros o que aprendestes, " +
          "para que também os seus corações fossem transformados. Aumentai no meu coração o zelo pelas almas.\n\n" +
          "Ajudai-me a partilhar da vossa paixão pela evangelização. Ensinai-me a ver em cada pessoa um filho amado de Deus, " +
          "digno de ouvir a Boa Nova. Inspirai-me a ser um farol do amor e da verdade de Cristo num mundo que tanto " +
          "deles necessita. Dai-me a coragem de ser uma testemunha eficaz da bondade de Deus em tudo o que digo e faço.",
      },
      {
        theme_nl: "De Geestelijke Oefeningen",
        theme_pt: "Os Exercícios Espirituais",
        text_nl:
          "O heilige Ignatius, in uw pelgrimsjaren schreef u de Geestelijke Oefeningen — een kostbaar geschenk " +
          "aan de geestelijke schat van de Kerk en een krachtig middel om dichter bij God te komen.\n\n" +
          "Help mij deze school van gebed in mijn eigen leven te omarmen en mijn band met de Heer te verdiepen " +
          "door gebed, overweging en beschouwing. Vorm in mij de volharding om trouw te blijven aan het gebed, " +
          "opdat ik met groter overtuiging mijn geloof beleef. Moge ik mij openstellen voor de vernieuwende kracht " +
          "van Gods liefde en genade.",
        text_pt:
          "Ó Santo Inácio, nos vossos anos de peregrino escrevestes os Exercícios Espirituais — um dom precioso " +
          "para o tesouro espiritual da Igreja e um meio poderoso de nos aproximarmos de Deus.\n\n" +
          "Ajudai-me a acolher esta escola de oração na minha própria vida, procurando aprofundar a minha relação " +
          "com o Senhor pela oração, pela reflexão e pela contemplação. Cultivai em mim a disciplina de perseverar " +
          "na oração, para que viva a minha fé com maior convicção. Que eu me abra ao poder transformador " +
          "do amor e da graça de Deus.",
      },
      {
        theme_nl: "Liefde voor de studie",
        theme_pt: "O amor ao estudo",
        text_nl:
          "Heilige Ignatius van Loyola, uw leven getuigde van een diepe liefde voor de studie en van een inzet " +
          "voor geestelijke groei tot eer van God. U begreep dat een goed gevormde geest de waarheden van het geloof " +
          "beter kan verstaan en doorgeven. Uw studie bracht u dichter bij de ware kennis van God.\n\n" +
          "Wek in mij de liefde voor het leren, opdat ik God beter mag kennen en beminnen. Leer mij in alles " +
          "wijsheid te zoeken en mijn kennis in dienst te stellen van anderen. Geef mij de nederigheid " +
          "en de volharding om steeds dieper door te dringen in de waarheden van ons geloof.",
        text_pt:
          "Santo Inácio de Loiola, a vossa vida deu testemunho de um profundo amor ao estudo e de um empenho " +
          "no crescimento intelectual para glória de Deus. Compreendestes que uma mente bem formada pode melhor " +
          "entender e comunicar as verdades da fé. Os vossos estudos aproximaram-vos do verdadeiro conhecimento de Deus.\n\n" +
          "Cultivai em mim o amor de aprender, para que conheça e ame melhor a Deus. Ensinai-me a procurar a sabedoria " +
          "em tudo o que empreendo e a pôr o meu conhecimento ao serviço dos outros. Concedei-me a humildade " +
          "e a perseverança para aprofundar cada vez mais as verdades da nossa fé.",
      },
      {
        theme_nl: "Nederigheid en gehoorzaamheid",
        theme_pt: "Humildade e obediência",
        text_nl:
          "Heilige Ignatius van Loyola, heel uw leven blonk uit in nederigheid en gehoorzaamheid aan God. " +
          "U wist dat ware vrijheid voortkomt uit het overgeven van de eigen wil aan God en uit een leven " +
          "van nederige dienstbaarheid aan de naaste. Deze deugden tekenden uw leiderschap, naar het voorbeeld van Christus, " +
          "de dienende Heer — die niet gekomen is om gediend te worden, maar om te dienen.\n\n" +
          "Leer mij mijn wil aan God over te geven en de vrijheid te omarmen die gelegen is in het leven naar zijn wil. " +
          "Plant deze deugden in mijn hart, opdat ik leef als een gehoorzame en nederige leerling. " +
          "Help mij God te verheerlijken in alles.",
        text_pt:
          "Santo Inácio de Loiola, toda a vossa vida resplandeceu de humildade e de obediência a Deus. " +
          "Sabíeis que a verdadeira liberdade nasce da entrega da própria vontade a Deus e de uma vida " +
          "de humilde serviço aos outros. Estas virtudes marcaram a vossa liderança, a exemplo de Cristo, " +
          "o Senhor que serve — que não veio para ser servido, mas para servir.\n\n" +
          "Ensinai-me a entregar a minha vontade a Deus e a abraçar a liberdade que nasce de viver segundo a Sua vontade. " +
          "Cultivai estas virtudes no meu coração, para que viva como discípulo obediente e humilde. " +
          "Ajudai-me a glorificar a Deus em todas as coisas.",
      },
      {
        theme_nl: "Vertrouwen op Gods voorzienigheid",
        theme_pt: "Confiança na divina Providência",
        text_nl:
          "Heilige Ignatius, uw leven getuigde van een diep vertrouwen op de goddelijke Voorzienigheid. " +
          "Ondanks de vele beproevingen en hindernissen die u ontmoette, bleef u vertrouwen op Gods plan en zijn zorg. " +
          "Dat standvastige geloof stelde u in staat grote werken te verrichten tot eer van God.\n\n" +
          "Help mij uw voorbeeld te volgen en mij toe te vertrouwen aan Gods liefdevolle zorg. Leer mij mijn angsten " +
          "en onzekerheden aan Hem over te geven en te geloven dat Hij een plan heeft met mijn leven. " +
          "Moge ik eerst het Rijk van God zoeken, in het vertrouwen dat al het overige mij erbij gegeven wordt.",
        text_pt:
          "Santo Inácio, a vossa vida deu testemunho de uma profunda confiança na divina Providência. " +
          "Apesar das muitas provações e obstáculos que enfrentastes, permanecestes confiante no plano " +
          "e no cuidado de Deus. Essa fé inabalável permitiu-vos realizar grandes obras para a glória de Deus.\n\n" +
          "Ajudai-me a seguir o vosso exemplo e a confiar no amoroso cuidado de Deus. Ensinai-me a entregar-Lhe " +
          "os meus medos e incertezas e a acreditar que Ele tem um plano para a minha vida. Que eu procure primeiro " +
          "o Reino de Deus, confiando que tudo o mais me será dado por acréscimo.",
      },
      {
        theme_nl: "Neem, Heer, en aanvaard",
        theme_pt: "Tomai, Senhor, e recebei",
        text_nl:
          "O heilige Ignatius, dikwijls bad u de woorden ‘Neem, Heer, en aanvaard’. Radicaal gaf u alles wat u had " +
          "en alles wat u was terug aan Hem van wie u het ontvangen had. Met vreugde legde u alles in de handen " +
          "van de Heer, opdat Hij ermee zou doen wat Hij wil.\n\n" +
          "Help mij deze woorden met een oprecht hart te bidden. Maak mijn greep los van wat niet van mij is " +
          "om vast te houden, en leer mij het met nederigheid en vertrouwen aan de Heer terug te geven. " +
          "Laat mij de liefde die God mij toedraagt werkelijk kennen, opdat ik zijn wil voor mij niet vrees.",
        text_pt:
          "Ó Santo Inácio, muitas vezes rezastes as palavras ‘Tomai, Senhor, e recebei’. De forma radical, " +
          "oferecestes tudo o que tínheis e tudo o que éreis Àquele de quem o tínheis recebido. De bom grado " +
          "entregastes tudo ao Senhor, deixando que Ele dispusesse de tudo segundo a Sua vontade.\n\n" +
          "Ajudai-me a rezar estas palavras com sinceridade de coração. Soltai as minhas mãos do que não me pertence " +
          "e ensinai-me a devolvê-lo ao Senhor com humildade e confiança. Fazei-me conhecer verdadeiramente " +
          "o amor que Deus me tem, para que não tema a Sua vontade para mim.",
      },
      {
        theme_nl: "Tot meerdere eer van God",
        theme_pt: "Para maior glória de Deus",
        text_nl:
          "Heilige Ignatius, u leefde naar uw wapenspreuk ‘Ad Maiorem Dei Gloriam’ — alles doen ‘tot meerdere eer van God’. " +
          "Al uw werken verwezen naar God.\n\n" +
          "Help mij ditzelfde beginsel tot het mijne te maken. Leer mij God te verheerlijken in alles wat ik doe. " +
          "Toon mij hoe ik anderen onbaatzuchtig kan dienen en de kansen kan benutten om mijn talenten en middelen " +
          "in te zetten voor de opbouw van Gods Rijk. Help mij mijn leven toe te wijden aan de dienst van Christus " +
          "en zijn Naam bekend en bemind te maken, zoals u dat deed.",
        text_pt:
          "Santo Inácio, vivestes segundo o vosso lema ‘Ad Maiorem Dei Gloriam’ — fazer tudo ‘para maior glória de Deus’. " +
          "Todas as vossas obras apontavam para Deus.\n\n" +
          "Ajudai-me a adotar este mesmo princípio na minha vida. Ensinai-me a glorificar a Deus em tudo o que faço. " +
          "Mostrai-me como servir os outros com desprendimento e como aproveitar as oportunidades de empregar " +
          "os meus talentos e recursos na edificação do Reino de Deus. Ajudai-me a dedicar a minha vida " +
          "ao serviço de Cristo e a tornar o Seu nome conhecido e amado, como vós o fizestes.",
      },
    ],
  },
};

export const NOVENA_ORDER = ["theresia", "ignatius"];

export function getNovena(key) {
  return NOVENAS[key] || NOVENAS.ignatius;
}

export function novenaStartDate(novena) {
  const [y, m, d] = novena.start;
  return new Date(y, m - 1, d);
}

export function novenaDayDate(novena, day) {
  const start = novenaStartDate(novena);
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + (day - 1));
}

/*
 * Waar staan we vandaag in de noveen?
 *   raw       — dagnummer zonder begrenzing (0 of lager: nog niet begonnen)
 *   dayNumber — dagnummer begrensd tot 1..9 (handig als beginselectie)
 *   status    — "voor" | "tijdens" | "na"
 */
export function novenaDayInfo(novena, now = new Date()) {
  const start = novenaStartDate(novena);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const raw = Math.round((today - start) / 86400000) + 1;
  return {
    raw,
    dayNumber: Math.min(novena.days.length, Math.max(1, raw)),
    status: raw < 1 ? "voor" : raw > novena.days.length ? "na" : "tijdens",
  };
}

/* ---------- Vaste gebeden (elke dag) ---------- */

const KRUISTEKEN_PT = "Em nome do Pai e do Filho\ne do Espírito Santo.\nÁmen.";

const PAI_NOSSO_PT =
  "Pai nosso, que estais nos céus,\nsantificado seja o Vosso nome;\nvenha a nós o Vosso reino;\n" +
  "seja feita a Vossa vontade,\nassim na terra como no céu.\nO pão nosso de cada dia nos dai hoje;\n" +
  "perdoai-nos as nossas ofensas,\nassim como nós perdoamos\na quem nos tem ofendido;\n" +
  "e não nos deixeis cair em tentação;\nmas livrai-nos do mal.\nÁmen.";

const AVE_MARIA_PT =
  "Avé Maria, cheia de graça,\no Senhor é convosco;\nbendita sois Vós entre as mulheres\n" +
  "e bendito é o fruto do Vosso ventre, Jesus.\nSanta Maria, Mãe de Deus,\nrogai por nós, pecadores,\n" +
  "agora e na hora da nossa morte.\nÁmen.";

const GLORIA_PT =
  "Glória ao Pai e ao Filho\ne ao Espírito Santo.\nComo era no princípio,\nagora e sempre. Ámen.";

const SUSCIPE_NL =
  "V. Neem, Heer, en aanvaard heel mijn vrijheid,\n" +
  "A. mijn geheugen, mijn verstand\nen heel mijn wil,\nalles wat ik heb en bezit.\n" +
  "Gij hebt het mij gegeven;\naan U, Heer, geef ik het terug.\nAlles is van U:\n" +
  "beschik erover geheel naar uw wil.\nGeef mij slechts uw liefde en uw genade;\ndie zijn mij genoeg.\nAmen.";

const SUSCIPE_PT =
  "V. Tomai, Senhor, e recebei toda a minha liberdade,\n" +
  "R. a minha memória, o meu entendimento\ne toda a minha vontade,\ntudo o que tenho e possuo.\n" +
  "Vós mo destes;\na Vós, Senhor, o restituo.\nTudo é Vosso:\n" +
  "disponde de tudo segundo a Vossa vontade.\nDai-me somente o Vosso amor e a Vossa graça,\nque estes me bastam.\nÁmen.";

const ANIMA_CHRISTI_PT =
  "Alma de Cristo, santificai-me.\nCorpo de Cristo, salvai-me.\nSangue de Cristo, inebriai-me.\n" +
  "Água do lado de Cristo, lavai-me.\nPaixão de Cristo, confortai-me.\nÓ bom Jesus, ouvi-me.\n" +
  "Dentro das Vossas chagas, escondei-me.\nNão permitais que me separe de Vós.\nDo espírito maligno, defendei-me.\n" +
  "Na hora da minha morte, chamai-me.\nE mandai-me ir para Vós,\npara que Vos louve com os Vossos santos\n" +
  "pelos séculos dos séculos.\nÁmen.";

const EDELMOEDIGHEID_NL =
  "V. Heer, leer mij edelmoedig te zijn.\n" +
  "A. Leer mij U te dienen zoals Gij het verdient:\nte geven zonder te tellen,\n" +
  "te strijden zonder acht te slaan op de wonden,\nte zwoegen zonder rust te zoeken,\n" +
  "mij weg te schenken zonder ander loon te verwachten\ndan het besef dat ik uw goddelijke\nen heilige wil volbreng.\nAmen.";

const EDELMOEDIGHEID_PT =
  "V. Senhor, ensinai-me a ser generoso.\n" +
  "R. Ensinai-me a servir-Vos como mereceis:\na dar sem contar o custo,\n" +
  "a combater sem atender às feridas,\na trabalhar sem procurar descanso,\n" +
  "a gastar-me sem esperar outra recompensa\nsenão a de saber que cumpro\na Vossa divina e santa vontade.\nÁmen.";

const NOVEENGEBED_NL =
  "O roemrijke patriarch, heilige Ignatius van Loyola,\n" +
  "wij smeken u nederig ons van de almachtige God te verkrijgen:\n" +
  "bovenal de bevrijding van de zonde, het grootste van alle kwaad,\n" +
  "en vervolgens van de gesels waarmee de Heer\nde zonden van zijn volk kastijdt.\n\n" +
  "Op uw roemrijke verdiensten vragen wij\nuw goedertieren voorspraak bij de troon van de almachtige God,\n" +
  "opdat Hij ons moge verlenen:\n[noem hier in stilte uw intentie]\n\n" +
  "Moge uw voorbeeld, o trouwe ridder van Onze-Lieve-Vrouw,\nin onze harten een werkzaam verlangen ontsteken\n" +
  "om ons zonder ophouden in te zetten\nvoor de grotere eer van God en het welzijn van onze naasten.\n" +
  "Verkrijg voor ons eveneens van het liefdevolle Hart van Jezus, onze Heer,\n" +
  "de genade die de kroon is van alle genaden:\nde genade van de volharding ten einde toe\nen van het eeuwig geluk.\nAmen.";

const NOVEENGEBED_PT =
  "Ó glorioso patriarca, Santo Inácio de Loiola,\n" +
  "humildemente vos suplicamos que nos alcanceis de Deus Todo-Poderoso:\n" +
  "acima de tudo, a libertação do pecado, o maior de todos os males,\n" +
  "e, depois, dos flagelos com que o Senhor\ncastiga os pecados do Seu povo.\n\n" +
  "Pelos vossos gloriosos méritos imploramos\na vossa benévola intercessão junto do trono de Deus Todo-Poderoso,\n" +
  "para que Ele nos conceda:\n[mencione aqui, em silêncio, a sua intenção]\n\n" +
  "Que o vosso exemplo, ó leal cavaleiro de Nossa Senhora,\nacenda nos nossos corações um desejo eficaz\n" +
  "de nos empregarmos continuamente\nem trabalhar para a maior glória de Deus e o bem do nosso próximo.\n" +
  "Alcançai-nos igualmente do amoroso Coração de Jesus, Nosso Senhor,\n" +
  "a graça que é a coroa de todas as graças:\na graça da perseverança final\ne da felicidade eterna.\nÁmen.";

const BESLUIT_NL =
  "V. Geloofd zij Jezus Christus!\nA. Nu en in eeuwigheid. Amen.\n\n" +
  "In de naam van de Vader en de Zoon\nen de Heilige Geest.\nAmen.";

const BESLUIT_PT =
  "V. Louvado seja Nosso Senhor Jesus Cristo!\nR. Para sempre seja louvado! Ámen.\n\n" +
  "Em nome do Pai e do Filho\ne do Espírito Santo.\nÁmen.";

const BESLUIT_LA =
  "V. Laudétur Iesus Christus!\nR. Nunc et in aetérnum. Amen.\n\n" +
  "In nómine Patris et Fílii\net Spíritus Sancti.\nAmen.";

/* ---------- Vaste teksten van de Theresianoveen ---------- */

/* Vaste aanhef van de overweging (naar praymorenovenas.com). */
const THERESIA_AANHEF_NL =
  "Liefste heilige Theresia van Lisieux, u hebt gezegd dat u uw hemel zou doorbrengen met goed te doen op aarde. " +
  "Uw vertrouwen op God was volkomen. Bid dat Hij ook mijn vertrouwen op zijn goedheid en barmhartigheid doet groeien.\n\n" +
  "Bid voor mij, dat ik, zoals u, een groot en argeloos vertrouwen mag hebben in de liefdevolle beloften van onze God. " +
  "Bid dat ik mijn leven mag leven in eenheid met Gods plan voor mij, en eens het gelaat mag aanschouwen van God, " +
  "die u zo innig hebt liefgehad.\n\n" +
  "Heilige Theresia, u bleef God trouw tot in het uur van uw dood. Bid voor mij, dat ik trouw mag zijn aan onze " +
  "liefdevolle God, en dat mijn leven vrede en liefde in de wereld mag brengen door standvastig te volharden " +
  "in de liefde voor God, onze Verlosser.";

/*
 * Schietgebeden: dag 1 kent er één, en er komt er elke dag één bij,
 * tot alle negen op dag 9 (nieuwste eerst, zoals in de bron).
 */
const THERESIA_SCHIETGEBEDEN_NL = [
  "Ik heb U lief, Heer. Help mij U meer lief te hebben!",
  "Ik vertrouw op U, Heer. Help mij meer op U te vertrouwen!",
  "Ik zie U, Heer. Help mij U meer te zien!",
  "Ik ben nederig, Heer. Geef mij meer nederigheid!",
  "Ik probeer te vergeven, Heer. Help mij zeventig maal zevenmaal te vergeven!",
  "Ik aanvaard uw wil, Heer. Help mij uw wil elke dag te aanvaarden!",
  "Ik steun op U, Heer. Help mij meer op U te steunen!",
  "Ik weerspiegel U voor de wereld, Heer. Help mij U helderder te weerspiegelen!",
  "Ik heb uw mensen lief, Heer. Help mij hen meer lief te hebben!",
];

/* Het klassieke roosgebed, met het intentiemoment van de noveen. */
const ROOSGEBED_NL =
  "O kleine Theresia van het Kind Jezus,\npluk voor mij een roos uit de hemelse tuin\n" +
  "en zend haar mij als een boodschap van liefde.\n\n" +
  "O Kleine Bloem van Jezus,\nvraag God vandaag de gunsten te verlenen\n" +
  "die ik nu vol vertrouwen in uw handen leg…\n[noem hier in stilte uw intentie]\n\n" +
  "Heilige Theresia, help mij altijd te geloven, zoals u,\nin Gods grote liefde voor mij,\n" +
  "opdat ik dag aan dag uw ‘kleine weg’ mag navolgen.\nAmen.";

/*
 * Bouwt de reeks stappen voor één noveendag, in de klassieke noveenvolgorde:
 * opening — (vaste gebeden) — overweging van de dag — noveengebed met
 * intentie — Onze Vader, Wees gegroet, Eer aan de Vader — besluit.
 * text_la is alleen aanwezig waar een authentieke Latijnse tekst bestaat.
 */
export function buildNovenaSteps(novenaKey, day) {
  const novena = getNovena(novenaKey);
  return novena.key === "theresia"
    ? buildTheresiaSteps(novena, day)
    : buildIgnatiusSteps(novena, day);
}

function buildTheresiaSteps(novena, day) {
  const d = novena.days[day - 1];
  const schietgebeden = THERESIA_SCHIETGEBEDEN_NL.slice(0, day)
    .reverse()
    .join("\n");

  return [
    {
      kicker_nl: "Begin",
      title_nl: "Kruisteken",
      title_la: "Signum crucis",
      text_nl: byKey.signum_crucis.text_nl,
      text_la: byKey.signum_crucis.text_la,
    },
    {
      kicker_nl: `Overweging van dag ${day}`,
      title_nl: d.theme_nl,
      text_nl: THERESIA_AANHEF_NL + "\n\n" + d.text_nl + "\n\n" + schietgebeden,
    },
    {
      kicker_nl: "Noveengebed · met uw intentie",
      title_nl: "Roosgebed",
      text_nl: ROOSGEBED_NL,
    },
    {
      kicker_nl: "Na de intentie",
      title_nl: "Onze Vader",
      title_la: "Pater noster",
      text_nl: byKey.our_father.text_nl,
      text_la: byKey.our_father.text_la,
    },
    {
      kicker_nl: "Na de intentie",
      title_nl: "Wees gegroet",
      title_la: "Ave Maria",
      text_nl: byKey.hail_mary.text_nl,
      text_la: byKey.hail_mary.text_la,
    },
    {
      kicker_nl: "Na de intentie",
      title_nl: "Eer aan de Vader",
      title_la: "Gloria Patri",
      text_nl: byKey.gloria_patri.text_nl,
      text_la: byKey.gloria_patri.text_la,
    },
    {
      kicker_nl: "Besluit",
      title_nl: "Geloofd zij Jezus Christus",
      title_la: "Laudetur Iesus Christus",
      text_nl: BESLUIT_NL,
      text_la: BESLUIT_LA,
    },
  ];
}

function buildIgnatiusSteps(novena, day) {
  const d = novena.days[day - 1];

  return [
    {
      kicker_nl: "Begin",
      kicker_pt: "Início",
      title_nl: "Kruisteken",
      title_pt: "Sinal da Cruz",
      title_la: "Signum crucis",
      text_nl: byKey.signum_crucis.text_nl,
      text_pt: KRUISTEKEN_PT,
      text_la: byKey.signum_crucis.text_la,
    },
    {
      kicker_nl: "Vaste gebeden van de H. Ignatius",
      kicker_pt: "Orações de Santo Inácio",
      title_nl: "Neem, Heer, en aanvaard",
      title_pt: "Tomai, Senhor, e recebei",
      title_la: "Suscipe",
      text_nl: SUSCIPE_NL,
      text_pt: SUSCIPE_PT,
      text_la: byKey.suscipe.text_la,
    },
    {
      kicker_nl: "Vaste gebeden van de H. Ignatius",
      kicker_pt: "Orações de Santo Inácio",
      title_nl: "Ziel van Christus",
      title_pt: "Alma de Cristo",
      title_la: "Anima Christi",
      text_nl: byKey.anima_christi.text_nl,
      text_pt: ANIMA_CHRISTI_PT,
      text_la: byKey.anima_christi.text_la,
    },
    {
      kicker_nl: "Vaste gebeden van de H. Ignatius",
      kicker_pt: "Orações de Santo Inácio",
      title_nl: "Gebed om edelmoedigheid",
      title_pt: "Oração da Generosidade",
      text_nl: EDELMOEDIGHEID_NL,
      text_pt: EDELMOEDIGHEID_PT,
    },
    {
      kicker_nl: `Overweging van dag ${day}`,
      kicker_pt: `Meditação do dia ${day}`,
      title_nl: d.theme_nl,
      title_pt: d.theme_pt,
      text_nl: d.text_nl + "\n\n" + DAG_SLOT_NL,
      text_pt: d.text_pt + "\n\n" + DAG_SLOT_PT,
    },
    {
      kicker_nl: "Noveengebed · met uw intentie",
      kicker_pt: "Oração da novena · com a sua intenção",
      title_nl: "Tot de heilige Ignatius van Loyola",
      title_pt: "A Santo Inácio de Loiola",
      text_nl: NOVEENGEBED_NL,
      text_pt: NOVEENGEBED_PT,
    },
    {
      kicker_nl: "Na de intentie",
      kicker_pt: "Depois da intenção",
      title_nl: "Onze Vader",
      title_pt: "Pai Nosso",
      title_la: "Pater noster",
      text_nl: byKey.our_father.text_nl,
      text_pt: PAI_NOSSO_PT,
      text_la: byKey.our_father.text_la,
    },
    {
      kicker_nl: "Na de intentie",
      kicker_pt: "Depois da intenção",
      title_nl: "Wees gegroet",
      title_pt: "Avé Maria",
      title_la: "Ave Maria",
      text_nl: byKey.hail_mary.text_nl,
      text_pt: AVE_MARIA_PT,
      text_la: byKey.hail_mary.text_la,
    },
    {
      kicker_nl: "Na de intentie",
      kicker_pt: "Depois da intenção",
      title_nl: "Eer aan de Vader",
      title_pt: "Glória ao Pai",
      title_la: "Gloria Patri",
      text_nl: byKey.gloria_patri.text_nl,
      text_pt: GLORIA_PT,
      text_la: byKey.gloria_patri.text_la,
    },
    {
      kicker_nl: "Besluit",
      kicker_pt: "Conclusão",
      title_nl: "Geloofd zij Jezus Christus",
      title_pt: "Louvado seja Jesus Cristo",
      title_la: "Laudetur Iesus Christus",
      text_nl: BESLUIT_NL,
      text_pt: BESLUIT_PT,
      text_la: BESLUIT_LA,
    },
  ];
}
