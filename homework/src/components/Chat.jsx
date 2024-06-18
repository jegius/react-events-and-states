import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages } from '../store/selectors';
import { fetchMassages } from '../store/thunks';


export const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages)

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await fetchMassages(dispatch);
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch]);

    return (
        <>
            <div>
                {messages?.map((message, index) => (
                    <div key={index}>
                        <p>Сообщение: {message.body}</p>
                        <p>Автор: {message.username}</p>
                    </div>
                ))}
            </div>
        </>
    )
}