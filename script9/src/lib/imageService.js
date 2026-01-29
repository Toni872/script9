import s3 from './cloudflareR2';

/**
 * Upload an image to Cloudflare R2.
 * @param {Buffer} fileBuffer - The image file buffer.
 * @param {string} fileName - The name of the file to save.
 * @returns {Promise} - The result of the upload.
 */
export const uploadImage = async (fileBuffer, fileName) => {
    const params = {
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
    };

    return s3.upload(params).promise();
};

/**
 * Retrieve an image from Cloudflare R2.
 * @param {string} fileName - The name of the file to retrieve.
 * @returns {Promise} - The image data.
 */
export const getImage = async (fileName) => {
    const params = {
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: fileName,
    };

    return s3.getObject(params).promise();
};