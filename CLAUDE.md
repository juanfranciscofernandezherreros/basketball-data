# Universal Repository & History Analyzer - CLAUDE.md

## 1. Objetivo Operativo
El objetivo de este archivo es guiar a Claude para realizar una ingeniería inversa y auditoría forense completa de **cualquier** repositorio Git. Claude debe reconstruir la línea de tiempo desde el primer commit, identificar a los contribuidores clave, mapear el flujo de ramas, deducir el propósito actual del microservicio y **proponer proactivamente una hoja de ruta con nuevas características (features)** basadas en el estado del código.

---

## 2. Comandos de Extracción Histórica Total (Desde el Origen)
Para analizar la totalidad del repositorio en este entorno Linux, ejecuta de forma secuencial los siguientes comandos en tu terminal:

* **Línea de Tiempo Completa (Desde el Commit Raíz):**
  `git log --reverse --pretty=format:"%h | %an | %ad | %s" --date=short`
  *(Analiza este output desde el principio para entender cómo nació y evolucionó el proyecto).*
* **Top de Contribuidores y Volumen:**
  `git shortlog -sn --all --no-merges`
  *(Identifica quiénes son los autores principales y quiénes han tenido un rol secundario).*
* **Mapeo de Ramas y Fusiones:**
  `git log --graph --oneline --all --decorate --max-count=100`
  *(Visualiza la estrategia de ramificación: GitFlow, Trunk-Based, etc.).*
* **Análisis de Archivos Críticos Actuales:**
  `find . -maxdepth 2 -type f \( -name "pom.xml" -name "build.gradle" -name "package.json" -name "go.mod" -name "Cargo.toml" -name "requirements.txt" -name "Dockerfile" \)`
  *(Detecta el stack tecnológico para entender qué tipo de aplicación o microservicio es).*

---

## 3. Protocolo de Análisis y Deducción del Propósito
Cuando se te pida analizar el repositorio, procesa los datos de los comandos anteriores y genera un reporte estructurado con los siguientes puntos:

1. **El Origen:** Qué se incluyó en el primer commit y cuál era la intención inicial del proyecto.
2. **Evolución de Autores:** Quiénes fundaron el código, quiénes lo mantienen hoy y qué porcentaje de cambios pertenece a cada uno.
3. **Historial de Ramas:** Identifica ramas activas, ramas abandonadas y la frecuencia de merges a la rama principal (`main`/`master`).
4. **Deducción del Propósito del Microservicio:** Basándote en el stack tecnológico detectado y las palabras clave más repetidas en los commits (ej: *auth, controller, batch, event, worker*), define formalmente qué hace este componente.

---

## 4. Ideación Proactiva de Nuevas Features (Hacia el Futuro)
Tras deducir el propósito del repositorio, debes incluir en tu reporte una sección con **3 a 5 propuestas de nuevas features técnicas o de negocio**. Para idearlas, básate en:
* **Evolución Tecnológica:** Si detectas que el repositorio es monolítico o carece de ciertas integraciones, propone patrones modernos de 2026 (ej: migración a arquitectura dirigida por eventos, resiliencia con patrones Circuit Breaker si maneja APIs externas, caching con Redis si hay consultas pesadas repetitivas).
* **Brechas en el Historial de Commits:** Si los commits muestran que el sistema procesa datos pero nunca se ven trazas de telemetría o seguridad, propone implementar un módulo de observabilidad centralizado (OpenTelemetry) o auditoría de accesos.
* **Siguiente Paso Lógico de Negocio:** Si los commits indican que es, por ejemplo, un servicio de autenticación, sugiere implementar MFA o WebAuthn. Si es un CRUD de inventario, sugiere un módulo de alertas predictivas de stock.
