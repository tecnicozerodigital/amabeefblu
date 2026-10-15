/* eslint-disable */

export function getFileFromBase64Fetch (base64, name, extension, mime) {
    return fetch(base64)
    .then(res => res.arrayBuffer())
    .then(buffer => new File(
        [buffer],
        `${name}.${extension}`,
        { type: mime }
    ))
}

export function resetFileInput (input)  {
    if (!input || input.value === '') return false

    try {
        // for modern browsers
        input.value = ''
    } catch (err) {
        console.log('error clear input', err)
    }

    // for IE10
    if (input.value) {
        // quickly append input to temp form and reset form
        const form = document.createElement('form')
        const parentNode = input.parentNode
        const ref = input.nextSibling
        form.appendChild(input)
        form.reset()

        // re-inject input where it originally was
        if (ref) parentNode.insertBefore(input, ref)
        else parentNode.appendChild(input)
    }
}

export const renameFile = (file, name) => {
    const renamedFile = file.slice(0, file.size, file.type);
    renamedFile.lastModifiedDate = file.lastModifiedDate;
    renamedFile.name = name;

    return renamedFile;
};

/**
 *
 * @param {file} file
 * @returns {promise} - promise
 */
export function reader (file) {
    if (window.File && window.FileList && window.FileReader) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            }

            reader.onerror = (err) => {
                reject(err);
            }

            reader.readAsDataURL(file);
        });
    } else {
        return {
            res: false,
            message: 'Error: File API is not supported on your browser!'
        }
    }
}


/**
 * 
 * @param {object} file
 * @return {object} promise
 */
export function getBase64FromFile (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function() {
            const uri = reader.result;
            resolve(uri);
        }

        reader.onerror = function(evt) {
            reject(evt);
        }

        reader.readAsDataURL(file);
    });
}

export const getByteStringFromBase64DataURI = (uri) => {
    return atob(getBase64DataFromBase64DataURI(uri));
};

export const getBlobFromByteStringWithMimeType = (byteString, mimeType) => {
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return createBlob(ab, mimeType);
};

export const getBlobFromBase64DataURI = (uri) => {
    const mimeType = getMimeTypeFromBase64DataURI(uri);
    const byteString = getByteStringFromBase64DataURI(uri);

    return getBlobFromByteStringWithMimeType(byteString, mimeType);
};

export const getBase64DataFromBase64DataURI = (dataUri) => {
    // remove data:image/jpeg...
    const data = dataUri.split(',')[1];

    // remove any whitespace as that causes InvalidCharacterError in IE
    return data.replace(/\s/g, '');
};

export const getExtensionFromFilename = (fileName = '') => {
    return fileName.split('.').pop();
}

export const getFilenameWithoutExtension = (fileName, allowSanitize = false) => {
    let newFileName = fileName;

    if(allowSanitize) newFileName = newFileName.replace(/[^\w]/gmi, '-');

    return newFileName.substr(0, fileName.lastIndexOf('.')) || newFileName;
}

export const getMimeTypeFromBase64DataURI = (uri) => {
    return (/^data:(.+);/.exec(uri) || [])[1] || null;
};

export const getBlobBuilder = () => {
    return (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder);
}

export const getBytesToSize = (bytes) => {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes == 0) return '0 Byte';

    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return {
        bytes: bytes,
        human: Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    }
 };

export function createBlob (arrayBuffer, mimeType) {
    const BB = getBlobBuilder();

    if (BB) {
        const bb = new BB();
        bb.append(arrayBuffer);
        return bb.getBlob(mimeType);
    }

    return new Blob([arrayBuffer], {
        type: mimeType
    });
};

export const getCopyFile = file => geFileRenamed(file, file.name);

export const toNaturalFileSize = (bytes, decimalSeparator = '.') => {
    // nope, no negative byte sizes
    bytes = Math.round(Math.abs(bytes));

    // just bytes
    if (bytes < 1000) {
        return `${bytes} bytes`;
    }

    // kilobytes
    if (bytes < MB) {
        return `${Math.floor(bytes / KB)} KB`;
    }

    // megabytes
    if (bytes < GB) {
        return `${removeDecimalsWhenZero(bytes / MB, 1, decimalSeparator)} MB`;
    }

    // gigabytes
    return `${removeDecimalsWhenZero(bytes / GB, 2, decimalSeparator)} GB`;
};

const KB = 1000;
const MB = 1000000;
const GB = 1000000000;

const removeDecimalsWhenZero = (value, decimalCount, separator) => {
    return value
        .toFixed(decimalCount)
        .split('.')
        .filter(part => part !== '0')
        .join(separator);
};

export function getDimensionFromFile (file) {
    return new Promise((resolve, reject) => {
        var fr = new FileReader

        fr.onload = () => {
            var img = new Image

            img.onload = () => {
                resolve({ w: img.naturalWidth, h: img.naturalHeight })
            }

            img.onerror = reject

            img.src = fr.result
        }

        fr.onerror = reject

        fr.readAsDataURL(file)
    })
}

export function getBase64FromArrayBuffer (buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

export function getFileFromBase64DataURI (dataURI, filename, extension) {
    return getFileFromBlob(getBlobFromBase64DataURI(dataURI), filename, null, extension);
};

export function getFileFromBlob (blob, filename, type, extension) {
    var file = typeof type === 'string' ? blob.slice(0, blob.size, type) : blob.slice(0, blob.size, blob.type);
    file.lastModifiedDate = new Date();

    // if blob has name property, use as filename if no filename supplied
    if (!isString(filename)) {
        filename = getDateString(new Date());
    }

    // if filename supplied but no extension and filename has extension
    if (filename && extension === null && getExtensionFromFilename(filename)) {
        file.name = filename;
    }
    else {
        extension = extension || guesstimateExtension(file.type);
        file.name = filename + (extension ? '.' + extension : '');
    }

    return file;
};

export function guesstimateExtension (type) {
    // if no extension supplied, exit here
    if (typeof type !== 'string') {
        return '';
    }

    // get subtype
    const subtype = type.split('/').pop();

    // is svg subtype
    if (/svg/.test(subtype)) {
        return 'svg';
    }

    if (/zip|compressed/.test(subtype)) {
        return 'zip';
    }

    if (/plain/.test(subtype)) {
        return 'txt';
    }

    if (/msword/.test(subtype)) {
        return 'doc';
    }

    // if is valid subtype
    if (/[a-z]+/.test(subtype)) {
        // always use jpg extension
        if (subtype === 'jpeg') {
            return 'jpg';
        }

        // return subtype
        return subtype;
    }

    return '';
}

export function getDateString (date)  {
    return `${date.getFullYear()}-${leftPad(date.getMonth() + 1, '00')}-${leftPad(
        date.getDate(),
        '00'
    )}_${leftPad(date.getHours(), '00')}-${leftPad(
        date.getMinutes(),
        '00'
    )}-${leftPad(date.getSeconds(), '00')}`;
}

export function isString (value) {
    return typeof value === 'string';
}

export const leftPad = (value, padding = '') => (padding + value).slice(-padding.length);