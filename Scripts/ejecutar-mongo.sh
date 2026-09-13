#!/bin/bash

# ==================================================
# Script para ejecutar el archivo de inicialización
# de MongoDB dentro del contenedor de Docker.
# ==================================================

# Obtener la carpeta raíz del proyecto
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Cargar variables del .env
set -a
source "$PROJECT_ROOT/.env"
set +a

echo "================================="
echo " Ejecutando script de Biblioteca"
echo "================================="

docker exec -it mongodb-servidor-practica mongosh "$MONGO_DATABASE" \
    -u "$MONGO_ROOT_USERNAME" \
    -p "$MONGO_ROOT_PASSWORD" \
    --authenticationDatabase admin \
    /docker-entrypoint-initdb.d/01-biblioteca.js

echo ""
echo "Script ejecutado correctamente."



