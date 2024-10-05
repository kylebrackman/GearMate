import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext.tsx';
import RentalCard from './RentalCard.tsx';
import { Rental } from "../../types/models.types";
const CurrentRentals: React.FC = () => {
    const { user } = useContext(UserContext)

    const pastRentals: Rental[] | undefined = user?.past_rentals;


    console.log(pastRentals)
    const currentRentalsList = pastRentals?.map((r: Rental) => {
        return <RentalCard
            key={r.id}
            itemName={r.item?.name ?? ''}
            image={r.item?.image || ''}
            description={r.item?.description ?? ''}
            id={r.item?.id ?? 0}
            price={r.item?.price ?? 0}
        />
        console.log(r.item)
        return (
            <p key={r.id}>
                placeholder
            </p>
        )
    })

    return (
        <div>
            <br />
            <div>
                <h1>Current Rentals</h1>
            </div>
            <div>
                {pastRentals && pastRentals.length > 0 ? currentRentalsList : "You have no current rentals"}
            </div>
        </div>
    )
}

export default CurrentRentals