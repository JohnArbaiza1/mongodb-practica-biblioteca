// Consultas ejecutadas desde la terminal o desde mongoDB Compass

// CREATE (Inserts)
db.libros.insertOne(
    {
            _id:ObjectId("6aaaaaaaaaaaaaaaaaaaaa05"), titulo: "Algoritmos y Estructuras de Datos", categoria: "Tecnología", autor: "T. Cormen", copias: 4,
            etiquetas: [], publicado: new Date() 
    }
)

db.socios.insertMany(
    [
        {
            _id: 4,
            codigo: "A004",
            nombre: "Carlos Martinez",
            ciudad: "Gotera",
            activo: true,
            telefonos: []
        },

        {
            _id: 5,
            codigo: "A005",
            nombre: "Sofia Hernandez",
            ciudad: "Usulután",
            activo: true,
            telefonos: ["7888-5678"]
        }       
    ],
    {ordered: false}
)

//READ (Find)
db.libros.find({categoria: "Tecnología"});

db.libros.find(
    {copias : {$gte: 0}},
    {_id: 0, titulo:1, copias: 1}
)

db.prestamos.aggregate([
    {
        $addFields: {
            diasRetraso: {
                $max: [
                    0,
                    {
                        $dateDiff: {
                            startDate: "$fechaLimite",
                            endDate: "$fechaDevolucion",
                            unit: "day"
                        }
                    }
                ]
            }
        }
    }
])
