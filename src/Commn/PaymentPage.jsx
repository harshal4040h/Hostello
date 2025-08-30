import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookingData = Object.fromEntries(queryParams.entries());

  const handlePayment = async () => {
    try {
      // 🔹 simulate payment success
      toast.loading("Processing payment...");

      setTimeout(async () => {
        toast.dismiss();
        toast.success("✅ Payment Successful!");

        // Save booking after payment
        const response = await fetch("http://localhost/hostello_php/book_hostel.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(bookingData),
        });

        const result = await response.json();

        if (result.status === "success") {
          toast.success("🎉 Hostel booked successfully!");
          navigate("/user");
        } else {
          toast.error("❌ " + result.message);
        }
      }, 2000); // 2 sec fake delay
    } catch (err) {
      toast.error("⚠️ Payment failed, try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-4">Payment Page</h1>
        <p className="text-lg mb-2">
          <span className="font-semibold">Room:</span> {bookingData.room}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Duration:</span> {bookingData.duration}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Food:</span> {bookingData.food_status}
        </p>
        <p className="text-xl font-bold text-green-600 mb-6">
          Total Amount: ₹{bookingData.total_amount}
        </p>

        <button
          onClick={handlePayment}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full transition"
        >
          Pay Now
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
