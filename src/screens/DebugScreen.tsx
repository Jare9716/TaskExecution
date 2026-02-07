import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useTasks } from "@/features/tasks/hooks/useTasks";

export const DebugScreen = () => {
	const { tasks, loading, syncing, refresh, auditTask, forceSync } = useTasks();

	return (
		<View style={styles.container}>
			<Text style={styles.header}>🛠 Zubale Offline Debugger</Text>

			{/* Panel de Control */}
			<View style={styles.controls}>
				<Text>
					Estado:{" "}
					{loading ? "Cargando..." : syncing ? "Sincronizando ☁️" : "Idle"}
				</Text>
				<View style={styles.buttonRow}>
					<Button title="Recargar (API)" onPress={refresh} disabled={loading} />
					<Button title="Forzar Sync ⬆️" onPress={forceSync} color="orange" />
				</View>
			</View>

			{/* Lista de Tareas */}
			<FlatList
				data={tasks}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View
						style={[
							styles.card,
							item.sync_status === "pending_update"
								? styles.pendingCard
								: styles.syncedCard,
						]}
					>
						<View>
							<Text style={styles.title}>{item.title}</Text>
							<Text>💰 ${item.price}</Text>
							<Text>📍 {item.location.address}</Text>
							<Text style={styles.status}>
								{item.status.toUpperCase()}
								{item.sync_status === "pending_update"
									? " (Pendiente de Subir ⏳)"
									: " (Synced ✅)"}
							</Text>
						</View>

						{/* Botón para simular completar auditoría */}
						{item.status === "available" && (
							<Button
								title="Auditar"
								onPress={() =>
									auditTask(item.id, {
										comment: "Test audit",
										completed_at: new Date().toISOString(),
									})
								}
							/>
						)}
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 50,
		backgroundColor: "#f5f5f5",
	},
	header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
	controls: {
		marginBottom: 20,
		padding: 10,
		backgroundColor: "#ddd",
		borderRadius: 8,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
	},
	card: {
		padding: 15,
		marginBottom: 10,
		borderRadius: 8,
		borderWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	syncedCard: { backgroundColor: "white", borderColor: "#ccc" },
	pendingCard: { backgroundColor: "#fff3cd", borderColor: "#ffc107" }, // Amarillo si está pendiente
	title: { fontWeight: "bold", fontSize: 16 },
	status: { fontSize: 12, marginTop: 5, color: "#666" },
});
