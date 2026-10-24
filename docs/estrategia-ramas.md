# Estrategia de ramas - LibraryManagement

## Objetivo

Organizar el desarrollo, las pruebas y la preparacion de versiones mediante ramas de Git, manteniendo un historial de cambios y controlando la integracion del codigo con Pull Requests.

## Ramas del proyecto

- **DEV:** rama destinada al desarrollo de cambios y correcciones.
- **QA:** rama destinada a la validacion de los cambios y la ejecucion de pruebas.
- **PROD:** rama para preparar versiones que hayan superado las validaciones.
- **main:** rama principal del repositorio, protegida mediante reglas de GitHub.

## Flujo de trabajo

1. Desarrollar los cambios en DEV.
2. Crear un Pull Request de DEV hacia QA.
3. Revisar los cambios y ejecutar las pruebas correspondientes.
4. Promover los cambios validados hacia PROD mediante un Pull Request.
5. Integrar la version aprobada en main mediante un Pull Request.

## Control de cambios

Los Pull Requests permiten revisar las diferencias entre ramas antes de integrar modificaciones. La rama main cuenta con un ruleset que requiere Pull Requests, restringe las eliminaciones y bloquea los force pushes.

Las revisiones y las comprobaciones automatizadas deben documentarse como parte del proceso de validacion.
