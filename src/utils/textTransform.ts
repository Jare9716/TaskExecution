import { NumberFormatProps } from "@/models";

export function numberFormat({ options }: NumberFormatProps) {
	const numberFormat = new Intl.NumberFormat("es-US", options);

	return numberFormat;
}

export function dateToString(date: string | Date) {
	const dateObject = new Date(date);

	const year = dateObject.getFullYear();
	const month = dateObject.getMonth() + 1;
	const day = dateObject.getDate();

	return `${day}-${month}-${year}`;
}
