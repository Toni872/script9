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

interface WelcomeEmailProps {
    name: string;
    email: string;
    userType: 'user' | 'host';
}

export const WelcomeEmail = ({
    name = 'Usuario',
    email = 'user@script9.es',
    userType = 'user',
}: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>¡Bienvenido a Script9! Comienza tu aventura</Preview>
        <Body style={main}>
            <Container style={container}>
                {/* Logo */}
                <Section style={logoSection}>
                    <Heading style={logo}>Script9</Heading>
                </Section>

                {/* Main Content */}
                <Heading style={h1}>
                    {userType === 'host' ? '🎉 ¡Bienvenido a Script9, Colaborador!' : '🎉 ¡Bienvenido a Script9!'}
                </Heading>

                <Text style={text}>
                    Hola <strong>{name}</strong>,
                </Text>

                <Text style={text}>
                    {userType === 'host'
                        ? 'Estamos emocionados de tenerte como colaborador en nuestra comunidad. Tus conocimientos tienen el potencial de generar ingresos mientras ayudas a otros a automatizar sus negocios.'
                        : 'Estamos emocionados de tenerte en nuestra comunidad. Ahora tienes acceso a más de 500 servicios de automatización e IA.'
                    }
                </Text>

                {/* Next Steps */}
                <Section style={stepsCard}>
                    <Heading style={h2}>
                        {userType === 'host' ? 'Próximos Pasos' : '¿Qué puedes hacer ahora?'}
                    </Heading>

                    {userType === 'host' ? (
                        <>
                            <div style={stepItem}>
                                <div style={stepNumber}>1</div>
                                <div>
                                    <Text style={stepTitle}>Publica tu primer servicio</Text>
                                    <Text style={stepDesc}>Define tu oferta, describe las funcionalidades y establece tus precios</Text>
                                </div>
                            </div>

                            <div style={stepItem}>
                                <div style={stepNumber}>2</div>
                                <div>
                                    <Text style={stepTitle}>Define tu disponibilidad</Text>
                                    <Text style={stepDesc}>Elige cuándo y cómo quieres ofrecer tus servicios</Text>
                                </div>
                            </div>

                            <div style={stepItem}>
                                <div style={stepNumber}>3</div>
                                <div>
                                    <Text style={stepTitle}>Empieza a recibir reservas</Text>
                                    <Text style={stepDesc}>Nuestro equipo revisará tu publicación en 24-48 horas</Text>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={stepItem}>
                                <div style={stepNumber}>1</div>
                                <div>
                                    <Text style={stepTitle}>Explora servicios de IA</Text>
                                    <Text style={stepDesc}>Usa filtros avanzados para encontrar tu solución</Text>
                                </div>
                            </div>

                            <div style={stepItem}>
                                <div style={stepNumber}>2</div>
                                <div>
                                    <Text style={stepTitle}>Contrata lo que necesitas</Text>
                                    <Text style={stepDesc}>Paga solo por los servicios que uses</Text>
                                </div>
                            </div>

                            <div style={stepItem}>
                                <div style={stepNumber}>3</div>
                                <div>
                                    <Text style={stepTitle}>Automatiza tu negocio</Text>
                                    <Text style={stepDesc}>Implementación rápida y soporte 24/7</Text>
                                </div>
                            </div>
                        </>
                    )}
                </Section>

                {/* CTA Button */}
                <Section style={buttonSection}>
                    <Button
                        style={button}
                        href={userType === 'host'
                            ? `${process.env.NEXT_PUBLIC_APP_URL}/host/properties/new`
                            : `${process.env.NEXT_PUBLIC_APP_URL}/catalogo`
                        }
                    >
                        {userType === 'host' ? 'Publicar mi Servicio' : 'Explorar Servicios'}
                    </Button>
                </Section>

                {/* Footer */}
                <Hr style={divider} />

                <Text style={footer}>
                    <strong>Script9</strong> - Automatiza tu negocio, escala sin límites
                    <br />
                    Si necesitas ayuda, escríbenos a{' '}
                    <Link href="mailto:info@script9.es" style={link}>info@script9.es</Link>
                </Text>

                <Text style={smallText}>
                    Este email fue enviado a {email}
                </Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;

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
    color: '#10B981',
    fontSize: '32px',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '-0.5px',
};

const h1 = {
    color: '#1d1d1f',
    fontSize: '28px',
    fontWeight: '600',
    lineHeight: '1.2',
    margin: '0 0 24px',
    textAlign: 'center' as const,
};

const h2 = {
    color: '#1d1d1f',
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 20px',
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
    margin: '0 0 8px',
    textAlign: 'center' as const,
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
    backgroundColor: '#10B981',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

const divider = {
    borderColor: '#e5e5e7',
    margin: '24px 0',
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

const iconSection = {
    textAlign: 'center' as const,
    marginBottom: '24px',
};



