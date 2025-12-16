'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function TestUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
            setImageUrl('');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Por favor selecciona una imagen');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/test-upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al subir la imagen');
            }

            setImageUrl(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    🖼️ Prueba de Subida a Cloudflare R2
                </h1>

                <div className={styles.uploadArea}>
                    <label htmlFor="file-input" className={styles.fileLabel}>
                        📁 Seleccionar imagen
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                        aria-label="Seleccionar archivo de imagen"
                    />

                    {file && (
                        <p className={styles.fileInfo}>
                            📁 Archivo seleccionado: <strong>{file.name}</strong>
                        </p>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className={styles.uploadButton}
                    >
                        {uploading ? '⏳ Subiendo...' : '📤 Subir imagen'}
                    </button>
                </div>

                {error && (
                    <div className={styles.errorBox}>
                        ❌ {error}
                    </div>
                )}

                {imageUrl && (
                    <div className={styles.successBox}>
                        <h3 className={styles.successTitle}>
                            ✅ ¡Imagen subida exitosamente!
                        </h3>

                        <div className={styles.urlSection}>
                            <strong className={styles.urlLabel}>URL:</strong>
                            <div className={styles.urlBox}>
                                <a
                                    href={imageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.urlLink}
                                >
                                    {imageUrl}
                                </a>
                            </div>
                        </div>

                        <div className={styles.imagePreview}>
                            <Image
                                src={imageUrl}
                                alt="Imagen subida"
                                width={800}
                                height={600}
                                unoptimized
                                className={styles.uploadedImage}
                            />
                        </div>
                    </div>
                )}

                <div className={styles.infoBox}>
                    <p className={styles.infoTitle}>ℹ️ Información:</p>
                    <ul className={styles.infoList}>
                        <li>Bucket: <code className={styles.infoCode}>script9-images</code></li>
                        <li>Formato: JPG, PNG, GIF, WebP</li>
                        <li>Las imágenes son públicamente accesibles</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

