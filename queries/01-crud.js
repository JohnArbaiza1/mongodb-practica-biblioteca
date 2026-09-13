// ============================================================
// CONSULTAS EJECUTADAS DESDE LA TERMINAL O DESDE MONGODB COMPASS
// ============================================================

// ============================================================
// CREATE (INSERTS)
// ============================================================

// INSERT ONE: Inserta un solo documento en la colección "libros".

db.libros.insertOne(
    {
        // ObjectId() crea un identificador de tipo ObjectId.
        _id: ObjectId("6aaaaaaaaaaaaaaaaaaaaa05"),
        titulo: "Algoritmos y Estructuras de Datos",
        categoria: "Tecnología",
        autor: "T. Cormen",
        copias: 4,
        etiquetas: [],
        // Guarda la fecha y hora actual.
        publicado: new Date()
    }
)

// INSERT MANY: Inserta varios documentos en la colección "socios".

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

    // ordered: false permite que MongoDB continúe insertando los demás documentos aunque alguno falle.
    { ordered: false }
)


// ============================================================
// READ (FIND)
// ============================================================

// Busca todos los libros cuya categoría sea exactamente "Tecnología".
db.libros.find({
    categoria: "Tecnología"
});

// FILTRO: Busca libros que tengan 0 o más copias.
// PROYECCIÓN:
// _id: 0       -> Oculta el campo _id.
// titulo: 1   -> Muestra el título.
// copias: 1   -> Muestra la cantidad de copias.
//
// El segundo objeto de find() es la proyección, es decir, indica qué campos queremos mostrar.
db.libros.find(
    {
        copias: { $gte: 0 }
    },
    {
        _id: 0,
        titulo: 1,
        copias: 1
    }
);

// aggregate() permite realizar operaciones mediante un pipeline de agregación.
// $addFields agrega un nuevo campo llamado "diasRetraso".
// $dateDiff calcula la diferencia entre dos fechas.
// startDate: Es la fecha límite de devolución.
// endDate: Es la fecha en que realmente se devolvió el libro.
// unit: "day": Indica que queremos obtener la diferencia en días.
// $max: Evita que el resultado sea negativo. Si la devolución fue antes de la fecha límite,
// diasRetraso será 0.
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
]);

// $gt significa "greater than" (mayor que). Aquí indica que copias debe ser mayor que 0.
// $lte significa "less than or equal" (menor o igual que). Aquí indica que copias debe ser menor o igual que 2.
// Por lo tanto: copias > 0 Y copias <= 2
// La proyección:
// _id: 0       -> No mostrar el ID.
// titulo: 1   -> Mostrar título.
// categoria: 1 -> Mostrar categoría.
db.libros.find(
    {
        $and: [
            { copias: { $gt: 0 } },
            { copias: { $lte: 2 } }
        ]
    },
    {
        _id: 0,
        titulo: 1,
        categoria: 1
    }
);

// Buscar libros cuya etiqueta sea "bd"
db.libros.find({
    etiquetas: "bd"
});

// Ordenar libros por cantidad de copias y título
// sort() sirve para ordenar los resultados.
db.libros.find().sort({
    copias: -1,
    titulo: 1
});

// Contar socios activos - Forma 1
// Busca los socios cuyo campo "activo" sea true y cuenta cuántos documentos se encontraron.
db.socios.find({
    activo: true
}).count();

// Contar socios activos - Forma 2
// countDocuments() cuenta directamente los documentos que cumplen la condición.
db.socios.countDocuments({
    activo: true
});

// distinct() obtiene los valores diferentes de un campo.
db.libros.distinct("categoria");