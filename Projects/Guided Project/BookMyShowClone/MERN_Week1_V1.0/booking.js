// Handles booking related operations
const bookingEmitter = require("./events");

let currentbooking = null;

function getCurrentBooking(){
    return currentbooking;
}

function clearCurrentBooking(){
    currentbooking = null;
}

function checkDuplicateBooking(movie,showtime,seatCount){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(
                currentbooking && currentbooking.movieId === movie.id && 
                currentbooking.time === showtime.time && 
                currentbooking.seatCount === seatCount
            ){
                return reject("Duplicate booking detected. Ticket already booked");
            }
            resolve("No duplicate booking found.");
        }, 300);
    });
}

function checkSeatsAvailability(showtime,seatCount){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(showtime.seatsAvilable < seatCount){
                return reject(`Only ${showtime.seatsAvilable} seat(s) are available`)
            }
            resolve("Seats are available");
        }, 300);
    });
}

function generateBookingDetails(movie,showtime,seatCount){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const booking = {
                bookingI:`BOOK-$(Date.now())`,
                movieId: movie.id,
                movieTitle: movie.title,
                time: showtime.time,
                seatCount
            };
            resolve(booking);
        }, 300);
    });
}

function confirmBooking(booking,showtime){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            showtime.seatsAvilable-=booking.seatCount;
            currentbooking = booking;
            bookingEmitter.emit("bookingconfirmed",booking);
            resolve(booking);
        }, 300);
    });
}

// Promise chaining
function processBooking(movie,showtime,seatCount){
    bookingEmitter.emit("bookingStarted");

    return checkDuplicateBooking(movie,showtime,seatCount)
    .then(()=>{
        bookingEmitter.emit("bookingValidated");
        return checkSeatsAvailability(showtime,seatCount);
    })
    .then(()=>generateBookingDetails(movie,showtime,seatCount))
    .then((booking)=>confirmBooking(booking,showtime))
    .catch((error)=>{
        bookingEmitter.emit("bookingfailed",error);
        throw error;
    });
}

// async/await
async function processBookingAsync(movie,showtime,seatCount){
    try{
        bookingEmitter.emit("bookingStarted");

        await checkDuplicateBooking(movie,showtime,seatCount);
        bookingEmitter.emit("bookingValidated");

        await checkSeatsAvailability(showtime,seatCount);
        
        const booking = await generateBookingDetails(movie,showtime,seatCount);

        const confirmedBooking = await confirmBooking(booking,showtime);

        return confirmedBooking;
    }
    catch(error){
        bookingEmitter.emit("bookingFailed",error);
        throw error;
    }
}

module.exports = {
    getCurrentBooking,
    clearCurrentBooking,
    processBooking,
    processBookingAsync
};