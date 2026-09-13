// cambia la base de datos en la que se está trabajando
db = db.getSiblingDB("biblioteca")

// Limpiar las colecciones antes de insertar los datos
db.socios.drop();
db.libros.drop();
db.prestamos.drop();

// Definimos las coleciones con algunos datos
db.socios.insertMany(
    [
        { _id: 1, codigo: "A001", nombre: "Ana Lopez", ciudad:"San Miguel", activo: true, telefonos:["1234-5678"]},
        { _id: 2, codigo: "A002", nombre: "Luis Cruz",  ciudad: "Usulután", activo: true,  telefonos: [] },  
        { _id: 3, codigo: "A003", nombre: "Maria Rivas",ciudad: "San Miguel", activo: false, telefonos: ["2660-2222", "7000-3333"] }   
    ]
)

db.libros.insertMany(
    [
        {
            _id:ObjectId("6aaaaaaaaaaaaaaaaaaaaa01"), titulo: "Bases de Datos I", categoria: "Tecnología", autor: "R. Elmasri", copias: 3,
            etiquetas: ["bd", "sql"], publicado: new Date("2019-03-01") 
        },

        {
            _id:ObjectId("6aaaaaaaaaaaaaaaaaaaaa02"), titulo: "Bases de Datos II", categoria: "Tecnología", autor: "R. Elmasri", copias: 1,
            etiquetas: ["bd", "nosql"], publicado: new Date("2021-06-15")
        },

        {
            _id:ObjectId("6aaaaaaaaaaaaaaaaaaaaa03"), titulo: "Redes de Computadoras", categoria: "Tecnología", autor: "A. Tanenbaum", copias: 2,
            etiquetas: ["redes"], publicado: new Date("2018-01-10")
        },

        {
            _id:ObjectId("6aaaaaaaaaaaaaaaaaaaaa04"), titulo: "Cien Años de Soledad", categoria: "Literatura", autor: "G. Garcia Marquez", copias: 0,
            etiquetas: ["novela"], publicado: new Date("1967-05-30")
        }

    ]
)

db.prestamos.insertMany(
    [
        {
            _id: 1,
            socioId: 1,
            libroId: ObjectId("6aaaaaaaaaaaaaaaaaaaaa01"),
            fechaPrestamo: new Date("2025-09-01"),
            fechaLimite: new Date("2025-09-16"),
            fechaDevolucion: new Date("2025-09-15"),
            estado: "Devuelto"
        },

        {
            _id: 2,
            socioId: 2,
            libroId: ObjectId("6aaaaaaaaaaaaaaaaaaaaa02"),
            fechaPrestamo: new Date("2025-09-05"),
            fechaLimite: new Date("2025-09-20"),
            fechaDevolucion: null,
            estado: "Activo"
        },

        {
            _id: 3,
            socioId: 1,
            libroId: ObjectId("6aaaaaaaaaaaaaaaaaaaaa03"),
            fechaPrestamo: new Date("2025-09-10"),
            fechaLimite: new Date("2025-09-25"),
            fechaDevolucion: null,
            estado: "Activo"
        },

        {
            _id: 4,
            socioId: 3,
            libroId: ObjectId("6aaaaaaaaaaaaaaaaaaaaa01"),
            fechaPrestamo: new Date("2025-08-20"),
            fechaLimite: new Date("2025-09-04"),
            fechaDevolucion: new Date("2025-09-03"),
            estado: "Devuelto"
        }
    ]
)


// Definiendo índices

// Índice único para buscar socios por su código. No permite que existan dos socios con el mismo código.
db.socios.createIndex({ codigo: 1 }, { unique: true })

// Índice para facilitar la búsqueda de libros por categoría. Ejemplo: encontrar todos los libros de "Tecnología".
db.libros.createIndex({ categoria: 1 })

// Índice para buscar rápidamente todos los préstamos realizados por un determinado socio.
db.prestamos.createIndex({ socioId: 1 })

// Índice para buscar rápidamente todos los préstamos asociados a un determinado libro.
db.prestamos.createIndex({ libroId: 1 })

print("===== CANTIDAD DE DOCUMENTOS =====");
print("socios:     " + db.socios.countDocuments());
print("libros:     " + db.libros.countDocuments());
print("prestamos:  " + db.prestamos.countDocuments());

