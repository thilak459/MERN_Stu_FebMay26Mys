import api from "./axios";



/*
=========================================================
GET DASHBOARD STATS
=========================================================
*/


export async function getDashboardStats() {
  const token = localStorage.getItem("token");


  const response = await api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data;
}
