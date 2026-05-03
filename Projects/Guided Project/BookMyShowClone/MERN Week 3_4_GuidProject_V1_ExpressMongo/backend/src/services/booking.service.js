const Booking = require("../models/Booking");
const Show = require("../models/Show");
const CustomError = require("../utils/customError");

//Create Booking
exports.createBooking = async(userId,{showId,seats})=>{
    //get show
    const show = await Show.findById(showId);

    if(!show){
        throw new CustomError("Show not found", 404);
        
    }
    // 2. validate seats
    const selectedSeats = show.seats.filter((seat)=>seats.includes(seat.seatNumber));
    if(selectedSeats.length!=seats.length){
        throw new CustomError("Some seats do not exist", 400);
    }

    //3. check if already booked
    for(let seat of selectedSeats){
        if(seat.isBooked){
            throw new CustomError(`Seat ${seat.seatNumber} is already booked`,409); 
        }
    }

    //4. Mark seats as booked
    show.seats = show.seats.map((seat)=>{
        if (seats.includes(seat.seatNumber)) {
            seat.isBooked = true;
        }
        return seat;
    });
    //5 . update available seats
    show.availableSeats -=seats.length;

    await show.save();

    //6. Create booking
    const booking = await Booking.create({
        userId,showId,seats,totalSeats:seats.length,
    });
    return booking;
};
//get user bookings
exports.getUserBookings = async(userId)=>{
    const bookings = await Booking.find({
        userId,
        status:"booked",
    })
    .populate({
        path:"showId",
        select:"date time availableSeats movieId",
        populate:{
            path:"movieId",
            select:"title genre",
        },
    })
    .sort("-createdAt");

    //Transform response
    return bookings.map((booking)=>({
        bookingId:booking._id,
        seats:booking.seats,
        totalSeats:booking.totalSeats,
        status:booking.status,
        bookingTime:booking.bookingTime,

        show:{
            id:booking.showId._id,
            date:booking.showId.date,
            time:booking.showId.time,
            availableSeats:booking.showId.availableSeats,
        },
        movie:{
            id:booking.showId.movieId_id,
            title:booking.showId.movieId.title,
            genre:booking.showId.movieId.genre,
        },
    }));
};

//Cancel booking
exports.cancelBooking = async(bookingId,userId)=>{
    const booking = await Booking.findById(bookingId);
    if(!booking)
        throw new CustomError("Booking not found",404);

    if(booking.userId.toString()!==userId.toString()){
        throw new CustomError("Unauthorized",401);  
    }

    if(booking.status === "cancelled"){
        throw new CustomError("Already cancelled",409);
    }
    //1. get show
    const show = await Show.findById(booking.showId);
    //2. Release seats
    show.seats = show.seats.map((seat)=>{
        if(booking.seats.includes(seat.seatNmber)){
            seat.isBooked = false;
        }
        return seat;
    });
    //3. Update available seats
    show.availableSeats +=booking.seats.length;
    await show.save();

    //4. update booking
    booking.status = "cancelled";
    await booking.save();
};