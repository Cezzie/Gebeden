import { SEED } from "./seed.js";

/* Vaste gebeden uit de bestaande verzameling hergebruiken, op sleutel. */
const byKey = Object.fromEntries(SEED.prayers.map((p) => [p.key, p]));

/*
 * Novenen. Elke noveen heeft een vaste startdatum (jaar, maand 1-12, dag),
 * negen daggebeden en een reeks vaste gebeden die elke dag terugkeren.
 * `langs` noemt de talen waarin de noveen beschikbaar is.
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

const DAG_SLOT_EN =
  "Pray for me.\n\nHeavenly Father, hear my request brought to You by Your servant Ignatius if it be for Your glory. Grant me the same grace that You gave to St. Ignatius so that I may share his zeal for Christ and for building up Your kingdom.\n\nSt. Ignatius of Loyola, pray for us!";

const DAG_SLOT = { nl: DAG_SLOT_NL, en: DAG_SLOT_EN, pt: DAG_SLOT_PT };

export const NOVENAS = {
  theresia: {
    key: "theresia",
    archived: false,
    langs: ["nl", "en", "pt"],
    label_nl: "H. Theresia van Lisieux",
    label_en: "St Thérèse of Lisieux",
    label_pt: "Santa Teresinha",
    title_nl: "Noveen tot de heilige Theresia van Lisieux",
    title_en: "Novena to St Thérèse of Lisieux",
    title_pt: "Novena a Santa Teresinha de Lisieux",
    subtitle_nl: "Tot de Kleine Bloem, 5 t/m 13 augustus 2026",
    subtitle_en: "To the Little Flower, 5–13 August 2026",
    subtitle_pt: "À Florzinha de Jesus, de 5 a 13 de agosto de 2026",
    intro_nl:
      "Deze noveen wordt gebeden van woensdag 5 tot en met donderdag 13 augustus 2026. De heilige Theresia van Lisieux " +
      "(1873–1897), de Kleine Bloem, beloofde haar hemel door te brengen met goed te doen op aarde en rozen te laten " +
      "regenen. Elke dag bestaat uit de overweging van de dag — met haar reeks schietgebeden, die elke dag met één " +
      "groeit — gevolgd door het roosgebed met uw intentie, en het Onze Vader, Wees gegroet en Eer aan de Vader.",
    voltooid_nl:
      "De noveen is voltooid — heilige Theresia van het Kind Jezus, bid voor ons!",
    voltooid_en: "The novena is complete — St Thérèse of the Child Jesus, pray for us!",
    voltooid_pt: "A novena está concluída — Santa Teresinha do Menino Jesus, rogai por nós!",
    intro_en:
      "This novena is prayed from Wednesday 5 to Thursday 13 August 2026. St Thérèse of Lisieux " +
      "(1873–1897), the Little Flower, promised to spend her heaven doing good on earth and to let fall a shower " +
      "of roses. Each day consists of the meditation of the day — with its series of aspirations, which grows " +
      "by one each day — followed by the rose prayer with your intention, and the Our Father, Hail Mary and Glory Be.",
    intro_pt:
      "Esta novena reza-se de quarta-feira, 5, a quinta-feira, 13 de agosto de 2026. Santa Teresinha de Lisieux " +
      "(1873–1897), a Florzinha de Jesus, prometeu passar o seu Céu a fazer o bem na terra e fazer cair uma chuva " +
      "de rosas. Cada dia é composto pela meditação do dia — com a sua série de jaculatórias, que aumenta uma por dia — " +
      "seguida da oração da rosa com a sua intenção, e do Pai Nosso, da Avé Maria e do Glória ao Pai.",
    start: [2026, 8, 5],
    days: [
      {
        theme_nl: "Vertrouwen op Gods goedheid",
        theme_en: "Trust in God’s goodness",
        theme_pt: "Confiança na bondade de Deus",
        text_nl:
          "Liefdevolle God, Gij hebt de heilige Theresia gezegend met een groot vermogen tot liefde. " +
          "Help mij te geloven in uw onvoorwaardelijke liefde voor ieder van uw kinderen — ook voor mij.",
        text_en:
          "Loving God, you blessed St. Therese with a capacity for a great love. Help me to believe in your unconditional love for each of your children, especially for me.",
        text_pt:
          "Deus de amor, Vós abençoastes Santa Teresinha com a capacidade de um grande amor. Ajudai-me a acreditar no Vosso amor incondicional por cada um dos Vossos filhos, especialmente por mim.",
      },
      {
        theme_nl: "Overgave aan Gods voorzienigheid",
        theme_en: "Surrender to God’s providence",
        theme_pt: "Abandono à Providência de Deus",
        text_nl:
          "Liefdevolle God, Gij hadt vreugde in het volkomen vertrouwen waarmee de heilige Theresia zich aan uw zorg " +
          "toevertrouwde. Help mij te steunen op uw voorzienige zorg in elke omstandigheid van mijn leven, " +
          "juist in de moeilijkste en zwaarste.",
        text_en:
          "Loving God, you loved St. Therese’s complete trust in your care. Help me to rely on your providential care in each circumstance of my life, especially the most difficult and stressful.",
        text_pt:
          "Deus de amor, Vós amastes a confiança total de Santa Teresinha nos Vossos cuidados. Ajudai-me a apoiar-me nos Vossos cuidados providentes em cada circunstância da minha vida, especialmente nas mais difíceis e penosas.",
      },
      {
        theme_nl: "God zien in het gewone",
        theme_en: "Seeing God in the ordinary",
        theme_pt: "Ver Deus no quotidiano",
        text_nl:
          "Liefdevolle God, Gij gaf de heilige Theresia de gave U te zien in de gewone gang van elke dag. " +
          "Help mij uw aanwezigheid op te merken in de alledaagse gebeurtenissen van mijn leven.",
        text_en:
          "Loving God, you gave St. Therese the ability to see You in the ordinary routine of each day. Help me to be aware of your presence in the everyday events of my life.",
        text_pt:
          "Deus de amor, Vós destes a Santa Teresinha a capacidade de Vos ver na rotina comum de cada dia. Ajudai-me a tomar consciência da Vossa presença nos acontecimentos quotidianos da minha vida.",
      },
      {
        theme_nl: "De kleine weg van nederigheid en eenvoud",
        theme_en: "The little way of humility and simplicity",
        theme_pt: "A pequena via da humildade e da simplicidade",
        text_nl:
          "Liefdevolle God, Gij hebt de heilige Theresia geleerd U te vinden langs de ‘kleine weg’ van nederigheid " +
          "en eenvoud. Geef dat ik nooit de genade misloop die verborgen ligt in de nederige dienst aan anderen.",
        text_en:
          "Loving God, You taught St. Therese how to find You through the “little way” of humility and simplicity. Grant that I may never miss the grace hidden in humble service to others.",
        text_pt:
          "Deus de amor, Vós ensinastes Santa Teresinha a encontrar-Vos pela ‘pequena via’ da humildade e da simplicidade. Concedei-me que nunca perca a graça escondida no serviço humilde aos outros.",
      },
      {
        theme_nl: "Vergeving en verzoening",
        theme_en: "Forgiveness and reconciliation",
        theme_pt: "Perdão e reconciliação",
        text_nl:
          "Liefdevolle God, Gij gaf de heilige Theresia de gave anderen te vergeven, ook wanneer zij zich gekwetst " +
          "en verraden voelde. Help mij hen te vergeven die mij hebben gewond — ook hen die ik nu in stilte " +
          "voor U noem…",
        text_en:
          "Loving God, You gave St. Therese the gift of forgiving others even when she felt hurt and betrayed. Help me to be able to forgive others who have wounded me, especially…",
        text_pt:
          "Deus de amor, Vós destes a Santa Teresinha o dom de perdoar aos outros, mesmo quando se sentia magoada e traída. Ajudai-me a ser capaz de perdoar a quem me feriu, especialmente…",
      },
      {
        theme_nl: "Elke dag ja zeggen tegen Gods wil",
        theme_en: "Saying yes to God’s will every day",
        theme_pt: "Dizer sim à vontade de Deus em cada dia",
        text_nl:
          "Liefdevolle God, de heilige Theresia ervoer elke dag als een geschenk uit uw hand — als tijd om U lief " +
          "te hebben in de mensen om haar heen. Mag ook ik elke dag zien als een kans om ja te zeggen tegen U.",
        text_en:
          "Loving God, St. Therese experienced every day as a gift from You. She saw it as a time to love You through other people. May I, too, see every day as an opportunity to say yes to You.",
        text_pt:
          "Deus de amor, Santa Teresinha viveu cada dia como um dom vindo de Vós. Via-o como um tempo para Vos amar através dos outros. Que também eu veja cada dia como uma oportunidade para Vos dizer sim.",
      },
      {
        theme_nl: "Kracht in zwakheid",
        theme_en: "Strength in weakness",
        theme_pt: "Força na fraqueza",
        text_nl:
          "Liefdevolle God, de heilige Theresia bood U haar zwakheid aan. " +
          "Help mij in mijn zwakheid een kans te zien om geheel op U te steunen.",
        text_en:
          "Loving God, St. Therese offered to You her weakness. Help me to see in my weakness an opportunity to rely completely on you.",
        text_pt:
          "Deus de amor, Santa Teresinha ofereceu-Vos a sua fraqueza. Ajudai-me a ver na minha fraqueza uma oportunidade para me apoiar inteiramente em Vós.",
      },
      {
        theme_nl: "Bidden voor wie niet geloven",
        theme_en: "Praying for those who do not believe",
        theme_pt: "Rezar pelos que não creem",
        text_nl:
          "Liefdevolle God, Gij hebt de heilige Theresia met een machtige liefde bemind en haar tot een bron van " +
          "kracht gemaakt voor wie het geloof in U verloren hadden. Help mij met vertrouwen te bidden voor de mensen " +
          "in mijn leven die niet geloven dat zij bemind kunnen worden.",
        text_en:
          "Loving God, You loved St. Therese with a powerful love and made her a source of strength to those who had lost faith in You. Help me to pray with confidence for those in my life who do not believe they can be loved.",
        text_pt:
          "Deus de amor, Vós amastes Santa Teresinha com um amor poderoso e fizestes dela uma fonte de força para aqueles que tinham perdido a fé em Vós. Ajudai-me a rezar com confiança pelas pessoas da minha vida que não acreditam que podem ser amadas.",
      },
      {
        theme_nl: "Tot zegen zijn voor allen",
        theme_en: "Being a blessing to all",
        theme_pt: "Ser uma bênção para todos",
        text_nl:
          "Liefdevolle God, de heilige Theresia heeft er nooit aan getwijfeld dat haar leven betekenis had. " +
          "Help mij te zien hoe ik iedereen in mijn leven tot zegen kan zijn en kan liefhebben — ook hen " +
          "die ik nu in stilte voor U noem…",
        text_en:
          "Loving God, St. Therese never doubted that her life had meaning. Help me to see how I can bless and love everyone in my life. Especially…",
        text_pt:
          "Deus de amor, Santa Teresinha nunca duvidou de que a sua vida tinha sentido. Ajudai-me a ver como posso abençoar e amar todas as pessoas da minha vida. Especialmente…",
      },
    ],
  },
  ignatius: {
    key: "ignatius",
    archived: true,
    langs: ["nl", "en", "pt"],
    label_nl: "H. Ignatius van Loyola",
    label_pt: "Santo Inácio de Loiola",
    label_en: "St Ignatius of Loyola",
    title_nl: "Noveen tot de heilige Ignatius van Loyola",
    title_pt: "Novena a Santo Inácio de Loiola",
    title_en: "Novena to St Ignatius of Loyola",
    subtitle_nl: "Ter voorbereiding op zijn hoogfeest, 31 juli",
    subtitle_pt: "Em preparação para a sua solenidade, 31 de julho",
    subtitle_en: "In preparation for his solemnity, 31 July",
    voltooid_nl: "De noveen is voltooid — zalig hoogfeest van de heilige Ignatius!",
    voltooid_pt: "A novena está concluída — feliz solenidade de Santo Inácio!",
    voltooid_en: "The novena is complete — a blessed solemnity of St Ignatius!",
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
    intro_en:
      "This novena is prayed from Wednesday 22 to Thursday 30 July 2026, on the eve of the solemnity " +
      "of St Ignatius of Loyola (31 July). Each day consists of the prayers of St Ignatius — the Suscipe, " +
      "the Anima Christi and the Prayer for Generosity — followed by the meditation of the day, " +
      "the novena prayer with your intention, and the Our Father, Hail Mary and Glory Be.",
    start: [2026, 7, 22],
    days: [
      {
        theme_nl: "De bekering van een soldaat",
        theme_pt: "A conversão de um soldado",
        theme_en: "The conversion of a soldier",
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
        text_en:
          "O noble St. Ignatius, from even your childhood you had the heart of a noble soldier for Christ. You were drawn to stories of bravery and courage and felt the stirrings of greatness in your own soul. While recovering from your injuries, you found the stories of the fiercest love of Christ and the heroic acts of those who followed Him, and from those stories you knew you found the truth.\n\nMay the same fire that burned in your heart burn in mine. Help bring about a deeper conversion in me, and help me fall deeper in love with Christ. Strengthen my conviction to the truth and walk with me so that I can keep heaven before my eyes throughout the whole of my life.",
      },
      {
        theme_nl: "Onderscheiding van Gods wil",
        theme_pt: "O discernimento da vontade de Deus",
        theme_en: "Discerning God’s will",
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
        text_en:
          "St. Ignatius, you taught that discernment is the key to understanding and following God's will. In your own life you were attuned to the stirrings in your heart and soul, and you used them to go in the direction God wanted you to go.\n\nHelp me to discern God's voice amidst the noise of the world. Grant me the wisdom to recognize His guidance and the courage to follow it faithfully. Keep me from the trap of over-discernment that leads to paralysis, and instead, help me confidently move toward God. Open my heart to the Holy Spirit so He may illuminate my mind and heart, revealing the path that leads to greater service and love of God.",
      },
      {
        theme_nl: "IJver voor de zielen",
        theme_pt: "Zelo pelas almas",
        theme_en: "Zeal for souls",
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
        text_en:
          "O St. Ignatius, your life was marked by an extraordinary zeal for the salvation of souls. You felt God's call to “help souls” and to share what you learned with others so that they might have their own hearts changed. Increase in my heart my zeal for souls.\n\nHelp me to share in your passion for evangelization. Teach me to see each person as a beloved child of God, worthy of hearing the Good News. Inspire me to be a beacon of Christ's love and truth in a world that so desperately needs it. Give me the courage to be an effective witness to God’s goodness in all I say and do.",
      },
      {
        theme_nl: "De Geestelijke Oefeningen",
        theme_pt: "Os Exercícios Espirituais",
        theme_en: "The Spiritual Exercises",
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
        text_en:
          "O St. Ignatius, during your time as a pilgrim, you wrote the Spiritual Exercises — a profound gift to the spiritual treasury of the Church and a powerful means of growing closer to God.\n\nHelp me to embrace these exercises in my own life, seeking to deepen my relationship with the Lord through prayer, reflection, and contemplation. Cultivate in me the discipline to persevere in prayer so that I am more convicted to live out my faith. May I be open to the transforming power of God's love and grace.",
      },
      {
        theme_nl: "Liefde voor de studie",
        theme_pt: "O amor ao estudo",
        theme_en: "Love of learning",
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
        text_en:
          "St. Ignatius of Loyola, your life exemplified a profound love of learning and a commitment to intellectual growth for the glory of God. You understood that a well-formed mind could better understand and communicate the truths of the faith. Your studies brought you closer to a true knowledge of God.\n\nCultivate in me a love of learning so that I may come to better know and love God. Teach me to seek wisdom in all my endeavors and to use my knowledge to serve others. Grant me the humility and perseverance to dig deeper into the truths of our faith.",
      },
      {
        theme_nl: "Nederigheid en gehoorzaamheid",
        theme_pt: "Humildade e obediência",
        theme_en: "Humility and obedience",
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
        text_en:
          "St. Ignatius of Loyola, you exemplified the virtues of humility and obedience to God throughout your life. You knew that true freedom comes from submitting one's will to God and living in humble service to others. These virtues were evident in your leadership, following Christ's example of a servant leader—one who seeks to serve rather than be served.\n\nTeach me to submit my will to God and to embrace the freedom that comes from living in His will. Cultivate these virtues in my heart so that I can live a life of obedient and humble discipleship. Help me to glorify God in all things.",
      },
      {
        theme_nl: "Vertrouwen op Gods voorzienigheid",
        theme_pt: "Confiança na divina Providência",
        theme_en: "Trust in divine providence",
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
        text_en:
          "St. Ignatius, you exemplified a profound trust in divine providence throughout your life. Despite the many challenges and obstacles you faced, you remained confident in God’s plan and provision. Your steadfast faith allowed you to undertake great works for the glory of God.\n\nHelp me to follow your example and to trust in God's loving care. Teach me to surrender my fears and uncertainties to Him and to believe that He has a plan for my life. May I seek first the kingdom of God and trust that everything else will be added unto me.",
      },
      {
        theme_nl: "Neem, Heer, en aanvaard",
        theme_pt: "Tomai, Senhor, e recebei",
        theme_en: "Take, Lord, and receive",
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
        text_en:
          "O St. Ignatius, you often prayed the words “Take, Lord, and receive.” You radically offered all you have and all you are back to the One from whom it was given. You gladly gave everything to the Lord, allowing Him to do with it what He wills.\n\nHelp me pray these words with sincerity of heart. Loosen my grip on what is not mine to grasp and to offer it back to the Lord with humility and trust. Help me truly know the love God has for me so that I may not fear His will for me.",
      },
      {
        theme_nl: "Tot meerdere eer van God",
        theme_pt: "Para maior glória de Deus",
        theme_en: "For the greater glory of God",
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
        text_en:
          "St. Ignatius, you lived by your motto “Ad Majorem Dei Gloriam,” doing all things “for the greater glory of God.” All of your works pointed back to God.\n\nHelp me to adopt this same principle in my own life. Teach me to glorify God in all that I do. Show me the ways in which I may serve others selflessly and take advantage of the opportunities to use my talents and resources for building up God’s kingdom. Help me dedicate my life to serving Christ and to making His name known and loved as you did.",
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

const TALEN = ["nl", "en", "pt"];

/* Titel en tekst van een gebed uit seed.js, met het Nederlands als terugval. */
const seedTitle = (key, lang) => byKey[key][`title_${lang}`] || byKey[key].title_nl;
const seedText = (key, lang) => byKey[key][`text_${lang}`] || byKey[key].text_nl;

/*
 * Als beurtgebed: de eerste `n` regels voor de voorganger (V.), samengevoegd
 * met `las`, de rest voor allen (A. in het Nederlands, R. in het Engels en Portugees).
 */
function beurtgebed(key, lang, n, las = " ") {
  const regels = seedText(key, lang).split("\n");
  const antwoord = lang === "nl" ? "A." : "R.";
  return `V. ${regels.slice(0, n).join(las)}\n${antwoord} ${regels.slice(n).join("\n")}`;
}

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

/* Engels naar Catholic Doors Ministry (niet op praymorenovenas.com). */
const NOVEENGEBED_EN =
  "O glorious Patriarch, St. Ignatius of Loyola,\n" +
  "we humbly beseech thee to obtain for us from Almighty God,\n" +
  "above all things else, deliverance from sin, which is the greatest of evils,\n" +
  "and next, from those scourges\n" +
  "wherewith the Lord chastises the sins of His people.\n" +
  "\n" +
  "And by thy glorious merits we beseech\n" +
  "thy benevolent intercession before the throne of Almighty God,\n" +
  "that He may grant us:\n" +
  "[mention your intention here in silence]\n" +
  "\n" +
  "May thine example, O Loyal Knight of Our Lady,\n" +
  "enkindle in our hearts an effectual desire,\n" +
  "to employ ourselves continually\n" +
  "in laboring for the greater glory of God and the good of our fellowmen;\n" +
  "obtain for us, likewise, from the loving Heart of Jesus Our Lord,\n" +
  "that grace which is the crown of all graces,\n" +
  "that is to say, the grace of final perseverance\n" +
  "and everlasting happiness.\n" +
  "Amen.";

const NOVEENGEBED = { nl: NOVEENGEBED_NL, en: NOVEENGEBED_EN, pt: NOVEENGEBED_PT };

/* Besluit: "Geloofd zij Jezus Christus" en het kruisteken. */
const LAUDETUR = {
  nl: "V. Geloofd zij Jezus Christus!\nA. Nu en in eeuwigheid. Amen.",
  en: "V. Praised be Jesus Christ!\nR. Now and forever! Amen.",
  pt: "V. Louvado seja Nosso Senhor Jesus Cristo!\nR. Para sempre seja louvado! Ámen.",
  la: "V. Laudétur Iesus Christus!\nR. Nunc et in aetérnum. Amen.",
};
const besluit = (lang) => LAUDETUR[lang] + "\n\n" + seedText("signum_crucis", lang);

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
/* Engels naar praymorenovenas.com (aanhef zonder het intentiemoment, dat in het roosgebed zit). */
const THERESIA_AANHEF_EN =
  "Dearest Saint Therese of Lisieux, you said that you would spend your time in heaven doing good on earth. Your trust in God was complete. Pray that He may increase my trust in His goodness and mercy.\n\nPray for me that I, like you, may have great and innocent confidence in the loving promises of our God. Pray that I may live my life in union with God’s plan for me, and one day see the Face of God whom you loved so deeply.\n\nSaint Therese, you were faithful to God even unto the moment of your death. Pray for me that I may be faithful to our loving God. May my life bring peace and love to the world through faithful endurance in love for God our savior.";

/* Portugees: eigen vertaling vanuit het Engels; er bestaat geen gepubliceerde vertaling. */
const THERESIA_AANHEF_PT =
  "Querida Santa Teresinha de Lisieux, dissestes que passaríeis o vosso tempo no Céu a fazer o bem na terra. A vossa confiança em Deus era completa. Rogai para que Ele aumente a minha confiança na Sua bondade e misericórdia.\n\nRogai por mim, para que eu, como vós, tenha uma grande e inocente confiança nas amorosas promessas do nosso Deus. Rogai para que eu viva a minha vida em união com o plano de Deus a meu respeito, e um dia veja a Face de Deus, a quem amastes tão profundamente.\n\nSanta Teresinha, fostes fiel a Deus até ao momento da vossa morte. Rogai por mim, para que eu seja fiel ao nosso Deus de amor. Que a minha vida leve paz e amor ao mundo, pela perseverança fiel no amor a Deus, nosso Salvador.";

const THERESIA_SCHIETGEBEDEN_EN = [
  "I love you, Lord. Help me to love you more!",
  "I trust you, Lord. Help me to trust you more!",
  "I see you, Lord. Help me to see you more!",
  "I am humble, Lord. Give me more humility!",
  "I try to forgive, Lord. Help me to forgive 70 times 7 times!",
  "I accept your will, Lord. Help me to accept your will every day!",
  "I rely on you, Lord. Help me to rely on you more!",
  "I reflect you to the world, Lord. Help me to reflect you more clearly!",
  "I love your people, Lord. Help me to love them more!"
];

const THERESIA_SCHIETGEBEDEN_PT = [
  "Amo-Vos, Senhor. Ajudai-me a amar-Vos mais!",
  "Confio em Vós, Senhor. Ajudai-me a confiar mais em Vós!",
  "Vejo-Vos, Senhor. Ajudai-me a ver-Vos mais!",
  "Sou humilde, Senhor. Dai-me mais humildade!",
  "Procuro perdoar, Senhor. Ajudai-me a perdoar setenta vezes sete!",
  "Aceito a Vossa vontade, Senhor. Ajudai-me a aceitar a Vossa vontade todos os dias!",
  "Apoio-me em Vós, Senhor. Ajudai-me a apoiar-me mais em Vós!",
  "Reflito-Vos para o mundo, Senhor. Ajudai-me a refletir-Vos com mais clareza!",
  "Amo o Vosso povo, Senhor. Ajudai-me a amá-lo mais!"
];

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

/* Roosgebed: Engels naar EWTN, Portugees eigen vertaling. */
const ROOSGEBED_EN =
  "O Little Therese of the Child Jesus,\nplease pick for me a rose from the heavenly gardens\nand send it to me as a message of love.\n\nO Little Flower of Jesus,\nask God today to grant the favors\nI now place with confidence in your hands…\n[mention your intention here in silence]\n\nSt. Therese, help me to always believe as you did,\nin God's great love for me,\nso that I might imitate your \"Little Way\" each day.\nAmen.";

const ROOSGEBED_PT =
  "Ó Teresinha do Menino Jesus,\npeço-vos que colhais para mim uma rosa dos jardins celestes\ne ma envieis como mensagem de amor.\n\nÓ Florzinha de Jesus,\npedi hoje a Deus que conceda os favores\nque agora ponho com confiança nas vossas mãos…\n[mencione aqui, em silêncio, a sua intenção]\n\nSanta Teresinha, ajudai-me a acreditar sempre, como vós,\nno grande amor de Deus por mim,\npara que eu possa imitar, cada dia, a vossa ‘pequena via’.\nÁmen.";

/* Stapkoppen per taal. */
const K = {
  begin: { nl: "Begin", en: "Beginning", pt: "Início" },
  ignatius: {
    nl: "Vaste gebeden van de H. Ignatius",
    en: "Prayers of St Ignatius",
    pt: "Orações de Santo Inácio",
  },
  overweging: (dag) => ({
    nl: `Overweging van dag ${dag}`,
    en: `Meditation for day ${dag}`,
    pt: `Meditação do dia ${dag}`,
  }),
  noveengebed: {
    nl: "Noveengebed · met uw intentie",
    en: "Novena prayer · with your intention",
    pt: "Oração da novena · com a sua intenção",
  },
  na: { nl: "Na de intentie", en: "After the intention", pt: "Depois da intenção" },
  besluit: { nl: "Besluit", en: "Conclusion", pt: "Conclusão" },
};

const BESLUIT_TITEL = {
  nl: "Geloofd zij Jezus Christus",
  en: "Praised be Jesus Christ",
  pt: "Louvado seja Jesus Cristo",
};

/*
 * Eén stap in alle talen. `maak(lang)` geeft { title, text } voor die taal;
 * `la` is optioneel en alleen aanwezig waar een authentieke Latijnse tekst bestaat.
 */
function stap(kicker, maak, la) {
  const out = la ? { title_la: la.title, text_la: la.text } : {};
  for (const lang of TALEN) {
    const { title, text } = maak(lang);
    out[`kicker_${lang}`] = kicker[lang];
    out[`title_${lang}`] = title;
    out[`text_${lang}`] = text;
  }
  return out;
}

/* Stap voor een gebed uit seed.js, met het Latijn als dat bestaat. */
function seedStap(kicker, key, tekst = (lang) => seedText(key, lang)) {
  const p = byKey[key];
  return stap(
    kicker,
    (lang) => ({ title: seedTitle(key, lang), text: tekst(lang) }),
    p.text_la ? { title: p.title_la, text: p.text_la } : null
  );
}

const besluitStap = () =>
  stap(
    K.besluit,
    (lang) => ({ title: BESLUIT_TITEL[lang], text: besluit(lang) }),
    { title: "Laudetur Iesus Christus", text: besluit("la") }
  );

/*
 * Bouwt de reeks stappen voor één noveendag, in de klassieke noveenvolgorde:
 * opening — (vaste gebeden) — overweging van de dag — noveengebed met
 * intentie — Onze Vader, Wees gegroet, Eer aan de Vader — besluit.
 */
export function buildNovenaSteps(novenaKey, day) {
  const novena = getNovena(novenaKey);
  return novena.key === "theresia"
    ? buildTheresiaSteps(novena, day)
    : buildIgnatiusSteps(novena, day);
}

const pickDag = (d, veld, lang) => d[`${veld}_${lang}`] || d[`${veld}_nl`];

function buildTheresiaSteps(novena, day) {
  const d = novena.days[day - 1];
  const aanhef = { nl: THERESIA_AANHEF_NL, en: THERESIA_AANHEF_EN, pt: THERESIA_AANHEF_PT };
  const schiet = { nl: THERESIA_SCHIETGEBEDEN_NL, en: THERESIA_SCHIETGEBEDEN_EN, pt: THERESIA_SCHIETGEBEDEN_PT };
  const roos = { nl: ROOSGEBED_NL, en: ROOSGEBED_EN, pt: ROOSGEBED_PT };
  const titelRoos = { nl: "Roosgebed", en: "Rose prayer", pt: "Oração da rosa" };

  return [
    seedStap(K.begin, "signum_crucis"),
    stap(K.overweging(day), (lang) => ({
      title: pickDag(d, "theme", lang),
      text:
        aanhef[lang] +
        "\n\n" +
        pickDag(d, "text", lang) +
        "\n\n" +
        schiet[lang].slice(0, day).reverse().join("\n"),
    })),
    stap(K.noveengebed, (lang) => ({ title: titelRoos[lang], text: roos[lang] })),
    seedStap(K.na, "our_father"),
    seedStap(K.na, "hail_mary"),
    seedStap(K.na, "gloria_patri"),
    besluitStap(),
  ];
}

function buildIgnatiusSteps(novena, day) {
  const d = novena.days[day - 1];
  const titelNoveen = {
    nl: "Tot de heilige Ignatius van Loyola",
    en: "To St Ignatius of Loyola",
    pt: "A Santo Inácio de Loiola",
  };

  return [
    seedStap(K.begin, "signum_crucis"),
    seedStap(K.ignatius, "suscipe", (lang) => beurtgebed("suscipe", lang, 2)),
    seedStap(K.ignatius, "anima_christi"),
    /* Het Portugees opent met de aanspreking "Senhor Jesus" op een eigen regel. */
    seedStap(K.ignatius, "gebed_om_edelmoedigheid", (lang) =>
      lang === "pt"
        ? beurtgebed("gebed_om_edelmoedigheid", lang, 2, ", ")
        : beurtgebed("gebed_om_edelmoedigheid", lang, 1)
    ),
    stap(K.overweging(day), (lang) => ({
      title: pickDag(d, "theme", lang),
      text: pickDag(d, "text", lang) + "\n\n" + DAG_SLOT[lang],
    })),
    stap(K.noveengebed, (lang) => ({ title: titelNoveen[lang], text: NOVEENGEBED[lang] })),
    seedStap(K.na, "our_father"),
    seedStap(K.na, "hail_mary"),
    seedStap(K.na, "gloria_patri"),
    besluitStap(),
  ];
}
