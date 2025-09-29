# Global Chat (React + Redux Toolkit)

## Что это?
Простое SPA «Глобальный чат» с авторизацией, общим каналом сообщений, кэшем состояния и виртуальным скроллом.

## Технологии
- React + Redux Toolkit
- LocalStorage (персист состояния)
- Свой VirtualList (Context + расчёт видимого окна)
- Backend: Express (в `homework-backend`), хранение в памяти

## Быстрый старт
1) Backend:
```sh
cd homework-backend
pnpm install
pnpm start   # http://localhost:3001  (Swagger: /api-docs)
````

2. Frontend:

```sh
cd ..
pnpm install
pnpm start   # http://localhost:3000
```

## API (кратко)

* `POST /register` `{ username, password }` → 201
* `POST /login` `{ username, password }` → `{ token }`
* `GET /chats`  (Auth: `Bearer <token>`) → `[{ user, body }]`
* `POST /chats` (Auth) `{ body }` → `{ user, body }`

### Авторизация

Передаём заголовок:

```
Authorization: Bearer <token>
```

## Три способа поолучения токена.

### Способ 1 (через фронт)

1. Открой `http://localhost:3000`, залогинься.
2. DevTools → **Application** → **Local Storage** → `http://localhost:3000` → ключ **`appState`**.
3. Скопируй значение `auth.token`.

### Способ 2 (через Swagger)

1. Открой `http://localhost:3001/api-docs`.
2. Открой **POST /login** → **Try it out** → введи:

```json
{ "username": "ТВОЙ_ЛОГИН", "password": "ТВОЙ_ПАРОЛЬ" }
```

3. Нажми **Execute** → скопируй `"token"` из Response.
   (Для запросов в Swagger можно нажать **Authorize** и вставить `Bearer <твой_токен>`.)

### Способ 3 (через curl)

```bash
# логин → вернёт JSON с полем token
curl -s -X POST http://localhost:3001/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"ТВОЙ_ЛОГИН","password":"ТВОЙ_ПАРОЛЬ"}'

# положить токен в переменную (macOS):
TOKEN=$(curl -s -X POST http://localhost:3001/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"ТВОЙ_ЛОГИН","password":"ТВОЙ_ПАРОЛЬ"}' | sed -E 's/.*"token":"([^"]+)".*/\1/')
echo "$TOKEN"
```

## Кэш

Срезы `auth`, `chat` сохраняются в LocalStorage (`appState`) и подхватываются при старте.

## Virtual Scroll

Компонент `src/virtual/VirtualList.jsx` рендерит только видимые элементы (+ overscan).
Автопрокрутка вниз только если пользователь «у низа».

## Известные ограничения

* Бэкенд хранит данные **в памяти** (перезапуск сервера очищает всё).
* История чата общая для всех пользователей (по ТЗ).
