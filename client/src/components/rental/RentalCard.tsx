import React from 'react';

interface UserItemCardProps {
    id: number;
    itemName: string;
    image: string;
    price: number;
    description: string;
}

const RentalCard: React.FC<UserItemCardProps> = ({
    id,
    itemName,
    // image,
    price,
    // description
}) => {
    return (
        <div>
            <a href={`/item/${id}`}>
                <div > 
                    <img />
                </div>
            </a>
            <div >
                <div >{itemName}</div>
                <p></p>
            </div>
            <div>
                <span>${price} Per Day</span>
                <br />
                <a href={`/item/${id}`}>
                    <span>Rent</span>
                </a>
            </div>
        </div>
    );
};

export default RentalCard;
