// src/api/axios.js
import axios from "axios";

// ═══════════════════════════════════════════════
// LOCAL STORAGE DATABASE INITIALIZATION & UTILS
// ═══════════════════════════════════════════════

const generateSeats = (bookedList = []) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seats = [];
  for (const r of rows) {
    for (let c = 1; c <= 10; c++) {
      const num = `${r}${c}`;
      seats.push({ seatNumber: num, isBooked: bookedList.includes(num) });
    }
  }
  return seats;
};

const getDB = () => {
  let db = localStorage.getItem("bms_db");
  if (!db) {
    const initialDB = {
      users: [
        { _id: "u1", name: "Admin User", email: "admin@bms.com", password: "admin123", role: "admin" },
        { _id: "u2", name: "Demo Customer", email: "customer@bms.com", password: "customer123", role: "user" }
      ],
      movies: [
        {
          _id: "m1",
          title: "Inception",
          description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
          duration: 148,
          genre: "Sci-Fi",
          rating: 4.8,
          releaseDate: "2010-07-16",
          poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60"
        },
        {
          _id: "m2",
          title: "Interstellar",
          description: "A team of explorers travel through a wormhole in space in search of a new home.",
          duration: 169,
          genre: "Sci-Fi",
          rating: 4.9,
          releaseDate: "2014-11-07",
          poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60"
        },
        {
          _id: "m3",
          title: "The Dark Knight",
          description: "Batman faces the Joker, a mastermind of chaos threatening Gotham City.",
          duration: 152,
          genre: "Action",
          rating: 4.9,
          releaseDate: "2008-07-18",
          poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=60"
        }
      ],
      shows: [
        {
          _id: "s1",
          movieId: "m1",
          date: "2026-07-01",
          time: "03:00 PM",
          totalSeats: 100,
          availableSeats: 98,
          price: 250,
          seats: generateSeats(["A1", "B2"])
        },
        {
          _id: "s2",
          movieId: "m1",
          date: "2026-07-01",
          time: "07:00 PM",
          totalSeats: 100,
          availableSeats: 100,
          price: 250,
          seats: generateSeats([])
        },
        {
          _id: "s3",
          movieId: "m2",
          date: "2026-07-02",
          time: "06:00 PM",
          totalSeats: 100,
          availableSeats: 99,
          price: 300,
          seats: generateSeats(["E5"])
        }
      ],
      bookings: []
    };
    localStorage.setItem("bms_db", JSON.stringify(initialDB));
    return initialDB;
  }
  return JSON.parse(db);
};

const saveDB = (db) => {
  localStorage.setItem("bms_db", JSON.stringify(db));
};

const getLoggedUser = (headers) => {
  const auth = headers.Authorization || headers.authorization;
  if (auth && auth.startsWith("Bearer mock-token-")) {
    const userId = auth.replace("Bearer mock-token-", "");
    const db = getDB();
    return db.users.find(u => u._id === userId) || null;
  }
  return null;
};

// ═══════════════════════════════════════════════
// CUSTOM LOCAL STORAGE AXIOS ADAPTER
// ═══════════════════════════════════════════════

const mockAdapter = (config) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    const url = config.url || "";
    const method = (config.method || "get").toLowerCase();
    const data = typeof config.data === "string" ? JSON.parse(config.data || "{}") : (config.data || {});
    const params = config.params || {};

    let responseData = { success: false, message: "Route not found" };
    let status = 404;

    const authHeader = config.headers || {};
    const currentUser = getLoggedUser(authHeader);

    // Helpers to populate IDs
    const populateMovie = (movieId) => db.movies.find(m => m._id === movieId) || null;
    const populateShow = (showId) => {
      const show = db.shows.find(s => s._id === showId);
      if (!show) return null;
      return { ...show, movieId: populateMovie(show.movieId) };
    };

    // Routing
    try {
      // ── Auth Endpoints ──
      if (url.includes("/auth/register") && method === "post") {
        const { name, email, password } = data;
        if (db.users.some(u => u.email === email)) {
          responseData = { success: false, message: "User already exists" };
          status = 400;
        } else {
          const newUser = { _id: "u_" + Date.now(), name, email, password, role: "user" };
          db.users.push(newUser);
          saveDB(db);
          responseData = { success: true, message: "User registered successfully", data: newUser };
          status = 200;
        }
      } 
      else if (url.includes("/auth/login") && method === "post") {
        const { email, password } = data;
        const user = db.users.find(u => u.email === email && u.password === password);
        if (!user) {
          responseData = { success: false, message: "Invalid email or password" };
          status = 401;
        } else {
          responseData = {
            success: true,
            message: "Login successful",
            data: {
              token: "mock-token-" + user._id,
              user: { id: user._id, name: user.name, email: user.email, role: user.role }
            }
          };
          status = 200;
        }
      }
      // ── Movie Endpoints ──
      else if (url.endsWith("/movies") && method === "get") {
        const query = (params.search || "").toLowerCase();
        let matched = db.movies;
        if (query) {
          matched = db.movies.filter(m => m.title.toLowerCase().includes(query) || m.genre.toLowerCase().includes(query));
        }
        responseData = {
          success: true,
          data: {
            movies: matched,
            pagination: { page: 1, limit: 10, total: matched.length }
          }
        };
        status = 200;
      }
      else if (url.match(/\/movies\/[a-zA-Z0-9_-]+$/) && method === "get") {
        const id = url.split("/").pop();
        const movie = db.movies.find(m => m._id === id);
        if (!movie) {
          responseData = { success: false, message: "Movie not found" };
          status = 404;
        } else {
          responseData = { success: true, data: movie };
          status = 200;
        }
      }
      else if (url.endsWith("/movies") && method === "post") {
        if (!currentUser || currentUser.role !== "admin") {
          responseData = { success: false, message: "Unauthorized access" };
          status = 403;
        } else {
          const newMovie = { _id: "m_" + Date.now(), ...data };
          db.movies.push(newMovie);
          saveDB(db);
          responseData = { success: true, message: "Movie created successfully", data: newMovie };
          status = 201;
        }
      }
      else if (url.match(/\/movies\/[a-zA-Z0-9_-]+$/) && method === "put") {
        if (!currentUser || currentUser.role !== "admin") {
          responseData = { success: false, message: "Unauthorized access" };
          status = 403;
        } else {
          const id = url.split("/").pop();
          const index = db.movies.findIndex(m => m._id === id);
          if (index === -1) {
            responseData = { success: false, message: "Movie not found" };
            status = 404;
          } else {
            db.movies[index] = { ...db.movies[index], ...data };
            saveDB(db);
            responseData = { success: true, message: "Movie updated successfully", data: db.movies[index] };
            status = 200;
          }
        }
      }
      else if (url.match(/\/movies\/[a-zA-Z0-9_-]+$/) && method === "delete") {
        if (!currentUser || currentUser.role !== "admin") {
          responseData = { success: false, message: "Unauthorized access" };
          status = 403;
        } else {
          const id = url.split("/").pop();
          db.movies = db.movies.filter(m => m._id !== id);
          db.shows = db.shows.filter(s => s.movieId !== id);
          saveDB(db);
          responseData = { success: true, message: "Movie deleted successfully" };
          status = 200;
        }
      }
      // ── Show Endpoints ──
      else if (url.endsWith("/shows") && method === "get") {
        let matched = db.shows;
        if (params.movieId) {
          matched = db.shows.filter(s => s.movieId === params.movieId);
        }
        const populated = matched.map(s => populateShow(s._id));
        responseData = { success: true, data: populated };
        status = 200;
      }
      else if (url.match(/\/shows\/[a-zA-Z0-9_-]+$/) && method === "get") {
        const id = url.split("/").pop();
        const show = populateShow(id);
        if (!show) {
          responseData = { success: false, message: "Show not found" };
          status = 404;
        } else {
          responseData = { success: true, data: show };
          status = 200;
        }
      }
      else if (url.endsWith("/shows") && method === "post") {
        if (!currentUser || currentUser.role !== "admin") {
          responseData = { success: false, message: "Unauthorized access" };
          status = 403;
        } else {
          const totalSeats = Number(data.totalSeats || 100);
          const newShow = {
            _id: "s_" + Date.now(),
            ...data,
            totalSeats,
            availableSeats: totalSeats,
            seats: generateSeats([])
          };
          db.shows.push(newShow);
          saveDB(db);
          responseData = { success: true, message: "Show created successfully", data: populateShow(newShow._id) };
          status = 201;
        }
      }
      else if (url.match(/\/shows\/[a-zA-Z0-9_-]+$/) && method === "put") {
        if (!currentUser || currentUser.role !== "admin") {
          responseData = { success: false, message: "Unauthorized access" };
          status = 403;
        } else {
          const id = url.split("/").pop();
          const index = db.shows.findIndex(s => s._id === id);
          if (index === -1) {
            responseData = { success: false, message: "Show not found" };
            status = 404;
          } else {
            db.shows[index] = { ...db.shows[index], ...data };
            saveDB(db);
            responseData = { success: true, message: "Show updated successfully", data: populateShow(id) };
            status = 200;
          }
        }
      }
      else if (url.match(/\/shows\/[a-zA-Z0-9_-]+$/) && method === "delete") {
        if (!currentUser || currentUser.role !== "admin") {
          responseData = { success: false, message: "Unauthorized access" };
          status = 403;
        } else {
          const id = url.split("/").pop();
          db.shows = db.shows.filter(s => s._id !== id);
          saveDB(db);
          responseData = { success: true, message: "Show deleted successfully" };
          status = 200;
        }
      }
      // ── Booking Endpoints ──
      else if (url.endsWith("/bookings") && method === "post") {
        if (!currentUser) {
          responseData = { success: false, message: "Please login to book tickets" };
          status = 401;
        } else {
          const { showId, selectedSeats } = data;
          const showIndex = db.shows.findIndex(s => s._id === showId);
          if (showIndex === -1) {
            responseData = { success: false, message: "Show not found" };
            status = 404;
          } else {
            const show = db.shows[showIndex];
            // Check if any seat is already booked
            const alreadyBooked = selectedSeats.some(num => {
              const seatObj = show.seats.find(st => st.seatNumber === num);
              return seatObj && seatObj.isBooked;
            });

            if (alreadyBooked) {
              responseData = { success: false, message: "One or more selected seats are already booked" };
              status = 400;
            } else {
              // Update show seats
              show.seats.forEach(seatObj => {
                if (selectedSeats.includes(seatObj.seatNumber)) {
                  seatObj.isBooked = true;
                }
              });
              show.availableSeats = show.seats.filter(s => !s.isBooked).length;

              const newBooking = {
                _id: "b_" + Date.now(),
                userId: currentUser._id,
                showId,
                seats: selectedSeats,
                status: "booked",
                bookingDate: new Date().toISOString()
              };

              db.bookings.push(newBooking);
              saveDB(db);

              responseData = { success: true, message: "Booking confirmed", data: newBooking };
              status = 200;
            }
          }
        }
      }
      else if (url.endsWith("/bookings/my") && method === "get") {
        if (!currentUser) {
          responseData = { success: false, message: "Please login to view bookings" };
          status = 401;
        } else {
          const myBookings = db.bookings.filter(b => b.userId === currentUser._id);
          const populated = myBookings.map(b => ({
            ...b,
            showId: populateShow(b.showId)
          }));
          responseData = { success: true, data: populated };
          status = 200;
        }
      }
      else if (url.match(/\/bookings\/[a-zA-Z0-9_-]+\/cancel$/) && method === "patch") {
        if (!currentUser) {
          responseData = { success: false, message: "Please login to cancel bookings" };
          status = 401;
        } else {
          const id = url.split("/")[url.split("/").length - 2];
          const bookingIndex = db.bookings.findIndex(b => b._id === id);
          if (bookingIndex === -1) {
            responseData = { success: false, message: "Booking not found" };
            status = 404;
          } else {
            const booking = db.bookings[bookingIndex];
            booking.status = "cancelled";

            // Free the show seats
            const showIndex = db.shows.findIndex(s => s._id === booking.showId);
            if (showIndex !== -1) {
              const show = db.shows[showIndex];
              show.seats.forEach(seatObj => {
                if (booking.seats.includes(seatObj.seatNumber)) {
                  seatObj.isBooked = false;
                }
              });
              show.availableSeats = show.seats.filter(s => !s.isBooked).length;
            }

            saveDB(db);
            responseData = { success: true, message: "Booking cancelled successfully", data: booking };
            status = 200;
          }
        }
      }
      // ── Admin Dashboard Statistics ──
      else if (url.endsWith("/admin/dashboard") && method === "get") {
        if (!currentUser || currentUser.role !== "admin") {
          responseData = { success: false, message: "Unauthorized access" };
          status = 403;
        } else {
          const moviesCount = db.movies.length;
          const showsCount = db.shows.length;
          const bookingsCount = db.bookings.filter(b => b.status === "booked").length;
          // Calculate mock revenue based on seat price
          let totalRevenue = 0;
          db.bookings.forEach(b => {
            if (b.status === "booked") {
              const show = db.shows.find(s => s._id === b.showId);
              const price = show ? (show.price || 250) : 250;
              totalRevenue += b.seats.length * price;
            }
          });

          responseData = {
            success: true,
            data: {
              moviesCount,
              showsCount,
              bookingsCount,
              totalRevenue
            }
          };
          status = 200;
        }
      }
    } catch (e) {
      console.error(e);
      responseData = { success: false, message: "Server error simulated" };
      status = 500;
    }

    // Resolve or reject according to standard Axios behavior
    setTimeout(() => {
      if (status >= 200 && status < 300) {
        resolve({
          data: responseData,
          status,
          statusText: "OK",
          headers: {},
          config
        });
      } else {
        const error = new Error(responseData.message || "Request failed");
        error.response = {
          data: responseData,
          status,
          statusText: status === 401 ? "Unauthorized" : "Bad Request",
          headers: {},
          config
        };
        reject(error);
      }
    }, 200); // 200ms simulated network delay for realism!
  });
};

const api = axios.create({
  adapter: mockAdapter,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;

