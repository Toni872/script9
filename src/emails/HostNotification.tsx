import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface HostNotificationEmailProps {
    hostName: string;
    propertyTitle: string;
    guestName: string;
    guestEmail: string;
    guestPhone?: string;
    bookingReference: string;
    date: string;
    startTime: string;
    endTime: string;
    guests: number;
    totalPrice: number;
}

export const HostNotificationEmail = ({
    hostName = 'Anfitrión',
    propertyTitle = 'Tu Espacio',
    guestName = 'Usuario',
    guestEmail = 'guest@email.com',
    guestPhone,
    bookingReference = 'S9-123456',
    date = '01/01/2024',
    startTime = '10:00',
    endTime = '14:00',
    guests = 10,
    totalPrice = 100,
}: HostNotificationEmailProps) => (
    <Html>
        <Head />
        <Preview>Nueva reserva confirmada - {propertyTitle}</Preview>
        <Body style={main}>
            <Container style={container}>
                {/* Logo */}
                <Section style={logoSection}>
                    <Heading style={logo}>Script9</Heading>
                </Section>

                {/* Notification Icon */}
                <Section style={iconSection}>
                    <div style={notificationIcon}>🔔</div>
                </Section>

                {/* Main Content */}
                <Heading style={h1}>¡Nueva Reserva Confirmada!</Heading>

                <Text style={text}>
                    Hola <strong>{hostName}</strong>,
                </Text>

                <Text style={text}>
                    Tienes una nueva reserva para <strong>{propertyTitle}</strong>. El pago ha sido procesado exitosamente y el cliente está esperando tu confirmación.
                </Text>

                {/* Booking Details Card */}
                <Section style={detailsCard}>
                    <Heading style={h2}>Detalles de la Reserva</Heading>

                    <Hr style={divider} />

                    <table style={detailsTable}>
                        <tr>
                            <td style={labelCell}>Referencia:</td>
                            <td style={valueCell}><strong>{bookingReference}</strong></td>
                        </tr>
                        <tr>
                            <td style={labelCell}>Fecha:</td>
                            <td style={valueCell}>{date}</td>
                        </tr>
                        <tr>
                            <td style={labelCell}>Horario:</td>
                            <td style={valueCell}>{startTime} - {endTime}</td>
                        </tr>
                        <tr>
                            <td style={labelCell}>Invitados:</td>
                            <td style={valueCell}>{guests} personas</td>
                        </tr>
                        <tr>
                            <td style={labelCell}>Tu ingreso:</td>
                            <td style={valueCell}><strong style={priceText}>€{(totalPrice * 0.85).toFixed(2)}</strong></td>
                        </tr>
                    </table>

                    <Text style={smallText}>
                        (Script9 retiene €{(totalPrice * 0.15).toFixed(2)} - 15% comisión)
                    </Text>
                </Section>

                {/* Guest Info */}
                <Section style={guestSection}>
                    <Heading style={h3}>Información del Cliente</Heading>
                    <Text style={text}>
                        <strong>Nombre:</strong> {guestName}
                        <br />
                        <strong>Email:</strong> <Link href={`mailto:${guestEmail}`} style={link}>{guestEmail}</Link>
                        {guestPhone && (
                            <>
                                <br />
                                <strong>Teléfono:</strong> {guestPhone}
                            </>
                        )}
                    </Text>
                </Section>

                {/* CTA Button */}
                <Section style={buttonSection}>
                    <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/host/reservas`}>
                        Ver Detalles de la Reserva
                    </Button>
                </Section>

                {/* Important Info */}
                <Section style={infoBox}>
                    <Heading style={h3}>📋 Recordatorios Importantes</Heading>
                    <ul style={list}>
                        <li style={listItem}>Contacta al cliente 24h antes para confirmar detalles de acceso</li>
                        <li style={listItem}>Asegúrate de que el espacio esté limpio y listo</li>
                        <li style={listItem}>Verifica que todas las comodidades prometidas estén disponibles</li>
                        <li style={listItem}>Recibirás el pago automáticamente 24h después del evento</li>
                    </ul>
                </Section>

                {/* Footer */}
                <Hr style={divider} />

                <Text style={footer}>
                    <strong>Script9</strong> - Panel de Colaborador
                    <br />
                    ¿Necesitas ayuda? Escríbenos a{' '}
                    <Link href="mailto:contact@script-9.com" style={link}>contact@script-9.com</Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

export default HostNotificationEmail;

// Estilos
const main = {
    backgroundColor: '#f5f5f7',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '600px',
};

const logoSection = {
    textAlign: 'center' as const,
    marginBottom: '32px',
};

const logo = {
    color: '#8B5CF6',
    fontSize: '32px',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '-0.5px',
};

const iconSection = {
    textAlign: 'center' as const,
    marginBottom: '24px',
};

const notificationIcon = {
    display: 'inline-block',
    fontSize: '48px',
};

const h1 = {
    color: '#1d1d1f',
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '1.2',
    margin: '0 0 24px',
    textAlign: 'center' as const,
};

const h2 = {
    color: '#1d1d1f',
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 16px',
};

const h3 = {
    color: '#1d1d1f',
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 12px',
};

const text = {
    color: '#1d1d1f',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px',
};

const smallText = {
    color: '#86868b',
    fontSize: '13px',
    lineHeight: '1.5',
    margin: '8px 0 0',
    textAlign: 'center' as const,
};

const detailsCard = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    margin: '32px 0',
    border: '1px solid #e5e5e7',
};

const detailsTable = {
    width: '100%',
    borderCollapse: 'collapse' as const,
};

const labelCell = {
    color: '#86868b',
    fontSize: '14px',
    padding: '8px 0',
    width: '40%',
};

const valueCell = {
    color: '#1d1d1f',
    fontSize: '15px',
    padding: '8px 0',
    textAlign: 'right' as const,
};

const priceText = {
    color: '#10B981',
    fontSize: '18px',
};

const divider = {
    borderColor: '#e5e5e7',
    margin: '24px 0',
};

const guestSection = {
    backgroundColor: '#f5f5f7',
    borderRadius: '12px',
    padding: '24px',
    margin: '24px 0',
};

const infoBox = {
    backgroundColor: '#eff6ff',
    borderRadius: '12px',
    padding: '24px',
    margin: '24px 0',
    borderLeft: '4px solid #8B5CF6',
};

const list = {
    margin: '0',
    paddingLeft: '20px',
};

const listItem = {
    color: '#1d1d1f',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '8px',
};

const buttonSection = {
    textAlign: 'center' as const,
    margin: '32px 0',
};

const button = {
    backgroundColor: '#8B5CF6',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '14px 32px',
};

const link = {
    color: '#8B5CF6',
    textDecoration: 'underline',
};

const footer = {
    color: '#86868b',
    fontSize: '14px',
    lineHeight: '1.6',
    textAlign: 'center' as const,
    marginTop: '32px',
};

const stepsCard = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    margin: '32px 0',
    border: '1px solid #e5e5e7',
};

const stepItem = {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    alignItems: 'flex-start',
};

const stepNumber = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#8B5CF6',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '32px',
    textAlign: 'center' as const,
    flexShrink: 0,
};

const stepTitle = {
    color: '#1d1d1f',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px',
};

const stepDesc = {
    color: '#86868b',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0',
};



