import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Client } from "./Forms";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
  title: { fontSize: 20, marginBottom: 4, fontFamily: "Helvetica-Bold" },
  subtitle: { fontSize: 12, color: "#666", marginBottom: 20 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1976d2",
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  headerCell: { color: "#fff", fontFamily: "Helvetica-Bold" },
  row: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  rowAlt: { backgroundColor: "#f5f5f5" },
  colName: { width: "40%" },
  colEmail: { width: "40%" },
  colPhone: { width: "20%" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: "#999",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function ClientsPdfReport({ clients }: { clients: Client[] }) {
  const now = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Relatório de Clientes</Text>
        <Text style={styles.subtitle}>
          Total: {clients.length} clientes — Gerado em {now}
        </Text>

        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.colName]}>Nome</Text>
          <Text style={[styles.headerCell, styles.colEmail]}>E-mail</Text>
          <Text style={[styles.headerCell, styles.colPhone]}>Telefone</Text>
        </View>

        {/* Rows */}
        {clients.map((c, i) => (
          <View
            key={c.id}
            style={[styles.row, i % 2 !== 0 && styles.rowAlt]}
            wrap={false}
          >
            <Text style={styles.colName}>{c.name}</Text>
            <Text style={styles.colEmail}>{c.email}</Text>
            <Text style={styles.colPhone}>{c.phone || "—"}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>MillionTech — Relatório de Clientes</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
