import { db, investigationsTable, resourcesTable } from "@workspace/db";

const investigations = [
  {
    slug: "galiana-soler",
    href: "/galiana-soler",
    period: "Segle XX",
    periodLabel: "Estudio insignia · Valencia, 1894–1966",
    title: "José E. Galiana Soler",
    role: "Aparejador, escritor y promotor turístico",
    text: "Una investigación biográfica completa a partir de dibujos, postales y documentos de archivo familiar, que reconstruye la transformación urbana de Valencia, el nacimiento del turismo moderno en la ciudad y la defensa del patrimonio monumental durante la primera mitad del siglo XX.",
    tags: ["Urbanismo", "Turismo", "Patrimonio"],
    featured: true,
    sortOrder: 0,
  },
];

const resources = [
  {
    title: "Arxiu del Regne de València",
    text: "Arxiu històric de referència per a la documentació institucional, notarial i judicial del antic Regne de València, dependent del Ministerio de Cultura.",
    url: "https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/arv/portada.html",
    category: "Archivo",
    tags: ["Archivo"],
    featured: false,
    sortOrder: 0,
  },
  {
    title: "Biblioteca Valenciana Nicolau Primitiu",
    text: "Fons patrimonial de referència para la bibliografia, hemeroteca i col·leccions gràfiques (làmines, postals, fotografia) relatives a la Comunitat Valenciana.",
    url: "https://www.bivaldi.gva.es/",
    category: "Biblioteca",
    tags: ["Biblioteca"],
    featured: false,
    sortOrder: 1,
  },
  {
    title: "PARES · Portal de Archivos Españoles",
    text: "Portal del Ministerio de Cultura que dona accés digital unificat als fons dels arxius estatals espanyols, imprescindible per a la recerca genealògica i històrica.",
    url: "https://pares.mcu.es/",
    category: "Archivo",
    tags: ["Archivo", "Genealogía"],
    featured: false,
    sortOrder: 2,
  },
  {
    title: "Arxiu Municipal de València",
    text: "Conserva la documentació generada per l'Ajuntament de València des de l'edat mitjana: padrons, actes, expedients d'obres i urbanisme, i fons fotogràfics municipals.",
    url: "https://www.valencia.es/cas/patrimonihistoric/arxiu-municipal-de-valencia",
    category: "Archivo",
    tags: ["Archivo"],
    featured: false,
    sortOrder: 3,
  },
  {
    title: "Real Academia de la Historia",
    text: "Institució de referència per a la contextualització historiogràfica general d'Espanya, amb diccionaris biogràfics i col·leccions documentals consultables en línia.",
    url: "https://www.rah.es/",
    category: "Institución",
    tags: ["Historiografía"],
    featured: false,
    sortOrder: 4,
  },
  {
    title: "Archivo Histórico Nacional",
    text: "Custòdia fons estatals de gran abast cronològic i temàtic, essencials per a creuar la microhistòria familiar amb els grans processos de la història d'Espanya.",
    url: "https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/ahn/portada.html",
    category: "Archivo",
    tags: ["Archivo"],
    featured: false,
    sortOrder: 5,
  },
  {
    title: "Historia Familiar · Curso interactivo (Tragacripto)",
    text: "Curso interactivo en línea sobre genealogía e historia familiar, con módulos, lecciones y ejercicios prácticos para reconstruir árboles genealógicos y contextualizar trayectorias familiares.",
    url: "https://tragamillas.github.io/Tragacripto/",
    category: "Curso interactivo",
    tags: ["Genealogía", "Curso"],
    featured: true,
    sortOrder: 6,
  },
];

async function main() {
  for (const inv of investigations) {
    await db
      .insert(investigationsTable)
      .values(inv)
      .onConflictDoNothing({ target: investigationsTable.slug });
  }

  const existingResources = await db.select({ url: resourcesTable.url }).from(resourcesTable);
  const existingUrls = new Set(existingResources.map((r) => r.url));

  for (const res of resources) {
    if (existingUrls.has(res.url)) continue;
    await db.insert(resourcesTable).values(res);
  }

  console.log(`Seeded ${investigations.length} investigations and ${resources.length} resources (skipping duplicates).`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
