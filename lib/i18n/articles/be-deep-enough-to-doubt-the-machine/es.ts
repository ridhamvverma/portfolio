import type { ArticleTranslation } from "./en";
import { translations } from "@/lib/i18n/translations";
export const es = {
  title: translations.es.firstArticleTitle,
  summary: "La IA ha abaratado el conocimiento general. Lo escaso ahora es saber lo suficiente sobre algo como para juzgar lo que te dice la máquina.",
  byline: "Por Ridham Verma", backWriting: "← Escritos", backToWriting: "← Volver a Escritos",
  onThisPage: "En esta página", sectionsLabel: "Secciones del artículo", portfolioLabel: "Volver al portafolio de Ridham Verma",
  sections: {
    "the-demo-that-worked-perfectly": {
      title: "La demo que funcionó a la perfección",
      block0: "Un estudiante le pide a una IA que añada la subida de fotos de perfil a su aplicación. Segundos después tiene código limpio, funciona y la demo sale de maravilla.",
      block1: "Dos semanas después, un usuario real sube algo que nadie esperaba. La función falla o, peor aún, permite en silencio que alguien haga algo que no debería.",
      block2: "El estudiante nunca aprendió cómo puede fallar la gestión de archivos, así que no sabía qué comprobar. Nada parecía estar roto. Ese era precisamente el problema.",
      block3: "Editor de código ilustrativo que muestra una función para subir fotos, pruebas superadas y un signo de interrogación junto a una línea de código.",
    },
    "the-debate-everyone-knows": {
      title: "El debate que todos conocen",
      block0: "¿Especialista o generalista? Los especialistas profundizan y cobran por una experiencia poco común. Los generalistas abarcan muchos campos y se adaptan rápido.",
      block1: "Ambos lados tienen buenos argumentos, por eso el debate nunca termina. Creo que el propio planteamiento es erróneo, y la IA es la razón.",
    },
    "what-ai-takes-away-from-both-sides": {
      title: "Lo que la IA les quita a ambos",
      block0: "La IA ha abaratado el conocimiento general. Pregunta sobre casi cualquier campo y obtendrás una visión de conjunto que suena convincente en segundos. Eso perjudica al generalista cuya ventaja era saber un poco de todo.",
      block1: "También presiona al especialista de ámbito estrecho, porque el trabajo rutinario dentro de una sola herramienta es precisamente lo que mejor hace la IA.",
      block2: "Entonces, ¿qué sigue siendo escaso?",
      block3: "Abarcar mucho ahora es barato. Tener criterio no.",
    },
    "depth-is-now-a-verification-skill": {
      title: "La profundidad es ahora una habilidad de verificación",
      block0: "La IA puede crear una función que funcione en segundos. Alguien tiene que decidir si es correcta, segura, eficiente y fácil de usar, y eso exige una comprensión real del código, los datos y el diseño de sistemas.",
      block1: "Antes, profundizar significaba producir más. Ahora significa ser quien puede decir: «Esto parece correcto, pero no lo es».",
      block2: "¿Podrías explicar cada línea de lo último que la IA escribió para ti?",
      block3: "Ilustración de un escritorio de desarrollo con una comparación de cambios de código, errores resaltados y preguntas de revisión escritas a mano.",
    },
    "specialize-in-a-problem-not-a-tool": {
      title: "Especialízate en un problema, no en una herramienta",
      block0: "Para alguien que crea cosas, la especialidad más duradera es el problema de un usuario. La IA puede escribir el código, pero decidir qué construir, para quién y si realmente les ayuda sigue siendo responsabilidad mía.",
      block1: "Toma un problema, como la forma en que los estudiantes de primer año llevan el control de sus fechas de entrega, y profundiza. Acabas entrando en diseño, programación, datos y el propio ámbito del problema, así que la amplitud llega por sí sola.",
      block2: "Pero la profundidad en un problema solo dura si sigo aprendiendo.",
      block3: "Diagrama que conecta un problema de usuario con diseño, código, datos y conocimiento del ámbito.",
    },
    "learning-how-to-learn-is-the-durable-specialty": {
      title: "Aprender a aprender es la especialidad que perdura",
      block0: "Los frameworks y los lenguajes cambian constantemente. Estas cosas no:",
      block1item0: "Lógica", block1item1: "Abstracción", block1item2: "Depuración", block1item3: "Comprender a los usuarios",
      block2: "Las tres primeras me permiten aprender a usar cualquier herramienta nueva. La última me indica qué herramienta merece la pena aprender.",
      block3: "Las herramientas caducan. El hábito de profundizar no.",
      block4: "Diagrama en forma de T con la curiosidad por distintos campos en la barra horizontal y el criterio profundo en la vertical.",
    },
    "the-trap-of-the-fast-answer": {
      title: "La trampa de la respuesta rápida",
      block0: "Lo que más me preocupa es publicar código generado por IA que no entiendo. Funciona hasta que deja de hacerlo, y entonces un usuario real sufre las consecuencias mientras yo miro un código cuyo funcionamiento no puedo razonar.",
      block1: "El tiempo que ahorré vuelve a pasarme factura con intereses, en el peor momento.",
      block2: "La solución no es evitar la IA. Es pelear primero con los fundamentos y después usar la IA para llegar más lejos de lo que podría llegar por mi cuenta.",
      block3: "Ilustración de una mano que desenreda poco a poco una cuerda de color verde azulado hasta convertir el nudo en una línea recta.",
    },
    "wont-my-expertise-expire-before-i-finish-building-it": {
      title: "«¿No caducarán mis conocimientos antes de terminar de adquirirlos?»",
      block0: "Es una pregunta razonable. El conocimiento específico sí envejece, y una biblioteca que domine hoy puede ser irrelevante dentro de cinco años.",
      block1: "Los hábitos que hay detrás del estudio profundo no envejecen: rigor, escepticismo y buenos modelos mentales. Los llevo conmigo a cada campo nuevo, y son los que me permiten juzgar una respuesta en un ámbito que nunca he tocado.",
      block2: "Entonces, ¿qué haría ahora en la práctica?",
    },
    "what-id-do-if-i-started-today": {
      title: "Lo que haría si empezara hoy",
      block0item0Lead: "Construir y publicar proyectos reales.", block0item0: " Algo con usuarios de verdad vale más que diez tutoriales.",
      block0item1Lead: "Revisar el código de la IA línea por línea.", block0item1: " Si no puedo explicarlo, no lo publico.",
      block0item2Lead: "Hablar con usuarios reales.", block0item2: " Sus problemas determinan qué merece la pena construir.",
      block0item3Lead: "Aprender los fundamentos a fondo.", block0item3: " Primero estructuras de datos, sistemas y depuración; después los atajos.",
      block2: "Repositorio ficticio de aurora-app con ejemplos de incidencias sobre la incorporación de usuarios, el diseño móvil, el modo oscuro, la documentación y los atajos.",
    },
    "back-to-the-demo": {
      title: "De vuelta a la demo",
      block0: "Volvamos al estudiante y su función para subir fotos. La solución nunca fue un prompt mejor. Era saber lo suficiente como para preguntar: «¿Qué pasa si alguien sube algo que no esperaba?».",
      block1: "Esa pregunta nace de la profundidad. Conectarla con los usuarios y con otros campos nace de la curiosidad. Volver a empezar cuando cambian las herramientas nace de la capacidad de adaptación.",
      block2: "Profundiza lo suficiente para cuestionar a la máquina, amplía tus horizontes para conectar ideas que ella no puede conectar y adáptate lo suficiente para volver a empezar.",
    },
  },
} satisfies ArticleTranslation;
