import React, { useState } from 'react'
import './miFormulario.css'
import Swal from 'sweetalert2'

const MiFormulario = () => {

    // Opciones del Combobox de Carrera
    const opcionesCarrera = [
        { value: '0', label: '-- Seleccione --' },
        { value: '1', label: 'Lic. en Ingenieria en Sistemas Computacionales' },
        { value: '2', label: 'Lic. en Ingenieria Logistica' },
        { value: '3', label: 'Lic. en Administracion' },
        { value: '4', label: 'Lic. en Ingenieria Industrial' },
        { value: '5', label: 'Lic. en Ingenieria Quimica' },
        { value: '6', label: 'Lic. en Ingenieria Electrica' },
        { value: '7', label: 'Lic. en Ingenieria en TICs' }
    ]

    // Hooks
    const [infoStudent, setInfoStudent] = useState([])
    const [matricula, setMatricula] = useState('') // Hook para matricula del estudiante
    const [nombre, setNombre] = useState('') // Hook para nombre del estudiante
    const [carrera, setCarrera] = useState(opcionesCarrera[0]) // Hook para Carrera
    const [imagen, setFoto] = useState(null) // Hook para Foto
    const [disabled, setDisabled] = useState(false) //Hook para deshabilitar campo de Matricula
    const [enviar, setEnviar] = useState('Guardar Datos') // Hook para modificar boton de enviar

   
    const handleChangeCarrera = (e) => {
      
        setCarrera(opcionesCarrera.find(option => option.value === e.target.value))
        
    }

    //  archivo imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0]

        
        if (file && file.type.substr(0, 5) === 'image') {
            setFoto(file)
            
        } else {
            setFoto(null)
            
            Swal.fire(
                'Selecciona una imagen valida!',
                '',
                'info'
            )
        }
    }

    // Construye objeto de informacion de alumno
    const handleFormSubmit = (event) => {
        event.preventDefault()

      
        if (disabled === true) {
            // Se obtiene el indice con la busqueda de la matricula
            const infoStudentIndex = infoStudent.findIndex(student => student.id === matricula)
            
            const datosAct = infoStudent[infoStudentIndex]
            datosAct.nombre = nombre
            datosAct.carrera = carrera.label
            datosAct.foto = imagen

            
            const copyInfoStudent = [...infoStudent]

            // Se actualiza el arreglo de la informacion
            copyInfoStudent[infoStudentIndex] = datosAct
            setInfoStudent(copyInfoStudent)

          
            // Se actualiza el hook
            setInfoStudent(infoStudent)
            
            clean()
            setDisabled(false)
            setEnviar('Guardar Datos')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Datos Actualizados',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (Number(carrera.value) === 0) {
            // alert('Seleccione una carrera valida!')
            Swal.fire(
                'Selecciona una carrera valida!',
                '',
                'info'
            )
        } else {
            const valMatricula = infoStudent.find(id => id.id === matricula)
            // console.log(valMatricula.id)
            if (valMatricula) {
                // alert('La matricula que ingresaste, ya existe!')
                Swal.fire(
                    'La matricula que ingresaste, ya existe!',
                    '',
                    'info'
                )
            } else {
                const datos = { id: matricula, nombre: nombre, carrera: carrera.label, foto: imagen }
                // console.log(datos)

                setInfoStudent([...infoStudent, datos])
                clean()
                setDisabled(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Alumno agregado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }

    }

    const clean = () => {
        setMatricula('')
        setNombre('')
        setCarrera(opcionesCarrera[0])
        setFoto(null)
    }

    const handleEdit = (item) => {
        setMatricula(item.id)
        setNombre(item.nombre)
        setCarrera(opcionesCarrera.find(option => option.label === item.carrera))
       
        setFoto(item.foto)
        setDisabled(true)
        setEnviar('Actualizar Datos')

       
    }

    const handleDelete = (item) => {
        
        Swal.fire({
            title: 'Estas Seguro?',
            text: "No podras revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                setInfoStudent(infoStudent.filter(student => student.id !== item.id))
                // console.log(infoStudent)

                clean()
                setDisabled(false)
                setEnviar('Guardar Datos')
                Swal.fire(
                    'Eliminado!',
                    'El registro ha sido eliminado.',
                    'success'
                )
            }
        })
        
    }

    return (
        <>
            <div className='container'>
                <div className='card'>
                    <h1 className='card-header text-center'>Registro de Alumnos</h1>
                    <div className='card-body'>
                        <div className='form'>
                            <form onSubmit={handleFormSubmit}>
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Matricula:</span>
                                            <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={matricula} onChange={(e) => setMatricula(e.target.value)} disabled={disabled} required />
                                        </div>

                                        {/* <label>Matricula: <input type="number" value={matricula} onChange={(e) => setMatricula(e.target.value)} /></label> */}
                                    </div>

                                    <div className='col-md-6'>
                                        <div className="input-group mb-default">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre:</span>
                                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                value={nombre} onChange={(e) => setNombre(e.target.value)}  required />
                                        </div>

                                        {}
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>

                                        <label> Carrera:
                                        </label>
                                        <select className="form-select" aria-label="Default select example" id='carrera' value={carrera.value} onChange={(e) => handleChangeCarrera(e)}  required>
                                            {opcionesCarrera.map((opcion) => (
                                                <option key={opcion.value} value={opcion.value}>
                                                    {opcion.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='col-md-6'>
                                        <label className='input-group'>Foto:
                                            <div className="input-group mb-3">
                                                <input type="file" className="form-control" id="inputGroupFile02" accept='image/*' onChange={(e) => handleImageChange(e)} placeholder='as' required />
                                                {/* <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label> */}
                                            </div>
                                            {/* <input type="file" accept='image/*' onChange={(e) => handleImageChange(e)} /> */}
                                        </label>
                                    </div>
                                </div>

                                <div className='row'>
                                    {imagen && <div className='text-center'>Archivo seleccionado: {imagen.name}</div>}
                                </div>

                                <div className='text-center d-grid col-4 mx-auto'>
                                    <button className='btn btn-primary text-align' type="submit">{enviar}</button>

                                </div>
                            </form>
                        </div > {/*Cierra form */}
                    </div> {/* Cierra card-body */}
                </div> {/* Cierra card */}


                <br />
                <div className='row'>
                    {/* Tabla de alumnos */}
                    <h4>Tabla de Estudiantes</h4>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Matricula</th>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Carrera</th>
                                <th scope='col'>Foto</th>
                                <th scope='col'>Editar</th>
                                <th scope='col'>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {infoStudent.map((item, index) => (
                                <tr key={index}>
                                    <th scope='row' className='align-middle'>{item.id}</th>
                                    <td className='align-middle'>{item.nombre}</td>
                                    <td className='align-middle'>{item.carrera}</td>
                                    <td className='align-middle'>{item.foto ? <img src={URL.createObjectURL(item.foto)} alt='Foto' /> : ''}</td>
                                    <td className="align-middle">
                                        <button type='button' className='btn btn-link' onClick={() => handleEdit(item)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </td>
                                    <td className="align-middle">
                                        <button type='button' className='btn btn-link' onClick={() => handleDelete(item)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}

export default MiFormulario