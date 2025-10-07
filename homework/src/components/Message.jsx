import "./Message.css"

export default function Message({pos, children}){
    const className = pos === 1 ? "message message_user" : "message message_others"

    return <div className={className}>{children}</div>
}