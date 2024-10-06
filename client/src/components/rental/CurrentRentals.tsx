import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext.tsx';
import RentalCard from './RentalCard.tsx';
import { Rental } from "../../types/models.types";
const CurrentRentals: React.FC = () => {
    const { user } = useContext(UserContext)

    const currentRentals: Rental[] | undefined = user?.past_rentals;


    console.log(currentRentals)
    const currentRentalsList = currentRentals?.map((r: Rental) => {
        return <RentalCard
            key={r.id}
            itemName={r.item?.name ?? ''}
            image={r.item?.image || ''}
            description={r.item?.description ?? ''}
            id={r.item?.id ?? 0}
            price={r.item?.price ?? 0}
            end_date={r.end_date ?? ''}
            start_date={r.start_date ?? ''}
            owner={r.owner}
        />
    })

    return (
        <div>
            <br />
            <div>
                <h1>Current Rentals</h1>
            </div>
            <div>
                {currentRentals && currentRentals.length > 0 ? currentRentalsList : "You have no current rentals"}
            </div>
        </div>
    )
}

export default CurrentRentals