import { useState, useEffect } from "react";
import { initDatabase } from "@/services/database";

export const useInitDatabase = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const init = async () => {
			try {
				await initDatabase();
			} catch (e) {
				console.error("Database initialization failed:", e);
			} finally {
				setLoading(false);
			}
		};

		init();
	}, []);

	return { loading };
};
