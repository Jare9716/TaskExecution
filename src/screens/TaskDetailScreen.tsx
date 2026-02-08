import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	ScrollView,
	Alert,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { TaskStatus } from "@/models/task";
// Asumo que tienes un componente Button, si no usa el de React Native
import { Button } from "react-native";

import { TaskDetailScreenProps } from "@/models/taskDetail";

const TaskDetailScreen = ({ route }: TaskDetailScreenProps) => {
	const navigation = useNavigation();
	const { taskId } = route.params;

	const { tasks, auditTask } = useTasks();
	const task = tasks.find((t) => t.id === taskId);

	const [comment, setComment] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	// Cargar datos previos si ya existían (Persistencia de Formulario)
	useEffect(() => {
		if (task?.local_changes?.comment) {
			setComment(task.local_changes.comment);
		}
	}, [task]);

	if (!task) return <Text>Cargando...</Text>;

	const isReadOnly =
		task.status === TaskStatus.COMPLETED && task.sync_status === "synced";

	const handleSave = async () => {
		if (!comment.trim()) return Alert.alert("Error", "Escribe un comentario");

		setIsSaving(true);
		try {
			// 1. GUARDAR LOCALMENTE (SQLite)
			await auditTask(task.id, {
				comment: comment,
				completed_at: new Date().toISOString(),
			});

			// 2. VOLVER A LA LISTA (Feedback Inmediato)
			navigation.goBack();
		} catch (e) {
			Alert.alert("Error", "No se pudo guardar en base de datos");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>{task.title}</Text>
			<Text style={styles.subtitle}>📍 {task.location.address}</Text>

			<View style={styles.formSection}>
				<Text style={styles.label}>Observaciones de Auditoría:</Text>
				<TextInput
					style={styles.input}
					multiline
					placeholder="Eje: Producto dañado, precio incorrecto..."
					value={comment}
					onChangeText={setComment}
					editable={!isReadOnly}
				/>
			</View>

			{/* Feedback Visual del Estado Offline */}
			{task.sync_status === "pending_update" && (
				<View style={styles.warningBox}>
					<Text style={styles.warningText}>
						⚠️ Esperando conexión para subir
					</Text>
				</View>
			)}

			{!isReadOnly && (
				<Button
					title={isSaving ? "Guardando..." : "Terminar Auditoría"}
					onPress={handleSave}
					disabled={isSaving}
				/>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: { padding: 20 },
	title: { fontSize: 22, fontWeight: "bold" },
	subtitle: { color: "#666", marginBottom: 20 },
	formSection: { marginBottom: 20 },
	label: { fontWeight: "bold", marginBottom: 5 },
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		height: 100,
		textAlignVertical: "top",
	},
	warningBox: {
		backgroundColor: "#FFF3CD",
		padding: 10,
		borderRadius: 8,
		marginBottom: 20,
	},
	warningText: { color: "#856404" },
});

export default TaskDetailScreen;
