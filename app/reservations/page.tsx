import EmptyState from "../components/container/EmptyState";
import getCurrentUser from "../actions/getCurrentUsers";
import getReservations from "../actions/getReservation";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your properties"
            />
        )
    }

    return (
        <ReservationClient
            reservation={reservations}
            currentUser={currentUser}
        />
    )
}; 


export default ReservationPage;