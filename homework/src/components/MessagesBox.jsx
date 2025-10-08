import { selectMessages } from "../store/selectors"
import { useSelector } from "react-redux"
import "./MessagesBox.css"
import { VirtualScroller } from "./VirtualScroller";

// Компонент MessagesBox отображает список сообщений с виртуальным скроллингом
export default function MessagesBox(){
    // Получаем имя пользователя из localStorage
    const username = localStorage.getItem('username')
    // Получаем сообщения из Redux store
    const messages = useSelector(selectMessages)
    // Сортируем и обрабатываем сообщения
    const orderedMessages = orderMessages(messages)

    // Функция для рендера одного сообщения
    function renderMessage(index, list) {
        // Если сообщение - авторское (имя пользователя)
        if (list[index].isAuthor){
            return <div key={index} className="message isAuthor ">{list[index].body}</div>
        // Если сообщение от текущего пользователя
        } else if (list[index].username === username){
            return <div key={index} className="message message_user">{list[index].body}</div>
        // Сообщение от других пользователей
        } else {
            return <div key={index} className="message message_others">{list[index].body}</div>
        }
    }
    
    // Функция для обработки и сортировки сообщений
    function orderMessages(messages){
        const processedMessages = []
        for (var i of messages){
            // Добавляем имя автора перед первым сообщением, если оно не от текущего пользователя
            if (processedMessages.length === 0 && i.username !== username){
                processedMessages.push({username: i.username, body: i.username, isAuthor: true})
            }
            // Добавляем имя автора, если автор сменился
            else if (i.username !== username && processedMessages[processedMessages.length-1].username !== i.username){
                processedMessages.push({username: i.username, body: i.username, isAuthor: true})
            }
            // Добавляем само сообщение
            processedMessages.push({...i})
            // Помечаем, что это не авторское сообщение
            processedMessages[processedMessages.length-1].isAuthor = false
        }
        // Для отладки выводим обработанные сообщения
        console.log(processedMessages)
        return processedMessages
    }

    // Рендерим виртуальный скроллер с сообщениями
    return <VirtualScroller rowHeight={33} renderRow={renderMessage} list={orderedMessages} nodePadding={22} />
}