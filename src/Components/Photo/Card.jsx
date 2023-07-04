export default function Card({ title, thumb, user_name }) {
    return (
        <div className='card'>
            <div className='boximage'>
                <img src={thumb} alt={title} />
            </div>
            <h2 className='title'>{title}</h2>
            <div className='client-name'>{user_name}</div>
        </div>
    );
}