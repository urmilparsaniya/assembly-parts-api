import * as CryptoJS from 'crypto-js';

export class CryptoUtil {

	public static encrypt(key: string, data: string): string {
		return CryptoJS.AES.encrypt(data, key).toString();
	}

	public static decrypt(key: string, data: string): string {
		const decryptedBytes: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(data, key);
		return decryptedBytes.toString(CryptoJS.enc.Utf8);
	}

	public static generateRandomKey(length: number, characterSet: string): string {
		let randomKey: string = '';
		const charactersLength = characterSet.length;
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charactersLength);
			randomKey += characterSet.charAt(randomIndex);
		}
		return randomKey;
	}

	public static encryptWithFirstNCharacterKey(length: number, data: any, characterSet: string): string {
		const key: string = CryptoUtil.generateRandomKey(length, characterSet);
		const encryptData: string = CryptoUtil.encrypt(key, JSON.stringify(data));
		return key + encryptData;
	}

	public static decryptWithFirstNCharacterKey(length: number, data: any): string {
		return CryptoUtil.decrypt(data.slice(0, length), data.slice(length));
	}
}
