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

interface BookingConfirmationEmailProps {
    guestName: string;
    propertyTitle: string;
    bookingReference: string;
    date: string;
    startTime: string;
    endTime: string;
    guests: number;
    totalPrice: number;
    propertyAddress: string;
    hostName: string;
    hostEmail: string;
}

export const BookingConfirmationEmail = ({
    guestName = 'Usuario',
    propertyTitle = 'Servicio Script9',
    bookingReference = 'S9-123456',
    date = '01/01/2024',
    startTime = '10:00',
    endTime = '14:00',
    guests = 10,
    totalPrice = 100,
    propertyAddress = 'Madrid, España',
    hostName = 'Anfitrión',
    hostEmail = 'colaborador@script9.es',
}: BookingConfirmationEmailProps) => (
    <Html>
        <Head />
        <Preview>¡Reserva confirmada en Script9! - {propertyTitle}</Preview>
        <Body style={main}>
            <Container style={container}>
                {/* Logo */}
                <Section style={logoSection}>
                    <Heading style={logo}>Script9</Heading>
                </Section>

                {/* Success Icon */}
                <Section style={iconSection}>
                    <div style={successIcon}>✓</div>
                </Section>

                {/* Main Content */}
                <Heading style={h1}>¡Reserva Confirmada!</Heading>

                <Text style={text}>
                    Hola <strong>{guestName}</strong>,
                </Text>

                <Text style={text}>
                    Tu reserva ha sido confirmada exitosamente. Estamos emocionados de que automatices tu negocio con Script9.
                </Text>

                {/* Booking Details Card */}
                <Section style={detailsCard}>
                    <Heading style={h2}>Detalles de tu Reserva</Heading>

                    <Hr style={divider} />

                    <table style={detailsTable}>
                        <tr>
                            <td style={labelCell}>Número de Reserva:</td>
                            <td style={valueCell}><strong>{bookingReference}</strong></td>
                        </tr>
                        <tr>
                            <td style={labelCell}>Servicio:</td>
                            <td style={valueCell}><strong>{propertyTitle}</strong></td>
                        </tr>
                        <tr>
                            <td style={labelCell}>Ubicación:</td>
                            <td style={valueCell}>{propertyAddress}</td>
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
                            <td style={labelCell}>Total Pagado:</td>
                            <td style={valueCell}><strong style={priceText}>€{totalPrice.toFixed(2)}</strong></td>
                        </tr>
                    </table>
                </Section>

                {/* Host Info */}
                <Section style={hostSection}>
                    <Heading style={h3}>Información del Colaborador</Heading>
                    <Text style={text}>
                        <strong>{hostName}</strong> se pondrá en contacto contigo 24 horas antes de tu llegada para coordinar los detalles de acceso.
                    </Text>
                    <Text style={smallText}>
                        Email: <Link href={`mailto:${hostEmail}`} style={link}>{hostEmail}</Link>
                    </Text>
                </Section>

                {/* CTA Button */}
                <Section style={buttonSection}>
                    <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pedidos`}>
                        Ver Mis Reservas
                    </Button>
                </Section>

                {/* Important Info */}
                <Section style={infoBox}>
                    <Heading style={h3}>Información Importante</Heading>
                    <ul style={list}>
                        <li style={listItem}>Recibirás las instrucciones de acceso 24h antes de tu llegada</li>
                        <li style={listItem}>Puedes cancelar hasta 48 horas antes sin cargo</li>
                        <li style={listItem}>Llega puntual al horario reservado</li>
                        <li style={listItem}>Respeta las normas del espacio</li>
                    </ul>
                </Section>

                {/* Footer */}
                <Hr style={divider} />

                <Text style={footer}>
                    <strong>Script9</strong> - Automatiza tu negocio, escala sin límites
                    <br />
                    Si tienes alguna pregunta, contáctanos en{' '}
                    <Link href="mailto:info@script9.es" style={link}>info@script9.es</Link>
                </Text>

                <Text style={smallText}>
                    Este email fue enviado a {guestName} porque realizaste una reserva en Script9.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default BookingConfirmationEmail;

// Estilos - Diseño Apple/Stripe
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
    color: '#10B981',
    fontSize: '32px',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '-0.5px',
};

const iconSection = {
    textAlign: 'center' as const,
    marginBottom: '24px',
};

const successIcon = {
    display: 'inline-block',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: '64px',
    textAlign: 'center' as const,
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
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0 0 8px',
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

const hostSection = {
    backgroundColor: '#f5f5f7',
    borderRadius: '12px',
    padding: '24px',
    margin: '24px 0',
};

const infoBox = {
    backgroundColor: '#fff7ed',
    borderRadius: '12px',
    padding: '24px',
    margin: '24px 0',
    borderLeft: '4px solid #10B981',
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
    backgroundColor: '#10B981',
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
    color: '#10B981',
    textDecoration: 'underline',
};

const footer = {
    color: '#86868b',
    fontSize: '14px',
    lineHeight: '1.6',
    textAlign: 'center' as const,
    marginTop: '32px',
};



