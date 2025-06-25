import './ChatOptionIcon.css'

const ChatOptionIcon = ( {icon, name, active, onClick, title} ) => {
    return (
        <button
            className={`chat-icon-button ${active ? 'active' : ''}`}
            onClick={() => onClick(name)}
            title={title}
        >
            <img
                src={icon}
                alt={title}
                className={`chat-icon ${active ? 'active' : ''}`}
            />
        </button>
    );
};

export default ChatOptionIcon;
