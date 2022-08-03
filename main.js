//Clase Alta-Lectura-Actualizar-Borrar
class ALAB{
    #nombreTabla = null
    #data = null

    constructor(nombreTabla){
        this.#setNombreTabla(nombreTabla)
        this.#setData()
    }

    #setNombreTabla(nombreTabla){
		this.#nombreTablaValidar(nombreTabla);
        this.#nombreTabla = nombreTabla;
	}
    
    #setData(){
        /* Si el repositorio en Localstorage esta vacio, carga por unica vez los datos del array */
        
        let repositorio = this.#recuperar(this.#nombreTabla)
        if (repositorio == null){
            this.#data = [
                { id: 1, cat: "anillos", mod: "royal", precio: 350, stk: 10 },
                { id: 2, cat: "anillos", mod: "solitario", precio: 200, stk: 10 },
                { id: 3, cat: "aros", mod: "nature", precio: 150, stk: 10 },
                { id: 4, cat: "dijes", mod: "mariposa", precio: 50, stk: 10 },
            ]
        } else {
            this.#data = repositorio
        }
    }

    #nombreTablaValidar(nombreTabla){
		if(nombreTabla == undefined) throw new Error("Nombre de tabla requerida!");
    }

    #guardar(){
        let datosAGuardar = JSON.stringify(this.#data)
        localStorage.setItem(this.#nombreTabla, datosAGuardar)
    }

    #recuperar(key){
        let data = localStorage.getItem(key)
        return JSON.parse(data)
    }

    #existeId(id){
        return this.#data[id] === undefined ? false : true
    }

    #existeRegistro(id) {
        if (!this.#existeId(id)) throw new Error("El registro no existe")
    }

    alta(data){
        this.#data.push(data)
        this.#guardar()
        return this.#data.length
    }

    leer(id){
        this.#existeRegistro(id)
        return this.#data[id]
    }

    actualizar(id, data){
        this.#existeRegistro(id)
        this.#data[id] = data
        this.#guardar()
        return true
    }

    borrar(id){
        this.#existeRegistro(id)
        this.#data.splice(id, 1)
        this.#guardar()
        return true
    }

    leerTodo(){
        return this.#data
    }

    asignarId(){
        return this.#data.length + 1
    }

    buscarCat(str){
        let busqueda = this.#data.find((el) => el.cat === str)
        return busqueda
    }

    filtrar(str){
        let filtro = this.#data.filter((el) => el.cat.includes(str))
        return filtro
    }

}


function app() {
    const contenedor = document.querySelector('tbody')
    const id = document.getElementById('id')
    const cat = document.getElementById('cat')
    const mod = document.getElementById('mod')
    const precio = document.getElementById('precio')
    const stk = document.getElementById('stk')
    let resultados = ''
    let opcion = ''
    
    const mostrar = (articulos) => {
        resultados = ''
        articulos.forEach(articulo => {
            resultados +=   `<tr>
                                <td>${articulo.id}</td>
                                <td>${articulo.cat}</td>
                                <td>${articulo.mod}</td>
                                <td>${articulo.precio}</td>
                                <td>${articulo.stk}</td>
                                <td>
                                    <button class="w3-button w3-white w3-border w3-tiny w3-border-green w3-round-large w3-text-green w3-hover-green">Modificar</button>
                                    <button class="w3-button w3-white w3-border w3-tiny w3-border-red w3-round-large w3-text-red w3-hover-red">Borrar</button>
                                </td>
                            </tr>`
        });
        contenedor.innerHTML = resultados
    }
    
    btnAgregar.addEventListener('click', (e)=>{
        e.preventDefault()
        if (opcion == 'crear'){
            console.log('crear')
            sistema.alta({id: sistema.asignarId(), cat: cat.value, mod: mod.value, precio: precio.value, stk: stk.value})
            mostrar(sistema.leerTodo())
        }
        if (opcion == 'editar'){
            console.log('editar')
        }
        document.getElementById('id01').style.display='none'
    })
    
    btnCrearItem.addEventListener('click', ()=>{
        document.getElementById('form').reset()
        document.getElementById('id01').style.display='block'
        opcion = 'crear'
    })

    btnLeerTodo.addEventListener('click', (e)=>{
        mostrar(sistema.leerTodo())
    })

    btnFiltro.addEventListener('click', (e)=>{
        document.getElementById('id02').style.display='block'
    })

    btnFiltrar.addEventListener('click', (e)=>{
        e.preventDefault()
        let fil = document.getElementById('cat').value
        console.log(fil)
        dataFiltrada = sistema.filtrar(fil)
        console.log(dataFiltrada)
        mostrar(dataFiltrada)
        document.getElementById('id02').style.display='none'
    })

    //Se crea tabla mediante la funcion/metodo constructor
    let sistema = new ALAB("dbcontainer")

    /* // Agrega un objeto al Array
    sistema.alta({id: 5, cat: "dijes", mod: "flor", precio: 50})
    console.log(sistema.asignarId())
 */
    //La siguiente funciona como Funcion de orden superior(funcion que recibe una funcion)
    console.log(sistema.leerTodo())
    mostrar(sistema.leerTodo())
/* 
    // Metodo para buscar x categoria
    let bus = prompt("Indique la categoria a BUSCAR (aros/anillos/dijes)>")
    console.log(sistema.buscarCat(bus))

    //Metodo para filtrar
    let fil = prompt("Indique la categoria a FILTRAR (aros/anillos/dijes)>")
    console.log(sistema.filtrar(fil))
    alert(JSON.stringify(sistema.filtrar(fil)))
 */
}
app();