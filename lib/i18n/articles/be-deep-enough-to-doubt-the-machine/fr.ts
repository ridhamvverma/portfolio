import type { ArticleTranslation } from "./en";
import { translations } from "@/lib/i18n/translations";
export const fr = {
  title: translations.fr.firstArticleTitle,
  summary: "L’IA a rendu le savoir généraliste bon marché. Ce qui est rare aujourd’hui, c’est d’en savoir assez sur un sujet pour juger ce que la machine nous dit.",
  byline: "Par Ridham Verma", backWriting: "← Articles", backToWriting: "← Retour aux articles",
  onThisPage: "Sur cette page", sectionsLabel: "Sections de l’article", portfolioLabel: "Retour au portfolio de Ridham Verma",
  sections: {
    "the-demo-that-worked-perfectly": {
      title: "La démo qui marchait parfaitement",
      block0: "Un étudiant demande à une IA d’ajouter l’envoi de photos de profil à son application. Quelques secondes plus tard, le code est propre, il fonctionne et la démo se passe à merveille.",
      block1: "Deux semaines plus tard, un vrai utilisateur envoie un fichier auquel personne n’avait pensé. La fonctionnalité tombe en panne ou, pire, elle permet discrètement à quelqu’un de faire ce qu’il ne devrait pas pouvoir faire.",
      block2: "L’étudiant n’a jamais appris comment la gestion des fichiers peut mal tourner, alors il ne savait pas quoi vérifier. Rien ne semblait défaillant. C’était justement tout le problème.",
      block3: "Illustration d’un éditeur de code affichant une fonction d’envoi de photos, des tests réussis et un point d’interrogation à côté d’une ligne de code.",
    },
    "the-debate-everyone-knows": {
      title: "Le débat que tout le monde connaît",
      block0: "Spécialiste ou généraliste ? Les spécialistes creusent un domaine et sont rémunérés pour une expertise rare. Les généralistes explorent de nombreux domaines et s’adaptent vite.",
      block1: "Les deux camps ont de bons arguments, ce qui explique pourquoi le débat ne finit jamais. Je pense que c’est la manière même de poser la question qui ne va pas, et l’IA en est la raison.",
    },
    "what-ai-takes-away-from-both-sides": {
      title: "Ce que l’IA retire aux deux camps",
      block0: "L’IA a rendu le savoir généraliste bon marché. Posez une question sur presque n’importe quel domaine et vous obtiendrez en quelques secondes une vue d’ensemble présentée avec assurance. Cela pénalise le généraliste dont l’atout était de connaître un peu de tout.",
      block1: "Elle met aussi sous pression le spécialiste d’un domaine très étroit, car les tâches routinières au sein d’un seul outil sont précisément ce que l’IA fait le mieux.",
      block2: "Alors, qu’est-ce qui reste rare ?",
      block3: "Les connaissances générales sont devenues bon marché. Le discernement, non.",
    },
    "depth-is-now-a-verification-skill": {
      title: "La profondeur est désormais une compétence de vérification",
      block0: "L’IA peut créer une fonctionnalité opérationnelle en quelques secondes. Quelqu’un doit encore décider si elle est correcte, sûre, efficace et utilisable, et cela demande une véritable compréhension du code, des données et de la conception des systèmes.",
      block1: "Avant, approfondir signifiait produire davantage. Maintenant, c’est être la personne capable de dire : « Ça a l’air juste, mais ça ne l’est pas. »",
      block2: "Pourriez-vous expliquer chaque ligne de la dernière chose que l’IA a écrite pour vous ?",
      block3: "Illustration d’un bureau de développeur avec une comparaison de code, des erreurs surlignées et des questions de revue de code écrites à la main.",
    },
    "specialize-in-a-problem-not-a-tool": {
      title: "Se spécialiser dans un problème, pas dans un outil",
      block0: "Pour quelqu’un qui construit des choses, la spécialité la plus durable est le problème d’un utilisateur. L’IA peut écrire le code, mais décider quoi construire, pour qui et si cela aide vraiment ces personnes reste ma responsabilité.",
      block1: "Prenez un problème, par exemple la façon dont les étudiants de première année suivent leurs échéances, et creusez-le. Vous vous retrouvez à explorer le design, la programmation, les données et le domaine lui-même : la diversité des connaissances vient donc naturellement.",
      block2: "Mais cette compréhension approfondie d’un problème ne dure que si je continue à apprendre.",
      block3: "Schéma reliant un problème utilisateur au design, au code, aux données et à la connaissance du domaine.",
    },
    "learning-how-to-learn-is-the-durable-specialty": {
      title: "Apprendre à apprendre est la spécialité qui dure",
      block0: "Les frameworks et les langages changent sans cesse. Ces fondamentaux, non :",
      block1item0: "La logique", block1item1: "L’abstraction", block1item2: "Le débogage", block1item3: "La compréhension des utilisateurs",
      block2: "Les trois premiers me permettent de prendre en main n’importe quel nouvel outil. Le dernier m’indique quel outil mérite que je m’y mette.",
      block3: "Les outils deviennent obsolètes. L’habitude d’approfondir, non.",
      block4: "Schéma en T dont la barre horizontale représente la curiosité pour différents domaines et la barre verticale un discernement fondé sur une compréhension approfondie.",
    },
    "the-trap-of-the-fast-answer": {
      title: "Le piège de la réponse rapide",
      block0: "Ce qui m’inquiète le plus, c’est de livrer du code généré par IA que je ne comprends pas. Il fonctionne jusqu’au jour où il ne fonctionne plus, et un vrai utilisateur en subit les conséquences pendant que je fixe du code dont je n’arrive pas à comprendre la logique.",
      block1: "Le temps que j’ai gagné revient me réclamer son dû, avec les intérêts, au pire moment.",
      block2: "La solution n’est pas d’éviter l’IA. C’est d’abord de se confronter aux fondamentaux, puis d’utiliser l’IA pour aller plus loin que je ne pourrais aller seul.",
      block3: "Illustration d’une main qui démêle progressivement une ficelle bleu-vert nouée pour en faire une ligne droite.",
    },
    "wont-my-expertise-expire-before-i-finish-building-it": {
      title: "« Mon expertise ne sera-t-elle pas dépassée avant même que j’aie fini de l’acquérir ? »",
      block0: "La question est légitime. Les connaissances spécifiques vieillissent bel et bien, et une bibliothèque que je maîtrise aujourd’hui pourrait ne plus être pertinente dans cinq ans.",
      block1: "Les habitudes qui sous-tendent une étude approfondie ne vieillissent pas : rigueur, scepticisme, bons modèles mentaux. Je les emporte dans chaque nouveau domaine, et c’est grâce à elles que je peux juger une réponse dans un domaine auquel je n’ai jamais touché.",
      block2: "Alors, que ferais-je concrètement aujourd’hui ?",
    },
    "what-id-do-if-i-started-today": {
      title: "Ce que je ferais si je commençais aujourd’hui",
      block0item0Lead: "Construire et publier de vrais projets.", block0item0: " Quelque chose qui a de vrais utilisateurs vaut mieux que dix tutoriels.",
      block0item1Lead: "Relire le code de l’IA ligne par ligne.", block0item1: " Si je ne peux pas l’expliquer, je ne le livre pas.",
      block0item2Lead: "Parler à de vrais utilisateurs.", block0item2: " Leurs problèmes déterminent ce qui mérite d’être construit.",
      block0item3Lead: "Apprendre les fondamentaux en profondeur.", block0item3: " Les structures de données, les systèmes et le débogage d’abord, les raccourcis ensuite.",
      block2: "Dépôt fictif aurora-app présentant des exemples de tickets sur la prise en main, l’affichage mobile, le mode sombre, la documentation et les raccourcis.",
    },
    "back-to-the-demo": {
      title: "Retour à la démo",
      block0: "Revenons à l’étudiant et à l’envoi de photos. La solution n’a jamais été un meilleur prompt. C’était d’en savoir assez pour demander : « Que se passe-t-il si quelqu’un envoie un fichier auquel je n’avais pas pensé ? »",
      block1: "Cette question vient de la profondeur. La relier aux utilisateurs et à d’autres domaines vient de la curiosité. Recommencer quand les outils changent vient de la capacité d’adaptation.",
      block2: "Approfondissez assez pour douter de la machine, élargissez vos horizons pour relier les idées qu’elle ne peut pas relier, et restez assez adaptable pour recommencer.",
    },
  },
} satisfies ArticleTranslation;
