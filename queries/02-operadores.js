// ============================================================
// OPERADOR $or (Al menos una de las condiciones debe cumplirse.)
// Busca libros que tengan 0 copias o cuya categoría sea "Literatura".
db.libros.find({
    $or: [
        { copias: { $eq: 0 } },
        { categoria: "Literatura" }
    ]
})

// ============================================================
// OPERADOR $exists (Comprueba si el campo "telefonos" existe en el documento.)
// $exists: true -> el campo debe existir.
// $ne: []       -> el campo no debe ser un arreglo vacío.
// En conjunto, busca socios que tengan el campo "telefonos" y que además tengan al menos algún teléfono.
db.socios.find({
    telefonos: {
        $exists: true,
        $ne: []
    }
})

// ============================================================
// OPERADOR $type (Comprueba que el campo "categoria" sea de un tipo BSON determinado.)
// "string" indica que categoria debe contener texto.
db.libros.find({
    categoria: {
        $type: "string"
    }
})

// ============================================================
// OPERADOR $all (Comprueba que un arreglo contenga TODOS los valores especificados.)
// El libro debe tener las etiquetas "bd" Y "nosql".
db.libros.find({
    etiquetas: {
        $all: ["bd", "nosql"]
    }
})

// ============================================================
// OPERADOR $size (Comprueba que un arreglo tenga exactamente la cantidad de elementos indicada.)
// Aquí busca libros que tengan exactamente 1 etiqueta.
db.libros.find({
    etiquetas: {
        $size: 1
    }
})

// ============================================================
// OPERADOR $regex (Busca texto que coincida con una expresión regular.)
// ^M -> el nombre debe comenzar con "M".
// i  -> ignora diferencias entre mayúsculas y minúsculas.
// Por ejemplo: Maria, Manuel, miguel, MARTA, etc.
db.socios.find({
    nombre: {
        $regex: /^M/i
    }
})
