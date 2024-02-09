const ingresos = [
    new Ingreso('Salario', 2000),
    new Ingreso('Venta coche', 1500)
    
];

const egresos = [
    new Egreso('Renta departamento', 500),
    new Egreso('Ropa de marca', 200)
    
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}


const formatoMoneda = (valor) =>{
    return valor.toLocaleString('es-ES',{style:'currency',currency:'EUR', minimumFractionDigits:2 }); 
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-ES',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = ()=> {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;

}

//Este metodo modificamos para poder usar el eliminar un ingreso, en la etiqueta de ion-icon name.
//Cuando modificamos esa etiqueta lo que hacemos es configurar la funcion de onclick=''
//En el agregamos el metodo eliminarIngreso con el parametro recuperando ingreso.id y a posterior definiremos la funcion de eliminarIngreso
//

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
               onclick='eliminarIngreso(${ingreso.id})'></ion-icon>  
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

//Aqui con el id vamos a buscar este objeto dentro de nuestro arreglo de ingresos

const eliminarIngreso = (id)=>{
   let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id); //Con esto recuperamos el objeto y en caso de que coincida se detendra la busqueda
   ingresos.splice(indiceEliminar, 1); //Solo elimina un elemento.
   cargarCabecero(); //Volvemos a cargar el cabecero para que se refresque la informacion.
   cargarIngresos();
}


const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;

}

const crearEgresoHTML = (egreso)=>{
    let egresoHTML =  `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha">
        <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>

    `; 

    return egresoHTML;
}

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();  
}

//Aqui recuperamos el formulario con la funcion flecha y con una arreglo.
//Una vez con la forma recuperada preguntamos cual es el tipo select que selecciono el usuario
//Lo que haremos es recuperar el tipo, la descripcion y el valor dentro del formulario con la variable de forma declarada.
// Pero antes de procesar un elemento, primero vamos a preguntar si los valores son distintos de nulo, de lo contrario no vamos
//Agregar nada de los arreglos.
// Posteriormente preguntamos el tipo.
//Si usamos el number(valor.value) convierte el tipo cadena en un tipo numerico, pero existe una sintaxis simplificada que se usa
// El simbolo de +valor.value que hara la conversion

let agregarDato = ()=>{
    let forma =  document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }

}