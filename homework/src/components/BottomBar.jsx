import './BottomBar.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../store/selectors';
import { sendMessage } from '../store/thunk';
import { setFooterHeight } from '../store/reducer';

export default function BottomBar(){
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const footer = document.querySelector("footer")

    function auto_grow(element) {
        element.style.height = "5px";
        element.style.height = element.scrollHeight > 45 ? (element.scrollHeight - 5) + "px" : "35px";
        dispatch(setFooterHeight( footer ? footer.offsetHeight + 21 : 68 + 21 ))
    }

    function postMessage(){
        const textarea = document.querySelector("textarea")
        if (textarea.value === "") return
        dispatch(sendMessage(token, textarea.value))
        textarea.value = ""
        auto_grow(textarea)
    }

    
    return <footer>
        <textarea onInput={(event) => auto_grow(event.target)} placeholder="Type your message here..." ></textarea>
        <button onClick={() => postMessage()} >Send</button>
    </footer>
}