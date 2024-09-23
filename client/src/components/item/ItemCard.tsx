import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
// import gearmatelogo from '../../static-photos/gearmatelogo.png'

interface ItemCardProps {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, id, price, description, image }) => {

    const navigate = useNavigate();

    const handleRentClick = () => {
        navigate(`/item/${id}`);
    };
    const backendUrl = import.meta.env.VITE_API_URL;
    const imageUrl = `${backendUrl}${image}`

    const descriptionColor = grey[700];
    return (
        <Card onClick={handleRentClick} sx={{ maxWidth: 345, backgroundColor: 'white', boxShadow: 0, cursor: 'pointer' }}>
            <CardMedia
                sx={{ height: 300, backgroundColor: 'white', borderRadius: 4, backgroundImage: 'url("../../../static-photos/me-climbing.png")' }}
                image={imageUrl}
                title="green iguana"
            />
            <CardContent sx={{ backgroundColor: 'white' }}> {/* Set background color of CardContent to white */}
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: -1, ml: -1 }}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ mt: -1, ml: -1, color: descriptionColor }}>
                    {description}
                </Typography>
                <Typography variant="body1" component="div" sx={{ ml: -1 }}>
                    ${price} / Day
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ItemCard;


