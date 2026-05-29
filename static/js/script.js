let step = 0;
let stepHistory = [];
let currentLang = 'es';
let cvData = {
    nombre: '',
    fecha: '',
    enlaces: [],
    descripcion: '',
    educacion: [],
    experiencia: [],
    idiomas: [],
    carnet: ''
};

const text = {
    es: {
        header: "📄 Constructor de CV",
        welcome: "¡Hola! Vamos a crear tu CV. ¿Cuál es tu nombre y apellidos?",
        askFecha: "¿Cuál es tu fecha de nacimiento? (DD/MM/AAAA)",
        fechaInvalida: "❌ Fecha inválida. Usa formato DD/MM/AAAA",
        askEnlaces: "📎 ENLACES PERSONALES:",
        formEnlaceNombre: "Nombre (LinkedIn, GitHub, etc.)",
        formEnlaceUrl: "URL",
        btnGuardar: "➕ Agregar",
        btnSaltar: "⏭️ Saltar sección",
        enlaceGuardado: "✅ Enlace añadido",
        saltarSeccion: "⏭️ Sección saltada",
        askDescripcion: "✏️ Escribe una breve descripción profesional:",
        askEducacion: "🎓 EDUCACIÓN:",
        institucion: "Institución",
        fechaInicio: "Fecha inicio (DD/MM/AAAA)",
        fechaFin: "Fecha fin (DD/MM/AAAA o Actualidad)",
        descripcion: "Descripción",
        guardarEducacion: "➕ Agregar",
        noEducacion: "⏭️ Saltar sección",
        educacionGuardada: "✅ Educación añadida",
        askExperiencia: "💼 EXPERIENCIA LABORAL:",
        puesto: "Puesto",
        empresa: "Empresa",
        guardarExperiencia: "➕ Agregar",
        noExperiencia: "⏭️ Saltar sección",
        experienciaGuardada: "✅ Experiencia añadida",
        askIdiomas: "🌍 IDIOMAS:",
        idioma: "Idioma",
        nivel: "Nivel",
        guardarIdioma: "➕ Agregar",
        noIdiomas: "⏭️ Saltar sección",
        idiomaGuardado: "✅ Idioma añadido",
        askCarnet: "🚗 ¿Tienes carnet de conducir? (si/no)",
        cvCompletado: "✅ ¡CV completado! Puedes descargar tu CV.",
        downloadBtn: "📄 DESCARGAR CV EN PDF",
        restartBtn: "🔄 EMPEZAR DE NUEVO",
        backBtn: "◀ Atrás",
        campoObligatorio: "❌ Completa todos los campos",
        volviendo: "↩️ Volviendo al paso anterior",
        si: "si",
        no: "no",
        eliminar: "Eliminar"
    },
    en: {
        header: "📄 CV Builder",
        welcome: "Hello! Let's create your CV. What is your full name?",
        askFecha: "What is your date of birth? (DD/MM/YYYY)",
        fechaInvalida: "❌ Invalid date. Use DD/MM/YYYY format",
        askEnlaces: "📎 PERSONAL LINKS:",
        formEnlaceNombre: "Name (LinkedIn, GitHub, etc.)",
        formEnlaceUrl: "URL",
        btnGuardar: "➕ Add",
        btnSaltar: "⏭️ Skip section",
        enlaceGuardado: "✅ Link added",
        saltarSeccion: "⏭️ Section skipped",
        askDescripcion: "✏️ Write a brief professional description:",
        askEducacion: "🎓 EDUCATION:",
        institucion: "Institution",
        fechaInicio: "Start date (DD/MM/YYYY)",
        fechaFin: "End date (DD/MM/YYYY or Present)",
        descripcion: "Description",
        guardarEducacion: "➕ Add",
        noEducacion: "⏭️ Skip section",
        educacionGuardada: "✅ Education added",
        askExperiencia: "💼 WORK EXPERIENCE:",
        puesto: "Position",
        empresa: "Company",
        guardarExperiencia: "➕ Add",
        noExperiencia: "⏭️ Skip section",
        experienciaGuardada: "✅ Experience added",
        askIdiomas: "🌍 LANGUAGES:",
        idioma: "Language",
        nivel: "Level",
        guardarIdioma: "➕ Add",
        noIdiomas: "⏭️ Skip section",
        idiomaGuardado: "✅ Language added",
        askCarnet: "🚗 Do you have a driver's license? (yes/no)",
        cvCompletado: "✅ CV completed! You can download your CV.",
        downloadBtn: "📄 DOWNLOAD CV PDF",
        restartBtn: "🔄 START OVER",
        backBtn: "◀ Back",
        campoObligatorio: "❌ Complete all fields",
        volviendo: "↩️ Going back",
        si: "yes",
        no: "no",
        eliminar: "Delete"
    }
};

function saveToHistory() {
    stepHistory.push({
        step: step,
        cvData: JSON.parse(JSON.stringify(cvData))
    });
}

function goBack() {
    if (stepHistory.length === 0) {
        addMessage("❌ No hay pasos anteriores", 'bot');
        return;
    }
    
    const lastState = stepHistory.pop();
    step = lastState.step;
    cvData = JSON.parse(JSON.stringify(lastState.cvData));
    
    addMessage(text[currentLang].volviendo, 'bot');
    
    document.getElementById('chatMessages').innerHTML = '';
    
    switch(step) {
        case 0:
            addMessage(text[currentLang].welcome, 'bot');
            break;
        case 1:
            addMessage(text[currentLang].askFecha, 'bot');
            break;
        case 2:
            addMessage(text[currentLang].askEnlaces, 'bot');
            setTimeout(() => mostrarListaEnlaces(), 100);
            break;
        case 3:
            addMessage(text[currentLang].askDescripcion, 'bot');
            break;
        case 4:
            addMessage(text[currentLang].askEducacion, 'bot');
            setTimeout(() => mostrarListaEducacion(), 100);
            break;
        case 5:
            addMessage(text[currentLang].askExperiencia, 'bot');
            setTimeout(() => mostrarListaExperiencia(), 100);
            break;
        case 6:
            addMessage(text[currentLang].askIdiomas, 'bot');
            setTimeout(() => mostrarListaIdiomas(), 100);
            break;
        case 7:
            addMessage(text[currentLang].askCarnet, 'bot');
            break;
    }
}

function addMessage(text, type) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addFormMessage(formElement) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.appendChild(formElement);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function validarFechaDDMMAAAA(fecha) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    return regex.test(fecha);
}

function validarFechaODDMMAAAAoActual(texto) {
    if (texto.toLowerCase() === 'actualidad' || texto.toLowerCase() === 'present') {
        return true;
    }
    return validarFechaDDMMAAAA(texto);
}

function mostrarListaEnlaces() {
    const container = document.createElement('div');
    container.className = 'form-campo';
    container.style.maxHeight = '400px';
    container.style.overflowY = 'auto';
    
    const listaDiv = document.createElement('div');
    listaDiv.id = 'listaEnlaces';
    
    cvData.enlaces.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.marginBottom = '10px';
        itemDiv.style.padding = '8px';
        itemDiv.style.backgroundColor = '#f0f0f0';
        itemDiv.style.borderRadius = '5px';
        itemDiv.innerHTML = `
            <span><strong>${item.nombre}</strong><br><small>${item.url}</small></span>
            <button class="eliminarEnlaceBtn" data-index="${index}" style="background:#e94560; padding:5px 10px; border:none; border-radius:5px; cursor:pointer;">🗑️</button>
        `;
        listaDiv.appendChild(itemDiv);
    });
    
    const formAgregar = document.createElement('div');
    formAgregar.style.marginTop = '15px';
    formAgregar.style.borderTop = '1px solid #ddd';
    formAgregar.style.paddingTop = '15px';
    formAgregar.innerHTML = `
        <input type="text" id="nuevoNombre" placeholder="${text[currentLang].formEnlaceNombre}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <input type="text" id="nuevaUrl" placeholder="${text[currentLang].formEnlaceUrl}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <div style="display:flex; gap:10px;">
            <button id="agregarEnlaceBtn" style="flex:1; padding:10px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">➕ Agregar</button>
            <button id="saltarEnlacesBtn" class="btn-saltar" style="flex:1; padding:10px; background:#ff9800; color:white; border:none; border-radius:5px; cursor:pointer;">${text[currentLang].btnSaltar}</button>
        </div>
    `;
    
    container.appendChild(listaDiv);
    container.appendChild(formAgregar);
    addFormMessage(container);
    
    document.querySelectorAll('.eliminarEnlaceBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            cvData.enlaces.splice(index, 1);
            container.remove();
            mostrarListaEnlaces();
        });
    });
    
    document.getElementById('agregarEnlaceBtn').addEventListener('click', () => {
        const nombre = document.getElementById('nuevoNombre').value;
        const url = document.getElementById('nuevaUrl').value;
        if (nombre && url) {
            cvData.enlaces.push({ nombre, url });
            container.remove();
            mostrarListaEnlaces();
            addMessage(`${text[currentLang].enlaceGuardado}: ${nombre}`, 'bot');
        } else {
            addMessage(text[currentLang].campoObligatorio, 'bot');
        }
    });
    
    document.getElementById('saltarEnlacesBtn').addEventListener('click', () => {
        addMessage(text[currentLang].saltarSeccion, 'bot');
        addMessage(text[currentLang].askDescripcion, 'bot');
        saveToHistory();
        step = 3;
    });
}

function mostrarListaEducacion() {
    const container = document.createElement('div');
    container.className = 'form-campo';
    container.style.maxHeight = '450px';
    container.style.overflowY = 'auto';
    
    const listaDiv = document.createElement('div');
    listaDiv.id = 'listaEducacion';
    
    cvData.educacion.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.marginBottom = '10px';
        itemDiv.style.padding = '8px';
        itemDiv.style.backgroundColor = '#f0f0f0';
        itemDiv.style.borderRadius = '5px';
        itemDiv.innerHTML = `
            <span><strong>${item.institucion}</strong><br>${item.inicio} - ${item.fin}<br><small>${item.descripcion}</small></span>
            <button class="eliminarEduBtn" data-index="${index}" style="background:#e94560; padding:5px 10px; border:none; border-radius:5px; cursor:pointer;">🗑️</button>
        `;
        listaDiv.appendChild(itemDiv);
    });
    
    const formAgregar = document.createElement('div');
    formAgregar.style.marginTop = '15px';
    formAgregar.style.borderTop = '1px solid #ddd';
    formAgregar.style.paddingTop = '15px';
    formAgregar.innerHTML = `
        <input type="text" id="nuevaInstitucion" placeholder="${text[currentLang].institucion}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <input type="text" id="nuevaEduInicio" placeholder="${text[currentLang].fechaInicio}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <input type="text" id="nuevaEduFin" placeholder="${text[currentLang].fechaFin}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <textarea id="nuevaEduDescripcion" placeholder="${text[currentLang].descripcion}" rows="2" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;"></textarea>
        <div style="display:flex; gap:10px;">
            <button id="agregarEduBtn" style="flex:1; padding:10px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">➕ Agregar</button>
            <button id="saltarEduBtn" class="btn-saltar" style="flex:1; padding:10px; background:#ff9800; color:white; border:none; border-radius:5px; cursor:pointer;">${text[currentLang].noEducacion}</button>
        </div>
    `;
    
    container.appendChild(listaDiv);
    container.appendChild(formAgregar);
    addFormMessage(container);
    
    document.querySelectorAll('.eliminarEduBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            cvData.educacion.splice(index, 1);
            container.remove();
            mostrarListaEducacion();
        });
    });
    
    document.getElementById('agregarEduBtn').addEventListener('click', () => {
        const institucion = document.getElementById('nuevaInstitucion').value;
        const inicio = document.getElementById('nuevaEduInicio').value;
        const fin = document.getElementById('nuevaEduFin').value;
        const descripcion = document.getElementById('nuevaEduDescripcion').value;
        
        if (institucion && inicio && fin && descripcion) {
            if (!validarFechaODDMMAAAAoActual(inicio)) {
                addMessage("❌ Fecha de inicio inválida. Usa DD/MM/AAAA o 'Actualidad'", 'bot');
                return;
            }
            if (!validarFechaODDMMAAAAoActual(fin)) {
                addMessage("❌ Fecha de fin inválida. Usa DD/MM/AAAA o 'Actualidad'", 'bot');
                return;
            }
            cvData.educacion.push({ institucion, inicio, fin, descripcion });
            container.remove();
            mostrarListaEducacion();
            addMessage(`${text[currentLang].educacionGuardada}: ${institucion}`, 'bot');
        } else {
            addMessage(text[currentLang].campoObligatorio, 'bot');
        }
    });
    
    document.getElementById('saltarEduBtn').addEventListener('click', () => {
        addMessage(text[currentLang].saltarSeccion, 'bot');
        addMessage(text[currentLang].askExperiencia, 'bot');
        saveToHistory();
        mostrarListaExperiencia();
        step = 5;
    });
}

function mostrarListaExperiencia() {
    const container = document.createElement('div');
    container.className = 'form-campo';
    container.style.maxHeight = '450px';
    container.style.overflowY = 'auto';
    
    const listaDiv = document.createElement('div');
    listaDiv.id = 'listaExperiencia';
    
    cvData.experiencia.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.marginBottom = '10px';
        itemDiv.style.padding = '8px';
        itemDiv.style.backgroundColor = '#f0f0f0';
        itemDiv.style.borderRadius = '5px';
        itemDiv.innerHTML = `
            <span><strong>${item.puesto}</strong> - ${item.empresa}<br>${item.inicio} - ${item.fin}<br><small>${item.descripcion}</small></span>
            <button class="eliminarExpBtn" data-index="${index}" style="background:#e94560; padding:5px 10px; border:none; border-radius:5px; cursor:pointer;">🗑️</button>
        `;
        listaDiv.appendChild(itemDiv);
    });
    
    const formAgregar = document.createElement('div');
    formAgregar.style.marginTop = '15px';
    formAgregar.style.borderTop = '1px solid #ddd';
    formAgregar.style.paddingTop = '15px';
    formAgregar.innerHTML = `
        <input type="text" id="nuevoPuesto" placeholder="${text[currentLang].puesto}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <input type="text" id="nuevaEmpresa" placeholder="${text[currentLang].empresa}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <input type="text" id="nuevaExpInicio" placeholder="${text[currentLang].fechaInicio}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <input type="text" id="nuevaExpFin" placeholder="${text[currentLang].fechaFin}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <textarea id="nuevaExpDescripcion" placeholder="${text[currentLang].descripcion}" rows="2" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;"></textarea>
        <div style="display:flex; gap:10px;">
            <button id="agregarExpBtn" style="flex:1; padding:10px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">➕ Agregar</button>
            <button id="saltarExpBtn" class="btn-saltar" style="flex:1; padding:10px; background:#ff9800; color:white; border:none; border-radius:5px; cursor:pointer;">${text[currentLang].noExperiencia}</button>
        </div>
    `;
    
    container.appendChild(listaDiv);
    container.appendChild(formAgregar);
    addFormMessage(container);
    
    document.querySelectorAll('.eliminarExpBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            cvData.experiencia.splice(index, 1);
            container.remove();
            mostrarListaExperiencia();
        });
    });
    
    document.getElementById('agregarExpBtn').addEventListener('click', () => {
        const puesto = document.getElementById('nuevoPuesto').value;
        const empresa = document.getElementById('nuevaEmpresa').value;
        const inicio = document.getElementById('nuevaExpInicio').value;
        const fin = document.getElementById('nuevaExpFin').value;
        const descripcion = document.getElementById('nuevaExpDescripcion').value;
        
        if (puesto && empresa && inicio && fin && descripcion) {
            if (!validarFechaODDMMAAAAoActual(inicio)) {
                addMessage("❌ Fecha de inicio inválida. Usa DD/MM/AAAA o 'Actualidad'", 'bot');
                return;
            }
            if (!validarFechaODDMMAAAAoActual(fin)) {
                addMessage("❌ Fecha de fin inválida. Usa DD/MM/AAAA o 'Actualidad'", 'bot');
                return;
            }
            cvData.experiencia.push({ puesto, empresa, inicio, fin, descripcion });
            container.remove();
            mostrarListaExperiencia();
            addMessage(`${text[currentLang].experienciaGuardada}: ${puesto} en ${empresa}`, 'bot');
        } else {
            addMessage(text[currentLang].campoObligatorio, 'bot');
        }
    });
    
    document.getElementById('saltarExpBtn').addEventListener('click', () => {
        addMessage(text[currentLang].saltarSeccion, 'bot');
        addMessage(text[currentLang].askIdiomas, 'bot');
        saveToHistory();
        mostrarListaIdiomas();
        step = 6;
    });
}

function mostrarListaIdiomas() {
    const container = document.createElement('div');
    container.className = 'form-campo';
    container.style.maxHeight = '400px';
    container.style.overflowY = 'auto';
    
    const listaDiv = document.createElement('div');
    listaDiv.id = 'listaIdiomas';
    
    cvData.idiomas.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.marginBottom = '10px';
        itemDiv.style.padding = '8px';
        itemDiv.style.backgroundColor = '#f0f0f0';
        itemDiv.style.borderRadius = '5px';
        itemDiv.innerHTML = `
            <span><strong>${item.idioma}</strong> - ${item.nivel}</span>
            <button class="eliminarIdiomaBtn" data-index="${index}" style="background:#e94560; padding:5px 10px; border:none; border-radius:5px; cursor:pointer;">🗑️</button>
        `;
        listaDiv.appendChild(itemDiv);
    });
    
    const formAgregar = document.createElement('div');
    formAgregar.style.marginTop = '15px';
    formAgregar.style.borderTop = '1px solid #ddd';
    formAgregar.style.paddingTop = '15px';
    formAgregar.innerHTML = `
        <input type="text" id="nuevoIdioma" placeholder="${text[currentLang].idioma}" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
        <select id="nuevoNivel" style="width:100%; margin-bottom:8px; padding:8px; border:1px solid #ddd; border-radius:5px;">
            <option value="">${text[currentLang].nivel}</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
        </select>
        <div style="display:flex; gap:10px;">
            <button id="agregarIdiomaBtn" style="flex:1; padding:10px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">➕ Agregar</button>
            <button id="saltarIdiomasBtn" class="btn-saltar" style="flex:1; padding:10px; background:#ff9800; color:white; border:none; border-radius:5px; cursor:pointer;">${text[currentLang].noIdiomas}</button>
        </div>
    `;
    
    container.appendChild(listaDiv);
    container.appendChild(formAgregar);
    addFormMessage(container);
    
    document.querySelectorAll('.eliminarIdiomaBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            cvData.idiomas.splice(index, 1);
            container.remove();
            mostrarListaIdiomas();
        });
    });
    
    document.getElementById('agregarIdiomaBtn').addEventListener('click', () => {
        const idioma = document.getElementById('nuevoIdioma').value;
        const nivel = document.getElementById('nuevoNivel').value;
        if (idioma && nivel) {
            cvData.idiomas.push({ idioma, nivel });
            container.remove();
            mostrarListaIdiomas();
            addMessage(`${text[currentLang].idiomaGuardado}: ${idioma} - ${nivel}`, 'bot');
        } else {
            addMessage(text[currentLang].campoObligatorio, 'bot');
        }
    });
    
    document.getElementById('saltarIdiomasBtn').addEventListener('click', () => {
        addMessage(text[currentLang].saltarSeccion, 'bot');
        addMessage(text[currentLang].askCarnet, 'bot');
        saveToHistory();
        step = 7;
    });
}

function procesarInput(input) {
    if (step === 0) {
        cvData.nombre = input;
        addMessage(input, 'user');
        addMessage(text[currentLang].askFecha, 'bot');
        saveToHistory();
        step = 1;
        return;
    }
    
    if (step === 1) {
        if (!validarFechaDDMMAAAA(input)) {
            addMessage(text[currentLang].fechaInvalida, 'bot');
            return;
        }
        cvData.fecha = input;
        addMessage(input, 'user');
        addMessage(text[currentLang].askEnlaces, 'bot');
        saveToHistory();
        mostrarListaEnlaces();
        step = 2;
        return;
    }
    
    if (step === 3) {
        cvData.descripcion = input;
        addMessage(input, 'user');
        addMessage(text[currentLang].askEducacion, 'bot');
        saveToHistory();
        mostrarListaEducacion();
        step = 4;
        return;
    }
    
    if (step === 7) {
        cvData.carnet = input.toLowerCase();
        addMessage(input, 'user');
        addMessage(text[currentLang].cvCompletado, 'bot');
        document.getElementById('inputArea').style.display = 'none';
        document.getElementById('downloadContainer').style.display = 'block';
        document.getElementById('backBtn').style.display = 'none';
        return;
    }
}

function generarHTML() {
    let educacionHTML = '';
    for (let edu of cvData.educacion) {
        educacionHTML += `
            <div style="margin-bottom: 20px;">
                <strong>${edu.institucion}</strong><br>
                ${edu.inicio} - ${edu.fin}<br>
                <em>${edu.descripcion}</em>
            </div>
        `;
    }
    
    let experienciaHTML = '';
    for (let exp of cvData.experiencia) {
        experienciaHTML += `
            <div style="margin-bottom: 20px;">
                <strong>${exp.puesto}</strong> - ${exp.empresa}<br>
                ${exp.inicio} - ${exp.fin}<br>
                <em>${exp.descripcion}</em>
            </div>
        `;
    }
    
    let idiomasHTML = '';
    for (let idi of cvData.idiomas) {
        idiomasHTML += `<li>${idi.idioma} - ${idi.nivel}</li>`;
    }
    
    let enlacesHTML = '';
    if (cvData.enlaces.length > 0) {
        enlacesHTML = `<p><strong>🔗 Links:</strong></p>`;
        for (let enlace of cvData.enlaces) {
            enlacesHTML += `
                <p style="margin-left: 15px;">
                    <strong><a href="${enlace.url}" style="color: black; text-decoration: none;">${enlace.nombre}</a></strong>
                </p>
            `;
        }
    }
    
    return `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
            <h1 style="color: #667eea;">${cvData.nombre}</h1>
            <p><strong>Date of birth:</strong> ${cvData.fecha}</p>
            ${enlacesHTML}
            <p><strong>Profile:</strong><br>${cvData.descripcion}</p>
            
            <h2 style="color: #764ba2; margin-top: 20px;">🎓 Education</h2>
            ${educacionHTML || '<p>Not specified</p>'}
            
            <h2 style="color: #764ba2; margin-top: 20px;">💼 Work Experience</h2>
            ${experienciaHTML || '<p>Not specified</p>'}
            
            <h2 style="color: #764ba2; margin-top: 20px;">🌍 Languages</h2>
            <ul>${idiomasHTML || '<li>Not specified</li>'}</ul>
            
            <h2 style="color: #764ba2; margin-top: 20px;">🚗 Driver's License</h2>
            <p>${cvData.carnet === 'si' || cvData.carnet === 'yes' ? 'Yes' : 'No'}</p>
        </div>
    `;
}

async function downloadPDF() {
    const htmlContent = generarHTML();
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    document.body.appendChild(element);
    
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `CV_${cvData.nombre.replace(/\s/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    await html2pdf().set(opt).from(element).save();
    document.body.removeChild(element);
}

function reiniciarTodo() {
    step = 0;
    stepHistory = [];
    cvData = {
        nombre: '',
        fecha: '',
        enlaces: [],
        descripcion: '',
        educacion: [],
        experiencia: [],
        idiomas: [],
        carnet: ''
    };
    
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('inputArea').style.display = 'flex';
    document.getElementById('downloadContainer').style.display = 'none';
    document.getElementById('backBtn').style.display = 'none';
    
    addMessage(text[currentLang].welcome, 'bot');
}

function initLanguage(lang) {
    currentLang = lang;
    document.getElementById('headerTitle').textContent = text[lang].header;
    document.getElementById('downloadBtn').textContent = text[lang].downloadBtn;
    document.getElementById('reiniciarBtn').textContent = text[lang].restartBtn;
    document.getElementById('backBtn').textContent = text[lang].backBtn;
    document.getElementById('chatContainer').style.display = 'block';
    document.getElementById('languageModal').style.display = 'none';
    addMessage(text[lang].welcome, 'bot');
}

document.getElementById('selectSpanish').addEventListener('click', () => initLanguage('es'));
document.getElementById('selectEnglish').addEventListener('click', () => initLanguage('en'));

document.getElementById('sendBtn').addEventListener('click', () => {
    const input = document.getElementById('chatInput');
    const textValue = input.value.trim();
    if (textValue === '') return;
    procesarInput(textValue);
    input.value = '';
    if (step !== 0 && step !== 7 && step < 2) {
        document.getElementById('backBtn').style.display = 'flex';
    }
});

document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('sendBtn').click();
    }
});

document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
document.getElementById('reiniciarBtn').addEventListener('click', reiniciarTodo);
document.getElementById('backBtn').addEventListener('click', goBack);