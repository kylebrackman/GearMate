import { useContext } from 'react';
import { UserContext } from "../../context/UserContext.tsx";

const RentalsPage = () => {
    const { user } = useContext(UserContext)

    // const currentRentalsList = (user?.current_rentals.map)

    if (user && user.profile) {
        return (
            <div>
                <div>
                    <div >
                        {/* <CurrentRentals /> */}
                    </div>
                    <br />
                    <div >
                        {/* <UpcomingRentals /> */}
                    </div>
                    <br />
                    <div >
                        {/* <PastRentals /> */}
                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div>
                <h1>
                    Please Log In
                </h1>
            </div>
        )
    }
}

export default RentalsPage