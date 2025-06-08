# DevDungeon

### 1. Клонируйте репозиторий

```bash
git clone <URL-ВАШЕГО-РЕПОЗИТОРИЯ>
cd dev-dungeon
```

### 2. В файле `.env` в корне проекта

- Замените значения на свои из Keycloak.

### 3. Запустите Keycloak через Docker

```bash
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  -e KC_FRAME_OPTIONS=ALLOWALL \
  quay.io/keycloak/keycloak:latest \
  start-dev
```

- После запуска Keycloak будет доступен по адресу http://localhost:8080
- Логин: `admin`, пароль: `admin`

### 4. Настройте Keycloak

1. Откройте http://localhost:8080 и войдите как admin.
2. Создайте новый Realm (например, `myrealm`).
3. Создайте клиента (например, `myclient`) с типом OpenID Connect.
4. В настройках клиента:
   - **Root URL:** `http://localhost:3000`
   - **Valid Redirect URIs:** `http://localhost:3000/*`
   - **Web Origins:** `http://localhost:3000`
5. Создайте пользователя для теста.

### 5. Установите зависимости и запустите фронтенд

```bash
yarn install
yarn start
```

### 6. Откройте приложение

- Перейдите в браузере на [http://localhost:3000](http://localhost:3000)
- Для входа используйте данные тестового пользователя из Keycloak