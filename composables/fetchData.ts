// import axios from 'axios';
// import { params } from '../API/Api';
// import { paramsSheets } from '../API/Api';

// const fetchDriveItems = async () => {
// 	try {
// 		// -------------------- Google Drive
// 		const responseDrive = await axios.get(
// 			'https://www.googleapis.com/drive/v3/files',
// 			{ params }
// 		);
// 		photosDrive.value = responseDrive.data.files;
// 	} catch (error) {
// 		console.error('Ошибка при получении записей из Google DRIVE:', error);
// 	}
// };

// const fetchSheetsItems = async () => {
// 	try {
// 		// -------------------- Google Sheets
// 		const responseSheets = await axios.get(
// 			`https://sheets.googleapis.com/v4/spreadsheets/${_GOOGLE_SHEETS_KEY}/values/${sheetRange}?key=${_API_KEY}`,
// 			{ paramsSheets }
// 		);

// 		// преобразование ссылки на фото
// 		recordsArr.value = responseSheets.data.values.map((item) => {
// 			const result = item;
// 			const separate = result[6].split('/');
// 			const nameUrl = decodeURIComponent(separate[separate.length - 1]);

// 			const obj = photosDrive.value.find((photo) => photo.name === nameUrl);

// 			result[6] = getPhotoUrl(obj.id);

// 			return result;
// 		});
// 	} catch (error) {
// 		console.error('Ошибка при получении записей из Google SHEETS:', error);
// 	}
// };
