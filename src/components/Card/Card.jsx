import './Card.css'

function Card({ icon, title, description }) {
    return (
        <div className="card">
            <p className={'icon'}>
                <img src={icon} className={'card-icon'} alt="{title}" />
            </p>
            <div className={'card-text'}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Card;
