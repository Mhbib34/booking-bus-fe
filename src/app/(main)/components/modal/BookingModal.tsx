// BookingModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";
import { Schedule } from "@/types/schedule.type";
import PassenggerCountForm from "../fragment/PassenggerCountForm";
import PassenggerForm from "../fragment/PassenggerForm";
import BookingConfirmation from "../fragment/BookingConfirmation";
import BookingSuccess from "../fragment/BookingSuccess";
import { Passenger } from "@/types/passengger.type";
import { motion, AnimatePresence } from "framer-motion";
import {
  backdropVariants,
  headerVariants,
  progressVariants,
  stepTransitionVariants,
} from "@/lib/framer-variants";
import axiosInstance from "@/lib/axiosInstance";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule | null;
  selectedSeats: string[];
}

export default function BookingModal({
  isOpen,
  onClose,
  schedule,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  // Update passengers when passenger count changes
  const updatePassengerCount = (count: number) => {
    setPassengerCount(count);
    const newPassengers: Passenger[] = [];
    for (let i = 0; i < count; i++) {
      newPassengers.push({
        seat_number: `A${i + 1}`, // Temporary seat assignment
        passenger_name: "",
        phone: "",
      });
    }
    setPassengers(newPassengers);
  };

  // Handle step changes with direction
  const handleStepChange = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!schedule) return null;

  const totalAmount = passengerCount * schedule.price!;

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Pilih Jumlah Penumpang";
      case 2:
        return "Detail Penumpang";
      case 3:
        return "Konfirmasi Booking";
      case 4:
        return "Booking Berhasil";
      default:
        return "";
    }
  };

  const handleCreateBooking = async (newStep: number) => {
    setLoading(true);
    try {
      console.log(passengers);
      console.log(schedule.id);
      const res = await axiosInstance.post("/v1/bookings", {
        schedule_id: schedule.id,
        passengers,
      });
      console.log(res);
      setBookingCode(res.data.data.booking_code);
      setDirection(newStep > step ? 1 : -1);
      setStep(newStep);
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-y-auto bg-black/60 backdrop-blur-xl"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ perspective: "1000px" }}
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-gray-100"
                variants={headerVariants}
              >
                <div>
                  <motion.h2
                    className="text-2xl font-bold text-gray-900"
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getStepTitle()}
                  </motion.h2>
                  <p className="text-gray-500 mt-1">
                    {schedule.route?.origin} → {schedule.route?.destination}
                  </p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-red-100 rounded-full transition-colors cursor-pointer group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 group-hover:text-red-600" />
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="px-6 py-4 bg-gray-50"
                variants={progressVariants}
              >
                <div className="flex items-center justify-center md:space-x-4 ">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-center">
                      <motion.div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                          ${
                            step >= num
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-gray-200 text-gray-500"
                          }
                        `}
                        animate={{
                          scale: step >= num ? 1.1 : 1,
                          boxShadow:
                            step >= num
                              ? "0 4px 15px rgba(59, 130, 246, 0.4)"
                              : "0 0 0 rgba(59, 130, 246, 0)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {step > num ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 15,
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          num
                        )}
                      </motion.div>
                      {num < 4 && (
                        <motion.div
                          className="w-8 md:w-12 h-0.5 mx-2"
                          animate={{
                            backgroundColor: step > num ? "#2563eb" : "#e5e7eb",
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {step === 1 && (
                      <PassenggerCountForm
                        passengerCount={passengerCount}
                        updatePassengerCount={updatePassengerCount}
                        schedule={schedule}
                        onNext={() => handleStepChange(2)}
                      />
                    )}

                    {step === 2 && (
                      <PassenggerForm
                        passengers={passengers}
                        setPassengers={setPassengers}
                        onNext={() => handleStepChange(3)}
                        onBack={() => handleStepChange(1)}
                      />
                    )}

                    {step === 3 && (
                      <BookingConfirmation
                        schedule={schedule}
                        passengers={passengers}
                        totalAmount={totalAmount}
                        onConfirm={() => handleCreateBooking(4)}
                        onBack={() => handleStepChange(2)}
                        loading={loading}
                      />
                    )}

                    {step === 4 && (
                      <BookingSuccess
                        bookingCode={bookingCode}
                        onClose={onClose}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
