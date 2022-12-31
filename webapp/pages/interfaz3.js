const panelId = /id=(.*)/.exec(window.location.search)[1]

const COLUMN_CLASS = 'columna'

const modalEdicionTarjeta = new bootstrap.Modal('#modal-edicion-tarjeta')
const modalEdicionTarjetaForm = document.getElementById('edicion-tarjeta-form')

const modalEdicionTarjetaTitleElement = document.getElementById('modal-edicion-tarjeta-title')
const modalEdicionTarjetaDescriptionElement = document.getElementById('modal-edicion-tarjeta-description')
const modalEdicionTarjetaModificarElement = document.getElementById('modal-edicion-tarjeta-modificar')

function allowDrop(event) {
  event.preventDefault();
}

function handleDrag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function handleDrop(event) {
  if (!event.target.className?.includes(COLUMN_CLASS)) {
    return
  }

  const currentColumn = event.target.getAttribute("data-columna");

  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));

  console.log('./data', data, currentColumn)

  window.moveTarea(data, currentColumn, sessionUserName)

  // window.ioAPI.moveTarea(data, { columna: currentColumn })
}

const people = [
  "María José Naranjo",
  "Verónica Acuña",
  "Leonor Anguiano",
  "Rubén Negrón",
  "Antonio Hernádez",
  "José Emilio Girón",
  "Sta. Julio Cazares",
  "Marisol Toledo",
  "Inés Tamez",
  "Lorena Negrete",
  "Marco Antonio Baeza",
  "Teresa Delagarza",
  "Sr. Marco Antonio Aguayo",
  "Rosalia Carrion III",
  "Joaquín Ocampo",
  "Adriana Polanco Jr.",
  "Catalina Valladares",
  "Adán Segura III",
  "César Medina",
  "Sonia Matos",
  "Diana Zapata PhD",
  "Sta. Manuela Alicea",
  "Sta. Alfonso Villagómez",
  "Sra. Raúl Medrano",
  "Olivia Vargas",
  "Pedro Valdez",
  "Víctor Escamilla",
  "Sr. Ernesto Perales",
  "Miguel Tamez",
  "Mariana Rodarte",
  "Samuel González",
  "Santiago Posada",
  "Guillermo Garza",
  "Francisco Urbina",
  "Benito Casas",
  "Sra. Adela Quesada",
  "Andrea Ruelas",
  "Fernando Cano Jr.",
  "Ernesto Colunga",
  "Julio César Patiño",
  "Alejandra Roybal",
  "Lourdes Tijerina III",
  "Carolina Laboy",
  "Martín Sánchez",
  "Santiago Vera",
  "Emilio Hinojosa",
  "Miguel Montenegro",
  "Sonia Guerrero",
  "Estela Ulloa",
  "Pedro Collazo",
  "Martín Madrigal",
  "Alfredo Puga",
  "Jerónimo Amaya",
  "Maricarmen Alanis",
  "Roberto Fajardo",
  "Mario Chapa",
  "Sta. Bernardo Benavides",
  "Sr. Natalia Gaytán",
  "Sta. Gonzalo González",
  "Ana María Venegas",
  "Joaquín Nájera",
  "Sr. Ana Garrido",
  "Vicente Sánchez",
  "Alfredo Sanches",
  "Patricia Luevano",
  "Berta Duarte",
  "Blanca Fuentes",
  "María Soledad Guzmán",
  "Irene Sandoval",
  "Tomás Portillo",
  "Natalia Córdova",
  "Marisol Ulloa",
  "Sr. Carlos Benavides",
  "Caridad Guajardo",
  "María Pichardo DDS",
  "Yolanda Bañuelos",
  "Sancho Aguirre",
  "Sr. Sara Trejo",
  "David Salcedo",
  "Gilberto Dueñas",
  "Andrés Mena",
  "Adán Laureano",
  "Ricardo Bañuelos",
  "Ramiro Lozano",
  "Pablo Barrios",
  "César Acosta",
  "Ana Zambrano I",
  "Sr. Alfredo Lara",
  "Lorena Rosas",
  "Patricia Arteaga",
  "Alicia Lozada",
  "Gabriel Armendáriz",
  "Carmen Benavides",
  "Luz Díaz",
  "Cecilia Contreras PhD",
  "José Eduardo Longoria",
  "Leonor Alcaraz",
  "Claudia Urbina",
  "Gregorio Briseño",
  "Eloisa Solorzano",
  "Elvira Lomeli",
  "Leticia González MD",
  "Sr. Sara Morales",
  "José Cazares",
  "Adela Longoria",
  "Olivia Amaya",
  "Sra. Javier Arriaga",
  "Adela Mireles II",
  "Guadalupe Pizarro",
  "Teodoro Dueñas",
  "Marco Antonio Garza",
  "Sra. Concepción Delatorre",
  "Alfonso Sotelo",
  "María Teresa Palomo",
  "Horacio Otero",
  "Manuela Narváez",
  "Natalia Cerda",
  "Claudio Bermúdez",
  "Rocio Lovato III",
  "Carla Santillán",
  "Benito García",
  "Andrés Reséndez",
  "Jorge Luis Velásquez",
  "María Eugenia Mayorga",
  "José Luis Medina",
  "Norma Rosas",
  "Barbara Urías",
  "Lourdes Zavala",
  "Gerardo Zarate IV",
  "Gabriela Gutiérrez",
  "Sta. Florencia Coronado",
  "Blanca Serna",
  "Juan Carlos Oquendo",
  "Claudia Véliz",
  "Rubén Oquendo",
  "Reina Verduzco",
  "Anita Báez",
  "Hugo Jimínez",
  "Elena Cordero",
  "Cristina Miranda",
  "Julia Carrillo",
  "Javier Medrano IV",
  "Carmen Chacón",
  "Rosa Benavídez",
  "Luis Corrales",
  "Julio César Sepúlveda",
  "Sr. Alejandro Hernandes",
  "Juan Carlos Delgadillo",
  "Mariana Bermúdez",
  "Julio César Tello",
  "Sra. Arturo Vázquez",
  "Pedro Olivárez",
  "Adriana Aragón Sr.",
  "Ana Luisa Ozuna",
  "Daniela González",
  "Luis Miguel Ceja",
  "Javier Angulo",
  "Sr. Isabel Esquivel",
  "Timoteo Alonso",
  "Margarita Benavídez",
  "Andrés Valle",
  "Mateo Muñoz",
  "Yolanda Jaime",
  "Rebeca Nieves",
  "José Eduardo Gálvez",
  "Yolanda Véliz",
  "Manuel Serna",
  "Mateo Trujillo",
  "Daniel Ramón",
  "José Emilio Perea",
  "Sta. Marcos Escalante",
  "Timoteo Pulido",
  "Teresa Mateo Jr.",
  "Jacobo Cornejo",
  "Gustavo Casanova",
  "Elsa Arenas",
  "Gonzalo Longoria",
  "Sra. Teresa Jimínez",
  "Ramiro Ornelas MD",
  "Anita Oquendo",
  "Rebeca Ortega",
  "Leticia Serna",
  "Alejandra Girón II",
  "Marco Antonio Olmos",
  "Julia Maldonado",
  "Sr. Javier Borrego",
  "Yolanda Velázquez II",
  "Sergio Delafuente",
  "Juan Ozuna",
  "Sr. Elisa Agosto",
  "Gabriel Lovato",
  "Carolina Madera",
  "Virginia Bravo",
  "Elena Linares",
  "Martín Nazario",
  "Rosalia Ybarra II",
  "Andrea Ávalos",
  "Arturo Alonzo",
  "Mateo Rosas",
  "Concepción Jaime PhD",
  "Sr. Ángela Vela",
  "Ramiro Ayala",
  "Juan Carlos Villegas",
  "Josefina Galarza",
  "Elsa Arteaga",
  "Homero Burgos",
  "Leticia Alfaro",
  "Sra. José María Luna",
  "Leticia Armijo",
  "María del Carmen Arevalo",
  "Adela Cabrera",
  "Julio Nava",
  "Francisca Gálvez",
  "Jacobo Amador",
  "Sr. Micaela Rojas",
  "Benito Gastélum",
  "Sta. Guillermo García",
  "Sr. Emilio Miramontes",
  "Carolina Magaña III",
  "Antonio Ríos",
  "Leticia Rosas DVM",
  "Agustín Rincón",
  "María del Carmen Jáquez",
  "Alejandra Laboy",
  "Lorena Toro",
  "Rubén Molina",
  "Ramón Enríquez",
  "Sta. Carolina Villalpando",
  "Berta García",
  "Florencia Ornelas",
  "Sta. Graciela Sotelo",
  "Alejandro Rincón",
  "Enrique Moya",
  "Benito Hernández",
  "Rosalia Saavedra",
  "Sergio Nazario",
  "Sra. Dolores Quintana",
  "Elisa Burgos",
  "Carmen Limón",
  "Óscar Rosales III",
  "Ignacio Saiz",
  "Claudio Medina",
  "Ramiro Guajardo DVM",
  "Samuel Valles",
  "Lorenzo Vera",
  "Conchita Melgar",
  "Francisco Pizarro",
  "Isabel Carrillo",
  "Rebeca Ocampo IV",
  "Micaela Merino",
  "Clemente Mota",
  "Jerónimo Ríos",
  "Alejandro Vásquez",
  "Lola Armijo",
  "Marcos Huerta I",
  "Lorena Fuentes",
  "María Luisa Delao",
  "Homero Romo",
  "Magdalena Báez Sr.",
  "Alicia Anguiano",
  "Olivia Laboy",
  "Federico Sánchez I",
  "María Luisa Cotto",
  "Jorge Luis Alcaraz",
  "Barbara Saiz",
  "María Trujillo",
  "Sra. Alfonso Páez",
  "Benito Alcala",
  "Ángela Franco",
  "Lilia Salcedo",
  "Sancho Echevarría",
  "Francisco Tovar",
  "Débora Ureña",
  "José María Puente",
  "Carolina Rojas",
  "Sta. Francisco Alonzo",
  "Homero Tapia",
  "Horacio Rico",
  "Isabel Rael",
  "Graciela Zamora",
  "Gabriel Gamboa",
  "Mayte Tapia",
  "Juana Guardado",
  "Verónica Macías",
  "Diego Botello",
  "Victoria Lara",
  "Sra. Rosa Quiroz",
  "Rosalia Merino",
  "Jacobo Tapia",
  "Jorge Luis Carrion",
  "Marcos Valladares",
  "Victoria Villalobos DVM",
  "Adela Mota",
  "Raúl Mora",
  "Sra. Nicolás Mascareñas",
  "Gonzalo Trejo",
  "María Teresa Quiñones I",
  "Irene Mares",
  "Irene Alarcón",
  "César Maldonado",
  "Cristian Ballesteros",
  "Sra. Joaquín Ureña",
  "Bernardo Vigil",
  "Santiago Esquibel",
  "Mario Olivares",
  "Sr. José Luis Guillen",
  "Anita Bermúdez",
  "Florencia Valverde",
  "Cecilia Covarrubias",
  "Martín Rojas",
  "José Madrigal",
  "Olivia Quiñónez",
  "Rosario Caraballo",
  "Sr. Arturo Otero",
  "Amalia Suárez",
  "Roberto Lovato",
  "Elsa Echevarría",
  "María Luisa Ramos",
  "Eva Palacios",
  "Juan Carlos Sauceda",
  "Susana Cornejo",
  "Rocio Borrego",
  "Carolina Posada",
  "Lucia Montaño DVM",
  "Ramona Araña",
  "Guadalupe Muñiz",
  "Francisco Leyva",
  "Arturo Jaimes",
  "Sr. Verónica Véliz",
  "Luis Pichardo",
  "César Pabón",
  "Marilu Cabrera",
  "Sta. Silvia Agosto",
  "Sta. Mateo Gracia",
  "Mario Batista",
  "Sr. Elisa Cedillo",
  "Soledad Zavala",
  "Elena Alicea",
  "José María Cano",
  "José Luis Salcedo",
  "José Emilio Pedraza",
  "Sra. Rosalia Echevarría",
  "Gustavo Ortega",
  "Sr. Emilio Molina",
  "Vicente Valles",
  "Sra. Pedro Mora",
  "Cristobal Guardado",
  "Timoteo Vásquez",
  "Sr. Josefina Vaca",
  "Sra. Raúl Suárez",
  "Andrea Nava",
  "Sancho Montero",
  "Mercedes Sedillo",
  "Marcela Curiel PhD",
  "Sr. Fernando Mares",
  "Federico Girón",
  "Micaela López",
  "Yolanda Villegas",
  "María Soledad Santiago",
  "Antonia Regalado II",
  "Diana Aguirre",
  "Conchita Concepción",
  "Elvira Guzmán",
  "Lorena Montes",
  "Soledad Sanabria",
  "Rafael Díaz",
  "Berta Cotto",
  "Ramón Galarza",
  "Eduardo Rocha",
  "María Cristina González",
  "Teodoro Becerra",
  "Esperanza Puga",
  "Joaquín Calderón",
  "Juan Coronado",
  "Teodoro Araña",
  "Alejandro Montaño",
  "Marisol Ochoa",
  "Julia Cardona",
  "Miguel Alba",
  "Sra. Margarita Garay",
  "Reina Ibarra",
  "Victoria Amaya",
  "Catalina Barajas",
  "Sra. Ester Carrillo",
  "Alejandra Roybal",
  "Eloisa Palacios",
  "María Méndez",
  "Tomás Ordóñez",
  "Marco Antonio Garay",
  "Andrés Domínquez III",
  "Sta. Lourdes Nevárez",
  "Ricardo Rosado",
  "Jerónimo Enríquez",
  "Verónica Mendoza",
  "Sta. Armando Alcala",
  "Débora Escalante",
  "Diana Villarreal",
  "Vicente Cadena",
  "Sra. Eduardo Deleón",
  "Sta. Mariana Rosas",
  "Berta Rojas",
  "Hugo Almonte",
  "Carmen García",
  "Sara Montez",
  "Inés Menchaca Jr.",
  "Dorotea Trejo",
  "Andrea Becerra IV",
  "Ángela Rubio",
  "Eloisa Jaramillo",
  "Benito Leiva",
  "Luis Padilla",
  "Cecilia Fierro",
  "Ricardo Jaimes",
  "Florencia Monroy",
  "Lilia Adame",
  "Andrés Santillán",
  "Yolanda Villalpando",
  "Adela Grijalva",
  "Armando Rivas",
  "Roberto Saucedo",
  "Micaela Morales",
  "Francisca Valenzuela",
  "Leticia Quezada",
  "Fernando Urbina",
  "Patricia Rojas",
  "Lorenzo Orta",
  "Soledad Ávila",
  "Sra. Alberto Ortiz",
  "Pedro Llamas",
  "Sr. Raúl Rojas",
  "Juan Carlos Rubio",
  "Cecilia Nájera",
  "Federico Ceballos",
  "Alejandro Armendáriz IV",
  "Carlota Quiñones",
  "Sra. Isabel Caballero",
  "Gerardo Rubio",
  "Guillermina de Jesús",
  "José Emilio Ornelas",
  "Alberto Águilar",
  "Sr. Victoria Barraza",
  "Martín Montez",
  "Benjamín Laboy",
  "Hernán Maya",
  "José María Abeyta",
  "Cecilia Bétancourt",
  "José Eduardo Gamez",
  "Sra. Dorotea Quiñones",
  "Germán Soto",
  "Josefina Castro",
  "Marisol Riojas",
  "Jorge Centeno DVM",
  "Elvira Bétancourt",
  "Alicia Bernal I",
  "Amalia Abreu IV",
  "Elisa Vera",
  "Ernesto Carrasco",
  "María José Espinal",
  "Sr. Andrés Gallegos",
  "Manuel Serrato",
  "Beatriz Véliz",
  "Barbara Madrid IV",
  "Víctor Padilla",
  "Luis Miguel Galarza",
  "Anita Navarro",
  "Cecilia Serna MD",
  "Arturo Holguín",
  "Carlos Armenta",
  "Patricia Corrales",
  "Virginia Gollum",
  "Rosa Leiva",
  "Sra. Marcos Flórez",
  "Horacio Barrios",
  "Ramiro Negrón",
  "Enrique Leiva",
  "Susana Pizarro",
  "Jaime Lerma",
  "Luisa Rodríquez",
  "Jorge Luis Cortés DDS",
  "Víctor Covarrubias",
  "Sra. Esperanza Quintana",
  "Ángela Tijerina",
  "Amalia Gamez DVM",
  "Mariano Molina",
  "Sta. Carolina Amador",
  "Gustavo Peralta DDS",
  "Sergio Salgado",
  "Laura Polanco",
  "Jorge Luis Rascón",
  "Patricio Sáenz",
  "Pablo Madera",
  "María José Arroyo",
  "Nicolás Chávez",
  "Mariano Delvalle",
  "Laura Batista",
  "Sta. Andrea Fajardo",
  "Teresa Tapia IV",
  "María Soledad Delgadillo I",
  "Germán Segura",
  "Sta. Pablo Castillo",
  "Rubén Aranda",
  "Raquel Rico",
  "Gabriela Peña",
  "Patricio Carbajal",
  "Teresa Armas",
  "Carmen Velázquez",
  "Jorge Luis Caraballo",
  "Teodoro Casas",
  "Marcela Esquivel",
  "Arturo Cedillo",
  "Cecilia Heredia",
  "Luisa Matos PhD",
  "Sta. César Navarro",
  "Sta. Carlota Urías",
  "Yolanda Barajas MD",
  "Cristian Armenta",
  "Sra. Olivia Archuleta",
  "Ester Deleón",
  "Verónica Madera",
  "Sr. Rubén Mena",
  "Federico Ureña",
  "Esperanza Ballesteros",
  "Estela Olivares",
  "Juan Carlos González IV",
  "Rosario Figueroa",
  "Claudia Viera",
  "Sta. Joaquín Trejo",
  "Carlota Cepeda",
  "Benito Velázquez",
  "Conchita Santana",
  "Sr. Lilia Batista",
  "Gerardo Zepeda",
  "María Elena Molina III",
  "Sra. Ana María Pagan",
  "Ricardo Bustamante",
  "Roberto Quiroz",
  "Sr. Lorenzo Nájera",
  "Isabel Menéndez",
  "Martín Elizondo",
  "José Emilio Gómez",
  "Berta Cruz",
  "Mariana Esparza",
  "Gabriela Barragán",
  "Victoria Salas",
  "Jorge Luis Bahena",
  "Rocio Castellanos",
  "Sancho Carrion",
  "Claudio Covarrubias",
  "Hernán Salcedo Sr.",
  "César Delacrúz",
  "Sr. Ana María Pabón",
  "Ernesto Ybarra",
  "María Elena Robles",
  "Caridad Quintanilla",
  "Luis Miguel Jaramillo",
  "Sra. Ana Maldonado",
  "Irene Laboy",
  "Ángela Valdés DDS",
  "Sta. Agustín Garay",
  "Verónica Coronado",
  "Cristina Medrano",
  "Cristobal Quintana",
  "Patricia Almaraz",
  "Dolores Laboy",
  "Lorenzo Delvalle",
  "Juan Mata",
  "Homero de Anda",
  "Carolina Chacón",
  "Josefina Villalobos",
  "Miguel Chávez",
  "Rosa Montez",
  "Gustavo Lira",
  "Hugo Gollum",
  "Ricardo Lara",
  "Andrea Valenzuela",
  "Ramiro Cotto",
  "Sra. Pablo Godoy",
  "Gilberto Farías",
  "Mateo Arellano",
  "Mariana Fernández",
  "Francisca Santacruz",
  "Lilia Barreto",
  "Elvira Gurule",
  "Norma Quesada",
  "Horacio Rodarte",
  "Alfonso Grijalva",
  "Ernesto Guerra",
  "Miguel Ángel Espinoza",
  "Antonio Terán",
  "Lourdes Coronado",
  "Natalia Solís",
  "José Luis Dávila",
  "María Teresa Rascón",
  "Óscar Ocampo",
  "Salvador Miranda V",
  "Eduardo Paredes",
  "Santiago Torres",
  "Armando Delgado",
  "Daniel Concepción",
  "Sra. Alejandro Zayas",
  "Olivia Padilla",
  "Carlos Nieves",
  "Rubén Saldaña",
  "Catalina Garica DDS",
  "Virginia Rosado",
  "Cristina Orozco",
  "Yolanda Ballesteros",
  "Sra. Vicente Garrido",
  "Sr. Blanca Raya",
  "Sta. Maricarmen Segura",
  "Cristina Abeyta Sr.",
  "Julia Benítez",
  "Francisco Garica",
  "Nicolás Palomino",
  "Javier Meza",
  "Ana Bernal",
  "Anita Concepción",
  "Ana María Quiñones",
  "Timoteo Fernández",
  "Javier Cerda II",
  "Ángela Villalpando",
  "Juana Ferrer",
  "Luisa Tórrez",
  "Fernando Leiva",
  "Mariana Salazar",
  "Andrés Rojas",
  "Isabel Macías",
  "Luis Moya",
  "Martín Manzanares",
  "Sta. Lilia Santana",
  "Patricia Tafoya",
  "María José Melgar",
  "Alfredo Peralta",
  "Alfonso Pabón DVM",
  "Rosalia Rolón",
  "Sta. Ángela Terán",
  "Jesús Almanza",
  "Sr. Rafael Escalante",
  "Marcela González",
  "Luisa Armendáriz",
  "Jorge Salazar",
  "Antonia Arroyo",
  "Hernán Segovia",
  "Rosario Mojica",
  "Salvador Calvillo",
  "María Luisa Lomeli",
  "Roberto Maestas",
  "Lorenzo Almanza PhD",
  "Susana Carrero",
  "Timoteo Hurtado",
  "Timoteo Lara",
  "Vicente Cortés",
  "Roberto Saldaña",
  "Alberto Perales",
  "Ana María Valencia",
  "Carlos Briseño",
  "Pilar Rangel",
  "Beatriz Quiroz",
  "Sta. María Elena Rosas",
  "Florencia Rosario PhD",
  "Sr. Mario Mota",
  "Jorge Sosa",
  "Margarita Camacho",
  "Santiago Saucedo",
  "Daniel Lozada",
  "Sra. Magdalena Armendáriz",
  "Gerardo Zayas",
  "Sr. María Elena Ornelas",
  "José Menéndez",
  "Barbara Laureano",
  "José María Navarro",
  "Luz Benavídez MD",
  "Juan Coronado",
  "Cristina Maya III",
  "Sta. Rafael Perales",
  "Gloria Maldonado",
  "Ana Luisa Díaz",
  "Sergio Alcala",
  "Ignacio Garibay",
  "Alfonso Saldaña",
  "Florencia Rosario",
  "Natalia Arenas",
  "Gonzalo Galindo",
  "Marcela Muñiz",
  "Carlota Zapata",
  "Irene Espinosa II",
  "Francisco Calvillo",
  "Sofia Patiño",
  "Alfredo Ferrer",
  "Julio César Franco",
  "Clara Reyes",
  "Mateo Reséndez",
  "Armando Montez",
  "Sr. Beatriz Jiménez",
  "Antonio Jaime",
  "Emilia Pizarro PhD",
  "Ariadna Bernal",
  "Julio César Reyna",
  "Gabriela Banda MD",
  "Dorotea Abeyta V",
  "María José Marín",
  "Sergio Vela",
  "José María Figueroa",
  "Sr. Gonzalo Uribe",
  "Emilia Guevara",
  "Marisol Perea PhD",
  "Marcela Urbina",
  "Rocio Segura V",
  "Mariana Paz",
  "Fernando Zúñiga",
  "Florencia Mena",
  "Armando Aranda",
  "Josefina Alaniz",
  "Gonzalo Sauceda",
  "Ana María Valenzuela",
  "Ramón Ruelas",
  "Rocio Irizarry",
  "Laura Esquivel",
  "Jacobo Martínez",
  "Ignacio Zarate",
  "Juana Riojas",
  "Adán Irizarry",
  "Rosalia Peña",
  "Olivia Córdova",
  "Virginia Monroy PhD",
  "Federico Sosa",
  "Catalina Moreno",
  "Samuel Aragón",
  "Samuel Barraza",
  "Sra. María Teresa Lucero",
  "Pilar Sierra",
  "José Emilio Urías",
  "Blanca Tamez",
  "Diego Rosado",
  "Bernardo Perales MD",
  "Eva Candelaria",
  "Tomás Sierra",
  "Marcela Salcedo DVM",
  "Graciela Nava",
  "Rosalia Delacrúz",
  "Nicolás Torres",
  "Adriana Alfaro",
  "Marcos Muro",
  "Roberto Rodríquez",
  "Ramona Saucedo",
  "Conchita Toro",
  "Miguel Muñoz",
  "Sta. Mónica Carmona",
  "Cecilia Segura",
  "Magdalena Solorio",
  "Graciela Robledo",
  "Benito Villegas",
  "José Covarrubias",
  "Juan Longoria",
  "Ana Hernández",
  "Jorge Toledo PhD",
  "María Luisa Alonzo",
  "Magdalena Almanza DDS",
  "Ignacio Gastélum",
  "Octavio Tórrez",
  "Gabriela Manzanares",
  "Andrea Gil",
  "Maricarmen Campos",
  "Marta Negrón Sr.",
  "Samuel Quintana",
  "Luisa Espinal",
  "Sra. Mariano Soto",
  "Juan Carlos Almaraz",
  "Elena Dueñas",
  "Sra. Concepción Garrido",
  "Sara Roybal",
  "Jorge Luis Toledo Jr.",
  "Jerónimo Cantú",
  "Ramón Riojas",
  "Clara Berríos",
  "Marcela Matías",
  "Mercedes Sevilla",
  "Conchita Gallegos",
  "Andrés Botello",
  "Marco Antonio Valdez",
  "Carolina Madrigal",
  "Rosalia Barrientos",
  "Ramón Zayas",
  "Mónica Bravo",
  "Mariana Puente II",
  "Pablo Anguiano",
  "Mateo Rosas PhD",
  "Andrea Atencio II",
  "Horacio Navarro",
  "Sr. Bernardo Valdez",
  "Luz Delvalle",
  "Marcos Hernandes",
  "Elena Ríos",
  "Débora Lira",
  "Clara Sotelo",
  "Sara Ocasio II",
  "Diana Fuentes",
  "Sra. Isabel Urrutia",
  "Ana María Guerra",
  "Sr. Benjamín Naranjo",
  "Maricarmen Haro",
  "María José Vázquez",
  "Ramiro Olivera",
  "Rafael Rangel IV",
  "María Eugenia Lara I",
  "Patricio Valdivia",
  "José Emilio Arriaga",
  "Fernando Reynoso",
  "Graciela Noriega",
  "Sra. Lourdes Bernal",
  "José María Delapaz",
  "Ana Luisa Laboy",
  "Sra. Rubén Ramírez",
  "Juana Griego Sr.",
  "Blanca Gaitán",
  "Juan Limón IV",
  "Cristina Llamas",
  "Raquel Montoya III",
  "Carla Acosta",
  "Yolanda Villalpando",
  "Cristina Ruiz",
  "Nicolás Montero",
  "Sta. Sancho Pagan",
  "Antonio Alonzo",
  "Sra. Rafael Sotelo",
  "Jacobo Corona",
  "Mercedes Villanueva",
  "Leonor Flórez",
  "Emilio Muro",
  "Olivia Delrío",
  "Alejandro Nava",
  "María Preciado II",
  "Sra. Verónica Pabón",
  "Juan Carlos Orozco",
  "Federico Gollum",
  "Alejandra Bravo",
  "María Villegas",
  "María Eugenia Armenta",
  "Sra. Anita Uribe",
  "Marilu Mora",
  "Pedro Escalante",
  "Blanca Olivárez",
  "Pablo Sauceda",
  "Sta. Gonzalo Téllez",
  "Rafael Rodrígez",
  "Dolores Treviño",
  "Carlos Marroquín",
  "Mariana Carreón",
  "Mariana Delapaz",
  "Concepción Alonzo",
  "Soledad Loera",
  "Sr. Joaquín Orta",
  "Isabel Palomo",
  "Pablo Márquez",
  "Luisa Santiago",
  "Sr. Marcela Gracia",
  "Alberto Meza II",
  "Juan Carlos Ponce",
  "Micaela Mireles",
  "Marilu Zaragoza",
  "Andrés Crespo PhD",
  "Sancho Estrada",
  "Claudio Muñoz",
  "Antonia Vigil",
  "Carmen Sierra",
  "Sr. Joaquín Garza",
  "Adela Aguilera",
  "María Eugenia Córdova",
  "José Vega",
  "Sofia Guardado",
  "Jorge Luis Escalante PhD",
  "Sr. Ariadna Ortiz",
  "Andrea Ibarra",
  "Ignacio Muro",
  "Benito Centeno",
  "Pilar Mojica",
  "Elsa Aragón",
  "Sr. Cristian Urbina",
  "Sr. Irene Macías",
  "Fernando Ramón",
  "Armando Bustos",
  "Carmen Baca",
  "Óscar Díaz",
  "Gustavo Esquivel",
  "Eloisa Mojica",
  "Rodrigo Narváez",
  "Sra. Bernardo Baeza",
  "Sra. Jaime Gastélum",
  "Josefina Montez",
  "Juan Carlos Rodríquez",
  "Marta Galván",
  "Ignacio Peralta",
  "Gregorio Terrazas",
  "Ramón Ríos",
  "Marisol Villalobos",
  "Lilia Zamora V",
  "Caridad Cuellar",
  "Vicente Batista DVM",
  "Cecilia Haro",
  "Santiago Rendón",
  "Margarita Pulido",
  "Caridad Haro",
  "Sr. Natalia Vela",
  "Ana Aparicio",
  "Concepción Leal",
  "Alejandro Marrero",
  "Gabriel Collado",
  "María Mejía",
  "Sra. Francisco Agosto",
  "Lucia Galindo",
  "Miguel Mascareñas",
  "Sra. Yolanda Cordero",
  "David Saucedo",
  "Jorge Peres V",
  "Raúl Ureña",
  "Mariana Luevano",
  "Catalina Montoya",
  "Sra. Teodoro León",
  "Carmen Corral",
  "Jesús Gallegos",
  "Mariana Morales",
  "Sra. Lucia Mercado",
  "Benito Cavazos",
  "Sergio Espinal",
  "Micaela Barajas",
  "Sta. Ana Luisa Nevárez",
  "José Luis Cavazos",
  "Esperanza Rael",
  "Margarita Mares",
  "Inés Rentería",
  "Benjamín Ruiz",
  "Alfredo Montenegro",
  "María Eugenia Salgado",
  "Elvira Escamilla",
  "Marilu Barajas",
  "Sra. Agustín Crespo",
  "Sra. Juana Carrion",
  "Rodrigo Caraballo",
  "Salvador Cavazos",
  "Conchita Sánchez MD",
  "Joaquín Gutiérrez",
  "Federico Martínez",
  "Elisa Moya",
  "Ramona Maldonado",
  "Yolanda Carranza",
  "Conchita Salgado Jr.",
  "María Soledad Sanabria",
  "Sta. Hernán Raya",
  "Olivia Castellanos",
  "Eloisa Segura",
  "Ana Zapata",
  "Gabriel Nieto",
  "Estela Blanco II",
  "Carlos Matías",
  "Clara Barreto",
  "Sr. Sancho Garrido",
  "Jerónimo Gil",
  "Florencia Villa Jr.",
  "Maricarmen Robles",
  "Conchita Rosas",
  "Samuel Casárez",
  "Sergio Téllez",
  "Alfonso Zaragoza",
  "María Soledad Escalante",
  "Alberto Benavides",
  "Eduardo Zúñiga",
  "Jorge Alaniz",
  "Armando Solís",
  "Rocio Cintrón",
  "Armando Arriaga DDS",
  "Francisca Jiménez",
  "Claudia Carranza",
  "Silvia Muñoz DDS",
  "Daniel Santillán",
  "Sta. Diego Linares",
  "Arturo Quintero",
  "Conchita Griego",
  "Lourdes Gurule",
  "María Luisa Leyva",
  "Armando Aguilera IV",
  "Emilio Rojo",
  "Adela Barrera",
  "Débora Ramos",
  "Blanca Vergara",
  "Caridad Delarosa",
  "Guillermo Salcedo MD",
  "Pedro Monroy IV",
  "Gloria Villarreal",
  "Alejandro Alcaraz",
  "José Lebrón",
  "Luisa Urías V",
  "María Gómez",
  "Raúl Valencia",
  "Rebeca Mejía V",
  "Rosa Candelaria",
  "Jerónimo Zarate",
  "Estela Casares III",
  "Alejandro Cuellar",
  "Hernán Cortés",
  "Lucas Varela"
]

randomName = () => {
  const randomIndex = Math.floor(Math.random() * people.length)
  return people[randomIndex]
}

const SESSION_STORAGE_SESSION_USER_NAME = 'sessionUserName'

let sessionUserName = window.sessionStorage.getItem(SESSION_STORAGE_SESSION_USER_NAME)

if (!sessionUserName) {
  sessionUserName = randomName()
  window.sessionStorage.setItem(SESSION_STORAGE_SESSION_USER_NAME, sessionUserName)
}

alertify.success(`Bienvenido usuario con nombre ${sessionUserName}`);

console.log('sessionUserName', sessionUserName)

const createCard = ({
  title,
  description,
  file,
  fileName,
  previousId,
  columna,
}) => {
  const id = previousId || new Date().getTime();

  if (!previousId) {
    window.ioAPI.addTarea(
      id,
      {
        title,
        description,
        panelId,
        fileName: file?.name,
        columna,
      }
    )

    if (file) {
      window.ioAPI.uploadTareaFile(file, file?.name)
    }
  }

  const card = document.createElement("div");
  const titleEl = document.createElement("h3");
  const descriptionEl = document.createElement("p");
  const fileNameContainerEl = document.createElement("div");
  const fileNameEl = document.createElement("a");
  const deleteBtn = document.createElement("button");
  const modifyBtn = document.createElement("button");

  fileNameContainerEl.appendChild(fileNameEl)

  titleEl.textContent = title;
  descriptionEl.textContent = description;
  if (fileName) {
    fileNameEl.href = `/tmp/upload/${fileName}`
    fileNameEl.target = "_blank"
    fileNameEl.textContent = fileName
  }
  descriptionEl.textContent = description;

  //Boton Eliminar
  deleteBtn.textContent = "Eliminar";
  deleteBtn.className = "btn btn-danger btn_eliminar";
  deleteBtn.style = "";

  //Boton Modificar
  modifyBtn.textContent = "Modificar"
  modifyBtn.className = "btn btn-warning m-2"

  card.appendChild(titleEl);
  card.appendChild(descriptionEl);
  card.appendChild(fileNameContainerEl);
  card.appendChild(deleteBtn);
  card.appendChild(modifyBtn);

  card.className += "container-fluid cardbody";
  card.id += id
  card.draggable += "true";
  card.ondragstart = (event) => handleDrag(event)

  deleteBtn.addEventListener("click", () => {
    if (!confirm("Quieres eliminar la tarjeta?")) {
      return
    }

    console.log('./window.ioAPI', window.ioAPI)
    window.ioAPI.deleteTarea(id)

    card.remove()
  });

  modifyBtn.addEventListener("click", () => {
    modalEdicionTarjetaTitleElement.value = title
    modalEdicionTarjetaDescriptionElement.value = description

    modalEdicionTarjetaModificarElement.onclick = () => {
      const formData = new FormData(modalEdicionTarjetaForm)
      console.log('./formData', formData, formData.get('file'))

      const titleInputValue = formData.get('title')
      const descriptionInputValue = formData.get('description')
      const fileInputValue = formData.get('file')

      titleEl.textContent = titleInputValue
      descriptionEl.textContent = descriptionInputValue
      fileNameEl.textContent = fileInputValue.name
      fileNameEl.href = `/tmp/upload/${fileInputValue.name}`
      fileNameEl.target = "_blank"

      window.ioAPI.modifyTarea(id, {
        title: titleInputValue,
        description: descriptionInputValue,
        fileName: fileInputValue.name,
      })

      if (fileInputValue) {
        window.ioAPI.uploadTareaFile(fileInputValue, fileInputValue.name)
      }

      modalEdicionTarjeta.hide()
    }
    modalEdicionTarjeta.show()
  })

  return card;
}

const addBtnTODO = document.getElementById("btnAddCard1");

const formAddTODO = document.getElementById("form-add-todo");
const cardContainerTODO = document.getElementById("card-container1");

addBtnTODO.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData(formAddTODO)
  const title = formData.get('title')
  const description = formData.get('description')
  const file = formData.get('file')

  if (title === "" || description === "") {
    return
  }

  const card = createCard({
    title,
    description,
    file,
    fileName: file.name,
    columna: 'TODO',
  });
  cardContainerTODO.appendChild(card);
});


const addBtnDOING = document.getElementById("btnAddCard2");

const formAddDOING = document.getElementById("form-add-doing");
const cardContainerDOING = document.getElementById("card-container2");

addBtnDOING.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData(formAddDOING)
  const title = formData.get('title')
  const description = formData.get('description')
  const file = formData.get('file')

  if (title === "" || description === "") {
    return
  }

  const card = createCard({
    title,
    description,
    file,
    fileName: file.name,
    columna: 'DOING',
  });
  cardContainerDOING.appendChild(card);
});






//CreacionSubelementosBox3

const addBtnDONE = document.getElementById("btnAddCard3");

const formAddDONE = document.getElementById("form-add-done");
const cardContainerDONE = document.getElementById("card-container3");


addBtnDONE.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData(formAddDONE)
  const title = formData.get('title')
  const description = formData.get('description')
  const file = formData.get('file')

  if (title === "" || description === "") {
    return
  }

  const card = createCard({
    title,
    description,
    file,
    fileName: file.name,
    columna: 'DONE',
  });
  cardContainerDONE.appendChild(card);
});






const BOX1_CONTAINER = 'box1'
const BOX2_CONTAINER = 'box2'
const BOX3_CONTAINER = 'box3'

window.getAllTareas().then((res) => res.json()).then(({ data }) => {
  console.log('data.allTareas', data.allTareas);

  data.allTareas.filter(({ panelId: tareaPanelId }) => tareaPanelId === panelId).forEach((tareaData) => {
    console.log('./panel', tareaData)
    const tareaElement = createCard({
      title: tareaData.titulo,
      description: tareaData.descripcion,
      fileName: tareaData.fileName,
      previousId: tareaData._id,
      columna: tareaData.columna,
    })

    if (tareaData.columna === 'DOING') {
      document.getElementById(BOX2_CONTAINER).append(tareaElement)
    } else if (tareaData.columna === 'DONE') {
      document.getElementById(BOX3_CONTAINER).append(tareaElement)
    } else {
      document.getElementById(BOX1_CONTAINER).append(tareaElement)
    }
  })
})

const graphQLWsClient = window.graphQLWsClient = graphqlWs.createClient({
  url: 'ws://localhost:2000/graphql',
});

const unsubscribeHello = graphQLWsClient.subscribe(
  {
    query: 'subscription { hello }',
  },
  {
    next: (args) => console.log('next', args),
    error: () => console.log('error'),
    complete: () => console.log('complete'),
  },
);

const unsubscribeTareaMoved = graphQLWsClient.subscribe(
  {
    query: 'subscription { tareaMoved { _id, columna, panelId, lastUserName } }',
  },
  {
    next: (args) => {
      alertify.success(`Tarea movida por el usuario ${args.data.tareaMoved.lastUserName} en la columna ${args.data.tareaMoved.columna} del panel con id ${args.data.tareaMoved.panelId}`);
      console.log('next', args)
    },
    error: (e) => console.log('error', e),
    complete: () => console.log('complete'),
  },
);