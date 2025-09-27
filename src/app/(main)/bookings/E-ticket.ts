import { Booking } from "@/types/booking.type";
import { Format } from "@/utils/format";

export const handlePrintTicket = (
  ticketRef: React.RefObject<HTMLDivElement | null>,
  selectedBooking: Booking
) => {
  if (ticketRef.current && selectedBooking) {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const ticketHTML = `
          <html>
            <head>
              <title>E-Ticket ${selectedBooking.booking_code}</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                
                body {
                  font-family: 'Arial', sans-serif;
                  background: #f8f9fa;
                  padding: 20px;
                  color: #333;
                }
                
                .ticket-container {
                  max-width: 800px;
                  margin: 0 auto;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 20px;
                  padding: 3px;
                  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
                }
                
                .ticket-inner {
                  background: white;
                  border-radius: 17px;
                  overflow: hidden;
                  position: relative;
                }
                
                .ticket-header {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 25px;
                  text-align: center;
                  position: relative;
                }
                
                .ticket-header::after {
                  content: '';
                  position: absolute;
                  bottom: -10px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 0;
                  height: 0;
                  border-left: 20px solid transparent;
                  border-right: 20px solid transparent;
                  border-top: 20px solid #764ba2;
                }
                
                .company-logo {
                  font-size: 32px;
                  font-weight: bold;
                  margin-bottom: 10px;
                  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }
                
                .ticket-type {
                  font-size: 18px;
                  opacity: 0.9;
                  font-weight: 300;
                  letter-spacing: 2px;
                }
                
                .booking-code {
                  background: rgba(255,255,255,0.2);
                  padding: 8px 16px;
                  border-radius: 20px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 15px;
                  display: inline-block;
                  backdrop-filter: blur(10px);
                }
                
                .ticket-body {
                  padding: 30px;
                }
                
                .route-section {
                  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                  margin: -10px -30px 25px -30px;
                  padding: 25px 30px;
                  position: relative;
                  color: white;
                }
                
                .route-container {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  position: relative;
                }
                
                .route-point {
                  text-align: center;
                  flex: 1;
                }
                
                .city-name {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 5px;
                  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                }
                
                .route-label {
                  font-size: 12px;
                  opacity: 0.9;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                }
                
                .route-arrow {
                  flex: 0 0 150px;
                  text-align: center;
                  position: relative;
                }
                
                .arrow-line {
                  width: 100px;
                  height: 2px;
                  background: white;
                  margin: 0 auto;
                  position: relative;
                }
                
                .arrow-line::after {
                  content: '';
                  position: absolute;
                  right: -8px;
                  top: -4px;
                  width: 0;
                  height: 0;
                  border-top: 5px solid transparent;
                  border-bottom: 5px solid transparent;
                  border-left: 10px solid white;
                }
                
                .departure-time {
                  position: absolute;
                  top: -30px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: rgba(255,255,255,0.2);
                  padding: 8px 16px;
                  border-radius: 20px;
                  font-size: 14px;
                  font-weight: bold;
                  backdrop-filter: blur(10px);
                }
                
                .passengers-section {
                  margin-bottom: 25px;
                }
                
                .section-title {
                  font-size: 18px;
                  font-weight: bold;
                  color: #333;
                  margin-bottom: 15px;
                  padding-bottom: 8px;
                  border-bottom: 2px solid #e9ecef;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                }
                
                .passenger-card {
                  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
                  border-radius: 12px;
                  padding: 18px;
                  margin-bottom: 12px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  box-shadow: 0 4px 6px rgba(252, 182, 159, 0.2);
                }
                
                .passenger-info h4 {
                  font-size: 16px;
                  font-weight: bold;
                  color: #8B4513;
                  margin-bottom: 4px;
                }
                
                .passenger-info p {
                  font-size: 14px;
                  color: #D2691E;
                  margin: 0;
                }
                
                .seat-info {
                  background: rgba(255,255,255,0.7);
                  padding: 10px 15px;
                  border-radius: 8px;
                  text-align: center;
                  backdrop-filter: blur(5px);
                }
                
                .seat-number {
                  font-size: 18px;
                  font-weight: bold;
                  color: #8B4513;
                }
                
                .seat-label {
                  font-size: 10px;
                  color: #D2691E;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                }
                
                .payment-section {
                  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                  padding: 20px;
                  border-radius: 12px;
                  margin-bottom: 25px;
                }
                
                .payment-row {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 10px;
                }
                
                .payment-row:last-child {
                  margin-bottom: 0;
                  padding-top: 15px;
                  border-top: 2px solid rgba(255,255,255,0.5);
                  font-size: 18px;
                  font-weight: bold;
                }
                
                .total-amount {
                  color: #2d5016;
                  font-size: 24px;
                  font-weight: bold;
                }
                
                .status-badge {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  padding: 8px 16px;
                  border-radius: 20px;
                  font-size: 14px;
                  font-weight: bold;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  margin-bottom: 20px;
                }
                
                .status-confirmed {
                  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                  color: white;
                }
                
                .status-pending {
                  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
                  color: #8B4513;
                }
                
                .status-cancelled {
                  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
                  color: #d63384;
                }
                
                .ticket-footer {
                  background: #f8f9fa;
                  padding: 20px;
                  text-align: center;
                  border-radius: 0 0 17px 17px;
                  border-top: 2px dashed #dee2e6;
                }
                
                .footer-instructions {
                  color: #6c757d;
                  font-size: 14px;
                  line-height: 1.6;
                  margin-bottom: 15px;
                }
                
                .footer-thank-you {
                  color: #495057;
                  font-weight: bold;
                  font-size: 16px;
                }
                
                .qr-placeholder {
                  width: 80px;
                  height: 80px;
                  background: linear-gradient(45deg, #667eea, #764ba2);
                  border-radius: 8px;
                  margin: 15px auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-size: 12px;
                  text-align: center;
                  font-weight: bold;
                }
                
                .perforated-line {
                  position: relative;
                  margin: 20px -30px;
                  height: 2px;
                  background: repeating-linear-gradient(
                    to right,
                    #dee2e6 0px,
                    #dee2e6 10px,
                    transparent 10px,
                    transparent 20px
                  );
                }
                
                .perforated-line::before,
                .perforated-line::after {
                  content: '';
                  position: absolute;
                  width: 20px;
                  height: 20px;
                  background: #f8f9fa;
                  border-radius: 50%;
                  top: -9px;
                  border: 2px solid #dee2e6;
                }
                
                .perforated-line::before {
                  left: -11px;
                }
                
                .perforated-line::after {
                  right: -11px;
                }
                
                @media print {
                  body {
                    margin: 0;
                    padding: 10px;
                    background: white !important;
                  }
                  
                  .ticket-container {
                    box-shadow: none;
                    max-width: none;
                    margin: 0;
                  }
                  
                  .ticket-header,
                  .route-section,
                  .passenger-card,
                  .payment-section {
                    background: #f8f9fa !important;
                    color: #333 !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                  
                  .city-name,
                  .passenger-info h4,
                  .total-amount {
                    color: #333 !important;
                  }
                }
              </style>
            </head>
            <body>
              <div class="ticket-container">
                <div class="ticket-inner">
                  <!-- Header -->
                  <div class="ticket-header">
                    <div class="company-logo">🚌 BusTicket</div>
                    <div class="ticket-type">E-TICKET</div>
                    <div class="booking-code">${
                      selectedBooking.booking_code
                    }</div>
                  </div>
                  
                  <!-- Body -->
                  <div class="ticket-body">
                    <!-- Status -->
                    <div class="status-badge status-${
                      selectedBooking.booking_status
                    }">
                      ✓ ${selectedBooking.booking_status?.toUpperCase()}
                    </div>
                    
                    <!-- Route Section -->
                    <div class="route-section">
                      <div class="route-container">
                        <div class="route-point">
                          <div class="city-name">${
                            selectedBooking.schedule?.route?.origin
                          }</div>
                          <div class="route-label">Kota Asal</div>
                        </div>
                        <div class="route-arrow">
                          <div class="departure-time">${
                            selectedBooking.schedule?.departure_time
                          }</div>
                          <div class="arrow-line"></div>
                        </div>
                        <div class="route-point">
                          <div class="city-name">${
                            selectedBooking.schedule?.route?.destination
                          }</div>
                          <div class="route-label">Kota Tujuan</div>
                        </div>
                      </div>
                    </div>
                    <div class="perforated-line"></div>
                    <!-- Payment -->
                    <div class="payment-section">
                      <div class="section-title">💳 Ringkasan Pembayaran</div>
                      <div class="payment-row">
                        <span>Total Penumpang:</span>
                        <span>${selectedBooking.passenger_count}</span>
                      </div>
                      <div class="payment-row">
                        <span>Total Harga:</span>
                        <span class="total-amount">${Format.formatCurrency(
                          selectedBooking.total_amount!
                        )}</span>
                      </div>
                    </div>
                    
                    <!-- QR Code Placeholder -->
                    <div style="text-align: center;">
                      <div class="qr-placeholder">
                        QR CODE<br/>
                        SCAN ME
                      </div>
                    </div>
                  </div>
                  
                  <!-- Footer -->
                  <div class="ticket-footer">
                    <div class="footer-instructions">
                      ⏰ Tolong hadir 30 menit sebelum keberangkatan<br/>
                      📱 Tunjukka tiket ini di loket pelaporan tiket<br/>
                      📞 Customer Service: 0800-1234-5678
                    </div>
                    <div class="footer-thank-you">
                      Terimasih atas perhatiannya! 🙏
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `;

      printWindow.document.write(ticketHTML);
      printWindow.document.close();
      printWindow.print();
    }
  }
};
