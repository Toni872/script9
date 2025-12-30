import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  hostName: string;
  hostEmail: string;
  propertyName: string;
  propertyAddress: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  bookingId: string;
  guests: number;
}

export class EmailService {
  // NOTA: Sin dominio verificado, Resend solo permite enviar desde 'onboarding@resend.dev'
  // y solo al email con el que te registraste.
  private static readonly FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  /**
   * Método genérico para enviar emails
   */
  private static async sendEmail({ to, subject, html }: EmailParams): Promise<boolean> {
    try {
      await resend.emails.send({
        from: this.FROM_EMAIL,
        to,
        subject,
        html,
      });
      console.log(`✅ Email enviado a ${to}: ${subject}`);
      return true;
    } catch (error) {
      console.error(`❌ Error enviando email a ${to}:`, error);
      return false;
    }
  }

  /**
   * Email de confirmación de reserva (pendiente de pago)
   */
  static async sendBookingPendingConfirmation(data: BookingEmailData): Promise<void> {
    const { guestEmail, guestName, propertyName, checkInDate, checkOutDate, totalPrice, bookingId, guests } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0F172A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .total { font-size: 1.3em; color: #0F172A; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
            .button { display: inline-block; background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reserva Creada - Pendiente de Pago</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${guestName}</strong>,</p>
              <p>Tu reserva ha sido creada exitosamente. Para confirmarla, por favor completa el pago.</p>

              <div class="booking-details">
                <h2>Detalles de la Reserva</h2>
                <div class="detail-row">
                  <span class="detail-label">Propiedad:</span>
                  <span class="detail-value">${propertyName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${new Date(checkInDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${new Date(checkOutDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Clientes:</span>
                  <span class="detail-value">${guests} persona(s)</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Total:</span>
                  <span class="detail-value total">€${totalPrice.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">ID de Reserva:</span>
                  <span class="detail-value">${bookingId}</span>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/dashboard" class="button">Ver Reserva y Pagar</a>
              </p>

              <p style="color: #666; font-size: 0.9em;">
                <strong>Nota:</strong> Esta reserva estará pendiente hasta que se complete el pago.
                Tienes 24 horas para completar el pago o la reserva será cancelada automáticamente.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>Este es un email automático, por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: guestEmail,
      subject: `Reserva Creada - ${propertyName} - Pendiente de Pago`,
      html,
    });
  }

  /**
   * Email de confirmación de reserva pagada (al huésped)
   */
  static async sendBookingConfirmedGuest(data: BookingEmailData): Promise<void> {
    const { guestEmail, guestName, propertyName, propertyAddress, checkInDate, checkOutDate, totalPrice, bookingId, guests } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .success-badge { background-color: #10B981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
            .button { display: inline-block; background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Reserva Confirmada</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${guestName}</strong>,</p>
              <p>¡Excelentes noticias! Tu pago ha sido procesado exitosamente y tu reserva está confirmada.</p>

              <div style="text-align: center;">
                <span class="success-badge">✓ PAGO CONFIRMADO</span>
              </div>

              <div class="booking-details">
                <h2>Detalles de tu Reserva</h2>
                <div class="detail-row">
                  <span class="detail-label">Propiedad:</span>
                  <span class="detail-value">${propertyName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Dirección:</span>
                  <span class="detail-value">${propertyAddress}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${new Date(checkInDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${new Date(checkOutDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Usuarios:</span>
                  <span class="detail-value">${guests} persona(s)</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Total Pagado:</span>
                  <span class="detail-value" style="color: #10B981; font-weight: bold;">€${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/bookings/${bookingId}" class="button">Ver Detalles de la Reserva</a>
              </p>

              <p><strong>Próximos pasos:</strong></p>
              <ul>
                <li>El anfitrión se pondrá en contacto contigo antes de tu llegada</li>
                <li>Recibirás un recordatorio 24 horas antes del check-in</li>
                <li>Guarda este email como confirmación de tu reserva</li>
              </ul>

              <p style="color: #666; font-size: 0.9em; margin-top: 30px;">
                Si tienes alguna pregunta, puedes contactar con el anfitrión a través de la plataforma.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>Este es un email automático, por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: guestEmail,
      subject: `✅ Reserva Confirmada - ${propertyName}`,
      html,
    });
  }

  /**
   * Email de notificación de nueva reserva (al anfitrión)
   */
  static async sendNewBookingNotificationHost(data: BookingEmailData): Promise<void> {
    const { hostEmail, hostName, guestName, propertyName, checkInDate, checkOutDate, totalPrice, bookingId, guests } = data;

    const hostEarnings = totalPrice * 0.9; // 90% para el host

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0F172A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .earnings { font-size: 1.3em; color: #10B981; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
            .button { display: inline-block; background-color: #0F172A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Nueva Reserva Confirmada</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${hostName}</strong>,</p>
              <p>Tienes una nueva reserva confirmada para tu propiedad <strong>${propertyName}</strong>.</p>

              <div class="booking-details">
                <h2>Detalles de la Reserva</h2>
                <div class="detail-row">
                  <span class="detail-label">Cliente:</span>
                  <span class="detail-value">${guestName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${new Date(checkInDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${new Date(checkOutDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Usuarios/Licencias:</span>
                  <span class="detail-value">${guests} persona(s)</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Precio Total:</span>
                  <span class="detail-value">€${totalPrice.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Tus Ganancias (90%):</span>
                  <span class="detail-value earnings">€${hostEarnings.toFixed(2)}</span>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/bookings/host" class="button">Ver Todas tus Reservas</a>
              </p>

              <p><strong>Próximos pasos:</strong></p>
              <ul>
                <li>Prepara el espacio para la llegada del huésped</li>
                <li>Contacta con el huésped si necesitas coordinar detalles</li>
                <li>Las ganancias se transferirán después del check-out</li>
              </ul>

              <p style="color: #666; font-size: 0.9em; margin-top: 30px;">
                Recuerda que es importante mantener una buena comunicación con tus huéspedes para garantizar una experiencia excelente.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>Este es un email automático, por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: hostEmail,
      subject: `🎉 Nueva Reserva - ${propertyName}`,
      html,
    });
  }

  /**
   * Email de cancelación de reserva
   */
  static async sendBookingCancellation(data: BookingEmailData, cancelledBy: 'guest' | 'host'): Promise<void> {
    const { guestEmail, hostEmail, guestName, hostName, propertyName, checkInDate, checkOutDate, totalPrice, bookingId } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>❌ Reserva Cancelada</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${cancelledBy === 'guest' ? hostName : guestName}</strong>,</p>
              <p>Te informamos que la siguiente reserva ha sido cancelada ${cancelledBy === 'guest' ? 'por el huésped' : 'por el anfitrión'}.</p>

              <div class="booking-details">
                <h2>Detalles de la Reserva Cancelada</h2>
                <div class="detail-row">
                  <span class="detail-label">Propiedad:</span>
                  <span class="detail-value">${propertyName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">${cancelledBy === 'guest' ? 'Experto' : 'Cliente'}:</span>
                  <span class="detail-value">${cancelledBy === 'guest' ? hostName : guestName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${new Date(checkInDate).toLocaleDateString('es-ES')}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${new Date(checkOutDate).toLocaleDateString('es-ES')}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">ID de Reserva:</span>
                  <span class="detail-value">${bookingId}</span>
                </div>
              </div>

              ${cancelledBy === 'guest' ? `
                <p><strong>Política de reembolso:</strong></p>
                <ul>
                  <li>Si el pago fue procesado, se realizará un reembolso automático</li>
                  <li>El reembolso puede tardar de 5 a 10 días hábiles en reflejarse en tu cuenta</li>
                  <li>Recibirás un email de confirmación cuando el reembolso sea procesado</li>
                </ul>
              ` : `
                <p>Lamentamos los inconvenientes que esto pueda causar. ${cancelledBy === 'host' ? 'El huésped recibirá un reembolso completo.' : ''}</p>
              `}

              <p style="color: #666; font-size: 0.9em; margin-top: 30px;">
                Si tienes alguna pregunta sobre esta cancelación, no dudes en contactarnos.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>Este es un email automático, por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar a ambos: huésped y anfitrión
    await this.sendEmail({
      to: cancelledBy === 'guest' ? hostEmail : guestEmail,
      subject: `Reserva Cancelada - ${propertyName}`,
      html,
    });
  }

  /**
   * Email de confirmación de reembolso
   */
  static async sendRefundConfirmation(data: BookingEmailData, refundAmount: number): Promise<void> {
    const { guestEmail, guestName, propertyName, bookingId } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .refund-amount { font-size: 2em; color: #10B981; font-weight: bold; text-align: center; margin: 30px 0; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Reembolso Procesado</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${guestName}</strong>,</p>
              <p>Tu reembolso ha sido procesado exitosamente.</p>

              <div class="refund-amount">
                €${refundAmount.toFixed(2)}
              </div>

              <p><strong>Detalles del reembolso:</strong></p>
              <ul>
                <li><strong>Propiedad:</strong> ${propertyName}</li>
                <li><strong>ID de Reserva:</strong> ${bookingId}</li>
                <li><strong>Monto reembolsado:</strong> €${refundAmount.toFixed(2)}</li>
              </ul>

              <p style="background-color: #FEF3C7; padding: 15px; border-left: 4px solid #F59E0B; border-radius: 4px;">
                <strong>⏱️ Tiempo de procesamiento:</strong><br>
                El reembolso puede tardar de 5 a 10 días hábiles en aparecer en tu método de pago original,
                dependiendo de tu banco o entidad financiera.
              </p>

              <p style="color: #666; font-size: 0.9em; margin-top: 30px;">
                Si después de 10 días hábiles no ves reflejado el reembolso, por favor contacta con tu banco
                o con nuestro equipo de soporte.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>Este es un email automático, por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: guestEmail,
      subject: `💰 Reembolso Procesado - ${propertyName}`,
      html,
    });
  }

  /**
   * Email de error de pago
   */
  static async sendPaymentFailed(data: BookingEmailData, errorMessage?: string): Promise<void> {
    const { guestEmail, guestName, propertyName, bookingId, totalPrice } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .error-box { background-color: #D1FAE5; border-left: 4px solid #10B981; padding: 15px; border-radius: 4px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
            .button { display: inline-block; background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚠️ Error en el Pago</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${guestName}</strong>,</p>
              <p>Hemos detectado un problema al procesar tu pago para la reserva en <strong>${propertyName}</strong>.</p>

              ${errorMessage ? `
                <div class="error-box">
                  <strong>Motivo:</strong> ${errorMessage}
                </div>
              ` : ''}

              <p><strong>Detalles de la reserva:</strong></p>
              <ul>
                <li><strong>Propiedad:</strong> ${propertyName}</li>
                <li><strong>ID de Reserva:</strong> ${bookingId}</li>
                <li><strong>Monto:</strong> €${totalPrice.toFixed(2)}</li>
              </ul>

              <p><strong>¿Qué puedes hacer?</strong></p>
              <ul>
                <li>Verifica que tu método de pago tenga fondos suficientes</li>
                <li>Asegúrate de que los datos de tu tarjeta sean correctos</li>
                <li>Intenta usar otro método de pago</li>
                <li>Contacta con tu banco si el problema persiste</li>
              </ul>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/catalogo" class="button">Intentar Nuevamente</a>
              </p>

              <p style="color: #666; font-size: 0.9em; margin-top: 30px;">
                <strong>Nota:</strong> Si no completas el pago en las próximas 24 horas, la reserva será cancelada automáticamente.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>Este es un email automático, por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: guestEmail,
      subject: `⚠️ Error en el Pago - ${propertyName}`,
      html,
    });
  }

  /**
   * Email recordatorio de check-in (24h antes)
   */
  static async sendCheckInReminder(data: BookingEmailData): Promise<void> {
    const { guestEmail, guestName, hostName, propertyName, propertyAddress, checkInDate, bookingId, guests } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #F59E0B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .countdown { background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 20px; border-radius: 4px; margin: 20px 0; text-align: center; }
            .countdown-time { font-size: 2em; color: #F59E0B; font-weight: bold; }
            .checklist { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
            .button { display: inline-block; background-color: #F59E0B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏰ Recordatorio de Check-in</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${guestName}</strong>,</p>
              <p>Tu reserva está a punto de comenzar. ¡Prepárate para disfrutar de tu experiencia en <strong>${propertyName}</strong>!</p>

              <div class="countdown">
                <div class="countdown-time">24 horas</div>
                <p>hasta tu check-in</p>
              </div>

              <p><strong>Detalles de tu reserva:</strong></p>
              <ul>
                <li><strong>Check-in:</strong> ${new Date(checkInDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</li>
                <li><strong>Dirección:</strong> ${propertyAddress}</li>
                <li><strong>Usuarios:</strong> ${guests} persona(s)</li>
                <li><strong>Experto:</strong> ${hostName}</li>
              </ul>

              <div class="checklist">
                <h3>✓ Lista de verificación antes del check-in:</h3>
                <ul>
                  <li>Revisa las instrucciones de acceso proporcionadas por el anfitrión</li>
                  <li>Confirma tu hora de llegada si es necesario</li>
                  <li>Guarda el contacto del anfitrión en tu teléfono</li>
                  <li>Planifica tu ruta hacia la propiedad</li>
                </ul>
              </div>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/bookings/${bookingId}" class="button">Ver Detalles Completos</a>
              </p>

              <p style="color: #666; font-size: 0.9em; margin-top: 30px;">
                Si necesitas contactar con el anfitrión o hacer cambios de último minuto, hazlo a través de la plataforma.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>¡Que disfrutes tu estancia!</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: guestEmail,
      subject: `⏰ Recordatorio: Check-in mañana - ${propertyName}`,
      html,
    });
  }

  /**
   * Email de confirmación de pago exitoso (al huésped)
   */
  static async sendBookingConfirmation(data: Omit<BookingEmailData, 'guests'>): Promise<void> {
    const { guestEmail, guestName, propertyName, propertyAddress, checkInDate, checkOutDate, totalPrice, bookingId } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .total { font-size: 1.3em; color: #10B981; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
            .button { display: inline-block; background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .success-badge { background-color: #10B981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ ¡Reserva Confirmada!</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${guestName}</strong>,</p>
              <p>¡Excelentes noticias! Tu pago ha sido procesado exitosamente y tu reserva está confirmada.</p>

              <div class="booking-details">
                <h2>Detalles de la Reserva</h2>
                <div class="detail-row">
                  <span class="detail-label">Propiedad:</span>
                  <span class="detail-value">${propertyName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Dirección:</span>
                  <span class="detail-value">${propertyAddress}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Inicio:</span>
                  <span class="detail-value">${new Date(checkInDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Entrega Estimada:</span>
                  <span class="detail-value">${new Date(checkOutDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Total Pagado:</span>
                  <span class="detail-value total">€${totalPrice.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">ID de Reserva:</span>
                  <span class="detail-value">${bookingId}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Estado:</span>
                  <span class="success-badge">Confirmada</span>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/dashboard" class="button">Ir a mi Dashboard</a>
              </p>

              <p style="color: #666; font-size: 0.9em;">
                <strong>Próximos pasos:</strong><br>
                - Puedes descargar tu factura en el detalle del pedido<br>
                - El equipo de Script9 comenzará a trabajar en tu servicio<br>
                - Recibirás notificaciones sobre el avance
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>¡Gracias por confiar en nosotros!</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: guestEmail,
      subject: `✅ Reserva Confirmada - ${propertyName}`,
      html,
    });
  }

  /**
   * Email de notificación de nueva reserva (al host)
   */
  static async sendNewBookingNotification(data: {
    hostName: string;
    hostEmail: string;
    guestName: string;
    propertyName: string;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    bookingId: string;
  }): Promise<void> {
    const { hostEmail, hostName, guestName, propertyName, checkInDate, checkOutDate, totalPrice, bookingId } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .total { font-size: 1.3em; color: #10B981; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
            .button { display: inline-block; background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Nueva Reserva Confirmada</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${hostName}</strong>,</p>
              <p>¡Tienes una nueva reserva confirmada para tu propiedad!</p>

              <div class="booking-details">
                <h2>Detalles de la Reserva</h2>
                <div class="detail-row">
                  <span class="detail-label">Cliente:</span>
                  <span class="detail-value">${guestName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Propiedad:</span>
                  <span class="detail-value">${propertyName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${new Date(checkInDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${new Date(checkOutDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Ingresos:</span>
                  <span class="detail-value total">€${totalPrice.toFixed(2)}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">ID de Reserva:</span>
                  <span class="detail-value">${bookingId}</span>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/host/dashboard" class="button">Ver Detalles</a>
              </p>

              <p style="color: #666; font-size: 0.9em;">
                <strong>Recuerda:</strong><br>
                - Prepara el espacio antes de la llegada del huésped<br>
                - Envía las instrucciones de acceso con anticipación<br>
                - Mantén una comunicación clara con el huésped
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: hostEmail,
      subject: `🎉 Nueva Reserva - ${propertyName}`,
      html,
    });
  }

  /**
   * Email de notificación de pago fallido
   */
  static async sendPaymentFailedNotification(data: {
    guestName: string;
    guestEmail: string;
    bookingId: string;
    reason: string;
  }): Promise<void> {
    const { guestEmail, guestName, bookingId, reason } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .error-box { background-color: #D1FAE5; border-left: 4px solid #10B981; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
            .button { display: inline-block; background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>❌ Pago No Procesado</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${guestName}</strong>,</p>
              <p>Lamentablemente, no pudimos procesar tu pago para la reserva <strong>${bookingId}</strong>.</p>

              <div class="error-box">
                <strong>Motivo:</strong> ${reason}
              </div>

              <p>Por favor, verifica:</p>
              <ul>
                <li>Que tu tarjeta tenga fondos suficientes</li>
                <li>Que los datos de la tarjeta sean correctos</li>
                <li>Que tu banco no haya bloqueado la transacción</li>
              </ul>

              <p style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/checkout/${bookingId}" class="button">Intentar de Nuevo</a>
              </p>

              <p style="color: #666; font-size: 0.9em;">
                Si el problema persiste, contacta con tu banco o prueba con otro método de pago.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Script9 - Automatización Inteligente</p>
              <p>Estamos aquí para ayudarte</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: guestEmail,
      subject: `❌ Pago No Procesado - Reserva ${bookingId}`,
      html,
    });
  }
}

