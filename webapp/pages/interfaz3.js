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

  window.moveTarea(data, currentColumn)

  // window.ioAPI.moveTarea(data, { columna: currentColumn })
}


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
    query: 'subscription { tareaMoved { _id, columna } }',
  },
  {
    next: (args) => console.log('next', args),
    error: (e) => console.log('error', e),
    complete: () => console.log('complete'),
  },
);