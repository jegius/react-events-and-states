[На главную](../../../README.md)

## Содержание

- [Login Store](#Login-Store)
- [User Store](#User-Store)
- [Votes Store](#Votes-Store)

# Login-Store

Стор отвечающий за хранения стейта показа формы, ошибки

`isShowRegistration` - observable, флаг отвечающий за необходимость показа формы регистрации
`loginError` - observable, отвечает за хранение ошибки
`setIsShowRegistration` - action, отвечает за изменение флага `isShowRegistration`
`setLoginError` - action, отвечает за измение состояния ошибки `loginError`

---

# User-Store

Стор отвечающий за хранения стейта юзера

`user` - observable, текущий пользователь
`canUserVote` - observable, может ли текущий пользователь голосовать
`userNameInputValue` - observable, стейт input в форме регистрации
`setUser` - action, отвечает за смену значения текущего пользователя `user`
`setCanUserVote` - action, отвечает за измение возможности голосования `canUserVote`
`setUserNameInputValue` - action, отвечает за состояния input в форме регистрации `userNameInputValue`

---


# Votes-Store

Стор отвечающий за хранения всего, что связано с голосованием

`votes` - observable, список опций для голосования
`isVoteStarted` - observable, обозначающий, началось ли голосование
`addVoteFormValue` - observable, стейт input в форме добавления опции для голосования
`addVoteFormError` - observable, стейт ошибки при добавлении опции для голосования
`allVotesCount` - computed, считает из массива `votes` общее кол-во голосов
`mappedVotes` - computed, происходит маппинг значений из массива `votes` с расширением элемента голосования. Добавились:
 1: percent - процент голосов текущий опции от общего кол-ва голосов
 2: voteUsersSet - Set, в котором хранятся пользователи, проголосовавшие за данную опцию
`setVotes` - action, отвечает за обновление массива опций `votes`
`setIsVoteStarted` - action, отвечает за измение старта голосования `isVoteStarted`
`setAddVoteFormValue` - action, отвечает за состояния input в форме добавления опции для голосования `addVoteFormValue`
`setAddVoteFormError` - action, отвечает за состояния ошибки при добавлении опции для голосования `addVoteFormError`

---
