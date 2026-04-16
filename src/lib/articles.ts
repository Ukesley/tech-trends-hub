import heroImg from "@/assets/hero-featured.jpg";
import aiImg from "@/assets/article-ai.jpg";
import securityImg from "@/assets/article-security.jpg";
import cloudImg from "@/assets/article-cloud.jpg";
import hardwareImg from "@/assets/article-hardware.jpg";
import devImg from "@/assets/article-dev.jpg";
import mobileImg from "@/assets/article-mobile.jpg";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
}

export const categories = [
  "Todos",
  "IA",
  "Segurança",
  "Cloud",
  "Hardware",
  "Desenvolvimento",
  "Mobile",
] as const;

export const articles: Article[] = [
  {
    slug: "o-horizonte-do-silicio",
    title: "O Horizonte do Silício: como a densidade urbana está reformulando a computação de borda",
    excerpt: "À medida que as redes metropolitanas ficam mais inteligentes, a infraestrutura se move das nuvens remotas para o próprio pavimento. Um mergulho profundo na próxima década de conectividade.",
    content: `A computação de borda está transformando radicalmente a maneira como processamos dados. Em vez de enviar informações para data centers distantes, o processamento acontece cada vez mais perto do usuário final.

As cidades inteligentes estão liderando essa revolução. Sensores IoT em semáforos, câmeras de vigilância e medidores inteligentes geram petabytes de dados que precisam ser processados em tempo real. A latência de enviar esses dados para a nuvem simplesmente não é aceitável para aplicações críticas.

Empresas como a Cloudflare, Fastly e AWS estão investindo bilhões em infraestrutura de borda. O objetivo é ter nós de processamento a poucos milissegundos de qualquer dispositivo conectado. Isso não é apenas uma melhoria incremental — é uma mudança de paradigma.

O impacto na experiência do usuário é imenso. Aplicações de realidade aumentada, veículos autônomos e telemedicina dependem dessa proximidade computacional. A promessa é que em 2030, 75% dos dados empresariais serão processados fora do data center tradicional.

Mas os desafios são significativos: segurança distribuída, gerenciamento de milhares de nós e a necessidade de hardware cada vez mais eficiente energeticamente. A corrida pelo silício de borda está apenas começando.`,
    category: "Cloud",
    image: heroImg,
    author: "Kesley Barros",
    authorInitials: "KB",
    date: "15 Abr 2026",
    readTime: "8 min",
  },
  {
    slug: "computacao-quantica-avanca",
    title: "Computação Quântica Avança: além dos limites teóricos",
    excerpt: "Explorando as aplicações práticas e o hardware emergente que está empurrando a computação quântica para cenários reais de resolução de problemas.",
    content: `A computação quântica deixou de ser uma promessa distante. Com processadores de mais de 1000 qubits, empresas como IBM, Google e startups como IonQ estão demonstrando vantagem quântica em problemas específicos.

O avanço mais significativo de 2026 foi a correção de erros quânticos em escala. Pela primeira vez, um computador quântico tolerante a falhas realizou cálculos que seriam impossíveis para supercomputadores clássicos em áreas como simulação molecular e otimização logística.

Para desenvolvedores, frameworks como Qiskit e Cirq estão tornando a programação quântica mais acessível. Não é mais necessário ser físico para escrever algoritmos quânticos — APIs de alto nível abstraem a complexidade do hardware.

O impacto na criptografia é preocupante. Algoritmos RSA e ECC, pilares da segurança digital atual, podem ser quebrados por computadores quânticos suficientemente poderosos. A corrida pela criptografia pós-quântica está em pleno vapor.

A democratização está chegando: serviços de computação quântica na nuvem permitem que qualquer empresa experimente. O custo caiu 90% nos últimos dois anos. Estamos no limiar de uma nova era computacional.`,
    category: "IA",
    image: aiImg,
    author: "Kesley Barros",
    authorInitials: "KB",
    date: "14 Abr 2026",
    readTime: "6 min",
  },
  {
    slug: "arquiteturas-zero-trust",
    title: "O Cenário de Ameaças em Evolução: Arquiteturas Zero-Trust",
    excerpt: "Implementando modelos robustos de zero-trust para combater ataques cibernéticos sofisticados e proteger ambientes de rede distribuídos.",
    content: `Zero-Trust não é mais um buzzword — é uma necessidade. Com o trabalho remoto permanente e a explosão de dispositivos IoT, o perímetro de segurança tradicional simplesmente não existe mais.

O princípio é simples: nunca confie, sempre verifique. Cada requisição, cada acesso, cada transação deve ser autenticada e autorizada, independentemente de onde venha. Na prática, isso significa microsegmentação de rede, autenticação contínua e políticas de acesso granulares.

As ferramentas evoluíram significativamente. Soluções como BeyondCorp da Google e o Azure AD Conditional Access tornam a implementação viável para empresas de qualquer tamanho. O SASE (Secure Access Service Edge) combina networking e segurança em um único framework cloud-native.

Os ataques de ransomware continuam crescendo, mas organizações com Zero-Trust implementado relatam 60% menos incidentes de segurança. O investimento se paga rapidamente quando consideramos o custo médio de uma violação de dados.

A tendência para 2026-2027 é a integração de IA na detecção de ameaças. Modelos de machine learning analisam padrões de comportamento em tempo real, identificando anomalias antes que se tornem incidentes.`,
    category: "Segurança",
    image: securityImg,
    author: "Kesley Barros",
    authorInitials: "KB",
    date: "13 Abr 2026",
    readTime: "7 min",
  },
  {
    slug: "placas-logicas-modulares",
    title: "Placas Lógicas Modulares para a Próxima Geração de Workstations Portáteis",
    excerpt: "Por que hardware open-source pode finalmente acabar com o modelo de obsolescência programada que assola nossa indústria.",
    content: `O Framework Laptop abriu caminho, mas o movimento por hardware modular está ganhando escala. Empresas como System76, Tuxedo e até a Dell estão adotando designs que permitem upgrades granulares.

A ideia é revolucionária na sua simplicidade: em vez de trocar todo o laptop quando a GPU fica defasada, troque apenas o módulo da GPU. Memória, armazenamento, processador — tudo intercambiável como blocos de LEGO.

O padrão UCM (Universal Compute Module) está ganhando tração. Com suporte da Linux Foundation, promete padronizar as interfaces de módulos, permitindo que diferentes fabricantes criem componentes compatíveis. É o USB-C do hardware interno.

O impacto ambiental é significativo. Estima-se que hardware modular pode reduzir o lixo eletrônico em 40%. Em vez de 200 milhões de laptops descartados por ano, teríamos upgrades pontuais com fração do impacto ambiental.

Para profissionais criativos e desenvolvedores, a possibilidade de customizar exatamente o que precisam — mais GPU para renderização, mais RAM para compilação — sem compromissos, é transformadora.`,
    category: "Hardware",
    image: hardwareImg,
    author: "Kesley Barros",
    authorInitials: "KB",
    date: "12 Abr 2026",
    readTime: "5 min",
  },
  {
    slug: "economia-do-crepusculo",
    title: "A Economia do Crepúsculo: como devs estão reclamando as horas noturnas",
    excerpt: "Rastreamos métricas de produtividade em quatro fusos horários para ver se o trabalho remoto está se tornando mais noturno.",
    content: `O trabalho assíncrono mudou fundamentalmente quando as pessoas codificam. Nossa pesquisa com 5.000 desenvolvedores revelou que 43% preferem trabalhar entre 20h e 2h da manhã.

Não é preguiça — é neurociência. Estudos mostram que para trabalho criativo e de resolução de problemas, muitas pessoas atingem o pico cognitivo no período noturno, quando as distrações são mínimas e o mundo silencia.

Empresas progressistas estão adaptando. GitLab, Automattic e Basecamp já operam com políticas de "trabalhe quando funcionar para você". As ferramentas de comunicação assíncrona — Loom, Linear, Notion — eliminam a necessidade de reuniões síncronas.

O impacto na saúde é duplo: por um lado, respeitar o cronotipo individual reduz burnout. Por outro, a falta de separação entre trabalho e descanso pode ser perigosa. O equilíbrio está em rituais claros de início e fim de jornada.

Para equipes globais, a economia do crepúsculo é uma vantagem: quando São Paulo dorme, Tóquio acorda. O "follow-the-sun" de desenvolvimento se torna natural quando as pessoas trabalham em seus horários ideais.`,
    category: "Desenvolvimento",
    image: devImg,
    author: "Kesley Barros",
    authorInitials: "KB",
    date: "11 Abr 2026",
    readTime: "6 min",
  },
  {
    slug: "revolucao-mobile-ia",
    title: "A Revolução da IA On-Device: processamento inteligente direto no seu bolso",
    excerpt: "Como os novos chips neurais dos smartphones estão permitindo que modelos de IA rodem localmente, sem depender da nuvem.",
    content: `O Apple A19 e o Snapdragon 8 Gen 5 não são apenas mais rápidos — são fundamentalmente diferentes. Com NPUs (Neural Processing Units) dedicadas de 40+ TOPS, smartphones agora executam modelos de linguagem com bilhões de parâmetros localmente.

A privacidade é o benefício mais óbvio: seus dados nunca saem do dispositivo. Mas a velocidade é igualmente impressionante. Sem latência de rede, a resposta é instantânea. Tradução em tempo real, transcrição perfeita, e assistentes verdadeiramente inteligentes — tudo offline.

O Google está liderando com o Gemini Nano 2.0, que roda nativamente em dispositivos Pixel. A Samsung respondeu com Galaxy AI evoluído. E a Apple, fiel ao seu estilo, integrou silenciosamente capacidades de IA em todos os aspectos do iOS.

Para desenvolvedores, frameworks como Core ML, NNAPI e TensorFlow Lite facilitam a criação de apps com IA embarcada. O desafio é otimizar modelos para rodar em hardware limitado sem perder qualidade.

O futuro é híbrido: tarefas simples processadas no dispositivo, tarefas complexas na nuvem. O smartphone se torna um nó inteligente de uma rede distribuída de computação.`,
    category: "Mobile",
    image: mobileImg,
    author: "Kesley Barros",
    authorInitials: "KB",
    date: "10 Abr 2026",
    readTime: "7 min",
  },
  {
    slug: "fibra-optica-cidades",
    title: "Sob o Asfalto: projetos de expansão de fibra enfrentam obstáculos urbanos",
    excerpt: "Mapeando as lutas físicas de trazer latência ultra-baixa para centros históricos sem perturbar linhas de utilidades legadas.",
    content: `Levar fibra óptica para cada residência parece simples no papel. Na prática, é uma das maiores obras de infraestrutura do século. Nas grandes cidades brasileiras, o desafio é ainda maior.

São Paulo tem mais de 15 mil km de tubulação subterrânea, grande parte mapeada de forma imprecisa ou não mapeada. Cada metro de escavação pode encontrar surpresas: tubulações de gás antigas, cabos elétricos, ou estruturas arqueológicas.

A tecnologia de micro-trincheiras está revolucionando o processo. Em vez de escavar valas profundas, máquinas especializadas criam sulcos de apenas 2cm de largura na superfície, inserindo fibra e selando em questão de horas. O impacto no tráfego é mínimo.

O 5G está mudando a equação também. Redes de fibra servem como backbone para antenas 5G — sem fibra, não há 5G real. Isso está acelerando investimentos: operadoras como Vivo, TIM e Claro investiram R$ 35 bilhões em infraestrutura de fibra em 2025.

O objetivo do governo é conectar 95% dos domicílios brasileiros com fibra até 2028. Ambicioso, mas necessário. A inclusão digital depende fundamentalmente dessa infraestrutura física, invisível mas essencial.`,
    category: "Cloud",
    image: cloudImg,
    author: "Kesley Barros",
    authorInitials: "KB",
    date: "9 Abr 2026",
    readTime: "8 min",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === "Todos") return articles;
  return articles.filter((a) => a.category === category);
}

export function addArticle(newArticle: Omit<Article, "slug" | "author" | "authorInitials" | "date">) {
  const date = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()).replace(' de ', ' ');

  const article: Article = {
    ...newArticle,
    slug: newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    author: "Kesley Barros",
    authorInitials: "KB",
    date,
  };

  articles.unshift(article);
}
