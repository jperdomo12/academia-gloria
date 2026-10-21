/* Interacciones de estudio en memoria. El motor compartido conserva práctica, prueba y evidencia. */
const $ = id => document.getElementById(id);

if ($('anuncioEscolar')) {
  const partes = {
    slogan:{nombre:'Eslogan',pista:'Busca una frase breve y fácil de recordar.',explicacion:'«¡Despierta, desayuna!» es el eslogan: una frase breve que se recuerda.'},
    mensaje:{nombre:'Mensaje',pista:'Observa qué idea comunican juntos los alimentos y las palabras.',explicacion:'El mensaje promueve el desayuno y una alimentación saludable. La imagen de los alimentos ayuda a transmitirlo.'},
    destinatario:{nombre:'Destinatario',pista:'Busca a qué personas se refiere la palabra «infantil».',explicacion:'Según el análisis escolar, se dirige a niños y niñas. La referencia a la infancia ayuda a reconocerlo.'},
    emisor:{nombre:'Emisor',pista:'Busca la firma y los logotipos de la institución que comunica.',explicacion:'El emisor es el Ministerio de Sanidad, Servicios Sociales e Igualdad identificado por el material escolar en la parte inferior del anuncio.'}
  };
  const encontrados = new Set();
  function mostrar(texto,clase='') { $('respuestaAnuncio').textContent=texto; $('respuestaAnuncio').className='ad-feedback '+clase; }
  document.querySelectorAll('[data-zona-anuncio]').forEach(boton => boton.addEventListener('click',()=>{
    const buscada=$('parteAnuncio').value;
    document.querySelectorAll('[data-zona-anuncio]').forEach(b=>{b.classList.toggle('seleccionada',b===boton);b.classList.remove('revisar');});
    if(boton.dataset.zonaAnuncio!==buscada){boton.classList.add('revisar');mostrar('Todavía no es esa parte. Vuelve a observar; puedes pedir una pista.','revisar');return;}
    mostrar('✓ '+partes[buscada].explicacion,'bien');
    boton.classList.add('encontrada');
    const etiqueta=boton.querySelector('.ad-revelado');etiqueta.hidden=false;etiqueta.textContent=partes[buscada].nombre;
    if(!encontrados.has(buscada)){
      encontrados.add(buscada);
      const li=document.createElement('li');li.textContent=partes[buscada].explicacion;$('etiquetasAnuncio').append(li);
    }
  }));
  $('parteAnuncio').addEventListener('change',()=>{
    document.querySelectorAll('[data-zona-anuncio]').forEach(b=>b.classList.remove('seleccionada'));
    mostrar('Busca '+partes[$('parteAnuncio').value].nombre.toLowerCase()+' en el anuncio.');
  });
  $('pistaAnuncio').addEventListener('click',()=>mostrar(partes[$('parteAnuncio').value].pista));
  $('reiniciarAnuncio').addEventListener('click',()=>{
    encontrados.clear();$('etiquetasAnuncio').replaceChildren();
    document.querySelectorAll('[data-zona-anuncio]').forEach(b=>{b.classList.remove('encontrada','seleccionada','revisar');b.querySelector('.ad-revelado').hidden=true;});
    $('explicacionAnuncio').value='';$('compararAnuncio').disabled=true;$('modeloAnuncio').hidden=true;
    mostrar('Las etiquetas aparecerán cuando encuentres cada parte.');
  });
  $('explicacionAnuncio').addEventListener('input',()=>{
    $('compararAnuncio').disabled=!$('explicacionAnuncio').value.trim();$('modeloAnuncio').hidden=true;
  });
  $('compararAnuncio').addEventListener('click',()=>{if($('explicacionAnuncio').value.trim())$('modeloAnuncio').hidden=false;});
}

if($('gastoPresupuesto')) {
  function actualizar(){
    const gasto=Number($('gastoPresupuesto').value),saldo=10-gasto;
    $('valorGasto').textContent=gasto+' €';$('restaGasto').textContent=gasto+' €';$('saldoPresupuesto').textContent=(saldo<0?'−'+Math.abs(saldo):saldo)+' €';
    $('porcionGasto').style.width=Math.min(100,gasto*10)+'%';
    $('lecturaPresupuesto').className='budget-live '+(saldo<0?'falta':saldo===0?'igual':'');
    $('lecturaPresupuesto').textContent=saldo>0?`Ingresos > gastos. Quedan ${saldo} € que puedes reservar.`:saldo===0?'Ingresos = gastos. El plan encaja, pero no queda margen de este dinero.':`Ingresos < gastos. Faltan ${Math.abs(saldo)} € para este plan; hay que revisar los gastos.`;
  }
  $('gastoPresupuesto').addEventListener('input',actualizar);actualizar();
}

if($('detalleServicio')) {
  const servicios=[
    'Colegios y parques: ayuda a mantener escuelas públicas limpias y columpios seguros.',
    'Hospitales y medicinas: ayuda a pagar atención sanitaria, médicos y enfermeras.',
    'Policías y bomberos: ayuda a sostener la protección y la atención ante peligros e incendios.',
    'Carreteras y transporte: ayuda a que podamos desplazarnos por calles, carreteras, autobuses y metro.',
    'Recogida de basuras: ayuda a retirar residuos y mantener limpios los espacios compartidos.'
  ];
  document.querySelectorAll('[data-servicio]').forEach(boton=>boton.addEventListener('click',()=>{
    document.querySelectorAll('[data-servicio]').forEach(b=>{const activo=b===boton;b.classList.toggle('activo',activo);b.setAttribute('aria-pressed',String(activo));});
    $('detalleServicio').textContent=servicios[Number(boton.dataset.servicio)];
  }));
}
