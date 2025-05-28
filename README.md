# DevDungeon

## Быстрый старт

### 1. Клонируйте репозиторий

```bash
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
cd dev-dungeon
```

### 2. Установите зависимости

```bash
yarn install
```

### 3. Настройте переменные окружения

Скопируйте пример файла и заполните при необходимости:

```bash
cp .env.example .env
```

**Пример .env:**

```
REACT_APP_KEYCLOAK_URL=http://localhost:8080/auth
REACT_APP_KEYCLOAK_REALM=devdungeon
REACT_APP_KEYCLOAK_CLIENT_ID=frontend
REACT_APP_API_URL=http://localhost:3001/api
```

### 4. Запустите Keycloak (Docker)

```bash
docker compose up -d
```

- Keycloak будет доступен на http://localhost:8080
- Админ-панель: http://localhost:8080/admin (логин/пароль: admin/admin)
- Realm, клиент и тестовый пользователь уже преднастроены (см. ниже)

### 5. Запустите фронтенд

```bash
yarn start
```

- Приложение будет доступно на http://localhost:3000

### 6. Вход в приложение

- **Логин:** `testuser`
- **Пароль:** `testpassword`

---

## Структура проекта

- `src/` — исходный код React-приложения
- `docker-compose.yml` — быстрый запуск Keycloak
- `.env.example` — пример переменных окружения

---