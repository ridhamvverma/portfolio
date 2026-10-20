import type { ArticleTranslation } from "./en";
import { translations } from "@/lib/i18n/translations";
export const de = {
  title: translations.de.firstArticleTitle,
  summary: "KI hat breites Wissen billig gemacht. Knapp ist heute die Fähigkeit, genug von einer Sache zu verstehen, um beurteilen zu können, was die Maschine einem sagt.",
  byline: "Von Ridham Verma", backWriting: "← Beiträge", backToWriting: "← Zurück zu den Beiträgen",
  onThisPage: "Auf dieser Seite", sectionsLabel: "Abschnitte des Artikels", portfolioLabel: "Zurück zum Portfolio von Ridham Verma",
  sections: {
    "the-demo-that-worked-perfectly": {
      title: "Die Demo, die perfekt funktionierte",
      block0: "Ein Student bittet eine KI, seiner App einen Upload für Profilfotos hinzuzufügen. Sekunden später ist der Code sauber, er läuft, und die Demo klappt hervorragend.",
      block1: "Zwei Wochen später lädt ein echter Nutzer etwas hoch, womit niemand gerechnet hat. Die Funktion geht kaputt oder, noch schlimmer, erlaubt jemandem unbemerkt etwas, das nicht erlaubt sein sollte.",
      block2: "Der Student hat nie gelernt, was beim Umgang mit Dateien schiefgehen kann. Deshalb wusste er nicht, was er prüfen musste. Nichts wirkte kaputt. Genau das war das Problem.",
      block3: "Illustrativer Code-Editor mit einer Foto-Upload-Funktion, bestandenen Tests und einem Fragezeichen neben einer Codezeile.",
    },
    "the-debate-everyone-knows": {
      title: "Die Debatte, die jeder kennt",
      block0: "Spezialist oder Generalist? Spezialisten gehen in die Tiefe und werden für seltenes Fachwissen bezahlt. Generalisten kennen viele Bereiche und passen sich schnell an.",
      block1: "Beide Seiten haben gute Belege, weshalb die Diskussion nie endet. Ich glaube, schon die Fragestellung ist falsch, und KI ist der Grund dafür.",
    },
    "what-ai-takes-away-from-both-sides": {
      title: "Was KI beiden Seiten nimmt",
      block0: "KI hat breites Wissen billig gemacht. Frag nach fast irgendeinem Fachgebiet, und du bekommst in Sekunden einen selbstsicher formulierten Überblick. Das trifft den Generalisten, dessen Stärke darin bestand, von allem ein bisschen zu wissen.",
      block1: "Auch der eng spezialisierte Experte gerät unter Druck, denn Routinearbeit mit einem einzigen Werkzeug ist genau das, was KI am besten kann.",
      block2: "Was bleibt also knapp?",
      block3: "Breites Wissen ist jetzt billig. Urteilskraft nicht.",
    },
    "depth-is-now-a-verification-skill": {
      title: "Tiefes Verständnis ist jetzt eine Fähigkeit zur Überprüfung",
      block0: "KI kann in Sekunden eine funktionierende Anwendungskomponente bauen. Jemand muss trotzdem entscheiden, ob sie korrekt, sicher, effizient und benutzbar ist. Dafür braucht es echtes Verständnis von Code, Daten und Systemdesign.",
      block1: "Früher hieß Tiefe, mehr zu produzieren. Heute heißt es, derjenige zu sein, der sagen kann: „Das sieht richtig aus, ist es aber nicht.“",
      block2: "Könntest du jede Zeile des letzten Codes erklären, den KI für dich geschrieben hat?",
      block3: "Illustration eines Entwickler-Schreibtischs mit einem Codevergleich, markierten Fehlern und handschriftlichen Fragen zur Codeprüfung.",
    },
    "specialize-in-a-problem-not-a-tool": {
      title: "Spezialisiere dich auf ein Problem, nicht auf ein Werkzeug",
      block0: "Für jemanden, der Dinge baut, ist das Problem eines Nutzers die dauerhafteste Spezialisierung. KI kann den Code schreiben. Aber zu entscheiden, was ich baue, für wen und ob es diesen Menschen tatsächlich hilft, bleibt meine Aufgabe.",
      block1: "Nimm ein Problem, etwa wie Studierende im ersten Jahr ihre Abgabetermine im Blick behalten, und geh in die Tiefe. Dabei wirst du in Design, Programmierung, Daten und das Fachgebiet selbst hineingezogen. Die Breite kommt also von allein dazu.",
      block2: "Aber tiefes Verständnis eines Problems bleibt nur erhalten, wenn ich weiterlerne.",
      block3: "Diagramm, das ein Nutzerproblem mit Design, Code, Daten und Fachwissen verbindet.",
    },
    "learning-how-to-learn-is-the-durable-specialty": {
      title: "Lernen zu lernen ist die Spezialisierung, die bleibt",
      block0: "Frameworks und Programmiersprachen ändern sich ständig. Diese Grundlagen nicht:",
      block1item0: "Logik", block1item1: "Abstraktion", block1item2: "Fehlersuche", block1item3: "Nutzer verstehen",
      block2: "Die ersten drei helfen mir, mich in jedes neue Werkzeug einzuarbeiten. Der letzte Punkt zeigt mir, welches Werkzeug die Mühe wert ist.",
      block3: "Werkzeuge veralten. Die Gewohnheit, in die Tiefe zu gehen, nicht.",
      block4: "T-förmiges Diagramm mit fachübergreifender Neugier als waagerechtem Balken und fundierter Urteilskraft als senkrechtem Balken.",
    },
    "the-trap-of-the-fast-answer": {
      title: "Die Falle der schnellen Antwort",
      block0: "Was mir am meisten Sorgen macht, ist, KI-generierten Code auszuliefern, den ich nicht verstehe. Er funktioniert, bis er es nicht mehr tut. Dann ist ein echter Nutzer betroffen, während ich auf Code starre, dessen Logik ich nicht nachvollziehen kann.",
      block1: "Die gesparte Zeit fordert ihren Preis zurück, mit Zinsen und im schlimmsten Moment.",
      block2: "Die Lösung ist nicht, KI zu meiden. Sie besteht darin, zuerst mit den Grundlagen zu ringen und KI dann zu nutzen, um weiter zu kommen, als ich es allein könnte.",
      block3: "Illustration einer Hand, die eine petrolfarbene Schnur langsam von einem Knoten zu einer geraden Linie entwirrt.",
    },
    "wont-my-expertise-expire-before-i-finish-building-it": {
      title: "„Ist mein Fachwissen nicht schon veraltet, bevor ich es fertig aufgebaut habe?“",
      block0: "Eine berechtigte Frage. Konkretes Wissen altert tatsächlich, und eine Bibliothek, die ich heute beherrsche, kann in fünf Jahren bedeutungslos sein.",
      block1: "Die Gewohnheiten hinter gründlichem Lernen altern nicht: Sorgfalt, Skepsis und gute mentale Modelle. Ich nehme sie in jedes neue Fachgebiet mit. Sie ermöglichen mir, eine Antwort in einem Bereich zu beurteilen, mit dem ich mich noch nie beschäftigt habe.",
      block2: "Was würde ich also jetzt konkret tun?",
    },
    "what-id-do-if-i-started-today": {
      title: "Was ich tun würde, wenn ich heute anfinge",
      block0item0Lead: "Echte Projekte bauen und veröffentlichen.", block0item0: " Etwas mit tatsächlichen Nutzern ist mehr wert als zehn Tutorials.",
      block0item1Lead: "KI-Code Zeile für Zeile prüfen.", block0item1: " Wenn ich ihn nicht erklären kann, liefere ich ihn nicht aus.",
      block0item2Lead: "Mit echten Nutzern sprechen.", block0item2: " Ihre Probleme entscheiden, was sich zu bauen lohnt.",
      block0item3Lead: "Die Grundlagen gründlich lernen.", block0item3: " Datenstrukturen, Systeme und Fehlersuche zuerst, Abkürzungen danach.",
      block2: "Fiktives aurora-app-Repository mit beispielhaften Meldungen zu Einführung, mobilem Layout, Dunkelmodus, Dokumentation und Tastenkürzeln.",
    },
    "back-to-the-demo": {
      title: "Zurück zur Demo",
      block0: "Zurück zum Studenten mit dem Foto-Upload. Die Lösung war nie ein besserer Prompt. Sie bestand darin, genug zu wissen, um zu fragen: „Was passiert, wenn jemand etwas hochlädt, womit ich nicht gerechnet habe?“",
      block1: "Diese Frage entsteht aus Tiefe. Die Verbindung zu Nutzern und anderen Fachgebieten entsteht aus Neugier. Neu anzufangen, wenn sich die Werkzeuge ändern, entsteht aus Anpassungsfähigkeit.",
      block2: "Geh tief genug, um an der Maschine zu zweifeln, erweitere deinen Horizont, um Ideen zu verbinden, die sie nicht verbinden kann, und bleib anpassungsfähig genug, um neu anzufangen.",
    },
  },
} satisfies ArticleTranslation;
