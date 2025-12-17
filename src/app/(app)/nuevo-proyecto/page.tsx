import { WizardClient } from '@/components/dashboard/WizardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nuevo Proyecto | Script9 Asistente',
    description: 'Inicia tu proyecto de automatización con nuestro asistente inteligente.',
};

export default function NewProjectWizardPage() {
    return <WizardClient />;
}
