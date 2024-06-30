# Gestor de Salas (Room Management)

## Pasos para arrancar el proyecto

1. Clonar el repositorio:

```sh
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

2. Instalar las dependencias

```sh
# Usando npm
npm install
# O bien pnpm
pnpm install
```

3. Iniciar el servidor de desarrollo:

```sh
# Usando npm
npm run dev
# O bien pnpm
pnpm run dev
```

## Explicación de las decisiones tomadas

- Vue 3 se eligió por su simplicidad y poder para construir aplicaciones frontend modernas.
- Vite se utilizó para el bundling debido a su rapidez y configuración mínima.
- Pinia se seleccionó como el gestor de estado por su integración nativa con Vue 3.
- Tailwindcss se utilizó para asegurar una interfaz de usuario consistente y de alta calidad.
- Axios se utilizó para manejar las solicitudes HTTP de manera sencilla.

## Dificultades encontradas

- Configuración inicial de Tailwindcss.
- Manejo del estado reactivo y la actualización de los componentes con Pinia.
- Implementación de filtros para capacidad y ocupación de salas.
- Asegurar la consistencia del diseño requirió ajustes finos en los estilos CSS.

## Extras implementados

- Caché implementado para mejora de la performance (localStorage).
- Tests unitarios mediante Vitest y tests de integración mediante Cypress.
- Simulación de la conexión con un backend utilizando apimocha.
- Funcionalidad para validar los datos de las salas.
- Filtros para capacidad y ocupación de salas.
- Aplicación responsive utilizando Tailwindcss.
- Feedback mediante snackbars.

### Recursos de diseño

- **Colores**: azul oscuro (#2E344D) y azul claro (#F5F7FB).
- **Border-radius**:
  - Contenedores: 26px
  - Inputs y botones: 12px
- **Fuente**: Helvetica
