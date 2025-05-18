import React from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DetailPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>();
    const {id} = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://672b0125976a834dd0253071.mockapi.io/items/' + id);
                setPizza(data);
            } catch {
                alert('Ошибка получения данных с сервера');
                navigate('/');
            }
        }

        fetchPizza();
    }, [id, navigate]);

    if (!pizza) {
        return (
            <div  className='container'>
                Загрузка...
            </div>
        )
    }

  return (
    <div className='container'>
        <div className='detail-pizza__wrapper'>
            <img src={pizza.imageUrl} alt=""/>
            <div className='detail-pizza__title'>
                {pizza.title}
            </div>
            <div className='detail-pizza__price'>
                {pizza.price} ₽
            </div>
        </div>
    </div>
  )
}

export default DetailPizza;