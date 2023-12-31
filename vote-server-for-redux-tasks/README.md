[На главную](../README.md)

# Документация для голосовательной системы на Express.js

## Содержание
- [Описание](#Описание)
- [Установка](#Установка)
- [Запуск](#Запуск)
- [API](#API)
    * [Получение всех пунктов для голосования](#Получение-всех-пунктов-для-голосования)
    * [Добавление пункта для голосования](#Добавление-пункта-для-голосования)
    * [Старт голосования](#Старт-голосования)
    * [Способность голосовать](#Способность-голосовать)
    * [Завершение голосования](#Завершение-голосования)
    * [Удаление пункта для голосования](#Удаление-пункта-для-голосования)
    * [Голосование](#Голосование)


## Описание
Этот проект написан на Express.js и используется для создания и управления голосованиями. Поддерживает добавление пунктов для голосования и учет голосов.

## Установка
1. Клонируйте этот репозиторий.
2. `npm install` для установки зависимостей.

## Запуск
Проект можно запустить с помощью команды `npm start` или `node index.js`.

## API

### Получение всех пунктов для голосования
**GET /api/voteItems**

Ответ:
```json
[
    {
        "title": "Item title",
        "id": "uuid",
        "voted": ['username1', 'username2']
    },
    ...
]
```

### Добавление пункта для голосования
**POST /api/voteItems**

Тело запроса:
```json
{
    "title": "Your vote item title"
}
```

### Старт голосования
**GET /api/start**

### Способность голосовать
**GET api/canVote/:id**

:id - Уникальный идентификатор пользователя.

### Завершение голосования
**GET /api/stop**

### Удаление пункта для голосования
**DELETE /api/voteItems/:id**

:id - Уникальный идентификатор пункта для голосования.

### Голосование
**PUT /api/voteItems/:id**

:id - Уникальный идентификатор пункта для голосования.

## Настройки проекта
Проект находится на порту 3001. Если вам нужно изменить порт, вы можете указать это в файле `index.js`. В случае изменении порта не забудьте поменять его в ссылках в учебных примерах.

---
Если у вас появятся проблемы или предложения, не стесняйтесь обращаться.