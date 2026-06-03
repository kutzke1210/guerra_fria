const gameQuestions = [
  {
    question: 'Em que ano foi criada a OTAN (Organização do Tratado do Atlântico Norte)?',
    context: 'RELATÓRIO RECEBIDO. Data: 04 de abril de 1949. Origem: Washington, D.C. Classificação: VERTRAULICH. Documento interceptado indica movimentação militar coordenada entre países do Atlântico Norte. A análise sugere a formação de uma aliança estratégica ocidental.',
    options: ['1945', '1949', '1955', '1961'],
    correct: 1,
    file: {
      number: 'Nº 01',
      classification: 'ULTRA SECRETO',
      origin: 'Instituto Central de Nutrição da União Soviética',
      date: '17 de março de 1964',
      title: 'Projeto: BETERRABA VERMELHA',
      body: [
        'Com o objetivo de aumentar a produtividade industrial em 12%, cientistas soviéticos desenvolveram uma bebida energética experimental produzida a partir de beterrabas cultivadas em instalações estatais.',
        'Após três meses de testes, observou-se um aumento de 4% na velocidade média dos trabalhadores.',
        'Entretanto, 93% dos participantes declararam espontaneamente que prefeririam beber água da torneira.',
        'O Comitê Central concluiu que a produtividade não compensava o sabor.'
      ],
      footer: 'Status: Arquivado.'
    },
    fail: {
      number: 'Nº 01',
      classification: 'CONFIDENCIAL',
      date: '9 de agosto de 1967',
      title: 'Incidente da Cafeteira',
      body: [
        'Às 08:12, funcionários da CIA relataram a paralisação completa da principal cafeteira do edifício.',
        'Uma equipe de cinco especialistas foi mobilizada para investigar possível sabotagem soviética.',
        'Foram realizadas entrevistas, análises técnicas e revisão dos protocolos de segurança.',
        'Às 15:47, descobriu-se que o cabo de energia havia sido desconectado durante a limpeza do local.',
        'O relatório final possui 43 páginas.'
      ]
    }
  },
  {
    question: 'Em que ano a União Soviética lançou o Sputnik, primeiro satélite artificial?',
    context: 'RELATÓRIO RECEBIDO. Data: 04 de outubro de 1957. Origem: Estação de monitoramento, Berlim Ocidental. Classificação: GEHEIM. Sinais de rádio não identificados foram detectados vindos do território soviético. A frequência sugere um objeto em órbita.',
    options: ['1955', '1957', '1960', '1962'],
    correct: 1,
    file: {
      number: 'Nº 02',
      classification: 'ULTRA SECRETO',
      origin: 'Departamento de Comunicação Experimental',
      date: '2 de junho de 1961',
      title: 'Operação Pombo Cósmico',
      body: [
        'Pesquisadores soviéticos estudaram a utilização de pombos-correio para transporte de mensagens militares em situações de emergência.',
        'Foram treinadas 27 aves durante seis meses.',
        'Durante o primeiro teste de campo, 21 retornaram ao ponto de origem, 4 desapareceram e 2 passaram a frequentar regularmente uma padaria local.',
        'A equipe concluiu que os pombos apresentavam excesso de independência operacional.'
      ],
      footer: 'Status: Encerrado.'
    },
    fail: {
      number: 'Nº 02',
      classification: 'RESTRITO',
      date: '14 de fevereiro de 1972',
      title: 'Reunião Estratégica Equivocada',
      body: [
        'Um agente encarregado de participar de uma reunião de planejamento em Berlim utilizou um guia turístico em vez do mapa fornecido pelo departamento de inteligência.',
        'Como resultado, compareceu a um restaurante alemão localizado a 4 quilômetros do ponto correto.',
        'A ausência do agente gerou atraso de duas horas no cronograma oficial.',
        'O restaurante recebeu avaliação positiva.'
      ]
    }
  },
  {
    question: 'Em que ano o Muro de Berlim foi construído?',
    context: 'RELATÓRIO RECEBIDO. Data: 12 de agosto de 1961. Origem: Checkpoint Charlie, Berlim. Classificação: STRENG GEHEIM. Movimentação militar intensa foi reportada em Berlim. Tanques e barreiras estão sendo posicionados durante a madrugada. A fronteira será fechada nas próximas horas.',
    options: ['1959', '1960', '1961', '1963'],
    correct: 2,
    file: {
      number: 'Nº 03',
      classification: 'ULTRA SECRETO',
      origin: 'Comissão Espacial Soviética',
      date: '18 de setembro de 1968',
      title: 'Relatório Lunar',
      body: [
        'Após o sucesso de diversas missões espaciais, uma comissão foi criada para estudar a instalação de uma bandeira soviética na Lua.',
        'O grupo produziu 127 páginas de análises.',
        'Entre os problemas identificados:',
        '— Ausência de vento para movimentar a bandeira.',
        '— Dificuldade de transporte.',
        '— Possibilidade de parecer pequena demais em fotografias.',
        'A comissão recomendou a criação de mais três comissões para estudar o assunto.'
      ]
    },
    fail: {
      number: 'Nº 03',
      classification: 'CONFIDENCIAL',
      date: '4 de abril de 1970',
      title: 'Projeto Caneta Oceânica',
      body: [
        'Engenheiros americanos receberam financiamento para desenvolver uma caneta capaz de escrever em ambientes submersos.',
        'Após dois anos de pesquisa, o projeto foi concluído com sucesso.',
        'Durante a apresentação final, um dos avaliadores perguntou:',
        '"Quem precisa escrever debaixo d\'água?"',
        'Nenhuma resposta satisfatória foi registrada.'
      ]
    }
  },
  {
    question: 'O que foi a Crise dos Mísseis de Cuba (1962)?',
    context: 'RELATÓRIO RECEBIDO. Data: 15 de outubro de 1962. Origem: Havana, Cuba — via Berlim. Classificação: TOP SECRET. Imagens de reconhecimento aéreo revelam construções suspeitas no território cubano. A análise aponta para instalações de lançamento de mísseis soviéticos.',
    options: [
      'Um conflito militar entre Cuba e Estados Unidos',
      'A descoberta de mísseis soviéticos em Cuba, gerando tensão com os EUA',
      'A invasão dos EUA a Cuba',
      'Um acordo de paz entre Cuba e URSS'
    ],
    correct: 1,
    file: {
      number: 'Nº 04',
      classification: 'ULTRA SECRETO',
      origin: 'Centro Experimental de Vigilância',
      date: '12 de novembro de 1966',
      title: 'Projeto Gato Espião',
      body: [
        'Foi proposta a utilização de gatos para monitoramento discreto de áreas estratégicas.',
        'Os animais receberam treinamento especializado durante oito semanas.',
        'Resultados observados:',
        '— 61% ignoraram completamente as instruções.',
        '— 24% adormeceram durante a missão.',
        '— 15% perseguiram objetos aleatórios.',
        'Nenhum gato demonstrou interesse por espionagem.'
      ],
      footer: 'Conclusão: Projeto incompatível com comportamento felino.'
    },
    fail: {
      number: 'Nº 04',
      classification: 'RESTRITO',
      date: '8 de julho de 1969',
      title: 'Operação Lua de Papel',
      body: [
        'Durante uma apresentação sobre a Corrida Espacial, um modelo em escala da Lua foi construído para auxiliar a explicação técnica.',
        'O modelo foi posicionado sobre uma mesa instável.',
        'Após 14 segundos de apresentação, a Lua caiu no chão.',
        'O incidente foi registrado em ata como:',
        '"Evento gravitacional não planejado."'
      ]
    }
  },
  {
    question: 'Em que ano a União Soviética foi oficialmente dissolvida?',
    context: 'RELATÓRIO RECEBIDO. Data: 25 de dezembro de 1991. Origem: Mossul — Setor Americano. Classificação: VERTRAULICH. Comunicações internas indicam instabilidade política crescente. A estrutura do governo soviético apresenta sinais de colapso iminente. Moscou pode estar prestes a dissolver a União.',
    options: ['1989', '1990', '1991', '1993'],
    correct: 2,
    file: {
      number: 'Nº 05',
      classification: 'ULTRA SECRETO',
      origin: 'Ministério de Tecnologia e Inovação',
      date: '3 de maio de 1977',
      title: 'Operação Mascote Nacional',
      body: [
        'O governo soviético abriu uma competição interna para escolher um mascote tecnológico que representaria o avanço científico do país.',
        'Foram apresentados:',
        '— 42 ursos.',
        '— 17 foguetes com rosto.',
        '— 9 tratores sorridentes.',
        '— 1 batata com óculos.',
        'Após cinco meses de debate, nenhuma proposta foi aprovada.',
        'O projeto foi encerrado sem vencedor.'
      ]
    },
    fail: {
      number: 'Nº 05',
      classification: 'CONFIDENCIAL',
      date: '21 de janeiro de 1981',
      title: 'Incidente da Senha',
      body: [
        'Durante uma inspeção de segurança, agentes encontraram um papel preso ao monitor de um computador.',
        'No papel estava escrita a senha de acesso do sistema.',
        'A senha era:',
        '"senha123"',
        'O responsável alegou que era uma medida para "não esquecer".',
        'O departamento de segurança discordou.'
      ]
    }
  }
];

const gameRanks = [
  { min: 5, title: 'CHEFE DO ARQUIVO CENTRAL', desc: 'Acervo completo. Nenhum registro perdido.' },
  { min: 4, title: 'ARQUIVISTA SÊNIOR', desc: 'Excelente recuperação. Falhas mínimas.' },
  { min: 3, title: 'ANALISTA DE DOCUMENTOS', desc: 'Desempenho satisfatório. Alguns registros não recuperados.' },
  { min: 2, title: 'AUXILIAR DE ARQUIVO', desc: 'Treinamento necessário. Vários registros perdidos.' },
  { min: 0, title: 'ARQUIVO EM RECUPERAÇÃO', desc: 'Múltiplas falhas. Acervo comprometido.' }
];

const slidesData = [
  {
    id: 'cover',
    type: 'cover',
    title: 'GUERRA FRIA',
    subtitle: 'Trabalho apresentado por:',
    names: ['Eduardo Kutzke', 'Lucas', 'Arthur', 'Mateus']
  },
  {
    id: 'slide-1',
    type: 'content',
    title: 'Disputa ideológica: capitalismo × socialismo',
    content: `A Guerra Fria foi marcada pela disputa entre dois sistemas econômicos e políticos opostos. De um lado estavam os <strong>Estados Unidos</strong>, defensores do capitalismo e da economia de mercado; do outro, a <strong>União Soviética</strong>, que promovia o socialismo e o controle estatal da economia.

Essa rivalidade influenciou governos, guerras, alianças e a política mundial durante décadas. Mais do que uma simples diferença política, tratava-se de uma competição por influência global, em que cada potência buscava expandir seu modelo para outros países. Esse confronto ideológico afetou decisões diplomáticas, econômicas e militares, moldando grande parte da história do século XX.`,
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg', alt: 'Bandeira dos Estados Unidos', label: 'EUA' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_Soviet_Union.svg', alt: 'Bandeira da União Soviética', label: 'URSS' }
    ]
  },
  {
    id: 'slide-2',
    type: 'content',
    title: 'Corrida armamentista nuclear',
    content: `Durante a Guerra Fria, <strong>Estados Unidos</strong> e <strong>União Soviética</strong> investiram intensamente na produção de armas nucleares e tecnologias militares avançadas. O objetivo era demonstrar superioridade e evitar ataques do adversário por meio da ameaça de <strong>destruição mútua</strong>.

Esse cenário criou um clima constante de medo, já que uma guerra nuclear poderia causar destruição em escala global. Além das bombas atômicas, também houve desenvolvimento de mísseis balísticos, submarinos nucleares e sistemas de defesa. A corrida armamentista tornou-se um dos símbolos do período e aumentou a tensão entre as superpotências.`,
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Ivy_Mike_003.jpg', alt: 'Explosão nuclear Ivy Mike', label: 'Teste nuclear Ivy Mike (1952)' }
    ]
  },
  {
    id: 'slide-3',
    type: 'content',
    title: 'Corrida espacial',
    content: `A corrida espacial foi uma competição tecnológica e científica entre as superpotências para demonstrar capacidade de inovação e poder político. A União Soviética saiu na frente com o lançamento do <strong>Sputnik 1</strong>, enquanto os Estados Unidos responderam com programas espaciais que culminaram na <strong>chegada do homem à Lua</strong>.

Além do prestígio internacional, essa disputa acelerou avanços científicos e tecnológicos. Diversas tecnologias utilizadas atualmente, como sistemas de comunicação e satélites, tiveram origem ou foram impulsionadas por esse contexto de competição espacial.`,
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Buzz_salutes_the_U.S._Flag.jpg', alt: 'Buzz Aldrin na Lua', label: 'Apollo 11 — 1969' }
    ]
  },
  {
    id: 'slide-4',
    type: 'content',
    title: 'Alianças militares e tratados de defesa',
    content: `Para fortalecer sua segurança e ampliar influência, os países criaram alianças militares. O bloco ocidental organizou a <strong>OTAN</strong> em 1949, enquanto o bloco socialista respondeu com o <strong>Pacto de Varsóvia</strong> em 1955. Essas alianças garantiam apoio militar entre seus membros e aumentavam a tensão internacional.

O medo de um ataque inimigo fazia com que os países mantivessem constante preparação militar, fortalecendo bases e realizando exercícios estratégicos. Dessa forma, as alianças tornaram-se peças fundamentais no equilíbrio de poder mundial.`,
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_of_NATO.svg', alt: 'Bandeira da OTAN', label: 'OTAN — Organização do Tratado do Atlântico Norte' }
    ]
  },
  {
    id: 'slide-5',
    type: 'content',
    title: 'Tratados de controle nuclear e redução de tensões',
    content: `Com o risco crescente de guerra nuclear, surgiram acordos para limitar armamentos e reduzir conflitos. O <strong>Tratado de Não Proliferação Nuclear</strong> buscou impedir a expansão das armas nucleares, enquanto os acordos <strong>SALT I</strong> e <strong>SALT II</strong> tentaram restringir arsenais estratégicos.

Mais tarde, o <strong>Tratado INF</strong> eliminou parte dos mísseis de alcance intermediário, contribuindo para diminuir a tensão entre as potências. Esses acordos representaram importantes esforços diplomáticos e mostraram que, apesar da rivalidade, existia preocupação em evitar um conflito devastador.`
  },
  {
    id: 'slide-6',
    type: 'content',
    title: 'Divisão do mundo e da Alemanha',
    content: `A Guerra Fria dividiu o planeta em dois grandes blocos de influência: <strong>capitalista</strong> e <strong>socialista</strong>. A divisão da Alemanha tornou-se um símbolo desse conflito, especialmente na cidade de Berlim, separada pelo <strong>Muro de Berlim</strong>.

O muro representava não apenas uma barreira física, mas também a separação ideológica e política entre os dois lados. Famílias ficaram separadas e a circulação entre as áreas tornou-se extremamente controlada. A queda do muro, em <strong>1989</strong>, simbolizou o enfraquecimento do bloco socialista e a aproximação do fim da Guerra Fria.`,
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/West_and_East_Germans_at_the_Brandenburg_Gate_in_1989.jpg', alt: 'Queda do Muro de Berlim', label: 'Queda do Muro de Berlim — 1989' }
    ]
  },
  {
    id: 'slide-7',
    type: 'content',
    title: 'Guerras indiretas e crises internacionais',
    content: `Embora Estados Unidos e União Soviética evitassem confronto militar direto, ambos apoiaram países e grupos aliados em conflitos regionais. Entre os principais exemplos estão a <strong>Guerra da Coreia</strong>, a <strong>Guerra do Vietnã</strong> e a <strong>Crise dos Mísseis de Cuba</strong>.

Essas disputas ampliaram o impacto global da Guerra Fria e mostraram como a rivalidade entre as superpotências afetava diferentes regiões do mundo. Em muitos casos, populações civis sofreram graves consequências, transformando guerras locais em disputas de alcance internacional.`,
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Tet1968.jpg', alt: 'Guerra do Vietnã', label: 'Guerra do Vietnã — Ofensiva do Tet (1968)' }
    ]
  },
  {
    id: 'slide-8',
    type: 'content',
    title: 'Espionagem, propaganda e fim da Guerra Fria',
    content: `A <strong>espionagem</strong> e a <strong>propaganda</strong> foram ferramentas fundamentais durante a Guerra Fria. Agências de inteligência atuavam na coleta de informações secretas e em operações estratégicas. Ao mesmo tempo, filmes, jornais e campanhas políticas eram utilizados para influenciar a opinião pública e fortalecer a imagem de cada bloco.

No final dos anos 1980, dificuldades econômicas e mudanças políticas enfraqueceram a União Soviética, levando à <strong>queda do Muro de Berlim</strong> e ao encerramento do conflito em <strong>1991</strong>. O fim da Guerra Fria alterou profundamente a ordem mundial e abriu espaço para uma nova configuração geopolítica.`,
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Reino_H%C3%A4yh%C3%A4nen.jpg', alt: 'Reino Häyhänen, espião da KGB', label: 'Reino Häyhänen — KGB' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/John_Anthony_Walker.jpg', alt: 'John Anthony Walker, espião da KGB', label: 'John Walker — KGB' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Oleg_Penkovsky_CIA.png', alt: 'Oleg Penkovsky, agente duplo', label: 'Oleg Penkovsky — Agente Duplo' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Aldrich_Ames_mugshot.jpg', alt: 'Aldrich Ames, espião da KGB na CIA', label: 'Aldrich Ames — CIA/KGB' }
    ]
  }
];
